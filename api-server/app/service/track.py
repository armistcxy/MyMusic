from model import models
from repository.general import Repo
from repository.repo import get_session
from schema.track import TrackResponse, TrackUploadForm
from schema.artist import model_to_simple_response


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
            artists=[model_to_simple_response(artist) for artist in artists],
        )

        return track_response
