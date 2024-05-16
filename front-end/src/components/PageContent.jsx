import SongItem from "./SongItem"

export default function PageContent() {
    // const router = useRouter();

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