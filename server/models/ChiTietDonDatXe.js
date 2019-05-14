var mongoose = require("mongoose");

var ctdatxeSchema = mongoose.Schema({
    MaChiTietDatXe: Number,
    SoKm: Number,
    Gia1Km: 2000,
    MaDonDatXe: Number,
    MaTaiXe: Number,
});

module.exports = mongoose.model('ChiTietDonDatHang', ctdatxeSchema);