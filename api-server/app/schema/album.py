from pydantic import BaseModel
import uuid
from app.schema.artist import ArtistSimpleResponse


class AlbumUploadForm(BaseModel):
    name: str
    artists_id: list[uuid.UUID]


class AlbumUpdateForm(BaseModel):
    name: str


class AlbumSimpleResponse(BaseModel):
    id: str
    name: str


from app.schema.track import TrackSimpleResponse


class AlbumDetailResponse(AlbumSimpleResponse):
    artists: list[ArtistSimpleResponse]
    tracks: list[TrackSimpleResponse] | None
