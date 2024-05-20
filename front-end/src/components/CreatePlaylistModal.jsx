import { useState } from "react";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreatePlaylistModal({ closeModal }) {
    const [{token},dispatch] = useStateProvider();
    const [playlistName, setPlaylistName] = useState("");
    const [playlistThumbnail, setPlaylistThumbnail] = useState("");

    const createPlaylist = async () => {
        try{const response = await axios.post(
            "http://localhost:8000/playlists",
            {name: playlistName},
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            }
        );
        if (response.status == 200) {
            closeModal();
        }} catch (error) {
            toast.error("You already have playlist with this name");
        }
    };


    return (
        <div
            className="fixed bg-black w-screen h-screen bg-opacity-60 flex justify-center items-center z-[20]"
            onClick={closeModal}
        >
            <div
                className="bg-app-black w-1/3 rounded-md p-8"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="text-white mb-5 font-semibold text-lg">
                    Create Playlist
                </div>
                <div className="space-y-4 flex flex-col justify-center items-center">
                    <div
                        className="textInputDiv flex flex-col space-y-2 w-full"
                    >
                        <label for="Name" className={"font-semibold text-white"}>
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Playlist Name"
                            className="p-3 border border-gray-400 border-solid rounded placeholder-gray-500"
                            id="Name"
                            value={playlistName}
                            onChange={(e) => {
                                setPlaylistName(e.target.value);
                            }}
                        />
                    </div>
                    <div
                        className={`textInputDiv flex flex-col space-y-2 w-full`}
                    >
                        <label for="Thumbnail" className="font-semibold text-white">
                            Thumnail
                        </label>
                        <input
                            type="text"
                            placeholder="Thumbnail"
                            className="p-3 border border-gray-400 border-solid rounded placeholder-gray-500"
                            id="Thumbnail"
                            value={playlistThumbnail}
                            onChange={(e) => {
                                setPlaylistThumbnail(e.target.value);
                            }}
                        />
                    </div>
                    <div
                        className="bg-white w-1/3 rounded flex font-semibold justify-center items-center py-3 mt-4 cursor-pointer"
                        onClick={createPlaylist}
                    >
                        Create
                    </div>
                </div>
            </div>
        </div>
    );
}