export default function DeletePlaylistBox({ closeModal, deletePL }) {
    return (
        <div className="fixed top-0 left-0 bg-black bg-opacity-60 right-0 bottom-0 flex items-center justify-center z-50">
            <div className="w-80 h-60 gap-10 bg-gray-200 p-8 rounded-md shadow-md flex flex-col items-center justify-center">
                <p className="text-lg font-semibold mb-4">Delete this playlist?</p>
                <div className="flex justify-center flex-row gap-8">
                    <button className="bg-gray-400 text-gray-800 px-4 py-2 rounded-md mr-2" onClick={closeModal}>No</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={deletePL}>Yes</button>
                </div>
            </div>
        </div>
    )
}
// {isOpenDeletePlaylist && (
//     <div className="fixed top-1/2 left-1/2 bg-black w-screen h-screen bg-opacity-60 flex justify-center items-center z-[20]">
//         <div className="bg-app-black w-1/3 rounded-md p-8">
//             
//         </div>
// </div>
// )}