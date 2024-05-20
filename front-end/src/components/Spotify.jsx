import React, { useRef, useState } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import PlayBar from "./PlayBar";
import Footer from "./Footer";

import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import { Outlet, useNavigate } from "react-router-dom";
import CreatePlaylistModal from "./CreatePlaylistModal";
import DeletePlaylistBox from "./DeletePlaylistBox";

export default function Spotify() {
    const [{ token, isOpenDeletePlaylist, selectedPlaylistId }, dispatch] = useStateProvider();
    const bodyRef = useRef();
    // const [navBackground, setNavBackground] = useState(false);
    // const [headerBackground, setHeaderBackground] = useState(false);
    const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);
    const navigate = useNavigate();
    // const bodyScrolled = () => {
    //     bodyRef.current.scrollTop >= 30
    //         ? setNavBackground(true)
    //         : setNavBackground(false);
    //     bodyRef.current.scrollTop >= 268
    //         ? setHeaderBackground(true)
    //         : setHeaderBackground(false); 
    // }

    const deleteThisPlaylist = async (id_playlist) => {
        await axios.delete(
            `http://localhost:8000/playlists/${id_playlist}`,
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            }
        );

        const response = await axios.get(
            'http://localhost:8000/playlists/me',
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            }
        );
        const items = response.data;
        const playlists = items.map(({ name, id }) => {
            return { name, id };
        });
        dispatch({ type: reducerCases.SET_PLAYLISTS, playlists: playlists });
        dispatch({ type: reducerCases.SET_ISOPEN_DELETE_PLAYLIST, isOpenDeletePlaylist: false })
        navigate('/lib');
    }

    return (
        <Container >
            {createPlaylistModalOpen && (
                <CreatePlaylistModal
                    closeModal={() => {
                        setCreatePlaylistModalOpen(false);
                    }}
                />
            )}
            {isOpenDeletePlaylist && (
                <DeletePlaylistBox
                    closeModal={() => {
                        dispatch({ type: reducerCases.SET_ISOPEN_DELETE_PLAYLIST, isOpenDeletePlaylist: false })
                    }}
                    deletePL={() => {
                        deleteThisPlaylist(selectedPlaylistId);
                    }} />
            )
            }
            <div className="spotify_body">
                <Sidebar openModal={() => {
                    setCreatePlaylistModalOpen(true);
                }} />
                <div className="body" ref={bodyRef} >{/*onScroll={bodyScrolled}*/}
                    <Navbar />{/*navBackground={navBackground}*/}
                    <div className="body_contents">
                        <Outlet />
                        <Footer />
                    </div>
                </div>
            </div>
            <div className="spotify_play_bar">
                <PlayBar />
            </div>
        </Container>
    )
}
// background: linear-gradient(transparent, rgba(0, 0, 0, 1));background-color: #171717;
const Container = styled.div`
        max-width: 100vw;
        max-height: 100vh;
        overflow: hidden;
        display: grid;
        grid-template-rows: 88vh 12vh;
        .spotify_body {
            display: grid;
            grid-template-columns: 15vw 85vw;
            height: 100%;
            width: 100%;
            background-color: rgb(23 23 23);
            .body {
                height: 100%;
                width: 100%;
                overflow: auto;
                &::-webkit-scrollbar {
                    width: 0.7rem;
                    &-thumb {
                        background-color: rgba(255, 255, 255, 0.6);
                    }
                }
            }
        }
        `
    ;