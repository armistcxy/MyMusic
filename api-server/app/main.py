from fastapi import FastAPI, Request
from app.api.track import track_router
from app.api.artist import artist_router
from app.api.user import user_router
from app.api.album import album_router
from app.api.category import category_router
from app.api.playlist import playlist_router
from app.api.crawl import crawl_router
from app.api.search import search_router
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from sqladmin import Admin, ModelView
from app.repository import engine
import app.model.models as models

api = FastAPI()
api.include_router(track_router)
api.include_router(artist_router)
api.include_router(user_router)
api.include_router(album_router)
api.include_router(category_router)
api.include_router(playlist_router)
api.include_router(crawl_router)
api.include_router(search_router)

api.mount("/static", StaticFiles(directory="app/static"), name="static")

origins = [
    "http://localhost:8080",
    "http://localhost:3000",
]

api.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@api.get("/health")
def healthcheck(request: Request):
    server_info = {"host": "localhost", "port": 8000, "mode": "dev", "status": "good"}
    for k, v in request.headers.items():
        server_info[k] = v
    return server_info


admin = Admin(api, engine)


class UserAdmin(ModelView, model=models.User):
    column_list = [models.User.id, models.User.username, models.User.email]


class TrackAdmin(ModelView, model=models.Track):
    column_list = [models.Track.id, models.Track.name, models.Track.length]


class ArtistAdmin(ModelView, model=models.Artist):
    column_list = [models.Artist.id, models.Artist.name, models.Artist.description]


class PlaylistAdmin(ModelView, model=models.Playlist):
    column_list = [
        models.Playlist.id,
        models.Playlist.user_id,
        models.Playlist.name,
        models.Playlist.tracks,
    ]

class CategoryAdmin(ModelView, model=models.Category):
    column_list = [models.Category.id, models.Category.name]

class MetaDataAdmin(ModelView, model=models.UserMetadata):
    column_list = [models.UserMetadata.user_id, models.UserMetadata.track_id]


admin.add_view(UserAdmin)
admin.add_view(TrackAdmin)
admin.add_view(ArtistAdmin)
admin.add_view(PlaylistAdmin)
admin.add_view(CategoryAdmin)
admin.add_view(MetaDataAdmin)
