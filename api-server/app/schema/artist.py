from pydantic import BaseModel
import uuid
from app.model import models


class ArtistSimpleResponse(BaseModel):
    id: uuid.UUID
    name: str


class ArtistUploadForm(BaseModel):
    name: str
    description: str | None = None


class ArtistResponse(ArtistSimpleResponse):
    description: str | None = None


