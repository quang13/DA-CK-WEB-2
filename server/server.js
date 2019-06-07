const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(expressSession());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// API routes
//require('./routes')(app);
require('./routes');
mongoose.connect('mongodb://localhost:27017/DatXeOm', {useNewUrlParser: true}, (err) => {
    if(err) throw err;
    console.log("Kết nối đến cơ sở dữ liệu thành công!");
});

app.listen(PORT, console.log('Server is running with port 3000!'));
