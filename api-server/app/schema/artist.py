from pydantic import BaseModel
import uuid


class ArtistSimpleResponse(BaseModel):
    id: str
    name: str
    artist_image_path: str | None = None


class ArtistUploadForm(BaseModel):
    name: str
    description: str | None = None


class ArtistResponse(ArtistSimpleResponse):
    description: str | None = None
