from typing import Annotated

from fastapi import FastAPI, Depends, HTTPException,status, Header
from sqlalchemy.orm import Session

import auth
from database import models, schemas
from database.database import get_db

app = FastAPI(title='TODO LIST PROJECT')

@app.get('/')
def read_root():
    return {"Hello": "World"}

@app.post('/create-user')
def create_user(user: schemas.UserBase, db: Annotated[Session, Depends(get_db)]):
    isTaken = db.query(models.USERS).filter(models.USERS.email == user.email).first()
    if isTaken:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="This user already exists")

    db_user = models.USERS(**user.dict())
    db_user.account_rank = 'newbie'
    db_user.password = auth.hash_password(db_user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

