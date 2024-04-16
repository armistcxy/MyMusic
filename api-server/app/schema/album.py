from pydantic import BaseModel
import uuid
from schema.artist import ArtistSimpleResponse


class AlbumSimpleResponse(BaseModel):
    id: uuid.UUID
    name: str


from schema.track import TrackSimpleResponse


class AlbumDetailResponse(AlbumSimpleResponse):
    artist: ArtistSimpleResponse
    tracks: list[TrackSimpleResponse]
