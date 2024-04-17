from app.repository.general import (
    Repo,
    TrackRepo,
    ArtistRepo,
    AlbumRepo,
    UserRepo,
    CategoryRepo,
)


track_repo = TrackRepo()
artist_repo = ArtistRepo()
album_repo = AlbumRepo()
user_repo = UserRepo()
category_repo = CategoryRepo()
repo = Repo(artist_repo, track_repo, album_repo, category_repo, user_repo)
