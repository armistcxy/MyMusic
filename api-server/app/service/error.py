from typing import Any


class StreamError(Exception):
    """Something wrong happens when streaming track"""

    def __init__(self, message: str):
        self.head = "Something wrong happens when streaming track"
        self.message = message

    def __str__(self):
        return f"{self.head}\nmessage:{self.message}"


