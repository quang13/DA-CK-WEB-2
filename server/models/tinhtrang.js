const mongoose = require('mongoose');

var tt = new mongoose.Schema({
    MaTinhTrang: Number,
    TenTinhTrang: String
});

module.exports = mongoose.model('tinhtrang', tt);