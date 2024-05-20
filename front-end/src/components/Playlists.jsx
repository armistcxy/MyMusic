import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import { usePopper } from 'react-popper';
import { Link } from "react-router-dom";

export default function Playlists({ openModal }) {
  const [{ token, playlists, isAuthenticated }, dispatch] = useStateProvider();
  const [showDialog, setShowDialog] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'right',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 20],
        },
      },
    ],
  });
  useEffect(() => {
    const getPlaylistData = async () => {
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
    };
    if (token) {
      getPlaylistData();
      const intervalId = setInterval(getPlaylistData, 5000); // Cập nhật dữ liệu mỗi 3 giây
      return () => clearInterval(intervalId);
    }
  }, [token, dispatch]);

  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId: selectedPlaylistId });
  };

  const handleCreatePlaylist = () => {
    if (isAuthenticated) {
      openModal();
    } else {
      setShowDialog(true);
    }
  }

  const handleCloseDialog = () => {
    setShowDialog(false);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popperElement && !popperElement.contains(event.target)) {
        handleCloseDialog();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popperElement]);


  return <Container>
    {(playlists !== null && playlists.length !== 0) ?
      (
        <ul>
          {
            playlists.map(({ name, id }) => {
              return (
                <li key={id} onClick={() => changeCurrentPlaylist(id)} className="flex items-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1680/1680213.png"
                    alt={name}
                    className="w-8 h-8 mr-2 scale-75"
                  />
                  <Link to="lib/playlist" className="no-underline">
                    {name}
                  </Link>
                </li>
              );
            })
          }
        </ul>
      )
      : (
        <div className="your_library">
          <div className="leading-8 tertiary_bg rounded-lg py-6 px-4">
            <p className="font-bold">Create your first playlist</p>
            <p className="font-semibold">
              It's easy, we'll help you
            </p>
            <button className="rounded-full text-black mt-4 px-4 py-0 bg-white font-semibold" onClick={handleCreatePlaylist} ref={setReferenceElement}>
              Create playlist
            </button>
          </div>
        </div>
      )}
    {showDialog && (
      <div className="dialog bg-white p-4 rounded shadow-lg z-50"
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}>
        <p>You need to be logged in to create a playlist.</p>
        <Link
          to={"/login"}
          className="bg-green-500 text-white rounded-lg px-4 py-2 mr-2 hover:bg-green-600 transition-colors duration-300"
        >
          Login
        </Link>
        <button className="bg-gray-300 rounded-lg px-4 py-2 ml-2 hover:bg-gray-400 transition-colors duration-300" onClick={handleCloseDialog}>Not Now</button>
      </div>
    )}


  </Container>
}

const Container = styled.div`
  color: #b3b3b3;
  height: 100%;
  overflow: hidden;
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: 55vh;
    max-height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
    li {
      transition: 0.3s ease-in-out;
      cursor: pointer;
      &:hover {
        color: white;
      }
    }
  }
`;