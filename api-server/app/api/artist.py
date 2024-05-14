from fastapi import APIRouter
from app.schema.artist import ArtistResponse, ArtistSimpleResponse, ArtistUploadForm
import app.service.artist as artist_service
import uuid


artist_router = APIRouter(prefix="/artists", tags=["Artist"])


@artist_router.post("/", response_model=ArtistResponse)
def upload_artist(artist_form: ArtistUploadForm):
    try:
        response = artist_service.upload_artist(artist_form)
    except Exception:
        pass
    return response


@artist_router.get("/", response_model=list[ArtistSimpleResponse])
def get_all_artists():
    response = artist_service.get_all_artists()
    return response


@artist_router.get("/{id}", response_model=ArtistResponse)
def get_artist_by_id(id: uuid.UUID):
    response = artist_service.get_artist_by_id(id)
    return response


@artist_router.get("/name/{name}", response_model=ArtistResponse)
def get_artist_by_name(name: str):
    response = artist_service.get_artist_by_name(name)
