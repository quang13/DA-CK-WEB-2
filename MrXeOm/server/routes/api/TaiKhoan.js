const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const io = require('socket.io');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const app = express();

//connect to database
MongoClient.connect('mongodb://localhost:27017/DatXeOm');
app.use()
