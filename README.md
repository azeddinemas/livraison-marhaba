# livraison-marhaba

Étape 1 : Installer Docker sur Windows.

Étape 2 : Installer Wsl 2.

Étape 3 : Installer Ubuntu par Microsoft Store.

# Créer un Dockerfile

    FROM node:16
    WORKDIR /app
    COPY . ./
    RUN npm install
    EXPOSE 5000
    CMD ["npm", "start"]

### Créer un network, et lui donner le nom de livraison-marhaba-net

    docker network create livraison-marhaba-net

### Executez un container basé sur l'image mongo, nommez-le livraison-marhaba-db et faites-le utiliser avec le network livraison-marhaba-net

    docker container run -d --name livraison-marhaba-db -v livraison-marhaba-db:/data/db --network livraison-marhaba-net mongo
    
### Entrer dans le dossier du serveur où se trouver Dockerfile et creer cette image et nommez-la livraison-marhaba-docker:test et faire un build

    docker build -t livraison-marhaba-docker:test .
    
### Exécutez un container basé sur cette image que vous venez de créer, nommez-le livraison-marhaba et faites-le utiliser avec le network livraison-marhaba-net.

    docker container run -d --name livraison-marhaba -v ${pwd}:/app -v /app/node_modules --network livraison-marhaba-net -p 5000:5000 livraison-marhaba-docker:test
    
