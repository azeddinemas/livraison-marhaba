# livraison-marhaba

Étape 1 : Installer Docker sur Windows.

Étape 2 : Installer Wsl 2.

Étape 3 : Installer Ubuntu par Microsoft Store.

# Créer un Dockerfile

    FROM node:16
    WORKDIR /app
    COPY package.json .
    RUN npm install
    COPY . ./
    EXPOSE 9001
    CMD ["npm", "start"]

