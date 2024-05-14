import { reducerCases } from "./Constants";

export const initialState = {
    token: null,
    user: {},
    isAuthenticated: false,
    playlists: [],
    userInfo: null,
    selectedPlaylistId: "3AnJMxvBGp1QXMQv06AwTi", // Q: 7qimTUDzmrsBjZSrpCJPCH     K:3AnJMxvBGp1QXMQv06AwTi
    selectedPlaylist: null,
    currentPlaying: null,
    playerState: false,
    volume: 0.75,
};

const reducer = (state, action) => {
    switch (action.type) {
        case reducerCases.SET_TOKEN: {
            return {
                ...state,
                token: action.token,
            }
        }
        case reducerCases.SET_PLAYLISTS: {
            return {
                ...state,
                playlists: action.playlists,
            }
        }
        case reducerCases.SET_PLAYLIST: {
            return {
                ...state,
                selectedPlaylist: action.selectedPlaylist,
            }
        }
        case reducerCases.SET_USER: {
            return {
                ...state,
                userInfo: action.userInfo,
            }
        }
        case reducerCases.SET_PLAYING: {
            return {
                ...state,
                currentPlaying: action.currentPlaying,
            }
        }
        case reducerCases.SET_PLAYER_STATE: {
            return {
                ...state,
                playerState: action.playerState,
            }
        }
        case reducerCases.SET_PLAYLIST_ID: {
            return {
                ...state,
                selectedPlaylistId: action.selectedPlaylistId,
            }
        }
        case reducerCases.SET_VOLUME: {
            return {
                ...state,
                volume: action.volume,
            }
        }
        case reducerCases.USER_LOGGED_IN: {
            return { ...state, user: action.payload, isAuthenticated: true };
        }
        case reducerCases.USER_LOGGED_OUT: {
            return { ...state, user: {}, isAuthenticated: false };
        }
        default:
            return state;
    }
};

export default reducer;