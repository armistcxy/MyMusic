import { FaPlay } from "react-icons/fa"
import { useStateProvider } from "../utils/StateProvider"
import { useEffect } from "react";
import axios from "axios";
import { reducerCases } from "../utils/Constants";

export default function PlaylistItem({ data }) {
    const [{ userInfo }] = useStateProvider();

    const [{ token, selectedPlaylist }, dispatch] = useStateProvider();

    useEffect(() => {
        const getInitialPlaylist = async () => {
            const response = await axios.get(
                `http://localhost:8000/playlists/${data.id}`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                }
            );

            const selectedPlaylist = {
                tracks: response.data.tracks.map(( track ) => ({
                    track_image_path: `http://localhost:8000/static/${track.track_image_path}`,
                })),
            };
            dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist: selectedPlaylist })
        };
        if (token) {
            getInitialPlaylist();
        }
    }, [token, dispatch, data.id]);

    return (
        <div
            onClick={() => { }}
            className="
        relative
        group
        flex
        flex-col
        items-center
        justify-center
        rounded-md
        overflow-hidden
        gap-x-4
        bg-neutral-400/5
        cursor-pointer
        hover:bg-neutral-400/10
        transition
        p-3">
            <div className="
                relative
                aspect-square
                w-full
                h-full
                rounded-md
                overflow-hidden">
                <img
                    className="object-cover"
                    src={selectedPlaylist.tracks.length !== 0 ? selectedPlaylist.tracks[0].track_image_path : "https://www.gravatar.com/avatar/?fbclid=IwAR1Eib3mYRBaVR1_aYmz-RBx35wCvLvdxonshz_futx0MMykIZbxbZQIy1U"}
                    alt={data.name}>
                </img>
            </div>
            <div className="flex flex-col items-start w-full pt-4 gap-y-1">
                <p className="text-neutral-100 text-lg font-semibold truncate w-full">{data.name}</p>
                <p className="text-neutral-400 text-smpb-4 w-full truncate">By {userInfo?.username}</p>
                <div className="
                absolute
                bottom-24
                right-5">
                    <button
                        className="
                            transition
                            opacity-0
                            rounded-full
                            flex
                            items-center
                            bg-green-500
                            p-4
                            drop-shadow-md
                            translate
                            translate-y-1/4
                            group-hover:opacity-100
                            group-hover:translate-y-0
                            hover:scale-110">
                        <FaPlay className="text-black"></FaPlay>
                    </button>
                </div>
            </div>
        </div>
    )
}