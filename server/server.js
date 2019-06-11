const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
//const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 8080;
//const configToken = require('./routes/api/configToken');
//API routes
const api = require('./routes/api/main');
const FileStore = require('session-file-store')(session);
//set secret
// app.set('Secret', configToken.secret);
let options;
app.use(cookieParser()); // đọc cookie (cần cho xác thực)
app.use(session({
    store: new FileStore(options),
    secret: 'DatXeOm'
})); // chuỗi bí mật đã bị mã hoá
app.use(bodyParser.json()); // lấy thông tin từ html forms chuyển về json
app.use(bodyParser.urlencoded({extended: false}));
//kết nối đên database
mongoose.connect('mongodb://localhost:27017/DatXeOm', {useNewUrlParser: true}, (err) => {
    if(err) throw err;
    console.log("Kết nối đến cơ sở dữ liệu thành công!");
});
//Sử dụng API
app.use('/api/', api);
app.listen(port, console.log('Server đang chạy với cổng: ' +port));
module.exports = app;
