const router = require('express').Router();

router.get('/taikhoan/dangxuat', (req, res) =>{
    req.logOut();
    res.redirect('/');
});