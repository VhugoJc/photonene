#!/bin/bash

# Actualizar e instalar como root
sudo apt update -y && sudo apt upgrade -y
sudo apt install curl git -y

# Ejecutar todo lo demás como el usuario ubuntu
sudo -u ubuntu bash <<'EOF'

# Instalar NVM y Node.js
export NVM_DIR="$HOME/.nvm"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source "$NVM_DIR/nvm.sh"
nvm install 22
nvm use 22
nvm alias default 22

# Clonar el repositorio
git clone https://github.com/VhugoJc/photonene.git /home/ubuntu/photonene

# Instalar dependencias y construir
cd /home/ubuntu/photonene/frontend
npm install
npm run build

# Instalar pm2 y levantar la app
npm install -g pm2
pm2 start npm --name nodeapp -- start

EOF