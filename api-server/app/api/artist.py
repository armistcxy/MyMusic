from fastapi import APIRouter, status, HTTPException
from fastapi.responses import JSONResponse
from app.schema.artist import ArtistResponse, ArtistSimpleResponse, ArtistUploadForm
import app.service.artist as artist_service
import uuid
from app.repository.error import IntegrityException, RepositoryError
from app.schema.error import ErrorResponse

artist_router = APIRouter(prefix="/artists", tags=["Artist"])


@artist_router.post(
    "/",
    responses={
        status.HTTP_201_CREATED: {"model": ArtistResponse},
        status.HTTP_409_CONFLICT: {"model": ErrorResponse},
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"model": ErrorResponse},
    },
)
def upload_artist(artist_form: ArtistUploadForm):
    try:
        response = artist_service.upload_artist(artist_form)
        return JSONResponse(
            status_code=status.HTTP_201_CREATED, content=response.model_dump()
        )
    except IntegrityException as e:
        error_response = ErrorResponse(message=str(e))
        return JSONResponse(
            status_code=status.HTTP_409_CONFLICT,
            content=error_response.model_dump(),
        )
    except RepositoryError as e:
        error_response = ErrorResponse(message=str(e))
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content=error_response.model_dump(),
        )


@artist_router.get(
    "/",
    responses={
        status.HTTP_200_OK: {"model": list[ArtistSimpleResponse]},
    },
)
def get_all_artists():
    response = artist_service.get_all_artists()
    return response


@artist_router.get(
    "/{id}",
    responses={
        status.HTTP_200_OK: {"model": ArtistResponse},
        status.HTTP_404_NOT_FOUND: {},
    },
)
def get_artist_by_id(id: uuid.UUID):
    response = artist_service.get_artist_by_id(id)
    if response is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Not found artist with id: {str(id)}",
        )
    return response


@artist_router.get(
    "/name/{name}",
    responses={
        status.HTTP_200_OK: {"model": ArtistResponse},
        status.HTTP_404_NOT_FOUND: {},
    },
)
def get_artist_by_name(name: str):
    response = artist_service.get_artist_by_name(name)
    if response is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Not found artist {name}"
        )
    return response


@artist_router.delete("/{id}")
def delete_artist_by_id(id: uuid.UUID):
    try:
        artist_service.delete_artist_by_id(id=id)
    except Exception as e:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"message: {str(e)}",
        )
