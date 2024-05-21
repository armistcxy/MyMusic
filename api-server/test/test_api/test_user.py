from test.test_api import client
from fastapi import status


def test_register_user():
    json = {
        "name": "iwa2no",
        "email": "iwa2no@gmail.com",
        "password": "Clock-123456789",
    }

    response = client.post("/users/register", json=json)

    json_resp = response.json()
    assert response.status_code == status.HTTP_201_CREATED
    assert json_resp["username"] == json["name"]
    assert json_resp["email"] == json["email"]

    # json = {
    #     "email": "iwa2no@gmail.com",
    #     "password": "Clock-123456789",
    # }
    # response = client.post("/users/login/", json=json)
    
    # json_resp = response.json()
    # access_token = json_resp["access_token"]
    
