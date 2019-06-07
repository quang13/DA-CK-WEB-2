const router = require('express').Router();
const TaiKhoan = require('../../models/taikhoan');
router.get('/', (req, res) =>{
    TaiKhoan.find({}, (err, data) =>{
        if(!err) {
            res.send(data);
        }
        else {
            console.log('Error in Retriving TaiKhoan: ' +JSON.stringify(err, undefined, 2));
        }
    });
});




module.exports = router;