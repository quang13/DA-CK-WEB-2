const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();


app.use(cookieParser());
app.use(bodyParser.json);
db = mongoose.connect('mongodb://localhost:27017/DatXeOm', {useNewUrlParser: true}, (err) => {
    if(err) throw 'Không thể kết nối đến CSDL!';
    console.log("Kết nối đến cơ sở dữ liệu thành công!");
});

app.listen(3000, console.log('Server is running with port 3000!'));
