export default function DeletePlaylistBox() {
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="w-20 h-15 bg-gray-800 text-white flex items-center justify-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div>
                <p>Delete?</p>
             </div>
             <div>
                 <button >no</button>
                 <button>yes</button>
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