import { useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider"
import MediaItem from "./MediaItem"
import SongItem from "./SongItem";

export default function SearchContent() {
    const [{ filterItems }] = useStateProvider();

    const onClick = () => {
        //...
    }
    return (
        <div>
            <div className="grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-8
        gap-4
        mt-4">
                {filterItems[0].map((song) => (
                    <div
                        key={song?.id}
                        className="flex items-center gap-x-4 w-full">
                        <div className="flex-1">
                            <SongItem data={song} />
                        </div>
                    </div>
                ))}
            </div>
            <div className="grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-8
        gap-4
        mt-4">
                {filterItems[1].map((artist) => (
                    <div
                        key={artist?.id}
                        className="flex items-center gap-x-4 w-full">
                        <div className="flex-1 text-white">
                            {/* <SongItem data={artist} /> */}
                            {artist?.name}
                        </div>
                    </div>
                ))}
            </div>
            <div className="grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-8
        gap-4
        mt-4">
                {filterItems[2].map((album) => (
                    <div
                        key={album?.id}
                        className="flex items-center gap-x-4 w-full">
                        <div className="flex-1 text-white">
                            {/* <SongItem data={album} /> */}
                            {album?.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}