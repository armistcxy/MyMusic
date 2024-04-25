import app.schema.artist as schema_artist
import app.schema.track as schema_track
import app.schema.album as schema_album
import app.schema.category as schema_category
import app.schema.user as schema_user
import app.schema.artist as schema_artist
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


def track_model_to_detail_response(
    track: models.Track,
) -> schema_track.TrackResponse:
    track_response = schema_track.TrackResponse(
        id=track.id,
        name=track.name,
        length=track.length,
        artists=[artist_model_to_simple_response(artist) for artist in track.artists],
        album=track.album,
        categories=track.categories,
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
        name=user.username,
    )
    return user_response


def user_model_to_detail_response(
    user: models.User,
) -> schema_user.UserDetailResponse:
    user_response = schema_user.UserDetailResponse(
        id=user.id,
        name=user.username,
        email=user.email,
    )
    return user_response
