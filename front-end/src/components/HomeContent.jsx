import { useStateProvider } from "../utils/StateProvider";
import SongItem from "./SongItem";

export default function HomeContent() {
    // const [{  }] = useStateProvider();

    const onClick = () => {
        //...
    }

    const songs = [
        {
            id: 1,
            title: "Lạc trôi",
            artist: "Sơn Tùng MTP",
            mp3: new Audio("/data/mp3/Lac Troi.mp3"),
            link_pic: "/data/img/SonTung.jpg",
            description: "Best Music",
            duration: 200,
            album: "Sky Tour",
        },
        {
            id: 2,
            title: "Lạc trôi",
            artist: "Sơn Tùng MTP",
            mp3: new Audio("/data/mp3/Lac Troi.mp3"),
            link_pic: "/data/img/SonTung.jpg",
            description: "Best Music",
            duration: 200,
            album: "Sky Tour",
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