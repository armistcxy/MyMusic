import React, { useEffect } from "react";
import styled from "styled-components";
import { AiFillClockCircle } from "react-icons/ai";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import { FaPlay } from "react-icons/fa";

export default function SongSelected({ headerBackground }) {
    const [{ token, selectedSongId, selectedSong }, dispatch] = useStateProvider();

    useEffect(() => {
        const getSong = async () => {
            const response = await axios.get(
                `http://localhost:8000/tracks/${selectedSongId}`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                }
            );
            
            const selectedSong = {
                id: response.data.id,
                name: response.data.name,
                track_image_path: `http://localhost:8000/static/${response.data.track_image_path}`,
                artist_id: response.data.artists[0].id,
                artist_name: response.data.artists[0].name,
                artist_image_path: `http://localhost:8000/static/${response.data.artists[0].artist_image_path}`,
                album: response.data.album,
                categories: response.data.categories.map((categorie) => ({
                    id: categorie.id,
                    name: categorie.name,
                }))
            };
            dispatch({ type: reducerCases.SET_SONG, selectedSong: selectedSong })
        };
        getSong();
        console.log(selectedSong);
    }, [dispatch]);


    const calculateTime = (sec) => {
        const minutes = Math.floor(sec / 60);
        const returnMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(sec % 60);
        const returnSec = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnMin}:${returnSec}`;
    };

    return <Container headerBackground={headerBackground}>
        {selectedSong && (
            <>
                <div className="playlist">
                    <div className="image">
                        <img src={selectedSong.track_image_path} alt={selectedSong.name}></img>
                    </div>
                    <div className="details">
                        <span className="type">Song</span>
                        <h1 className="title">{selectedSong.name}</h1>
                        <p>{selectedSong.artist_name}</p>
                    </div>
                </div>
                <div>
                    <div className="
                    ml-8
                    mt-4">
                        <button
                            className="
                                transition
                                rounded-full
                                flex
                                items-center
                                bg-green-500
                                p-4
                                drop-shadow-md
                                translate
                                translate-y-1/4
                                group-hover:opacity-100
                                group-hover:translate-y-0
                                hover:scale-110">
                            <FaPlay className="text-black"></FaPlay>
                        </button>
                    </div>
                </div>
                <div className="list">
                    <div className="header__row">
                        <div className="col">
                            <span>#</span>
                        </div>
                        <div className="col">
                            <span>TITLE</span>
                        </div>
                        <div className="col">
                            <span>ALBUM</span>
                        </div>
                        <div className="col">
                            <AiFillClockCircle />
                        </div>
                    </div>
                    {/* <div className="tracks">
                        {selectedSong.tracks.map(
                            ({
                                id,
                                name,
                                length,
                                track_image_path,
                                artist,
                                album
                            }, index) => {
                                return (
                                    <div className="row" key={id} onClick={() => changeTrack(id, token, readyToListen, dispatch)}>
                                        <div className="col">
                                            <span>{index + 1}</span>
                                        </div>
                                        <div className="col detail">
                                            <div className="image">
                                                <img src={track_image_path} alt="track" />
                                            </div>
                                            <div className="info">
                                                <span className="name">{name}</span>
                                                <span>{artist}</span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <span>{album}</span>
                                        </div>
                                        <div className="col">
                                            <span>{calculateTime(length)}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div> */}
                </div>
            </>
        )
        }
    </Container>
}

const Container = styled.div`
    .playlist {
        margin: 0 2rem;
        display: flex;
        align-items: center;
        gap: 2rem;
        .image {
            img {
                height: 15rem;
                box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
            }
        }
        .details {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            color: #e0dede;
            .title {
                color: white;
                font-size: 4rem;
            }
        }
    }
    .list {
        .header__row {
            display: grid;
            grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
            color: #dddcdc;
            margin: 1rem 0 0 0;
            position: sticky;
            top: 15vh;
            padding: 1rem 3rem;
            transition: 0.3s ease-in-out;
            background-color: ${({ headerBackground }) =>
        headerBackground ? "#000000dc" : "none"};
        }
        .tracks {
            margin: 0 2rem;
            display: flex;
            flex-direction: column;
            margin-bottom: 5rem;
            cursor: pointer;
            .row {
                padding: 0.5rem 1rem;
                display: grid;
                grid-template-columns: 0.3fr 3.1fr 2fr 0.1fr;
                &:hover {
                    background-color: rgba(0, 0, 0, 0.7);
                }
                .col {
                    display: flex;
                    align-items: center;
                    color: #dddcdc;
                    img {
                        height: 40px;
                    }
                }
                .detail {
                    display: flex;
                    gap: 1rem;
                    .info {
                        display: flex;
                        flex-direction: column;
                    }
                }
            }
        }
    }
`