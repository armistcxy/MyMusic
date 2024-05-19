from fastapi import APIRouter
import app.crawler.crawl as crawler
import asyncio
from pydantic import BaseModel

crawl_router = APIRouter(prefix="/crawl", tags=["Crawl"])
BASE_SAVE_PATH = "app/static"


class TrackDownloadRequest(BaseModel):
    tracks: list[str]
    artists: list[str]


@crawl_router.post("/download")
def download_song(track_list: TrackDownloadRequest):
    track_infos = [
        (track, artist) for track, artist in zip(track_list.tracks, track_list.artists)
    ]
    asyncio.run(crawler.crawl(track_infos=track_infos, save_path=BASE_SAVE_PATH))
