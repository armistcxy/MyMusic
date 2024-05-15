import React from "react";
import styled from "styled-components";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import { IoLibrary } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";
import Playlists from "./Playlists";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Sidebar({openModal}) {

    useEffect(() => {
        const allLi = document
            .querySelector(".top_links ul")
            .querySelectorAll("li");

        function changeMenuActive() {
            allLi.forEach((n) => n.classList.remove("active"));
            this.classList.add("active");
        }
        allLi.forEach((n) => n.addEventListener("click", changeMenuActive))
    }, []);

    return (
        <Container>
            <div className="top_links">
                <div className="logo">
                    <img
                        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
                        alt="spotify"
                    />
                </div>
                <ul>
                    <li>
                        <Link to="/" className="link">
                            <MdHomeFilled />
                            <span>Home</span>
                        </Link>

                    </li>
                    <li>
                        <Link to="search" className="link">
                            <MdSearch />
                            <span>Search</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="lib" className="link">
                            <IoLibrary />
                            <span>Your Library</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <Playlists openModal={openModal}/>
            <div className="mt-4 px-4 grid grid-cols-2 gap-4 text-left">
                <button className="text-xs text-gray-300 mx-4 focus:outline-none text-left">
                    Legal
                </button>
                <button className="text-xs text-gray-300 mx-4 focus:outline-none text-left">
                    Center
                </button>
                <button className="text-xs text-gray-300 mx-4 focus:outline-none text-left">
                    Policy
                </button>
                <button className="text-xs text-gray-300 mx-4 focus:outline-none text-left">
                    Cookies
                </button>
                <button className="text-xs text-gray-300 mx-4 focus:outline-none text-left">
                    About Ads
                </button>
                <button className="text-xs text-gray-300 mx-4 focus:outline-none text-left">
                    Accessibility
                </button>
            </div>


            <button className="mx-4 mt-4 text-sm border-white border rounded-full flex gap-2 px-3 py-1 items-center  text-white ">
                <TbWorld />
                <span className="text-white font-bold">English</span>
            </button>

        </Container>
    );
}

const Container = styled.div`
    background-color: black;
    color: #b3b3b3;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    .top_links {
        display: flex;
        flex-direction: column;
        .logo {
            text-align: center;
            margin: 1rem 10px;
            img {
                max-inline-size: 80%;
                block-size: auto;
            }
        }
        ul {
            list-style-type: none;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
            li {
                display: flex;
                gap: 1rem;
                cursor: pointer;
                transition: 0.2s ease-in-out;
                &.active {
                    color: white;
                }
                &:hover {
                    color: white;
                }
                .link {
                    align-items: center;
                    display: flex;
                    gap: 1rem;
                }
            }
        }
    }
`;