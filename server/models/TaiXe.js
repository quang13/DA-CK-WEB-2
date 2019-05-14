var mongoose = require("mongoose");

var txSchema = new mongoose.Schema({
    MaTaiXe: Number,
    TenTaiXe: String,
    TenDangNhap: String,
    MatKhau: String,
    SoDienThoai: {type: String, maxlength: 11},
    CMND: {type: Number, minlength: 9, maxlength: 9},
    Avatar: String,
    HinhXe: String,
    BienSoXe: String,
    Khoa: Boolean,
    BiXoa: Boolean
});