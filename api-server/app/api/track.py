from fastapi import APIRouter
from app.schema.track import TrackResponse, TrackUploadForm, TrackSimpleResponse
from app.service.track import TrackService
from app.api import repo
import uuid

track_router = APIRouter(prefix="/tracks")
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
