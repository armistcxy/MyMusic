import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import { TiHeartOutline, TiHeartFullOutline } from "react-icons/ti";

export default function CurrentTrack() {
    const [{ token, currentPlaying }, dispatch] = useStateProvider();

    useEffect(() => {
        const getCurrentTrack = async () => {
            const response = await axios.get(
                "http://localhost:8000/users/me/last",
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response);
            if (response.data !== "") {
                const currentPlaying = {
                    id: response.data.id,
                    name: response.data.name,
                    artists: response.data.artists.map((artist) => artist.name),
                    image: `http://localhost:8000/static/${response.data.track_image_path}`,
                    song: `http://localhost:8000/static/${response.data.id}.mp3`
                };
                
                dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: currentPlaying });
            } else {
                dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
            }
        };
        if(token) {
            getCurrentTrack();
        }
    }, [token, dispatch]);
    return (
        <Container>
            {currentPlaying && currentPlaying.id && (
                <div className="track">
                    <div className="track__image">
                        <img src={currentPlaying?.image} alt="currentPlaying" />
                    </div>
                    <div className="track__info">
                        <h4 className="track__info__track__name">{currentPlaying?.name}</h4>
                        <h6 className="track__info__track__artists">
                            {currentPlaying?.artists?.join(", ")}
                        </h6>
                    </div>
                    <TiHeartOutline />
                </div>
            )}
        </Container>
    );
}


const Container = styled.div`
    .track {
        display: flex;
        align-items: center;
        gap: 1rem;
        &__image {
        }
        &__info {
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
            &__track__name {
                color: white;
            }
            &__track__artists {
                color: #b3b3b3;
            }
        }
        svg {
            color: #b3b3b3;
            transition: 0.2s ease-in-out;
            transform: translateY(-6px) translateX(5px) scale(1.5);
            &:hover {
                color: #1db954;
            }
        }
    }
`;