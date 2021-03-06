# msgr API
This is a Flask application that serves as a REST API for ***msgr***. It handles interfacing with the database and serves requests to certain endpoints. For more information, view the OpenAPI specification contained in [openapi.yaml](./openapi.yaml). The contents in this file can be pasted into the editor at [https://editor.swagger.io](https://editor.swagger.io/) for viewing.

## Usage

### Docker

1. Build the Docker image

```shell
$ docker build -t msgr_api .
```

2. Run the Docker container

```shell
$ docker run -d \
    --name msgr_api \
    -p 80:5000 \
    -v ./flask-app/configuration.py:/app/configuration.py \
    msgr_api
```

### Locally
See [flask-app/readme.md](./flask-app/readme.md).
