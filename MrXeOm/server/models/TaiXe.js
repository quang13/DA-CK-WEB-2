var mongoose = require('mongoose');

var TaiXeSchema = new mongoose.Schema({
    TenDangNhap: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    MatKhau: {
        type: String,
        required: true 
    },
    TenHienThi: {
        type: String,
        required: true       
    },
    Email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    CMND: {
        type: String,
        unique: true,
        required: true
    },
    SoDienThoai: {
        type: String,
        unique: true,
        required: true
    },
    HinhXe: {
        type: String
    },
    BienSoXe: {
        type: String,
        unique: true,
        required: true
    },
    Avatar: {
        type: String,
        trim: true,
    },
    DiaChi: {
        type: String,
        required: true
    },
    NgaySinh: {
        type: String,
        reuiqred: true,
    }
});

module.exports = mongoose.model('TaiXe', TaiXeSchema);