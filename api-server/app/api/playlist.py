from fastapi import APIRouter, Depends
from app.schema.playlist import (
    PlaylistDetailResponse,
    PlaylistSimpleResponse,
    PlaylistUploadForm,
)
import app.service.playlist as playlist_service
import uuid
from app.api.auth import security
import app.model.models as models

playlist_router = APIRouter(prefix="/playlists", tags=["Playlist"])


@playlist_router.post(
    "/",
    response_model=PlaylistDetailResponse,
    dependencies=[Depends(security.access_token_required)],
)
def create_playlist(
    upload_form: PlaylistUploadForm,
    user: models.User = Depends(security.get_current_subject),
):
    upload_form.user_id = user.id
    response = playlist_service.create_playlist(upload_form)
    return response


@playlist_router.get("/", response_model=list[PlaylistSimpleResponse])
def get_all_playlists():
    response = playlist_service.get_all_playlists()
    return response


@playlist_router.get("/{id}", response_model=PlaylistDetailResponse)
def get_playlist_by_id(id: uuid.UUID):
    response = playlist_service.get_playlist_by_id(id)
    return response


@playlist_router.get("/find/{name}", response_model=list[PlaylistSimpleResponse])
def find_playlist_with_name(name: str):
    response = playlist_service.find_playlist_with_name(name)
    return response


@playlist_router.delete("/{id}")
def delete_playlist_by_id(id: uuid.UUID):
    playlist_service.delete_playlist_by_id(id)
