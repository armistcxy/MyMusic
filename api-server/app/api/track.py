from fastapi import APIRouter, status
from app.schema.track import (
    TrackResponse,
    TrackUploadForm,
    TrackSimpleResponse,
    TrackDeleteResponse,
)
from app.service.track import TrackService
from app.api import repo
import uuid
from fastapi.responses import JSONResponse

track_router = APIRouter(prefix="/tracks", tags=["Track"])
track_service = TrackService(repo)


@track_router.post("/", response_model=TrackResponse)
def upload_track(track_form: TrackUploadForm):
    response = track_service.upload_track(track_form)
    return response


@track_router.get("/", response_model=list[TrackSimpleResponse])
def get_all_tracks():
    responses = track_service.get_all_tracks()
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
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)

    # return 202 code if request has been accepted for processing,
    # but the processing has not been completed

    # return 500 if there's internal server error
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=response
    )


@track_router.get("/search/{name}", response_model=list[TrackSimpleResponse])
def find_track_with_name(name: str):
    response = track_service.find_track_with_name(name)
    return response
