import uuid
from pydantic import BaseModel
from schema.artist import ArtistSimpleResponse
from schema.category import CategorySimpleResponse


class TrackUploadForm(BaseModel):
    name: str
    length: int
    artists_id: list[uuid.UUID]
    album_id: uuid.UUID | None = None
    categories: list[str] | None = None


class TrackSimpleResponse(BaseModel):
    id: uuid.UUID
    name: str
    length: int


from schema.album import AlbumSimpleResponse


class TrackResponse(TrackSimpleResponse):
    artists: list[ArtistSimpleResponse]
    album: AlbumSimpleResponse | None = None
    categories: list[CategorySimpleResponse] | None = None
