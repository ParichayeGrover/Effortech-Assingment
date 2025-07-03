from pydantic import BaseModel, EmailStr, Field, validator
import re

class UserCreate(BaseModel):
    first_name: str = Field(..., min_length=1)
    last_name: str = Field(..., min_length=1)
    email: EmailStr
    phone: str = Field(..., pattern=r"^\d{10}$")
    pan: str

    @validator("pan")
    def validate_pan_format(cls, value):
        if not re.match(r"^[A-Z]{5}[0-9]{4}[A-Z]$", value):
            raise ValueError("Invalid PAN format")
        return value

class UserOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    pan: str

    class Config:
        orm_mode = True

class UserUpdate(BaseModel):
    first_name: str = Field(..., min_length=1)
    last_name: str = Field(..., min_length=1)
    email: EmailStr
    phone: str = Field(..., pattern=r"^\d{10}$")
    pan: str

    @validator("pan")
    def validate_pan_format(cls, value):
        import re
        if not re.match(r"^[A-Z]{5}[0-9]{4}[A-Z]$", value):
            raise ValueError("Invalid PAN format")
        return value
