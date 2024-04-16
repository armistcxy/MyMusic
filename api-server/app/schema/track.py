import uuid
from pydantic import BaseModel
from schema.artist import ArtistSimpleResponse
from schema.category import CategorySimpleResponse
from schema.album import AlbumSimpleResponse


class TrackUploadForm(BaseModel):
    name: str
    length: int
    artists_id: list[uuid.UUID]
    album_id: uuid.UUID | None = None
    categories: list[str] | None = None


class TrackResponse(BaseModel):
    id: uuid.UUID
    name: str
    length: int
    artists: list[ArtistSimpleResponse]
    album: AlbumSimpleResponse | None = None
    categories: list[CategorySimpleResponse] | None = None
