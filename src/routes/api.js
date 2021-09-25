const express = require("express");
const router = express.Router();
const axios = require('axios');
const AuthMiddleWare = require("../middleware/AuthMiddleware");
const AuthController = require("../controllers/AuthController");
const jwtHelper = require("../helpers/jwt.helper");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-example-nmquang";
/**
 * Init all APIs on your application
 * @param {*} app from express
 */
getUser = async (req) => {
    let user = null;
    let token = await jwtHelper.getTokenDecoded(req, accessTokenSecret);
    if (token) {
        let res = await axios.get(`http://localhost:8017/getUser?_id=${token.data._id}`);
        if (res.data._id) {
            user = res.data;
        }
    }
    return user;
}

getAllCategory = async (req) => {
    let categories = null;
    let res = await axios.get(`http://localhost:8017/getAllCategory`);
    if (res.data) {
        categories = res.data;
    }
    return categories;
}
getAllCourse = async (req) => {
    let courses = null;
    let res = await axios.get(`http://localhost:8017/getAllCourse`);
    if (res.data) {
        courses = res.data;
    }
    return courses;
}
getCourseById = async (req) => {
    let course = null;
    
    let res = await axios.get(`http://localhost:8017/getCourseById?_id=${req.query._id}`);
    if (res.data._id) {
        course = res.data;
    }
    return course;
}

getLession = async (req) => {
    let lession = null;
   
    let res = await axios.get(`http://localhost:8017/getLession?course_id=${req.query._id}`);
    console.log(res);
    if (res.data) {
        lession = res.data;
    }
    return lession;
}
let initAPIs = (app) => {

    router.get("/login", async (req, res) => {
        console.log('login');
        let token = await jwtHelper.getTokenDecoded(req, accessTokenSecret);
        if (token) {
            res.redirect('/index');
        }
        else {
            res.render('login');
        }

    });

    router.get("/register", (req, res) => {
        console.log('register');
        res.render('register');
    });

    router.get("/", async (req, res) => {
        console.log('hihi');
        res.render('home/index', { user: await getUser(req) });
    });

    router.get("/active_account", (req, res) => {
        console.log('active_account');
        res.render('home/active_account');
    });

    router.get("/verifyuser", AuthController.verifyUser);

    router.get("/learn", async (req, res) => {
        console.log('learn');
        let user = await getUser(req),
            category = await getAllCategory(req);
        course = await getAllCourse();

        res.render('learn/learn', { user, category });
    });

    router.get("/course", async (req, res) => {
        let user = await getUser(req),
            category = await getAllCategory(),
            // course = await getAllCourse(),
            course = await getCourseById(req),
            lession = await getLession(req);
        if (course) {
            res.render('learn/course', { user, category, course, lession });
        }
        res.redirect('/404');
    });

    router.get("/question", async (req, res) => {
        console.log('question');
        res.render('question/question', { user: await getUser(req) });
    });

    router.get("/donate", async (req, res) => {
        console.log('donate');
        res.render('donate/donate', { user: await getUser(req) });
    });

    router.get("/contact", async (req, res) => {
        console.log('contact');
        res.render('contact/contact', { user: await getUser(req) });
    });

    router.get("/about", async (req, res) => {
        console.log('about');
        res.render('about/about', { user: await getUser(req) });
    });

    router.get("/supporters", async (req, res) => {
        console.log('supporters');
        res.render('donate/supporters', { user: await getUser(req) });
    });

    // Sử dụng authMiddleware.isAuth trước những api cần xác thực
    // router.use(AuthMiddleWare.isAuth);
    // List Protect APIs:
    router.get('*', function (req, res) {
        res.render('404/404');
    });

    router.get("/404", async (req, res) => {
        res.render('404/404');
    });

    return app.use("/", router);
}

module.exports = initAPIs;