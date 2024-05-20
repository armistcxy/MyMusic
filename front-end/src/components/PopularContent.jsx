import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import SongItem from "./SongItem";
import { reducerCases } from "../utils/Constants";
import { Link } from "react-router-dom";

const amountSong = 16;

export default function PopularContent() {
    const [{ token, randomSongs, isRandom }, dispatch] = useStateProvider();

    const getRandomSongs = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/tracks/random/${amountSong}`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                }
            );

            const randomSongs = {
                songs: response.data.map((song) => ({
                    id: song.id,
                    name: song.name,
                    length: song.length,
                    track_image_path: song.track_image_path,
                    song: "http://localhost:8000/" + song.audio_url,
                    artists: song.artists.map((artist) => ({
                        id: artist.id,
                        name: artist.name,
                        artist_image_path: artist.artist_image_path,
                    })),
                    album: song.album,
                    categories: song.categories.map((categorie) => ({
                        id: categorie.id,
                        name: categorie.name,
                    })),
                })),
            };

            dispatch({ type: reducerCases.SET_RANDOM_SONGS, randomSongs: randomSongs })
        } catch (error) {
            console.error('Error fetching newest songs:', error);
        }

    };

    if (!isRandom) {
        getRandomSongs();
        dispatch({ type: reducerCases.SET_RANDOM, isRandom: true });
    }

    const selectSong = (selectedSongId) => {
        dispatch({ type: reducerCases.SET_SONG_ID, selectedSongId: selectedSongId })
    }

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
            {randomSongs?.songs?.map((item) => (
                <Link to="/songview" onClick={() => selectSong(item.id)}>
                    <SongItem
                        key={item.id}
                        data={item} />
                </Link>
            ))}
        </div>
    )
}