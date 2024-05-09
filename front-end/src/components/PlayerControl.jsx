import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
    BsFillPlayCircleFill,
    BsFillPauseCircleFill,
    BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import { Songs } from "./Songs";

export default function PlayerControls() {
    const [{ token, playerState, currentPlaying }, dispatch] = useStateProvider();

    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrenttime] = useState(0);

    const audioPlayer = useRef();
    const progressBar = useRef(); 
    const animationRef = useRef();

    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration);
        setDuration(seconds);
    
        // set max prop with out seconds in input[range]
        progressBar.current.max = seconds;
      }, [audioPlayer?.current?.loadedmetada, audioPlayer?.current?.readyState]);

      const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        changeCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);
      };

      const changeProgress = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        changeCurrentTime();
      };
    
      const changeCurrentTime = () => {
        progressBar.current.style.setProperty(
          "--played-width",
          `${(progressBar.current.value / duration) * 100}%`
        );
    
        setCurrenttime(progressBar.current.value);
      };

      const calculateTime = (sec) => {
        const minutes = Math.floor(sec / 60);
        const returnMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(sec % 60);
        const returnSec = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnMin}:${returnSec}`;
      };

    const changeState = async () => {
        // const state = playerState ? "pause" : "play";
        // await axios.put(
        //     `https://api.spotify.com/v1/me/player/${state}`,
        //     {},
        //     {
        //         headers: {
        //             "Content-Type": "application/json",
        //             Authorization: "Bearer " + token,
        //         },
        //     }
        // );
        if (!playerState) {
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
          } else {
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current);
          }

        dispatch({
            type: reducerCases.SET_PLAYER_STATE,
            playerState: !playerState,
        });
    };


    const changeTrack = async (type) => {
        console.log(type);
        await axios.post(
            `https://api.spotify.com/v1/me/player/${type}`,
            {},
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            }
        );
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
        const response = await axios.get(
            "https://api.spotify.com/v1/me/player/currently-playing",
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            }
        );
        if (response.data !== "") {
            const currentPlaying = {
                id: response.data.item.id,
                name: response.data.item.name,
                artists: response.data.item.artists.map((artist) => artist.name),
                image: response.data.item.album.images[2].url,
            };
            dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
        } else {
            dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
        }

    };


    return (
        <Container>
            <audio src={currentPlaying?.song} preload="metadata" ref={audioPlayer} />
            <Container1>
                <div className="shuffle">
                    <BsShuffle />
                </div>
                <div className="previous">
                    <CgPlayTrackPrev onClick={() => changeTrack("previous")} />
                </div>
                <div className="state">
                    {playerState ? (
                        <BsFillPauseCircleFill onClick={changeState} />
                    ) : (
                        <BsFillPlayCircleFill onClick={changeState} />
                    )}
                </div>
                <div className="next">
                    <CgPlayTrackNext onClick={() => changeTrack("next")} />
                </div>
                <div className="repeat">
                    <FiRepeat />
                </div>
            </Container1>
            <Container2 >
                <div className="currentTime">{calculateTime(currentTime)}</div>
                <input
                    type="range"
                    className="progressBar"
                    ref = {progressBar}
                    defaultValue="0"
                    onChange={changeProgress}
                />
                <div className="duration" >
                {duration && !isNaN(duration) && calculateTime(duration)
              ? duration && !isNaN(duration) && calculateTime(duration)
              : "00:00"}
                </div>
            </Container2>
        </Container>
    )
};

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`


const Container1 = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    svg {
        color: #b3b3b3;
        transition: 0.2s ease-in-out;
        &:hover {
        color: white;
        }
    }
    .state {
        svg {
        color: white;
        }
    }
    .previous,
    .next,
    .state {
        font-size: 2rem;
    }
`;

const Container2 = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    .progressBar {
        width: 40rem;
        position: relative;
        height: 5px;
        outline: none;
        appearance: none;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.1);

    }
    .currentTime, .duration {
        color: #f1f1f1;
        font-size: 12px;
        font-weight: bold;
    }
    .currentTime {
        margin-right: 20px;
    }
    .duration {
        margin-left: 20px;
    }
    .progressBar::before {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        background: #848484;
        width: var(--played-width);
        height: 100%;
        border-radius: 10px;
        z-index: 2;
        transition: width 250ms linear;
      }
    .progressBar::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        position: relative;
        margin: -2px 0 0 0;
        z-index: 3;
        box-sizing: border-box;
        transition: all 250ms linear;
      }
` 