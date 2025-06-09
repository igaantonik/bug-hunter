from fastapi import Form
from typing import List


class TaskCreateRequest:
    def __init__(
        self,
        name: str = Form(..., description="Name of the task"),
        description: str = Form(..., description="Description of the task"),
        files: List[str] = Form(None, description="One or more files id"),
        allowed_time: int = Form(300, description="Allowed time for the task in seconds. 0 means no limit")
    ):
        self.name = name
        self.description = description
        self.files = files or []
        self.allowed_time = allowed_time
