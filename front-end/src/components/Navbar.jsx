import React, {useState} from "react";
import styled from "styled-components";
import {
    FaAngleLeft,
    FaAngleRight,
    FaExternalLinkAlt,
    FaSearch,
    FaUser,
  } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";

export default function Navbar({navBackground}) {
    const [{ isAuthenticated}, dispatch] = useStateProvider();
    const location = useLocation();
    const [query, setQuery] = useState("");

    const [showDropDown, setShowDropDown] = useState(false);
    const navigate = useNavigate();

    const logoutUser = () => {
        localStorage.removeItem('token')
        navigate('/login')
        dispatch({
            type: reducerCases.SET_USER_LOGGED_OUT,
        });
    }

    return (
        <Container className="flex sticky top-0 z-50 justify-between ml-2 rounded-[6px]  mt-2 px-8 secondary_bg items-center ">
          <div className="flex gap-2 items-center  w-1/2">
            <FaAngleLeft className="bg-white/10 text-3xl p-1  rounded-[50%] " />
            <FaAngleRight className="bg-white/10 text-3xl p-1  rounded-[50%] " />
            <div
              className={`${
                location.pathname !== "/search" ? "opacity-0" : ""
              } w-full text-left py-4 relative`}
            >
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Search"
                autoComplete="off"
                value={query}
                // onChange={filterSongs}
                className={`block  w-full rounded-full pl-12 border-0  text-gray-300 shadow-sm ring ring-transparent placeholder:text-gray-400 focus:ring-[3px] focus:ring-inset focus:ring-white outline-none p-3 hover:ring-white/20 bg-[#1a1919]`}
              />
              <FaSearch className="absolute left-4 top-8" style={{ color: 'white' }}/>
            </div>
          </div>
    
          <div>
            {!isAuthenticated ? (
              <div>
                <Link
                  to={"/register"}
                  className="rounded-full  mt-4 px-8 text-base  py-2 text-gray-500 font-semibold hover:text-white hover:font-bold transition-all duration-200"
                >
                  Sign up
                </Link>
    
                <Link
                  to={"/login"}
                  className="rounded-full text-black mt-4 px-8 text-base  py-3 bg-gray-300 font-semibold hover:bg-white hover:font-bold transition-all duration-200"
                >
                  Log in
                </Link>
              </div>
            ) : (
              <div className="relative ">
                <button onClick={() => setShowDropDown(!showDropDown)}>
                  <FaUser />
                </button>
                {showDropDown && (
                  <div className="absolute dropdown bg-[#282828] top-8 text-sm right-0 w-[12rem]">
                    <ul className="p-1">
                      <li className="">
                        <Link
                          className="flex p-2 justify-between hover:bg-white/10"
                          to={"/account"}
                        >
                          <span>Account</span> <FaExternalLinkAlt />
                        </Link>{" "}
                      </li>
                      <li className="">
                        <Link
                          className="flex p-2 justify-between hover:bg-white/10"
                          to={"/account"}
                        >
                          <span>Profile</span>{" "}
                        </Link>{" "}
                      </li>
                      <li className="">
                        <Link
                          className="flex p-2 justify-between hover:bg-white/10"
                          to={"/account"}
                        >
                          <span>Upgrade to Premium</span> <FaExternalLinkAlt />
                        </Link>{" "}
                      </li>
                      <li className="">
                        <Link
                          className="flex p-2 justify-between hover:bg-white/10"
                          to={"/account"}
                        >
                          <span>Settings</span>
                        </Link>{" "}
                      </li>
                      <li className="">
                        <button
                          onClick={logoutUser}
                          className="p-2 w-full text-left border-t border-white/10  hover:bg-white/10"
                        >
                          <span>Log out</span>
                        </button>{" "}
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </Container>
      );
    };

    const Container = styled.div``;
// const Container = styled.div`
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 2rem;
//     height: 15vh;
//     position: sticky;
//     top: 0;
//     transition: 0.3s ease-in-out;
//     background-color: ${({navBackground}) => 
//         navBackground ? "rgba(0, 0, 0, 0.7)" : "none"};
//     .search__bar {
//         background-color: white;
//         width: 30%;
//         padding: 0.4rem 1rem;
//         border-radius: 2rem;
//         display: flex;
//         align-items: center;
//         gap: 0.5rem;
//         input {
//             border: none;
//             height: 2rem;
//             width: 100%;
//             &:focus {
//                 outline: none;
//             }
//         }
//     }
//     .avatar {
//         background-color: black;
//         padding: 0.3rem 0.4rem;
//         padding-right: 1rem;
//         border-radius: 2rem;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         a {
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             gap: 0.5rem;
//             text-decoration: none;
//             color: white;
//             font-weight: bold;
//             svg {
//                 font-size: 1.3rem;
//                 backgroud-color: #282828;
//                 padding: 0.2rem;
//                 border-radius: 1rem;
//                 color: #c7c5c5;
//             }
//         }
//     }
// `;