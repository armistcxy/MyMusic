from pydantic import BaseModel
import uuid


class PlaylistSimpleResponse(BaseModel):
    id: uuid.UUID
    name: str


from app.schema.track import TrackSimpleResponse


class PlaylistDetailResponse(PlaylistSimpleResponse):
    tracks: list[TrackSimpleResponse]
