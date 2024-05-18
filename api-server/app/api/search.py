from fastapi import APIRouter
from app.schema.category import CategoryResponse, CategoryUploadForm, CategoryUpdateForm
import uuid
import app.service.track as track_service
import app.service.album as album_service
import app.service.artist as artist_service
from fastapi.responses import JSONResponse

search_router = APIRouter(prefix="/search", tags=["Search"])


@search_router.get("/{name}")
def general_search(name: str):
    track_response = track_service.find_track_with_name(name)
    artist_response = artist_service.find_artist_with_name(name)
    album_response = album_service.find_album_with_name(name)
    return track_response, artist_response, album_response


@search_router.get("/{name}/tracks")
def track_search(name: str):
    track_response = track_service.find_track_with_name(name)
    return track_response


@search_router.get("/{name}/albums")
def album_search(name: str):
    album_response = album_service.find_album_with_name(name)
    return album_response


@search_router.get("/{name}/artists")
def artist_search(name: str):
    artist_response = artist_service.find_artist_with_name(name)
    return artist_response
