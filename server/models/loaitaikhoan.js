const mongoose = require('mongoose');
let ltk = new mongoose.Schema({
    MaLoaiTaiKhoan: Number,
    TenLoaiTaiKhoan: String
})
module.exports = mongoose.model('LoaiTaiKhoanDB', ltk);