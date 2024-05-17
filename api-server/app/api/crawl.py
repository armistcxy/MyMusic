from fastapi import APIRouter
import app.crawler.crawl as crawler
import asyncio
from pydantic import BaseModel

crawl_router = APIRouter(prefix="/crawl", tags=["Crawl"])
BASE_SAVE_PATH = "app/static"


class TrackDownloadRequest(BaseModel):
    tracks: list[str]


@crawl_router.post("/download")
def download_song(track_list: TrackDownloadRequest):
    track_infos = [(track, "") for track in track_list.tracks]
    asyncio.run(crawler.crawl(track_infos=track_infos, save_path=BASE_SAVE_PATH))
