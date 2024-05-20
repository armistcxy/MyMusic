import { FaPlay } from "react-icons/fa"
import { changeTrack } from "./CurrentTrack"
import { useStateProvider } from "../utils/StateProvider"
import { reducerCases } from "../utils/Constants";

export default function SongItem({ data }) {
    const [{ readyToListen }, dispatch] = useStateProvider();
    return (
        <div
            className="
        relative
        group
        flex
        flex-col
        items-center
        justify-center
        rounded-md
        overflow-hidden
        gap-x-4
        bg-neutral-400/5
        cursor-pointer
        hover:bg-neutral-400/10
        transition
        p-3">
            <div className="
                relative
                aspect-square
                w-full
                h-full
                rounded-md
                overflow-hidden">
                <img
                    className="object-cover w-full h-full"
                    src={"http://localhost:8000/static/" + data?.track_image_path}
                    alt={data?.name}>
                </img>
            </div>
            <div className="flex flex-col items-start w-full pt-4 gap-y-1">
                <p className="text-neutral-100 text-lg font-semibold truncate w-full">{data?.name}</p>
                {data?.artists.map((artist) => (
                    <p className="text-neutral-400 text-smpb-4 w-full truncate">
                        {artist?.name}
                    </p>
                ))}
                <div className="
                absolute
                bottom-24
                right-5">
                    <button
                        className="
                            transition
                            opacity-0
                            rounded-full
                            flex
                            items-center
                            bg-green-500
                            p-4
                            drop-shadow-md
                            translate
                            translate-y-1/4
                            group-hover:opacity-100
                            group-hover:translate-y-0
                            hover:scale-110">
                        <FaPlay className="text-black" onClick={() => {
                            dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: false });
                            changeTrack(data.id, null, readyToListen, dispatch, data);
                        }}></FaPlay>
                    </button>
                </div>
            </div>
        </div>
    )
}