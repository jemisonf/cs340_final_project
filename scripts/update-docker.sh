#!/bin/bash

# Used to restart a single msgr api container running on a server
# First kills all running containers named msgr_api then starts a new container with the name msgr_api

msgr_container=$(docker ps -a -q --filter name="msgr_api")

if [ ! -z $msgr_container ] 
then
    echo "Stopping and removing running container"
    docker stop -t 0 $msgr_container
    docker rm msgr_api
else
    echo "No running process found -- if run fails, it may have been killed but not removed"
fi

echo "Starting new container"

docker run -d --name "msgr_api" -p 80:5000 -v /home/ec2-user/cs340_final_project/api/flask_app/configuration.py:/app/configuration.py jemisonf/msgr_api:latest
