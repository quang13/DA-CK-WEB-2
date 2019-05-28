const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/mean', (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err; /* biểu thức 3 ngôi. Tương ứng với 
    if(err=='object'){
        return err.message;
    }
    else
        return err;
    */
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get TaiKhoan
router.get('/TaiKhoan', (req, res) => {
    connection((db) => {
        db.collection('TaiKhoan')
            .find()
            .toArray()
            .then((TaiKhoan) => {
                response.data = TaiKhoan;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

module.exports = router;