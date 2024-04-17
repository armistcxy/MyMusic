from app.model import models
from app.repository.general import Repo
from app.repository.repo import get_session
from app.schema.track import TrackResponse, TrackUploadForm, TrackSimpleResponse
import app.schema.track as schema_track
import app.schema.artist as schema_artist


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
            artists=[
                schema_artist.model_to_simple_response(artist) for artist in artists
            ],
        )

        return track_response

    def get_all_tracks(self) -> list[TrackSimpleResponse]:
        session = get_session()
        tracks = self.repo.track_repo.get_all_tracks(session)
        responses = [schema_track.model_to_simple_response(track) for track in tracks]

        session.close()

        return responses
