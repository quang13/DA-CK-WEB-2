var mongoose = require('mongoose');

var LoaiTaiKhoanSchema = new mongoose.Schema({
    MaLoaiTaiKhoan: {
        type: Number,
        unique: true,
        default: 1,
        required: true
    },
    TenLoaiTaiKhoan: {
        type: String,
        required: true,
        unique: true,
        default: "Khách hàng",
    }
});

module.exports = mongoose.model('LoaiTaiKhoan', LoaiTaiKhoanSchema);