const mongoose = require('mongoose');
let date = new Date();
var ddx = new mongoose.Schema({
    MaDonDatXe: {type: Number, unique:true, required: true},
    NgayDatCuoc: {type: Date, required: true, default: date},
    TenTaiXe: {type: String, required: true},
    DiemDi: {type: String, required: true},
    DiemDen: {type: String, required: true},
    TongTien: {type: Number, required: true, min: 0},
    SoDienThoaiKH: {type: Number, required: true},
    TenTinhTrang: {type: String, required: true}
});

module.exports = mongoose.model('dondatxe', ddx);