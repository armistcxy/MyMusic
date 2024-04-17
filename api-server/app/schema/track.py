import uuid
from pydantic import BaseModel
from app.schema.artist import ArtistSimpleResponse
from app.schema.category import CategorySimpleResponse


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


from app.schema.album import AlbumSimpleResponse


class TrackResponse(TrackSimpleResponse):
    artists: list[ArtistSimpleResponse]
    album: AlbumSimpleResponse | None = None
    categories: list[CategorySimpleResponse] | None = None


from app.model import models


def model_to_simple_response(track: models.Track) -> TrackSimpleResponse:
    track_simple_response = TrackSimpleResponse(
        id=track.id,
        name=track.name,
        length=track.length,
    )
    return track_simple_response
