var mongoose = require("mongoose");

var tkSchema = new mongoose.Schema({
    MaTaiKhoan: Number,
    TenDangNhap: String,
    MatKhau: String,
    TenHienThi: String,
    DiaChi: String,
    SoDienThoai: String,
    Email: String,
    BiXoa: Boolean,
    MaLoaiTaiKhoan: Number
});

module.exports = mongoose.model('TaiKhoan', tkSchema);