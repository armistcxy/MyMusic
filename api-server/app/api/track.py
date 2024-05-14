from fastapi import APIRouter, status, HTTPException
from app.schema.track import (
    TrackResponse,
    TrackUploadForm,
    TrackSimpleResponse,
    TrackDeleteResponse,
)
import uuid
from fastapi.responses import JSONResponse, StreamingResponse
import app.service.track as track_service
from app.repository.error import NotFoundError
from app.service.error import StreamError

track_router = APIRouter(prefix="/tracks", tags=["Track"])


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
        return JSONResponse(
            content={"message": "delete successfully"},
            status_code=status.HTTP_204_NO_CONTENT,
        )

    # return 202 code if request has been accepted for processing,
    # but the processing has not been completed

    # return 500 if there's internal server error
    return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={})


@track_router.get("/search/{name}", response_model=list[TrackSimpleResponse])
def find_track_with_name(name: str):
    response = track_service.find_track_with_name(name)
    return response


@track_router.get("/stream/{id}")
def stream_track(id: uuid.UUID):
    try:
        stream_response = StreamingResponse(
            content=track_service.stream_track(id=id),
            media_type="audio/mp3",
        )
    except NotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except StreamError as e:
        raise HTTPException(status_code=500, detail=str(e))
    return stream_response
