from fastapi import FastAPI
from app.api.track import track_router
from app.api.artist import artist_router
from app.api.user import user_router
from app.api.album import album_router
from app.api.category import category_router
from app.api.playlist import playlist_router
from app.api.crawl import crawl_router

api = FastAPI()
api.include_router(track_router)
api.include_router(artist_router)
api.include_router(user_router)
api.include_router(album_router)
api.include_router(category_router)
api.include_router(playlist_router)
api.include_router(crawl_router)


@api.get("/health")
def healthcheck():
    server_info = {"host": "localhost", "port": 8000, "mode": "dev", "status": "good"}
    return server_info
