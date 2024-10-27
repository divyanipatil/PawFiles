from fastapi import FastAPI, File, UploadFile
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files directory
app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/")
async def read_root():
    with open('static/index.html') as f:
        return HTMLResponse(content=f.read())


@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    # Read the file content to get its size
    contents = await file.read()
    size = len(contents)

    # Reset the file pointer for future use if needed
    await file.seek(0)

    return {
        "filename": file.filename,
        "size": size,
        "content_type": file.content_type
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)