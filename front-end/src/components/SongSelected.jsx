import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import { FaPlay } from "react-icons/fa";
import { changeTrack, downloadAudio } from "./CurrentTrack";
import { TiDownload, TiPlusOutline } from "react-icons/ti";
import { toast } from "react-toastify";
import { addTrackToPlaylist } from "./CurrentTrack";

export default function SongSelected({ headerBackground }) {
    const [{ token, selectedSongId, selectedSong, readyToListen, currentPlaying }, dispatch] = useStateProvider();
    const [showPlaylists, setShowPlaylists] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const playlistRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (playlistRef.current && !playlistRef.current.contains(event.target)) {
                setShowPlaylists(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const fetchPlaylists = async () => {
        const response = await axios.get("http://localhost:8000/playlists/me", {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
        });
        setPlaylists(response.data);
    };

    const togglePlaylists = () => {
        setShowPlaylists(!showPlaylists); fetchPlaylists();
    };

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
                track_image_path: response.data.track_image_path,
                song: `http://localhost:8000/${response.data.audio_url}`,
                artist_id: response.data.artists[0].id,
                artist_name: response.data.artists[0].name,
                artists: response.data.artists,
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
    }, [selectedSongId, dispatch]);


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
                        <img src={`http://localhost:8000/static/${selectedSong.track_image_path}`} alt={selectedSong.name}></img>
                    </div>
                    <div className="details">
                        <span className="type">Song</span>
                        <h1 className="title">{selectedSong.name}</h1>
                        <p>{selectedSong.artist_name}</p>
                    </div>
                </div>
                <div>
                    <div className="ml-8 mt-4 flex items-center space-x-4">
                        <button
                            className="transition rounded-full flex items-center justify-center bg-green-500 p-3 drop-shadow-md transform-gpu hover:scale-110"
                            onClick={() => {
                                dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: false });
                                changeTrack(selectedSong.id, null, readyToListen, dispatch, selectedSong);
                            }}
                        >
                            <FaPlay className="text-black" />
                        </button>
                        <div className="playlist-icon relative">
                            {token && (
                                <TiPlusOutline
                                    className="text-white scale-150 transition duration-300 hover:text-green-500"
                                    onClick={togglePlaylists}
                                />
                            )}
                            {showPlaylists && (
                                <PlaylistContainer ref={playlistRef}>
                                    <ul className="text-white">
                                        {playlists.map((playlist) => (
                                            <li
                                                key={playlist.id}
                                                onClick={() => {
                                                    addTrackToPlaylist(token, currentPlaying.id, playlist.id);
                                                    setShowPlaylists(false);
                                                    toast.success("Add successfully");
                                                }}
                                            >
                                                <span>{playlist.name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </PlaylistContainer>
                            )}
                        </div>
                        {token && (
                            <TiDownload
                                className="text-white scale-150 transition duration-300 hover:text-green-500"
                                onClick={()=>{downloadAudio(selectedSong.song)}}
                            />
                        )}
                    </div>
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
        margin: 0 0 3rem 0;
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

const PlaylistContainer = styled.div`
    position: absolute;
    left: 30px;
    top: -150px; 
    right: -150px; 
    background-color: #282828;
    border: 1px solid #b3b3b3;
    padding: 10px;
    border-radius: 5px;
    z-index: 10;
    max-width: 500px; 
    overflow-x: auto; 
    max-height: 150px; 
    overflow-y: auto; 
    &::-webkit-scrollbar {
        width: 0.7rem;
        &-thumb {
            background-color: rgba(255, 255, 255, 0.6);
        }
    }
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap; 
    }
    li {
        padding: 5px 10px;
        color: white;
        span {
            background-color: #808080; /* Màu xám cho nền */
            padding: 3px 5px; /* Tăng độ rộng và chiều cao của padding để bao quanh chữ */
            border-radius: 3px; /* Làm mịn các góc */
        }
        &:hover {
            color: #1db954;
            cursor: pointer;
        }
    }
`;