from typing import Optional
from pydantic import BaseModel
from datetime import date, time

class UserBase(BaseModel):
    email: str
    password: str
    '''name: Optional[str]
    account_rank: str
    signed_date: date'''

class UserModel(UserBase):
    user_id: int
    class Config:
        orm_mode = True

class UserCreate(UserBase):
    pass
class Login(BaseModel):
    email: str
    password: str
class TokenData(BaseModel):
    email: Optional[str] = None


class UserUpdate(UserBase):
    pass

class AddToDo(BaseModel):
    todo: str
    status: str
    class Config:
        orm_mode = True

class EditToDo(BaseModel):
    todo: str
    status: str
