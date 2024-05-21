from fastapi import APIRouter, status, HTTPException
from app.schema.track import (
    TrackResponse,
    TrackUploadForm,
    TrackSimpleResponse,
    TrackDeleteResponse,
)
import uuid
from fastapi.responses import JSONResponse, StreamingResponse, FileResponse
import app.service.track as track_service
from app.repository.error import NotFoundError
from app.service.error import StreamError
import random
import app.schema.utils as schema_utils
import logging

logging.basicConfig()
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

track_router = APIRouter(prefix="/tracks", tags=["Track"])

CATEGORIES = [
    "Pop",
    "Rock",
    "Country",
    "Classical",
    "Jazz",
    "Indie",
    "Hip hop",
    "Rhythm",
]


@track_router.post(
    "/",
    responses={
        status.HTTP_201_CREATED: {"model": TrackResponse},
        status.HTTP_500_INTERNAL_SERVER_ERROR: {},
    },
)
def upload_track(track_form: TrackUploadForm):
    try:
        # using fake data for category:
        if track_form.categories is None:
            track_form.categories = [random.choice(CATEGORIES)]
        response = track_service.upload_track(track_form)
        return response
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@track_router.get("/", response_model=list[TrackSimpleResponse])
def get_all_tracks(page: int | None = None, size: int | None = None):
    if not page and not size:
        page = -1
        size = -1
    if not page:
        page = 1
    if not size:
        size = 10
    responses = track_service.get_all_tracks(page, size)
    return responses


@track_router.get("/{id}", response_model=TrackResponse)
def get_track_by_id(id: uuid.UUID):
    response = track_service.get_track_by_id(id)
    return response


# this will need authentication and authorization from artist or admin(soon)
@track_router.delete("/{id}", responses={500: {"model": TrackDeleteResponse}, 204: {}})
def delete_track_by_id(id: uuid.UUID):
    response = track_service.delete_track_by_id(id)
    # return empty content if delete is done (204 code)
    if response is None:
        return JSONResponse(
            content={"message": "delete successfully"},
            status_code=status.HTTP_204_NO_CONTENT,
        )

    # return 202 code if request has been accepted for processing,
    # but the processing has not been completed

    # return 500 if there's internal server error
    return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={})


@track_router.get("/search/v1/{name}", response_model=list[TrackSimpleResponse])
def find_track_with_name(name: str):
    response = track_service.find_track_with_name(name)
    return response


@track_router.get("/search/v2/{name}", response_model=list[TrackSimpleResponse])
def find_track_with_name_ver2(name: str):
    response = track_service.find_track_with_name_ver2(name)
    return response


@track_router.get("/stream/{id}")
def stream_track(id: uuid.UUID):
    track_response = track_service.get_track_by_id(id)
    if track_response is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(f"there's no track with {id}"),
        )
    try:
        slug_name = schema_utils.convert_name_to_slug(track_response.name)
        stream_response = StreamingResponse(
            content=track_service.stream_track(track_name=slug_name),
            media_type="audio/mp3",
        )
    except NotFoundError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except StreamError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
    return stream_response


@track_router.get("/new/{amount}")
def get_newest_track(amount: int):
    response = track_service.get_newest_track(amount)
    return response


@track_router.get("/random/{amount}")
def get_random_track(amount: int):
    response = track_service.get_tracks_in_range(1, 50)
    random_response = track_service.random_track_choosing(response, amount=amount)
    return random_response


@track_router.get("/download/{id}")
def download_track(id: uuid.UUID):
    response = track_service.get_track_by_id(id)
    track_file = FileResponse(path=f"app/{response.audio_url}")
    return track_file
