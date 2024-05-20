import { Link } from "react-router-dom";
import { useStateProvider } from "../utils/StateProvider";
import PlaylistItem from "./PlaylistItem";
import { reducerCases } from "../utils/Constants";

export default function PlaylistContent() {
    const [{ playlists }, dispatch] = useStateProvider();

    const changeCurrentPlaylist = (selectedPlaylistId) => {
        dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId: selectedPlaylistId });
    };

    return (
        <div className="grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-6
        2xl:grid-cols-8
        gap-4
        mt-4">
            {playlists.map((item) => (
                <Link to="/lib/playlist" onClick={() => changeCurrentPlaylist(item.id)}>
                    <PlaylistItem
                        key={item.id}
                        data={item} />
                </Link>
            ))}
        </div>
    )
}