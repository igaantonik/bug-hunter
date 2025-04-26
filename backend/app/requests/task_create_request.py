from fastapi import UploadFile, File, Form
from typing import List


class TaskCreateRequest:
    def __init__(
        self,
        name: str = Form(..., description="Name of the task"),
        description: str = Form(..., description="Description of the task"),
        files: List[UploadFile] = File(None, description="One or more files"),
    ):
        self.name = name
        self.description = description
        self.files = files or []
