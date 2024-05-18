import React, { useEffect } from "react";
import styled from "styled-components";
import { AiFillClockCircle } from "react-icons/ai";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { type } from "@testing-library/user-event/dist/type";
import reducer from "../utils/Reducer";
import { reducerCases } from "../utils/Constants";
import { Routes, Route } from "react-router-dom";
import Library from "./Library";
import Home from "./Home";
import Search from "./Search";

export default function PlaylistSelected({ headerBackground }) {
    const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch] = useStateProvider();

    useEffect(() => {
        const getInitialPlaylist = async () => {
            const response = await axios.get(
                `http://localhost:8000/playlists/${selectedPlaylistId}`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                }
            );
                console.log(response);
            const selectedPlaylist = {
                id: response.data.id,
                playlist_name: response.data.name,
                user_id: response.data.user.id,
                user_name: response.data.user.username,
                tracks: response.data.tracks.map(( track ) => ({
                    id: track.id,
                    name: track.name,
                    length: track.length,
                    track_image_path: `http://localhost:8000/static/${track.track_image_path}`,
                })),
            };
            dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist: selectedPlaylist })
        };
        if (token) {
            getInitialPlaylist();
        }
    }, [token, dispatch, selectedPlaylistId]);



    // useEffect(() => {
    //     const getInitialPlaylist = async () => {
    //         const response = await axios.get(
    //             `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`, 
    //             {
    //                 headers: {
    //                     Authorization: "Bearer " + token,
    //                     "Content-Type": "application/json",
    //                 },
    //             }
    //         );

    //         const selectedPlaylist = {
    //             id: response.data.id,
    //             name: response.data.name,
    //             description: response.data.description.startsWith("<a")
    //                 ? ""
    //                 : response.data.description,
    //                 image: response.data.images[0].url,
    //                 tracks: response.data.tracks.items.map(({ track }) => ({
    //                     id: track.id,
    //                     name: track.name,
    //                     artists: track.artists.map((artist) => artist.name),
    //                     image: track.album.images[2].url,
    //                     duration: track.duration_ms,
    //                     album: track.album.name,
    //                     context_uri: track.album.uri,
    //                     track_number: track.track_number, 
    //                 })),
    //         };
    //         dispatch({type: reducerCases.SET_PLAYLIST, selectedPlaylist})
    //     };
    //     getInitialPlaylist();
    // }, [token, dispatch, selectedPlaylistId]);

    // const playTrack = async (
    //     id,
    //     name,
    //     artists,
    //     image,
    //     context_uri,
    //     track_number
    //   ) => {
    //     const response = await axios.put(
    //         `https://api.spotify.com/v1/me/player/play`,
    //         {
    //           context_uri,
    //           offset: {
    //             position: track_number - 1,
    //           },
    //           position_ms: 0,
    //         },
    //         {
    //           headers: {
    //             "Content-Type": "application/json",
    //             Authorization: "Bearer " + token,
    //           },
    //         }
    //     );
    //     if (response.status === 204) {
    //         const currentPlaying = {
    //             id,
    //             name,
    //             artists,
    //             image,
    //         };
    //         dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
    //         dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    //     } else {
    //         dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    //     }
    //   }

    const msToMinutesAndSeconds = (ms) => {
        var minutes = Math.floor(ms / 60000);
        var seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    };

    return <Container headerBackground={headerBackground}>
        {selectedPlaylist && (
            <>
                <div className="playlist">
                    <div className="image">
                        <img src={selectedPlaylist.tracks.length !== 0 ? selectedPlaylist.tracks[0].track_image_path : "https://www.gravatar.com/avatar/?fbclid=IwAR1Eib3mYRBaVR1_aYmz-RBx35wCvLvdxonshz_futx0MMykIZbxbZQIy1U"} alt={selectedPlaylist.playlist_name}></img>
                    </div>
                    <div className="details">
                        <span className="type">PLAYLIST</span>
                        <h1 className="title">{selectedPlaylist.playlist_name}</h1>
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
                    <div className="tracks">
                        {selectedPlaylist.tracks.map(
                            ({
                                id,
                                name,
                                length,
                                track_image_path,
                            }, index) => {
                                return (
                                    <div className="row" key={id} /*onClick={() => playTrack()}*/>
                                        <div className="col">
                                            <span>{index + 1}</span>
                                        </div>
                                        <div className="col detail">
                                            <div className="image">
                                                <img src={track_image_path} alt="track" />
                                            </div>
                                            <div className="info">
                                                <span className="name">{name}</span>
                                                <span>Name Artist: Null</span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <span>Album: Null</span>
                                        </div>
                                        <div className="col">
                                            <span>{msToMinutesAndSeconds(length)}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
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