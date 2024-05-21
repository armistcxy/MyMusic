import React from "react";
import styled from "styled-components";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import { IoLibrary } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";
import Playlists from "./Playlists";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { useStateProvider } from "../utils/StateProvider";
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ openModal }) {
    const [{ isAuthenticated }] = useStateProvider();
    const navigate = useNavigate();
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
                        src="https://scontent.fhan14-5.fna.fbcdn.net/v/t1.15752-9/441091466_358428320580641_1009732377608950088_n.png?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeG87f2Pvu4UvVF5g-ul1oLfqOL04fsv4tmo4vTh-y_i2VTu9u-un7e5I2zZo8hWclsZNV9jGI1lnNAjCDBsT_eZ&_nc_ohc=BIawS0fqo-UQ7kNvgFqCpjN&_nc_ht=scontent.fhan14-5.fna&oh=03_Q7cD1QGh_VU3yg1y6pZSaOwsNfzMs5dOow7jtuThtwsoaajsgw&oe=6672E6E6"
                        alt="flotify"
                        onClick={()=>navigate('/')}
                    />
                </div>
                <ul>
                    <li className="active">
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
                </ul>
            </div>
            <div className="border-b border-white/30 w-full"></div>
            <div>
                <div className="flex items-center space-x-2 library ml-5 mt-5 relative">
                    <Link to="lib" className="flex items-center space-x-2">
                        <IoLibrary className="text-xl" />
                        <span>Your Library</span>
                    </Link>
                    {isAuthenticated && (
                        <FaPlusCircle className="text-xl hover:text-green-500 scale-125 absolute right-5" onClick={openModal} />
                    )}
                </div>
                <Playlists openModal={openModal} />
            </div>

            {!isAuthenticated && (
                <div>
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
                </div>
            )}

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