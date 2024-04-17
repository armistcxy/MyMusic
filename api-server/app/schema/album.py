from pydantic import BaseModel
import uuid
from app.schema.artist import ArtistSimpleResponse


class AlbumSimpleResponse(BaseModel):
    id: uuid.UUID
    name: str


from app.schema.track import TrackSimpleResponse


class AlbumDetailResponse(AlbumSimpleResponse):
    artists: list[ArtistSimpleResponse]
    tracks: list[TrackSimpleResponse]
