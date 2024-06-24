from datetime import timedelta
from typing import Annotated

from fastapi import FastAPI, Depends, HTTPException,status, Header
from fastapi.security import OAuth2PasswordRequestForm
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

@app.post('/login-token')
async def login_for_access_token(db: Annotated[Session, Depends(get_db)], form_data: OAuth2PasswordRequestForm = Depends()):
    user = db.query(models.USERS).filter(models.USERS.email == form_data.username).first()
    if not user or not auth.verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"}
        )
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {
        "message": "Login Successful",
        "user_detail": user,
        "access_token": access_token, "token_type": "bearer"
    }