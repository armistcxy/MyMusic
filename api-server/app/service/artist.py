from app.model import models
from app.repository.repo import get_session
from app.schema.artist import ArtistResponse, ArtistUploadForm, ArtistSimpleResponse
import app.repository.artist as artist_repo
import app.schema.utils as schema_utils
import uuid


def upload_artist(artist_form: ArtistUploadForm) -> ArtistResponse:
    session = get_session()
    artist = models.Artist(
        name=artist_form.name,
        description=artist_form.description,
    )
    artist = artist_repo.insert_artist(session=session, artist=artist)
    session.close()
    response = schema_utils.artist_model_to_detail_response(artist)

    return response


def get_all_artists() -> list[ArtistSimpleResponse]:
    session = get_session()
    artists = artist_repo.get_all_artists(session=session)
    responses = list(map(schema_utils.artist_model_to_simple_response, artists))
    session.close()

    return responses


def get_artist_by_id(id: uuid.UUID) -> ArtistResponse | None:
    session = get_session()
    artist = artist_repo.get_artist_by_id(session=session, id=id)
    response = schema_utils.artist_model_to_detail_response(artist)
    session.close()
    return response


def get_artist_by_name(name: str) -> ArtistResponse | None:
    session = get_session()
    artist = artist_repo.get_artist_by_name(session=session, name=name)
    response = schema_utils.artist_model_to_detail_response(artist)
    return response


def delete_artist_by_id(id: uuid.UUID):
    session = get_session()
    artist_repo.delete_artist(session=session, id=id)


def find_artist_with_name(name: str):
    session = get_session()
    artists = artist_repo.find_artist_with_name(session=session, name=name)
    response = [
        schema_utils.artist_model_to_simple_response(artist) for artist in artists
    ]
    session.close()
    return response
