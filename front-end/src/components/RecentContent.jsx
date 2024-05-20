// import axios from "axios";
// import { useStateProvider } from "../utils/StateProvider";
// import SongItem from "./SongItem";
// import { useEffect } from "react";
// import { reducerCases } from "../utils/Constants";
// import { Link } from "react-router-dom";


export default function RecentContent() {
    // const [{ token, newestSongs }, dispatch] = useStateProvider();

    // useEffect(() => {
    //     const getNewestSongs = async () => {
    //         try {
    //             const response = await axios.get(
    //                 `http://localhost:8000/tracks/new/${amountSong}`,
    //                 {
    //                     headers: {
    //                         Authorization: "Bearer " + token,
    //                         "Content-Type": "application/json",
    //                     },
    //                 }
    //             );

    //             const newestSongs = {
    //                 songs: response.data.map(( song ) => ({
    //                     id: song.id,
    //                     name: song.name,
    //                     length: song.length,
    //                     track_image_path: song.track_image_path,
    //                     artists: song.artists.map(( artist ) => ({
    //                         id: artist.id,
    //                         name: artist.name,
    //                         artist_image_path: artist.artist_image_path,
    //                     })),
    //                     album: song.album,
    //                     categories: song.categories.map(( categorie ) => ({
    //                         id: categorie.id,
    //                         name: categorie.name,
    //                     })),
    //                 })),
    //             };

    //             dispatch({ type: reducerCases.SET_NEWEST_SONGS, newestSongs: newestSongs })
    //         } catch (error) {
    //             console.error('Error fetching newest songs:', error);
    //         }

    //     };
    //     getNewestSongs();
    // }, []);

    // const selectSong = (selectedSongId) => {
    //     dispatch({ type: reducerCases.SET_SONG_ID, selectedSongId: selectedSongId })
    // }

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
            {/* {newestSongs?.songs?.map((item) => (
                <Link to="songview" onClick={() => selectSong(item.id)}>
                    <SongItem
                        key={item.id}
                        onClick={() => {}}
                        data={item} />
                </Link>
            ))} */}
            {/* This is Recent */}
        </div>
    )
}