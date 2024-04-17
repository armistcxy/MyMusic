from app.repository.artist import ArtistRepo
from app.repository.track import TrackRepo
from app.repository.album import AlbumRepo
from app.repository.category import CategoryRepo
from app.repository.user import UserRepo
from app.repository.playlist import PlaylistRepo


class Repo:
    def __init__(
        self,
        artist_repo: ArtistRepo,
        track_repo: TrackRepo,
        album_repo: AlbumRepo,
        category_repo: CategoryRepo,
        user_repo: UserRepo,
        playlist_repo: PlaylistRepo,
    ):
        self.artist_repo = artist_repo
        self.track_repo = track_repo
        self.album_repo = album_repo
        self.category_repo = category_repo
        self.user_repo = user_repo
        self.playlist_repo = playlist_repo
