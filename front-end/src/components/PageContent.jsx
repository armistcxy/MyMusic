import { useEffect } from "react";
import SongItem from "./SongItem"
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";

export default function PageContent() {
    // const router = useRouter();
    // const [{ token, playlists, isAuthenticated }, dispatch] = useStateProvider();

    // useEffect(() => {
    //         const getPlaylistData = async () => {
    //             const response = await axios.get("http://localhost:8000/playlists",
    //                 JSON.stringify({ id, name: name, tracks: tracks }),
    //                 {
    //                     headers: { 'Content-Type': 'application/json' },
    //                     withCredentials: true
    //                 }
    //             );
    //             const { items } = response.data;
    //             const playlists = items.map(({name, id}) => {
    //                 return { name, id };
    //             });
    //             dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
    //         };
    //         getPlaylistData();
    //     }, [token, dispatch]);

    const onClick = () => {
        //...
    }

    const songs = [
        {
            id: Math.random * Date.now(),
            title: "Lạc trôi",
            artist: "Sơn Tùng MTP",
            mp3: new Audio("/tmp/Lac Troi.mp3"),
            link_pic: "/tmp/SonTung.jpg",
        },
        {
            id: Math.random * Date.now(),
            title: "Lạc trôi",
            artist: "Sơn Tùng MTP",
            mp3: new Audio("/tmp/Lac Troi.mp3"),
            link_pic: "/tmp/SonTung.jpg",
        },
        ]
    
    return (
        <div className="grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-8
        gap-4
        mt-4">
            {songs.map((item) => (
                <SongItem
                    key={item.id}
                    onClick={() => {}}
                    data={item}/>
            ))}
        </div>        
    )
}