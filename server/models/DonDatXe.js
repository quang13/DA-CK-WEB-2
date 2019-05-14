var mongoose = require("mongoose");

var datxeSchema = new mongoose.Schema({
    MaDonDatXe: Number,
    NgayLap: {type: Date, dafault: Date.now},
    DiemDi: String,
    DiemDen: String,
    TongTien: Number,
    MaTaiXe: Number,
    MaKhachHang: Number,
    MaTinhTrang:Number
});

module.exports = mongoose.model('DonDatXe', datxeSchema);