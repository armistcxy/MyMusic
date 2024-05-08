from fastapi import APIRouter
import uuid

user_router = APIRouter(prefix="/users", tags=["User"])


@user_router.get("/{id}")
def get_user_by_id(id: uuid.UUID):
    pass


@user_router.get("/")
def get_all_users():
    pass


@user_router.get("/search/{name}")
def find_users_with_name(name: str):
    pass


@user_router.post("/")
def register_user():
    pass


@user_router.get("/login")
def login_user():
    pass


@user_router.delete("/{id}")
def delete_user(id: uuid.UUID):
    pass
