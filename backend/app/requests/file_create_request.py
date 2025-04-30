from fastapi import UploadFile, File, Form
from typing import List


class FileCreateRequest:
    def __init__(
        self,
        file: UploadFile = File(..., description="One file to upload"),
        predefined_smells: List[str] = Form(
            None, description="List of predefined smells"
        ),
    ):

        self.file = file
        self.predefined_smells = predefined_smells or []
