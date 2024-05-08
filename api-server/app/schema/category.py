from pydantic import BaseModel
import uuid


class CategoryUploadForm(BaseModel):
    name: str


class CategoryUpdateForm(BaseModel):
    name: str


class CategoryResponse(BaseModel):
    id: uuid.UUID
    name: str
