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

# How to test your application using the unit test

## 1 -  Installer la bibliothèque jest et supertest
    npm i --save-dev jest supertest
    
## 2 - créer un fichie test.test.js
    const supertest = require('supertest');
    const app = require('./index');
    
## 3 creation d'une function describe de login et inscription

    describe('register geven email && password', () => { 
        test('email already existe', async () => { 
            const body = {
                email : "duxu@mailinator.com",
            }
            const response = await supertest(app).post("/api/auth/register").send(body)
            expect(response.text).toBe('this email already exist')
        })
        test('created success', async () => {
            const body = {
                name : 'sara',
                prenom : 'msl',
                email : '66b35d846@inbxmail.life',
                password : '1111',
                role : 'client',
                confirmed : true
            }
            const response = await supertest(app).post('/api/auth/register').send(body)
            expect(response.text).toBe('created success')
        })
    })

    describe('login given email and password', () => {
        test('email not confirmed', async () => { 
            const body = {
                email : '7a3ee259a8@inboxmail.life'
            }
            const response = await supertest(app).post("/api/auth/login").send(body)
            expect(response.text).toBe('your email not confirmed')
        })

        test('email not found', async() => { 
            const body = {
                email : "duu@mailinator.comA"
            }
            const response = await supertest(app).post('/api/auth/login').send(body)
            expect(response.text).toBe('email incorrect')
        })

        test('password incorrect', async () => { 
            const body = {
                email : '66b35d8746@inboxmail.life',
                password : '11111'
            }
            const response = await supertest(app).post("/api/auth/login").send(body)
            expect(response.text).toBe('password incorrect')
        })

    })
 
## 4 - execution de test
    npm test



    
