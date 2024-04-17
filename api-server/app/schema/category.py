from pydantic import BaseModel
import uuid


class CategoryResponse(BaseModel):
    id: uuid.UUID
    name: str
