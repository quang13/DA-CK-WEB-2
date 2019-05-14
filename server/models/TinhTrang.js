var mongoose = require("mongoose");

var ttSchema = new mongoose.Schema({
    MaTinhTrang: Number,
    TenTinhTrang: String
});

module.exports = mongoose.model('TinhTrang', ttSchema);