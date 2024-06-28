from datetime import datetime, timedelta, date
from typing import Annotated, List
from fastapi import FastAPI, Depends, HTTPException,status, Header
from fastapi.security import OAuth2PasswordRequestForm
from jose import JWTError
from sqlalchemy.orm import Session
from starlette.middleware.cors import CORSMiddleware
import auth
from database import models, schemas
from database.database import get_db, engine


app = FastAPI(title='TODO LIST PROJECT')
models.Base.metadata.create_all(bind=engine)
origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get('/')
def read_root():
    return {"Hello": "World"}

@app.post('/create-user')
async def create_user(user: schemas.UserBase, db: Annotated[Session, Depends(get_db)]):
    isTaken = db.query(models.USERS).filter(models.USERS.email == user.email).first()
    if isTaken:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="This user already exists")

    db_user = models.USERS(**user.dict())
    db_user.account_rank = 'newbie'
    db_user.password = auth.hash_password(db_user.password)
    db_user.signed_date = datetime.utcnow().date()
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post('/login-token')
async def login_for_access_token(form_data: schemas.Login, db: Annotated[Session, Depends(get_db)]):
    user = db.query(models.USERS).filter(models.USERS.email == form_data.email).first()
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
@app.get("/loged-user")
async def get_current_user(db: Annotated[Session, Depends(get_db)], token: str = Header(...)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = auth.jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(models.USERS).filter(models.USERS.email == email).first()
    if user is None:
        raise credentials_exception
    return user

@app.put('/user-update/{user_id}', response_model=schemas.UserUpdate)
def update_user(user: schemas.UserUpdate, db: Annotated[Session, Depends(get_db)]):
    db_user = db.query(models.USERS).filter(models.USERS.email == user.email).first()
    if not db_user:
        raise HTTPException(status_code= status.HTTP_404_NOT_FOUND, detail="User not found")
    for key, value in user.dict(exclude_unset=True).items():
        setattr(db_user, key, value)
    db_user.password = auth.hash_password(db_user.password)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get('/list-of-todos/{user_id}')
def get_todos(user_id: int, db: Annotated[Session, Depends(get_db)]):
    db_todo = db.query(models.TODO).filter(models.TODO.user_id == user_id).all()
    return db_todo

@app.post('/add-todo/{user_id}')
def add_todo(user_id: int, todo: schemas.AddToDo, db: Annotated[Session, Depends(get_db)]):
    if todo.todo == '' or todo.todo == "":
        raise HTTPException('ToDo not exist')
    db_todo = models.TODO(**todo.dict())
    db_todo.user_id = user_id
    db_todo.date = datetime.now()
    db_todo.status = 'false'
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo
