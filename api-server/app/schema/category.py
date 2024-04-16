from pydantic import BaseModel
import uuid


class CategorySimpleResponse(BaseModel):
    id: uuid.UUID
    name: str
