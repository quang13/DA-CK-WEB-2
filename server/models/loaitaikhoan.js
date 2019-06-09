const mongoose = require('mongoose');
var ltk = new mongoose.Schema({
    MaLoaiTaiKhoan: Number,
    TenLoaiTaiKhoan: String
})
module.exports = mongoose.model('loaitaikhoan', ltk);