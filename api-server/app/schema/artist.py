from pydantic import BaseModel
import uuid
from fastapi import Response


class ArtistSimpleResponse(BaseModel, Response):
    id: uuid.UUID
    name: str


class ArtistUploadForm(BaseModel):
    name: str
    description: str | None = None


class ArtistResponse(ArtistSimpleResponse):
    description: str | None = None
