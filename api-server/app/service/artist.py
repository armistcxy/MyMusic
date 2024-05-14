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


def get_artist_by_id(self, id: uuid.UUID) -> ArtistResponse:
    session = get_session()
    artist = artist_repo.get_artist_by_id(session=session, id=id)
    response = schema_utils.artist_model_to_detail_response(artist)
    session.close()
    return response


def get_artist_by_name(self, name: str) -> ArtistResponse:
    session = get_session()
    artist = artist_repo.get_artist_by_name(session=session, name=name)
    response = schema_utils.artist_model_to_detail_response(artist)
    return response
