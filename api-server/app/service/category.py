from app.model import models
import app.repository.category as category_repo
from app.repository.repo import get_session
import app.schema.utils as schema_utils
import uuid
from app.schema.category import CategoryResponse, CategoryUploadForm, CategoryUpdateForm

# create, get, update, delete category


def insert_category(upload_form: CategoryUploadForm) -> CategoryResponse:
    session = get_session()
    category = models.Category(name=upload_form.name)
    category = category_repo.insert_category(session=session, category=category)
    response = schema_utils.category_model_to_response(category)
    session.close()
    return response


def get_category_by_id(id: uuid.UUID) -> CategoryResponse | None:
    session = get_session()
    category = category_repo.get_category_by_id(session=session, id=id)
    response = schema_utils.category_model_to_response(category)
    session.close()
    return response


def get_category_by_name(name: str) -> CategoryResponse | None:
    session = get_session()
    category = category_repo.get_category_by_name(session=session, name=name)
    response = schema_utils.category_model_to_response(category)
    session.close()
    return response


def get_all_categories() -> list[CategoryResponse]:
    session = get_session()
    categories = category_repo.get_all_categories(session=session)
    response = list(map(schema_utils.category_model_to_response, categories))
    session.close()
    return response


def find_category_with_name(name: str) -> list[CategoryResponse]:
    session = get_session()
    categories = category_repo.find_category_with_name(session=session, name=name)
    session.close()
    return categories


def update_category(update_form: CategoryUpdateForm) -> CategoryResponse:
    session = get_session()
    # category = category_repo
    session.close()
    pass


def delete_category_by_id(id: uuid.UUID):
    session = get_session()
    category_repo.delete_category(session=session, id=id)
    session.close()
