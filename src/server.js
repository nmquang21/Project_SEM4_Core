const express = require("express");
const app = express();
const path = require('path');
const cookieParser = require("cookie-parser");

const dotenv =require("dotenv").config();
const initAPIs = require("./routes/api");
// Cho phép các api của ứng dụng xử lý dữ liệu từ body của request

app.use(express.json());
app.use(express.static('public'));
app.use(express.static('assets'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());
// Khởi tạo các routes cho ứng dụng
initAPIs(app);
// chọn một port mà bạn muốn và sử dụng để chạy ứng dụng tại local
let port = 1999;
app.listen(port, () => {
    console.log(`Server starting in port ${port}!!`);
});