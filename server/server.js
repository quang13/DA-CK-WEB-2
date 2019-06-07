const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
//const passport = require('passport');
const app = express();
const port = process.env.PORT || 8080;
const FileStore = require('session-file-store')(session);
let options;
app.use(cookieParser()); // đọc cookie (cần cho xác thực)
app.use(session({
    store: new FileStore(options),
    secret: 'DatXeOm'
})); // chuỗi bí mật đã bị mã hoá
//app.use(passport.initialize()); // khởi tạo xác thực
//app.use(passport.session()); //cho các phiên đăng nhập liên tục
app.use(bodyParser.json()); // lấy thông tin từ html forms chuyển về json
app.use(bodyParser.urlencoded({extended: false}));
// API routes
//require('./routes')(app);
require('./routes');
//kết nối đên database
mongoose.connect('mongodb://localhost:27017/DatXeOm', {useNewUrlParser: true}, (err) => {
    if(err) throw err;
    console.log("Kết nối đến cơ sở dữ liệu thành công!");
});

app.listen(port, console.log('Server is running with port 3000!'));
