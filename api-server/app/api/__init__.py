from app.repository.general import (
    Repo,
    TrackRepo,
    ArtistRepo,
    AlbumRepo,
    UserRepo,
    CategoryRepo,
    PlaylistRepo,
)


track_repo = TrackRepo()
artist_repo = ArtistRepo()
album_repo = AlbumRepo()
user_repo = UserRepo()
playlist_repo = PlaylistRepo()
category_repo = CategoryRepo()
repo = Repo(
    artist_repo, track_repo, album_repo, category_repo, user_repo, playlist_repo
)
