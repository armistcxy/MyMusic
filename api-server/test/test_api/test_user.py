from test.test_api import client
from fastapi import status


def test_register_user_01():
    payload = {
        "name": "iwa2no",
        "email": "iwa2no@gmail.com",
        "password": "Clock-123456789",
    }

    response = client.post("/users/register", json=payload)

    json_resp = response.json()
    assert response.status_code == status.HTTP_201_CREATED
    assert json_resp["username"] == payload["name"]
    assert json_resp["email"] == payload["email"]

    json = {
        "email": "iwa2no@gmail.com",
        "password": "Clock-123456789",
    }
    response = client.post("/users/login/", json=json)

    access_token = response.json()["access_token"]

    assert access_token is not None

    header_auth = {"Authorization": f"Bearer {access_token}"}
    client.delete("/users/profile/delete", headers=header_auth)


def test_register_user_02():
    payload = {
        "name": "hoang123",
        "email": "hoang123@gmail.com",
        "password": "Clock-123456789",
    }

    response = client.post("/users/register", json=payload)

    json_resp = response.json()
    assert response.status_code == status.HTTP_201_CREATED
    assert json_resp["username"] == payload["name"]
    assert json_resp["email"] == payload["email"]

    json = {
        "email": "hoang123@gmail.com",
        "password": "Clock-123456789",
    }
    response = client.post("/users/login/", json=json)

    access_token = response.json()["access_token"]

    assert access_token is not None

    header_auth = {"Authorization": f"Bearer {access_token}"}
    client.delete("/users/profile/delete", headers=header_auth)


def test_register_user_03():
    payload = {
        "name": "hoang123",
        "email": "hoang123@gmail.com",
        "password": "Clock-123456789",
    }
    client.post("/users/register", json=payload)

    payload = {
        "name": "just_another_name",
        "email": "hoang123@gmail.com",
        "password": "Clock-of-time-12345",
    }

    response = client.post("/users/register", json=payload)

    json = {
        "email": "hoang123@gmail.com",
        "password": "Clock-123456789",
    }
    response = client.post("/users/login/", json=json)

    access_token = response.json()["access_token"]

    header_auth = {"Authorization": f"Bearer {access_token}"}
    client.delete("/users/profile/delete", headers=header_auth)

    assert response.status_code == status.HTTP_409_CONFLICT


def test_user_login_01():
    payload = {
        "name": "hoang123",
        "email": "hoang123@gmail.com",
        "password": "Clock-123456789",
    }
    client.post("/users/register", json=payload)

    json = {
        "email": "iwa2no@gmail.com",
        "password": "Clock-123456789",
    }
    response = client.post("/users/login/", json=json)

    access_token = response.json()["access_token"]

    assert access_token is not None

    access_token = response.json()["access_token"]

    header_auth = {"Authorization": f"Bearer {access_token}"}
    client.delete("/users/profile/delete", headers=header_auth)


def test_user_login_02():
    payload = {
        "name": "hoang123",
        "email": "hoang123@gmail.com",
        "password": "Clock-123456789",
    }
    client.post("/users/register", json=payload)

    json = {
        "email": "hoang123@gmail.com",
        "password": "Clock-123456789",
    }
    response = client.post("/users/login/", json=json)

    access_token = response.json()["access_token"]

    assert access_token is not None

    response = client.post("/users/login/", json=json)

    header_auth = {"Authorization": f"Bearer {access_token}"}
    client.delete("/users/profile/delete", headers=header_auth)


def test_delete_user():
    payload = {
        "name": "iwa2no",
        "email": "iwa2no@gmail.com",
        "password": "Clock-123456789",
    }
    client.post("/users/register", json=payload)

    json = {
        "email": "iwa2no@gmail.com",
        "password": "Clock-123456789",
    }
    response = client.post("/users/login/", json=json)

    access_token = response.json()["access_token"]

    header_auth = {"Authorization": f"Bearer {access_token}"}
    response = client.delete("/users/profile/delete", headers=header_auth)

    assert response.status_code == status.HTTP_200_OK
