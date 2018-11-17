#!/bin/bash

if [ ! -z $(docker ps -q) ] 
then
    echo "Killing all running docker processes"
    docker kill $(docker ps -q)
fi

echo "Running new process"

docker run --rm -t -p 80:8080 jemisonf/msgr_api:latest &