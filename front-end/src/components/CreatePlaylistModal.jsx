import { useState } from "react";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreatePlaylistModal({ closeModal }) {
    const [{ token }] = useStateProvider();
    const [playlistName, setPlaylistName] = useState("");
    const [playlistDescription, setPlaylistDescription] = useState("");

    const createPlaylist = async () => {
        try {
            if (playlistName !== "") {
                const response = await axios.post(
                    "http://localhost:8000/playlists",
                    { name: playlistName },
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.status === 200) {
                    closeModal();
                    toast.success("Create successfully");
                }
            }
            else {
                toast.error("You need to fill playlist name");
            }
        } catch (error) {
            toast.error("You already have playlist with this name");
        }
    };


    return (
        <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center z-20"
            onClick={closeModal}
        >
            <div className="bg-purple-600 rounded-lg p-4 bg-opacity-90">
                <div
                    className="bg-app-black w-80 rounded-md p-8"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div className="text-white text-2xl mb-5 font-bold">
                        Create Playlist
                    </div>
                    <div className="space-y-4">
                        <div className="textInputDiv">
                            <label htmlFor="Name" className="font-semibold text-white">
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder="Playlist Name"
                                className="p-3 border border-gray-400 border-solid rounded placeholder-gray-500 w-full"
                                id="Name"
                                value={playlistName}
                                onChange={(e) => {
                                    setPlaylistName(e.target.value);
                                }}
                            />
                        </div>
                        <div className="textInputDiv">
                            <label htmlFor="Description" className="font-semibold text-white">
                                Description
                            </label>
                            <input
                                type="text"
                                placeholder="Description"
                                className="p-3 border border-gray-400 border-solid rounded placeholder-gray-500 w-full"
                                id="Description"
                                value={playlistDescription}
                                onChange={(e) => {
                                    setPlaylistDescription(e.target.value);
                                }}
                            />
                        </div>
                        <div
                            className="bg-white rounded flex font-semibold justify-center items-center py-3 cursor-pointer"
                            onClick={createPlaylist}
                        >
                            Create
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}