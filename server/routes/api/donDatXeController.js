//getall, getbyid, thêm đơn đặt hàng
const router = require('express').Router();
const TaiKhoanDB = require('../../models/taikhoan');
const DonDatXeDB = require('../../models/dondatxe');
const ObjectID = require('mongoose').Types.ObjectId;

//getall
router.get('/', (req, res) =>{
    DonDatXeDB.find({}, (err, data) =>{
        if(!err)
        {
            return res.send(data);
        }
        else{
            return res.send({
                success: false,
                message: 'Lỗi truy vấn dữ liệu'
            });
        }
    });
});
//getbyid
router.get('/:id', (req, res) =>{
    if(!ObjectID.isValid(req.params.id))
    {
        return res.status(400).send(`Không tìm thấy dữ liệu với id: ${req.params.id}`);
    }
    DonDatXeDB.findById(req.params.id, (err, data) =>{
        if(!err)
        {
            return res.send(data);
        }
        else{
            console.log('Error in Retriving DonDatXeDB: ' +JSON.stringify(err, undefined, 2));
        }
    });
});

//thêm đơn đặt xe
//lấy ra MaDonDatXe lớn nhất để tiến hành thêm đơn đặt xe
var ma = DonDatXeDB.find({}).sort({MaDonDatXe: -1}).limit(1);
router.post('/', (req, res) =>{
    var datxe = new DonDatXeDB({
        MaDonDatXe: ma,
        NgayDatCuoc: "",
        TenTaiXe: req.body.TenTaiXe,
        DiemDi: req.body.DiemDi,
        DiemDen: req.body.DiemDen,
        TongTien: req.body.TongTien,
        SoDienThoaiKH: req.body.SoDienThoaiKH,
        TenTinhTrang: req.body.TenTinTrang    
    });
    datxe.save((err, dondat) =>{
        if(!err)
        {
            return res.send({
                success: true,
                message: 'Đã đặt xe.'
            });
        }
        else{
            return res.send({
                success: false,
                message: 'Lỗi server'
            });
        }
    });
});
//nếu chưa có số điện thoại đã đặt xe trong csdl thì cũng lưu nó vào csdl
router.post('/savephone', (req, res) =>{
    if(!TaiKhoanDB.findOne({SoDienThoai: req.body.SoDienThoaiKH}).sort().limit(1))
    {
        res.status(200)
        .send({
            success: true,
            message: 'Không tìm thấy số điện thoại'
        });
    }
    var sdt = new TaiKhoanDB({
        SoDienThoai: req.body.SoDienThoaiKH
    });
    sdt.save((err, dienthoai) =>{
        if(!err)
        {
            return res.send({
                success: true,
                message: 'Thêm thành công vào Database',
            });
        }
        else{
            return res.send({
                success: false,
                message: 'Lỗi server. Không thể truy vấn'
            });
        }
        console.log(dienthoai);
    });
});

module.exports = router;