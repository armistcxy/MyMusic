import app.schema.artist as schema_artist
import app.schema.track as schema_track
import app.schema.album as schema_album
import app.schema.category as schema_category
import app.schema.user as schema_user
import app.schema.playlist as schema_playlist
from app.model import models


def track_model_to_simple_response(
    track: models.Track,
) -> schema_track.TrackSimpleResponse:
    track_response = schema_track.TrackSimpleResponse(
        id=track.id,
        name=track.name,
        length=track.length,
    )
    return track_response


def artist_model_to_simple_response(
    artist: models.Artist,
) -> schema_artist.ArtistSimpleResponse:
    artist_response = schema_artist.ArtistSimpleResponse(id=artist.id, name=artist.name)
    return artist_response


def album_model_to_simple_response(
    album: models.Album,
) -> schema_album.AlbumSimpleResponse:
    if album is None:
        return None
    album_response = schema_album.AlbumSimpleResponse(
        id=album.id,
        name=album.name,
    )
    return album_response


def playlist_model_to_simple_response(
    playlist: models.Playlist,
) -> schema_playlist.PlaylistSimpleResponse:
    playlist_response = schema_playlist.PlaylistSimpleResponse(
        id=playlist.id,
        name=playlist.name,
    )
    return playlist_response


def track_model_to_detail_response(
    track: models.Track,
) -> schema_track.TrackResponse:
    track_response = schema_track.TrackResponse(
        id=track.id,
        name=track.name,
        length=track.length,
        artists=[artist_model_to_simple_response(artist) for artist in track.artists],
        album=album_model_to_simple_response(track.album),
        categories=[
            category_model_to_response(category) for category in track.categories
        ],
    )
    return track_response


def artist_model_to_detail_response(
    artist: models.Artist,
) -> schema_artist.ArtistResponse:
    artist_response = schema_artist.ArtistResponse(
        id=artist.id,
        name=artist.name,
        description=artist.description,
    )
    return artist_response


def user_model_to_simple_response(
    user: models.User,
) -> schema_user.UserSimpleResponse:
    user_response = schema_user.UserSimpleResponse(
        id=user.id,
        username=user.username,
    )
    return user_response


def user_model_to_detail_response(
    user: models.User,
) -> schema_user.UserDetailResponse:
    user_response = schema_user.UserDetailResponse(
        id=user.id,
        username=user.username,
        email=user.email,
    )
    return user_response


def category_model_to_response(
    category: models.Category,
) -> schema_category.CategoryResponse:
    category_response = schema_category.CategoryResponse(
        id=category.id,
        name=category.name,
    )
    return category_response


def album_model_to_detail_response(
    album: models.Album,
) -> schema_album.AlbumDetailResponse:
    album_response = schema_album.AlbumDetailResponse(
        id=album.id,
        name=album.name,
        artists=[artist_model_to_simple_response(artist) for artist in album.artists],
        tracks=[track_model_to_simple_response(track) for track in album.tracks],
    )
    return album_response


def playlist_model_to_detail_response(
    playlist: models.Playlist,
) -> schema_playlist.PlaylistDetailResponse:
    playlist_response = schema_playlist.PlaylistDetailResponse(
        id=playlist.id,
        name=playlist.name,
        user=user_model_to_simple_response(playlist.user),
        tracks=[track_model_to_simple_response(track) for track in playlist.tracks],
    )
    return playlist_response
