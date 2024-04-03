@echo off

REM Specify the name for the Docker image and container
set IMAGE_NAME=sabspl-frontend:latest
set CONTAINER_NAME=sabspl-frontend

REM run docker client in case if it is not up
echo Starting Docker...
start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"

REM Delete existing Docker container
docker container stop %CONTAINER_NAME% 2>nul
docker container rm %CONTAINER_NAME% 2>nul

REM Delete existing Docker image
docker image rm %IMAGE_NAME% -f 2>nul

REM Rebuild Docker image
docker build -t %IMAGE_NAME% .

REM Remove untagged images
docker image prune -f --filter "dangling=true"

REM Run Docker Compose to bring up containers
start "sabspl-frontend" docker run -p 4200:4200 --name %CONTAINER_NAME% %IMAGE_NAME%

exit