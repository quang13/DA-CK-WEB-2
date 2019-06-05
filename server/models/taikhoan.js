const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var taikhoanSchema = new mongoose.Schema({
    MaTaiKhoan: {type: Number, required: true, unique: true, },
    TenDangNhap: {type: String, minlength: 4, maxlength: 32, required: true, unique: true},
    MatKhau: {type: String, minlength: 8, maxlength: 64, required: true},
    TenHienThi: {type: String, maxlength: 128},
    DiaChi: {type: String, required: true},
    SoDienThoai: {type: String, minlength: 10, maxlength: 11, default: SoDienThoai.trim(), required: true, unique: true},
    Email: {type: String, unique: true},
    BiXoa: {type: Boolean, default: false},
    MaLoaiTaiKhoan: {type: Number, default: 1}
});
taikhoanSchema.virtual('mk').set(function(MatKhau){
    this.MatKhau = MatKhau;
})
taikhoan.pre('save', function(next){
    var tk = this;

    //Chỉ băm mật khẩu khi nó được được sửa hay tạo mới
    if(!tk.isModified('MatKhau')) return next();

    // generate a salt
    bcrypt.genSalt(10, (err, salt)=>{
        if(err) return next(err);

        // băm mật khẩu với salt mới là 10 đã được khai báo ở trên!
        bcrypt.hash(tk.MatKhau, salt, function(err, hash){
            if(err) return next(err);

            // ghi đè mật khẩu được băm lên mật khẩu cũ
            tk.MatKhau = hash;
            next();
        });
    });
});

//so sánh mật khẩu
taikhoan.methods.compareMatKhau = function(candidateMatKhau, cb){
    bcrypt.compare(candidateMatKhau, this.MatKhau, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('TaiKhoanDB', taikhoan);
