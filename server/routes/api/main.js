const admin = require('./adminController');
const member = require('./memberController');
const dangnhap = require('./dangnhapController');
const dondathang = require('./donDatHangController');
const loaitaikhoan = require('./loaiTaiKhoanController');
const taixe = require('./taixeController');
const dangxuat = require('./logoutController');
const dangki = require('./dangkiController');
const tinhtrang = require('./tinhTrangController');
var express = require("express");

//khởi tạo express
var app = express();

app.use("/admin", admin);
app.use("/member", member);
app.use("/taixe", taixe);
app.use('/dangnhap', dangnhap);
app.use('/dangki', dangki);
app.use('/dangxuat', dangxuat);
//app.use('/tinhtrang', tinhtrang);
app.use('/loaitaikhoan', loaitaikhoan);
app.use('/dondathang', dondathang);

module.exports = app;