from pydantic import BaseModel
import uuid
from app.model import models


class ArtistSimpleResponse(BaseModel):
    id: uuid.UUID
    name: str


class ArtistDetailResponse(ArtistSimpleResponse):
    description: str


def model_to_simple_response(artist: models.Artist) -> ArtistSimpleResponse:
    artist_simple_response = ArtistSimpleResponse(
        id=artist.id,
        name=artist.name,
    )
    return artist_simple_response


def model_to_detail_response(artist: models.Artist) -> ArtistDetailResponse:
    artist_detail_response = ArtistDetailResponse(
        id=artist.id,
        name=artist.name,
        description=artist.description,
    )
    return artist_detail_response
