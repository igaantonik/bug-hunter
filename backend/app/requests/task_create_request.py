from fastapi import UploadFile, File, Form
from typing import List


class TaskCreateRequest:
    def __init__(
        self,
        name: str = Form(..., description="Name of the task"),
        description: str = Form(..., description="Description of the task"),
        files: List[str] = Form(None, description="One or more files id"),
    ):
        self.name = name
        self.description = description
        self.files = files or []
