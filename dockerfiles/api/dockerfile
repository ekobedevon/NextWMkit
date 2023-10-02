FROM ubuntu:23.10

RUN apt update && \
    apt upgrade -y && \
    apt install -y unzip curl && \
    curl -fsSL https://bun.sh/install | bash && \
    apt clean

# Install NVM
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Set up NVM environment variables
RUN /bin/bash -c "source ~/.nvm/nvm.sh && nvm install 20 && nvm alias default 20 && nvm use default"
