# Makefile for Next.js Docker operations

# Variables
IMAGE_NAME ?= media-frontend
IMAGE_TAG ?= latest
CONTAINER_NAME ?= media-frontend-container
PORT ?= 3000

# Build the Docker image
build:
	docker build -t $(IMAGE_NAME):$(IMAGE_TAG) .

# Run the Docker container
run:
	docker run -d --name $(CONTAINER_NAME) -p $(PORT):3000 $(IMAGE_NAME):$(IMAGE_TAG)

# Log the container output
log:
	docker logs -f $(CONTAINER_NAME)

# Stop and remove the Docker container
stop:
	docker stop $(CONTAINER_NAME) || true
	docker rm $(CONTAINER_NAME) || true

# Push the Docker image to a registry
push:
	docker push $(IMAGE_NAME):$(IMAGE_TAG)

# Clean up dangling Docker images
clean:
	docker image prune -f

# Display available make commands
help:
	@echo "Available commands:"
	@echo "  make build         Build the Docker image"
	@echo "  make run           Run the Docker container"
	@echo "  make stop          Stop and remove the Docker container"
	@echo "  make push          Push the Docker image to a registry"
	@echo "  make clean         Remove dangling Docker images"
	@echo "  make help          Display this help message"
