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
import { reducerCases } from "../utils/Constants";
import { changeTrack } from "./CurrentTrack";
import axios from "axios";

export default function PlayerControls() {
    const [{ token, playerState, currentPlaying, readyToListen, lastPlayed, volume }, dispatch] = useStateProvider();

    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrenttime] = useState(0);
    const [isRepeatTrack, setRepeatTrack] = useState(false);

    const audioPlayer = useRef();
    const progressBar = useRef();
    const animationRef = useRef();

    const nextPlay = async () => {
        const response = await axios.get(
            `http://localhost:8000/tracks/random/1`,
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            }
        );
        const nextSong = {
            id: response.data[0].id,
            name: response.data[0].name,
            artists: response.data[0].artists,
            track_image_path: response.data[0].track_image_path,
            song: `http://localhost:8000/${response.data[0].audio_url}`,
        }
        const newLastPlayed = [...lastPlayed, nextSong];
        dispatch({ type: reducerCases.SET_LAST_PLAYED, lastPlayed: newLastPlayed });
        if (token)
            changeTrack(nextSong.id, token, readyToListen, dispatch);
        else changeTrack(nextSong.id, token, readyToListen, dispatch, nextSong);
        
    }

    const prevPlay = () => {
        if (lastPlayed.length >=1 ) {
            setTimeout(3000);
            const len = lastPlayed.length;
            const prevSong = lastPlayed[len - 1];
            const remaining = lastPlayed.slice(0, -1);
            dispatch({ type: reducerCases.SET_LAST_PLAYED, lastPlayed: remaining });      
            if (token)
                changeTrack(prevSong.id, token, readyToListen, dispatch);
            else changeTrack(prevSong.id, token, readyToListen, dispatch, prevSong);              
        }
    }

    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration);
        setDuration(seconds);
        // set max prop with out seconds in input[range]
        progressBar.current.max = seconds;
    }, [audioPlayer?.current?.loadedmetada, audioPlayer?.current?.readyState, currentPlaying]);

    useEffect(() => {
        audioPlayer.current.volume = volume;
    }, [volume]);

    useEffect(() => {
        audioPlayer.current.src = currentPlaying.song;
        if (currentPlaying?.song && audioPlayer.current && readyToListen) {
            audioPlayer.current.src = currentPlaying.song;
            audioPlayer.current.play();
            dispatch({
                type: reducerCases.SET_PLAYER_STATE,
                playerState: true,
            });
            animationRef.current = requestAnimationFrame(whilePlaying);
        }
    }, [currentPlaying, dispatch]);

    const whilePlaying = () => {
        if (progressBar.current) {
            progressBar.current.value = audioPlayer?.current?.currentTime;
            progressBar.current.style.setProperty(
                "--played-width",
                `${(progressBar.current.value / duration) * 100}%`
            );
        }
        changeCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);
    };

    const changeProgress = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        changeCurrentTime();
    };

    const changeCurrentTime = () => {
        if (progressBar.current)
            progressBar.current.style.setProperty(
                "--played-width",
                `${(progressBar.current.value / duration) * 100}%`
            );
        if (progressBar.current)
            setCurrenttime(progressBar.current.value);
    };

    const repeatCurrentTrack = () => {
        setRepeatTrack(!isRepeatTrack);
    }

    const handleSongEnd = () => {
        if (isRepeatTrack) {
            audioPlayer.current.currentTime = 0;
            audioPlayer.current.play();
        }
    };

    const calculateTime = (sec) => {
        const minutes = Math.floor(sec / 60);
        const returnMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(sec % 60);
        const returnSec = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnMin}:${returnSec}`;
    };

    const changeState = async () => {

        if (currentPlaying.id) {
            if (!playerState) {
                if (!readyToListen) {
                    dispatch({
                        type: reducerCases.SET_READY,
                        readyToListen: true,
                    });
                }
                progressBar.current.style.setProperty(
                    "--played-width",
                    `${(progressBar.current.value / duration) * 100}%`
                );
                animationRef.current = requestAnimationFrame(whilePlaying);
                audioPlayer.current.play();
            } else {
                progressBar.current.style.setProperty(
                    "--played-width",
                    `${(progressBar.current.value / duration) * 100}%`
                );
                cancelAnimationFrame(animationRef.current);
                audioPlayer.current.pause();
            }

            dispatch({
                type: reducerCases.SET_PLAYER_STATE,
                playerState: !playerState,
            });
        }
    };


    return (
        <Container>
            <audio src={currentPlaying?.song} onEnded={() => handleSongEnd()} preload="metadata" ref={audioPlayer} type="audio/mpeg" />
            <Container1 isRepeatTrack={isRepeatTrack}>
                <div className="shuffle">
                    <BsShuffle />
                </div>
                <div className="previous">
                    <CgPlayTrackPrev onClick={()=>{
                        prevPlay();
                    }}/>
                </div>
                <div className="state">
                    {playerState ? (
                        <BsFillPauseCircleFill onClick={changeState} />
                    ) : (
                        <BsFillPlayCircleFill onClick={changeState} />
                    )}
                </div>
                <div className="next">
                    <CgPlayTrackNext onClick={() => {
                        nextPlay();
                    }} />
                </div>
                <div className="repeat">
                    <FiRepeat onClick={() => repeatCurrentTrack()} />
                </div>
            </Container1>
            <Container2 >
                <div className="currentTime">{calculateTime(currentTime)}</div>
                <input
                    type="range"
                    className="progressBar"
                    ref={progressBar}
                    defaultValue="0"
                    onChange={() => changeProgress()}
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
    .repeat {
        svg {
            &:hover {
                color: white;
            }
            color: ${({ isRepeatTrack }) =>
        isRepeatTrack ? "green" : "#b3b3b3"}; 
        }
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
        &:hover::before {
            background: #1db954;
            opacity: 1;
        }
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
        width: var(--played-width, 0%);
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
        opacity: 0;
        transition: all 250ms linear;
        &:hover::before {
            background: #1db954;
            opacity: 1;
        }
      }
      .progressBar::-moz-range-track {
        width: 100%;
        height: 5px;
        outline: none;
        appearance: none;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.1);
      }
      
      .progressBar::-moz-range-progress {
        background: #1db954;
        width: var(--played-width);
        height: 100%;
        border-radius: 10px;
        z-index: 2;
        transition: width 250ms linear;
      }
      
      .progressBar::-moz-range-thumb {
        -moz-appearance: none;
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

