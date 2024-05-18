import uuid
from pydantic import BaseModel
from app.schema.artist import ArtistSimpleResponse
from app.schema.category import CategoryResponse


class TrackUploadForm(BaseModel):
    name: str
    length: int
    artists_id: list[uuid.UUID]
    album_id: uuid.UUID | None = None
    categories: list[str] | None = None


class TrackSimpleResponse(BaseModel):
    id: str
    name: str
    length: int
    track_image_path: str | None = None
    artists: list[ArtistSimpleResponse]


from app.schema.album import AlbumSimpleResponse


class TrackResponse(TrackSimpleResponse):
    album: AlbumSimpleResponse | None = None
    categories: list[CategoryResponse] | None = None


class TrackDeleteResponse(BaseModel):
    message: str
