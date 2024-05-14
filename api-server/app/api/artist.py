from fastapi import APIRouter, status
from fastapi.responses import JSONResponse
from app.schema.artist import ArtistResponse, ArtistSimpleResponse, ArtistUploadForm
import app.service.artist as artist_service
import uuid
from app.repository.error import IntegrityException, RepositoryError

artist_router = APIRouter(prefix="/artists", tags=["Artist"])


@artist_router.post("/", responses={200: {"model": ArtistResponse}, 409: {}})
def upload_artist(artist_form: ArtistUploadForm):
    try:
        response = artist_service.upload_artist(artist_form)
        return response
    except IntegrityException as e:
        return JSONResponse(
            status_code=status.HTTP_409_CONFLICT, content={"message": str(e)}
        )
    except RepositoryError as e:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"message": str(e)},
        )


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
    return response
