import app.schema.artist as schema_artist
import app.schema.track as schema_track
import app.schema.album as schema_album
import app.schema.category as schema_category
import app.schema.user as schema_user
import app.schema.playlist as schema_playlist
from app.model import models
from slugify import slugify


def album_model_to_simple_response(
    album: models.Album,
) -> schema_album.AlbumSimpleResponse | None:
    if album is None:
        return None
    album_response = schema_album.AlbumSimpleResponse(
        id=str(album.id),
        name=album.name,
    )
    return album_response


def track_model_to_simple_response(
    track: models.Track,
) -> schema_track.TrackSimpleResponse | None:
    if track is None:
        return None
    track_response = schema_track.TrackSimpleResponse(
        id=str(track.id),
        name=track.name,
        length=track.length,
        track_image_path=f"track/{convert_name_to_slug(track.name)}.jpg",
        artists=[artist_model_to_simple_response(artist) for artist in track.artists],
        album=track.album.name,
        audio_url=f"static/audio/{convert_name_to_slug(track.name)}.mp3",
    )
    return track_response


def artist_model_to_simple_response(
    artist: models.Artist,
) -> schema_artist.ArtistSimpleResponse | None:
    if artist is None:
        return None
    artist_response = schema_artist.ArtistSimpleResponse(
        id=str(artist.id),
        name=artist.name,
        artist_image_path=f"artist/{convert_name_to_slug(artist.name)}.jpg",
    )
    return artist_response


def playlist_model_to_simple_response(
    playlist: models.Playlist,
) -> schema_playlist.PlaylistSimpleResponse | None:
    if playlist is None:
        return None
    playlist_response = schema_playlist.PlaylistSimpleResponse(
        id=str(playlist.id),
        name=playlist.name,
    )
    return playlist_response


def track_model_to_detail_response(
    track: models.Track,
) -> schema_track.TrackResponse | None:
    if track is None:
        return None
    track_response = schema_track.TrackResponse(
        id=str(track.id),
        name=track.name,
        length=track.length,
        track_image_path=f"track/{convert_name_to_slug(track.name)}.jpg",
        artists=[artist_model_to_simple_response(artist) for artist in track.artists],
        album=track.album.name,
        categories=[
            category_model_to_response(category) for category in track.categories
        ],
        audio_url=f"static/audio/{convert_name_to_slug(track.name)}.mp3",
    )
    return track_response


def artist_model_to_detail_response(
    artist: models.Artist,
) -> schema_artist.ArtistResponse | None:
    if artist is None:
        return None
    artist_response = schema_artist.ArtistResponse(
        id=str(artist.id),
        name=artist.name,
        description=artist.description,
        artist_image_path=f"artist/{convert_name_to_slug(artist.name)}.jpg",
    )
    return artist_response


def user_model_to_simple_response(
    user: models.User,
) -> schema_user.UserSimpleResponse | None:
    user_response = schema_user.UserSimpleResponse(
        id=str(user.id),
        username=user.username,
    )
    return user_response


def user_model_to_detail_response(
    user: models.User,
) -> schema_user.UserDetailResponse | None:
    if user is None:
        return None
    user_response = schema_user.UserDetailResponse(
        id=str(user.id),
        username=user.username,
        email=user.email,
    )
    return user_response


def category_model_to_response(
    category: models.Category,
) -> schema_category.CategoryResponse | None:
    if category is None:
        return None
    category_response = schema_category.CategoryResponse(
        id=str(category.id),
        name=category.name,
    )
    return category_response


def album_model_to_detail_response(
    album: models.Album,
) -> schema_album.AlbumDetailResponse | None:
    if album is None:
        return None
    album_response = schema_album.AlbumDetailResponse(
        id=str(album.id),
        name=album.name,
        artists=[artist_model_to_simple_response(artist) for artist in album.artists],
        tracks=[track_model_to_simple_response(track) for track in album.tracks],
    )
    return album_response


def playlist_model_to_detail_response(
    playlist: models.Playlist,
) -> schema_playlist.PlaylistDetailResponse | None:
    if playlist is None:
        return None
    playlist_response = schema_playlist.PlaylistDetailResponse(
        id=str(playlist.id),
        name=playlist.name,
        user=user_model_to_simple_response(playlist.user),
    )
    if playlist.tracks:
        playlist_response.tracks = [
            track_model_to_detail_response(track) for track in playlist.tracks
        ]
    else:
        playlist_response.tracks = []

    return playlist_response


def convert_name_to_slug(name: str) -> str:
    # this package's seem interesting
    return slugify(name)
