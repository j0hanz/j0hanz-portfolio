FROM gitpod/workspace-base

# Environment variables
ENV NODE_VERSION=22.13.0
ENV NVM_DIR="/home/gitpod/.nvm"
ENV PATH="$NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH"

# Update and install common dependencies and essential development tools
RUN sudo apt-get update && sudo apt-get upgrade -y && \
    sudo apt-get install -y --no-install-recommends \
    curl wget gnupg software-properties-common \
    build-essential libssl-dev libffi-dev zlib1g-dev && \
    sudo apt-get clean && sudo rm -rf /var/lib/apt/lists/*

# Node.js setup
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash && \
    . "$NVM_DIR/nvm.sh" && \
    nvm install $NODE_VERSION && \
    nvm use $NODE_VERSION && \
    npm install -g npm@latest pnpm@latest typescript yarn node-gyp && \
    echo "source $NVM_DIR/nvm.sh" >> /home/gitpod/.bashrc

# Allow React to run on Gitpod
ENV DANGEROUSLY_DISABLE_HOST_CHECK=true

# Final cleanup
RUN sudo apt-get autoremove -y && sudo apt-get clean -y
