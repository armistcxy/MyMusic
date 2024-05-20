import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import { TiDownload, TiPlusOutline } from "react-icons/ti";
import { toast } from "react-toastify";

// Define the changeTrack function outside of the component
export const changeTrack = async (id, token, readyToListen, dispatch, song = null) => {
    if (song) {
        const currentPlaying = {
            id: song.id,
            name: song.name,
            artists: song.artists.map((artist) => artist.name),
            image: `http://localhost:8000/static/${song.track_image_path}`,
            song: song.song,
        };
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: false });
        dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: currentPlaying });
        if (!readyToListen) {
            dispatch({ type: reducerCases.SET_READY, readyToListen: true });
        }
    }
    else {
        await axios.put(
            `http://localhost:8000/users/me/now/${id}`,
            {},
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            }
        );
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: false });
        getCurrentTrack(token, dispatch); // Call getCurrentTrack after changing the track
        if (!readyToListen) {
            dispatch({ type: reducerCases.SET_READY, readyToListen: true });
        }
    }
};

export const addTrackToPlaylist = async (token, newTrackId, playlistId) => {
    const response = await axios.get(
        `http://localhost:8000/playlists/${playlistId}`,
        {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
        }
    );
    const curTrack = response.data.tracks.map((track) =>
        track.id
    );
    await axios.patch(
        `http://localhost:8000/playlists/${playlistId}`,
        {
            "track_id_list": [
                ...curTrack,
                newTrackId
            ]
        },
        {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
        }
    );
};

export const downloadAudio = (link) => {
    const audioUrl = link; 

    axios({
      url: audioUrl,
      method: 'GET',
      responseType: 'blob', 
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', url.substring(url.lastIndexOf('/') + 1));
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    }).catch(error => {
      console.error('Lỗi khi tải xuống tệp âm thanh:', error);
    });
  };

const getCurrentTrack = async (token, dispatch) => {
    try {
        const response = await axios.get(
            "http://localhost:8000/users/me/last",
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            }
        );
        if (response.data !== "") {
            const currentPlaying = {
                id: response.data.id,
                name: response.data.name,
                artists: response.data.artists.map((artist) => artist.name),
                image: `http://localhost:8000/static/${response.data.track_image_path}`,
                song: `http://localhost:8000/${response.data.audio_url}`,
            };
            dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: currentPlaying });
        } else {
            dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
        }
    } catch (error) {
        console.error('Error fetching newest songs:', error);
    }
};

export default function CurrentTrack() {
    const [{ token, currentPlaying }, dispatch] = useStateProvider();
    const [showPlaylists, setShowPlaylists] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const playlistRef = useRef();
    useEffect(() => {
        if (token) {
            getCurrentTrack(token, dispatch);
            fetchPlaylists();
        }
    }, [token, dispatch]);

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
        setShowPlaylists(!showPlaylists);
        fetchPlaylists();
    };


    return (
        <Container>
            {currentPlaying && currentPlaying.id && (
                <div className="track">
                    <div className="track__image">
                        <img src={currentPlaying?.image} alt="currentPlaying" />
                    </div>
                    <div className="track__info">
                        <h4 className="track__info__track__name">{currentPlaying?.name}</h4>
                        <h6 className="track__info__track__artists">
                            {currentPlaying?.artists?.join(", ")}
                        </h6>
                    </div>
                    <div className="playlist-icon">
                        {token ? <TiPlusOutline onClick={togglePlaylists} /> : <></>}
                        {showPlaylists && (
                            <PlaylistContainer ref={playlistRef} >
                                <ul>
                                    {playlists.map((playlist) => (
                                        <li key={playlist.id} onClick={() => { addTrackToPlaylist(token, currentPlaying.id, playlist.id); setShowPlaylists(false); toast.success("Add successfully") }}><span>{playlist.name}</span></li>
                                    ))}
                                </ul>
                            </PlaylistContainer>
                        )}
                    </div>
                    {token ? <TiDownload onClick={() => {downloadAudio(currentPlaying.song)}}/> : <></>}
                </div>
            )}
        </Container>
    );
}

const Container = styled.div`
    .track {
        display: flex;
        align-items: center;
        gap: 1rem;
        position: relative;
        &__image {
        }
        &__info {
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
            &__track__name {
                color: white;
            }
            &__track__artists {
                color: #b3b3b3;
            }
        }
        svg {
            color: #b3b3b3;
            transition: 0.2s ease-in-out;
            transform: translateY(-6px) translateX(5px) scale(1.5);
            &:hover {
                color: #1db954;
            }
        }
        .playlist-icon {
            position: relative;
        }
    }
`;

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