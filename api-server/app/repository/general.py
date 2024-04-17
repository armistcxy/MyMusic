from app.repository.artist import ArtistRepo
from app.repository.track import TrackRepo
from app.repository.album import AlbumRepo
from app.repository.category import CategoryRepo
from app.repository.user import UserRepo


class Repo:
    def __init__(
        self,
        artist_repo: ArtistRepo,
        track_repo: TrackRepo,
        album_repo: AlbumRepo,
        category_repo: CategoryRepo,
        user_repo: UserRepo,
    ):
        self.artist_repo = artist_repo
        self.track_repo = track_repo
