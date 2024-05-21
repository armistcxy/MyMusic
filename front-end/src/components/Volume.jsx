import React, { useEffect } from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import { RxSpeakerLoud, RxSpeakerModerate, RxSpeakerQuiet, RxSpeakerOff } from "react-icons/rx";

export default function Volume() {
    const [{ volume }, dispatch] = useStateProvider();
    const setVolume = (e) => {
        const curVolume = e.target.value / 100;
        dispatch({
            type: reducerCases.SET_VOLUME,
            volume: curVolume,
        });
    }
    const setMute = () => {
        dispatch({
            type: reducerCases.SET_VOLUME,
            volume: 0,
        });
    }
    const setUnmute = () => {
        dispatch({
            type: reducerCases.SET_VOLUME,
            volume: 0.5,
        });
    }


    return (
        <Container volume={volume}>
            {volume <= 0 && <RxSpeakerOff className="loudspeaker" onClick={setUnmute} />}
            {volume > 0 && volume <= 0.25 && <RxSpeakerQuiet className="loudspeaker" onClick={setMute} />}
            {volume > 0.25 && volume <= 0.5 && <RxSpeakerModerate className="loudspeaker" onClick={setMute} />}
            {volume > 0.5 && <RxSpeakerLoud className="loudspeaker" onClick={setMute} />}
            <input type="range" min={0} max={100} onMouseUp={(e => setVolume(e))} />
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    align-content: center;
    align-items: center;
    input {
        width: 12rem;
        position: relative;
        height: 3px;
        outline: none;
        appearance: none;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.1);
        &:hover::before {
            background: #1db954;
        }
    }
    input::before {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        background: #848484;
        width: ${props => props.volume * 100}%;
        height: 100%;
        border-radius: 10px;
        z-index: 2;
        transition: width 250ms linear;
      }
    input::-webkit-slider-thumb {
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
        &:hover::before {
            background: #1db954;
        }
    }
    input::-moz-range-track {
        width: 100%;
        height: 5px;
        outline: none;
        appearance: none;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.1);
      }
      
      input::-moz-range-progress {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        background: #1db954;
        width: ${props => props.volume * 100}%;
        height: 100%;
        border-radius: 10px;
        z-index: 2;
        transition: width 250ms linear;
      }
      
      input::-moz-range-thumb {
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
    svg {
        color: #b3b3b3;
        transition: 0.2s ease-in-out;
        margin-right: 10px;
        &:hover {
        color: #1db954;
        }
    }
` 