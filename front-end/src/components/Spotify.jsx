import React, { useEffect, useContext, useRef, useState } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Body from "./Body";
import PlayBar from "./PlayBar";
import Footer from "./Footer";

import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { AuthProvider } from "./context/AuthProvider";
import { reducerCases } from "../utils/Constants";
import { Outlet } from "react-router-dom";
import CreatePlaylistModal from "./CreatePlaylistModal";

export default function Spotify() {
    const [{ token }, dispatch] = useStateProvider();
    const bodyRef = useRef();
    const [navBackground, setNavBackground] = useState(false);
    const [headerBackground, setHeaderBackground] = useState(false);
    const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);
    const bodyScrolled = () => {
        bodyRef.current.scrollTop >= 30
            ? setNavBackground(true)
            : setNavBackground(false);
        bodyRef.current.scrollTop >= 268
            ? setHeaderBackground(true)
            : setHeaderBackground(false);
    }

    return (
        <Container >
            <div className="spotify_body">
                {createPlaylistModalOpen && (
                    <CreatePlaylistModal className="form_create"
                        closeModal={() => {
                            setCreatePlaylistModalOpen(false);
                        }}
                    />
                )}
                <Sidebar openModal={() => {
                    setCreatePlaylistModalOpen(true);
                }} />
                <div className="body" ref={bodyRef} onScroll={bodyScrolled}>

                    <Navbar navBackground={navBackground} />
                    <div className="body_contents">
                        <Outlet>
                            <Body headerBackground={headerBackground} />
                        </Outlet>
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
            position: relative;
            display: grid;
            grid-template-columns: 15vw 85vw;
            height: 100%;
            width: 100%;
            background-color: rgb(23 23 23);
            .form_create {
            }
            .body {
                height: 100%;
                width: 100%;
                overflow: auto;
                position: relative;
                &::-webkit-scrollbar {
                    width: 0.7rem;
                    &-thumb {
                        background-color: rgba(255, 255, 255, 0.6);
                    }
                }
                .body_contents {
                    z-index: 1;
                }
                .form_create {
                    z-index: 100;
                }
            }
        }
        `
    ;