#!/bin/bash

# Update and install packages as root
sudo apt update -y && sudo apt upgrade -y
sudo apt install curl git -y

# Execute everything else as ubuntu user
sudo -u ubuntu bash <<'EOF'

# Install NVM and Node.js
export NVM_DIR="$HOME/.nvm"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source "$NVM_DIR/nvm.sh"
nvm install 22
nvm use 22
nvm alias default 22

# Clone the repository
git clone https://github.com/VhugoJc/photonene.git /home/ubuntu/photonene

# Install dependencies and build the application
cd /home/ubuntu/photonene/frontend
npm install
npm run build

# Install PM2 and start the application
npm install -g pm2
pm2 start npm --name nodeapp -- start