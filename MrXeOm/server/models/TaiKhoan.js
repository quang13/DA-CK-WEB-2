var mongoose = reqruire('mongoose');

var TaiKhoanSchema = new mongoose.Schema({
    MaTaiKhoan: {
        type: Number,
        unique: true,
        required: true,
    },
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
    DiaChi: {
        type: String,
        required: false,
        trim: true
    },
    SoDienThoai: {
        type: String,
        required: true,
        unique: true
    },
    GioiTinh: {
        type: String
    },
    NgaySinh: {
        type: String
    }
});

module.exports = mongoose.model('TaiKhoan', TaiKhoanSchema);