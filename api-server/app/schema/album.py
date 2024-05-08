from pydantic import BaseModel
import uuid
from app.schema.artist import ArtistSimpleResponse


class AlbumUploadForm(BaseModel):
    name: str
    artists_id: list[uuid.UUID]


class AlbumUpdateForm(BaseModel):
    name: str


class AlbumSimpleResponse(BaseModel):
    id: uuid.UUID
    name: str


from app.schema.track import TrackSimpleResponse


class AlbumDetailResponse(AlbumSimpleResponse):
    id: uuid.UUID
    name: str
    artists: list[ArtistSimpleResponse]
    tracks: list[TrackSimpleResponse] | None
