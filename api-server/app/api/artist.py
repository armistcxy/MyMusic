from fastapi import APIRouter
from app.schema.artist import ArtistResponse, ArtistSimpleResponse, ArtistUploadForm
import app.service.artist as artist_service

artist_router = APIRouter(prefix="/artists", tags=["Artist"])


@artist_router.post("/", response_model=ArtistResponse)
def upload_artist(artist_form: ArtistUploadForm):
    response = artist_service.upload_artist(artist_form)
    return response


@artist_router.get("/", response_model=list[ArtistSimpleResponse])
def get_all_artists():
    responses = artist_service.get_all_artists()
    return responses


@artist_router.get("/{id}", response_model=ArtistResponse)
def get_artist_by_id():
    response = artist_service.get_artist_by_id(id)
    return response
