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
class TokenData(BaseModel):
    email: Optional[str] = None


class UserUpdate(UserBase):
    pass
