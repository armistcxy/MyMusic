from fastapi import APIRouter
from app.schema.category import CategoryResponse, CategoryUploadForm, CategoryUpdateForm
import app.service.category as category_service
import uuid

category_router = APIRouter(prefix="/categories", tags=["Category"])


@category_router.post("/", response_model=CategoryResponse)
def create_category(upload_form: CategoryUploadForm):
    response = category_service.insert_category(upload_form)
    return response


@category_router.get("/", response_model=list[CategoryResponse])
def get_all_categories():
    response = category_service.get_all_categories()
    return response


@category_router.get("/{id}", response_model=CategoryResponse)
def get_category_by_id(id: uuid.UUID):
    response = category_service.get_category_by_id(id)
    return response


@category_router.get("/find/{name}", response_model=list[CategoryResponse])
def find_category_with_name(name: str):
    response = category_service.find_category_with_name(name)
    return response


@category_router.delete("/{id}")
def delete_category_by_id(id: uuid.UUID):
    category_service.delete_category_by_id(id)
