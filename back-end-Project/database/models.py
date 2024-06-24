from sqlalchemy import Column, Integer, TEXT, ForeignKey, DATE
from .database import Base

class USERS(Base):
    __tablename__ = 'users'
    user_id = Column(Integer, primary_key=True, index=True)
    email = Column(TEXT, nullable=False, unique=True)
    password = Column(TEXT, nullable=False)
    name = Column(TEXT, nullable=True)
    account_rank = Column(TEXT, nullable=False)
    signed_date = Column(DATE, nullable=False)

class TODO(Base):
    __tablename__ = 'to_do'
    todo_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    todo = Column(TEXT, nullable=False)
    date = Column(DATE, nullable=False)