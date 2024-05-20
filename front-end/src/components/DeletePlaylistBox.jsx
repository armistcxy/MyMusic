import { useStateProvider } from "../utils/StateProvider"

export default function DeletePlaylistBox({ closeModal, deletePL }) {
    const [{ selectedPlaylist }] = useStateProvider();

    return (
        <div className="fixed top-0 left-0 bg-black bg-opacity-60 right-0 bottom-0 flex items-center justify-center z-50">
            <div className="w-80 h-60 gap-10 bg-purple-600 bg-opacity-90 p-8 rounded-md shadow-md flex flex-col items-center justify-center">
                <p className="text-xl text-white font-semibold mb-4">Delete {selectedPlaylist.playlist_name} playlist?</p>
                <div className="flex justify-center flex-row gap-8">
                    <button className="bg-gray-400 text-white px-4 py-2 hover:scale-110 rounded-md mr-2" onClick={closeModal}>No</button>
                    <button className="bg-red-500 text-white px-4 py-2 hover:scale-110 rounded-md" onClick={deletePL}>Yes</button>
                </div>
            </div>
        </div>
    )
}