from pydantic import BaseModel
import uuid
from app.model import models


class ArtistSimpleResponse(BaseModel):
    id: uuid.UUID
    name: str


class ArtistDetailResponse(ArtistSimpleResponse):
    description: str
