const express = require("express");
const app = express();
const path = require('path');
const cookieParser = require("cookie-parser");
const paypal = require('paypal-rest-sdk');
const bodyParser = require('body-parser');
const dotenv = require("dotenv").config();
const initAPIs = require("./routes/api");
// Cho phép các api của ứng dụng xử lý dữ liệu từ body của request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('assets'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());

//Init Paypal 
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AcNCdOT-BhGE8v1hAoM9axKOTswcGfLUj1mwSHDkeNaufMd5NUb9Q8JyfWlapsXSxo_fZqYe0M4vIus-',
    'client_secret': 'EMKNWdqEg2uxZWKjdWucatnzVlSFVVc78P3tuw72PUhFwhY4kDcJ8oU1CnMMdbT0oVCdwr7UTiiw-wq_'
});



// Khởi tạo các routes cho ứng dụng
initAPIs(app);
// chọn một port mà bạn muốn và sử dụng để chạy ứng dụng tại local
let port = 1999;
app.listen(port, () => {
    console.log(`Server starting in port ${port}!!`);
});