from app.repository.artist import ArtistRepo
from app.repository.track import TrackRepo


class Repo:
    def __init__(self, artist_repo: ArtistRepo, track_repo: TrackRepo):
        self.artist_repo = artist_repo
        self.track_repo = track_repo
    