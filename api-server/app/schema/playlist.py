from pydantic import BaseModel
from app.schema.user import UserSimpleResponse
import uuid


class PlaylistUploadForm(BaseModel):
    name: str
    user_id: uuid.UUID | None = None


class PlaylistUpdateForm(BaseModel):
    name: str


class PlaylistSimpleResponse(BaseModel):
    id: str
    name: str


from app.schema.track import TrackSimpleResponse, TrackResponse


class PlaylistDetailResponse(PlaylistSimpleResponse):
    user: UserSimpleResponse
    tracks: list[TrackResponse] | None = None


class PlaylistModifyForm(BaseModel):
    rename: str | None = None
    track_id_list: list[uuid.UUID]
