const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex =require('knex')
const bcrypt = require('bcrypt');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');



const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Devil@123',
    database : 'smart_brain'
  }
});


const app = express();
app.use(bodyParser.json());
app.use(cors());



app.get('/',(req,res)=>{res.send(database.user[0])})

app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})

app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})

app.put('/image',(req,res)=>{image.handleImage(req,res,db)})

app.listen(3001, () =>{
	console.log('app is running on port 3001');
})