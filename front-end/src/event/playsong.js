import { useState } from 'react';

function PlaySong(props) {
    let pathSong = "/data/mp3/Glory Man United.mp3";
    const [audio] = useState(new Audio(pathSong));

    const handlePlaySong = () => {
        audio.play();
    };
    
    return {handlePlaySong};
}

export default PlaySong;