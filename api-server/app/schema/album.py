from pydantic import BaseModel
import uuid


class AlbumSimpleResponse(BaseModel):
    id: uuid.UUID
    name: str
