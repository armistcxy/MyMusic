from fastapi import APIRouter
import app.crawler.crawl as crawler
import asyncio
from pydantic import BaseModel

crawl_router = APIRouter(prefix="/crawl", tags=["Crawl"])
BASE_SAVE_PATH = "app/static"


class TrackDownloadRequest(BaseModel):
    track: str
    artist: str


@crawl_router.post("/download")
def download_song(track_list: list[TrackDownloadRequest]):
    track_infos = [(track.track, track.artist) for track in track_list]
    asyncio.run(crawler.crawl(track_infos=track_infos, save_path=BASE_SAVE_PATH))
