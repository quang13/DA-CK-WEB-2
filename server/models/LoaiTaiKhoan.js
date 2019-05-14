var mongoose = require("mongoose");

var ltkSchema = new mongoose.Schema({
    MaLoaiTaiKhoan: Number,
    TenLoaitaiKhoan: String
});

module.exports = mongoose.model('LoaiTaiKhoan', ltkSchema);