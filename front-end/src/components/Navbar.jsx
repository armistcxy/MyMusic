import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  FaAngleLeft,
  FaAngleRight,
  FaExternalLinkAlt,
  FaSearch,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { toast } from "react-toastify";

export default function Navbar() {
  const [{ token, userInfo, isAuthenticated }, dispatch] = useStateProvider();
  const location = useLocation();
  const [query, setQuery] = useState("");

  const [showDropDown, setShowDropDown] = useState(false);
  const navigate = useNavigate();

  const setFilter = (e) => {
    setQuery(e.target.value);
    const value = e.target.value;
    getFilter(value);
  }
  useEffect(() => {
    if (query === "") {
      dispatch({ type: reducerCases.SET_QUERY, isQuery: false });
    }
    else dispatch({ type: reducerCases.SET_QUERY, isQuery: true });
  }, [query, dispatch]);
  useEffect(() => {
    if (location.pathname !== "/search") {
      setQuery("");
      dispatch({ type: reducerCases.SET_FILTER, filterItems: [[], [], []] });
    }
  }, [location.pathname, dispatch]);

  const getFilter = async (query) => {
    if (query !== "") {
      console.log(query);
      const response = await axios.get(
        `http://localhost:8000/search/${query}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const fil = response.data;
      dispatch({ type: reducerCases.SET_FILTER, filterItems: fil });
    } else
      dispatch({ type: reducerCases.SET_FILTER, filterItems: [[], [], []] });
  }

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(
        'http://localhost:8000/users/profile',
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: reducerCases.SET_USER, userInfo: response.data });
    };
    if (token) {
      getUser();
    }
  }, [token, dispatch]);

  const logoutUser = () => {
    dispatch({ type: reducerCases.SET_TOKEN, token: null });
    dispatch({ type: reducerCases.SET_PLAYLISTS, playlists: null });
    dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: false });
    dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist: null });
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId: null });
    dispatch({
      type: reducerCases.USER_LOGGED_OUT,
    });
    window.location.reload();
    navigate('/');
    toast.success("You logged out! See you later.");
  }

  return (
    <Container className="flex sticky bg-neutral-900 top-0 justify-between ml-2 rounded-[6px] pt-2 px-8 secondary_bg items-center z-[10]">
      <div className="flex gap-2 items-center  w-1/2">
        <FaAngleLeft className="bg-white/10 text-3xl p-1  rounded-[50%] " />
        <FaAngleRight className="bg-white/10 text-3xl p-1  rounded-[50%] " />
        <div
          className={`${location.pathname !== "/search" ? "opacity-0" : ""
            } w-full text-left py-4 relative`}
        >
          <input
            type="text"
            id="username"
            name="username"
            placeholder="What do you want to play?"
            autoComplete="off"
            value={query}
            onChange={setFilter}
            className={`block  w-full rounded-full pl-12 border-0  text-gray-300 shadow-sm ring ring-transparent placeholder:text-gray-400 focus:ring-[3px] focus:ring-inset focus:ring-white outline-none p-3 hover:ring-white/20 bg-[#0f0f0f]`}
          />
          <FaSearch className="absolute left-4 top-8" style={{ color: 'white' }} />
        </div>
      </div>

      <div>
        {!isAuthenticated ? (
          <div>
            <Link
              to={"/register"}
              className="rounded-full mt-4 px-8 text-base py-2 text-gray-300 font-semibold hover:text-white hover:font-bold transition-all duration-200"
            >
              Sign up
            </Link>

            <Link
              to={"/login"}
              className="rounded-full text-black mt-4 px-8 text-base py-3 bg-gray-300 font-semibold hover:bg-white hover:font-bold transition-all duration-200"
            >
              Log in
            </Link>
          </div>
        ) : (
          <div className="relative flex items-center gap-2">
            <button onClick={() => setShowDropDown(!showDropDown)} className="flex items-center gap-2">
              <CgProfile className="text-white scale-[2.0] mr-3" />
              <span className="text-white font-bold">{userInfo?.username}</span>
            </button>
            {showDropDown && (
              <div className="absolute dropdown bg-[#282828] top-8 text-white right-0 w-[12rem]">
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
                      <span style={{ color: 'red' }}>Log out</span>
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