from app.model import models
from app.repository.general import Repo
from app.repository.repo import get_session
from app.schema.artist import ArtistResponse, ArtistUploadForm, ArtistSimpleResponse
import app.schema.utils as schema_utils
import uuid


class ArtistService:
    def __init__(self, repo: Repo):
        self.repo = repo

    def upload_artist(self, artist_form: ArtistUploadForm) -> ArtistResponse:
        session = get_session()
        artist = models.Artist(
            name=artist_form.name,
            description=artist_form.description,
        )
        session.close()
        response = schema_utils.artist_model_to_detail_response(artist)

        return response

    def get_all_artists(self) -> list[ArtistSimpleResponse]:
        session = get_session()
        artists = self.repo.artist_repo.get_all_artists(session)
        responses = [
            schema_utils.artist_model_to_simple_response(artist) for artist in artists
        ]

        session.close()

        return responses

    def get_artist_by_id(self, id: uuid.UUID) -> ArtistResponse:
        session = get_session()
        artist = self.repo.artist_repo.get_artist_by_id(id, session)
        response = schema_utils.artist_model_to_detail_response(artist)
        session.close()
        return response
