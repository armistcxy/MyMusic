from pydantic import BaseModel
import uuid
from model import models
from repository.general import Repo
from repository.repo import get_session


class TrackUploadForm(BaseModel):
    name: str
    length: int
    artists_id: list[uuid.UUID]
    album_id: uuid.UUID | None
    categories: list[str] | None


class TrackResponse(BaseModel):
    id: uuid.UUID
    name: str
    length: int
    artists: list[str]
    album: str | None = None
    categories: list[str] | None = None


class TrackService:
    def __init__(self, repo: Repo):
        self.repo = repo

    def upload_track(self, track_form: TrackUploadForm) -> TrackResponse:
        session = get_session()
        artists = [
            self.repo.artist_repo.get_artist_by_id(artist_id, session)
            for artist_id in track_form.artists_id
        ]
        track = models.Track(
            name=track_form.name,
            length=track_form.length,
            artists=artists,
        )
        track = self.repo.track_repo.insert_track(track, session)

        session.close()
        track_response = TrackResponse(
            id=track.id,
            name=track_form.name,
            length=track_form.length,
            artists=[artist.name for artist in artists],
        )

        return track_response
