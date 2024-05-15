from fastapi import APIRouter, status, HTTPException
from app.schema.album import AlbumDetailResponse, AlbumSimpleResponse, AlbumUploadForm
import app.service.album as album_service
import uuid


album_router = APIRouter(prefix="/albums", tags=["Album"])


@album_router.post("/", response_model=AlbumDetailResponse)
def create_album(upload_form: AlbumUploadForm):
    response = album_service.insert_album(upload_form)
    return response


@album_router.get("/", response_model=list[AlbumSimpleResponse])
def get_all_albums():
    response = album_service.get_all_albums()
    return response


@album_router.get(
    "/{id}",
    responses={
        status.HTTP_200_OK: {"model": AlbumDetailResponse},
        status.HTTP_404_NOT_FOUND: {},
    },
)
def get_album_by_id(id: uuid.UUID):
    response = album_service.get_album_by_id(id)
    if response is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"not found album with id: {id}",
        )
    return response


@album_router.get(
    "/name/{name}",
    responses={
        status.HTTP_200_OK: {"model": AlbumDetailResponse},
        status.HTTP_404_NOT_FOUND: {},
    },
)
def get_album_by_name(name: str):
    response = album_service.get_album_by_name(name)
    if response is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"not found album with name: {name}",
        )
    return response


@album_router.get("/find/{name}", response_model=list[AlbumSimpleResponse])
def find_album_with_name(name: str):
    response = album_service.find_album_with_name(name)
    return response


@album_router.delete("/{id}")
def delete_album_by_id(id: uuid.UUID):
    album_service.delete_album_by_id(id)
