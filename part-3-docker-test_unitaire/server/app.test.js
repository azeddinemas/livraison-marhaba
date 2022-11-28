const supertest = require('supertest');
const app = require('./index');


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