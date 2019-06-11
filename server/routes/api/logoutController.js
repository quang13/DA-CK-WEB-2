const router = require('express').Router();

router.get('/', (req, res) =>{
    req.session.destroy();
    req.logOut();
    //res.redirect('/');
});

module.exports = router;