import React from "react";
import styled from "styled-components";

export default function Login() {
    const handleClick = () => {
        // Quang ID
        const clientId = 'a87c1d9aa662450e98fb9ed79e39f6b9';
        // Khanh ID
        // const clientId = '7131d87dac894fe1b287534e06edf234';
        const redirectUrl = 'http://localhost:3000/'
        const apiUrl = 'https://accounts.spotify.com/authorize';
        const scope = [
            'user-read-private',
            'user-read-email',
            'user-modify-playback-state',
            'user-read-playback-state',
            'user-read-currently-playing',
            'user-read-recently-played',
            'user-top-read',
        ];
        window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
            ' '
        )}&response_type=token&show_dialog=true`;
    };
    return <Container>
            <img 
                src="http://logos-download.com/wp-content/uploads/2016/08/Spotify_logo_black.png" 
                alt="Flotify"
            />
            <button onClick={handleClick}>LOGIN WITH SPOTIFY</button>
        </Container>;
}


const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    background-color: #1db954;
    gap: 5rem;
    img {
    height: 20vh;
    }
    button {
    padding: 1rem 5rem;
    border-radius: 5rem;
    background-color: black;
    color: #49f585;
    border: none;
    font-size: 1.4rem;
    cursor: pointer;
    }
`;