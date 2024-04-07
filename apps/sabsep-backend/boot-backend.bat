@echo off

REM run docker client in case if it is not up
echo Starting Docker...
start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"

REM Remove previous app log
SET LOG_FILE_PATH="%cd%\app-data\app.log"
IF EXIST %LOG_FILE_PATH% DEL /F %LOG_FILE_PATH%

REM Remove untagged images
docker image prune -f --filter "dangling=true"

REM Run Docker Compose to bring up containers
start "sabsep-backend" docker-compose -f ./dockerfiles/compose.yml  up --build