import MediaItem from "./MediaItem"

export default function SearchContent() {

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
        <div className="flex flex-col gap-y-2 w-full">
            {songs.map((song) => (
                <div 
                key={song.id}
                className="flex items-center gap-x-4 w-full">
                    <div className="flex-1">
                        <MediaItem
                        onClick={() => {}}
                        data={song}/>
                    </div>
                </div>
            ))}
        </div>        
    )
}