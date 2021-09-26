const express = require("express");
const router = express.Router();
const axios = require('axios');
const AuthMiddleWare = require("../middleware/AuthMiddleware");
const AuthController = require("../controllers/AuthController");
const jwtHelper = require("../helpers/jwt.helper");
const paypal = require('paypal-rest-sdk');
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
    if (res.data) {
        lession = res.data;
    }
    return lession;
}
insertSupporter = async (param) => {
    console.log(param)
    let res = await axios.post(`http://localhost:8017/insertSupporter`, param);
    // console.log(res);
    if (res.data) {
        return true;
    }
    return false;
}
getSupporter = async (req) => {
    let supporter = null;

    let res = await axios.get(`http://localhost:8017/getAllSupporter`);
    if (res.data) {
        supporter = res.data;
    }
    return supporter;
}

getCourseComment = async (req) => {
    let comment = null;

    let res = await axios.get(`http://localhost:8017/getCourseComment?course_id=${req.query._id}`);
    if (res.data) {
        comment = res.data;
    }
    return comment;
}

getCourseRate = async (req) => {
    let rate = null;
    let res = await axios.get(`http://localhost:8017/getCourseRate?course_id=${req.query._id}`);
    if (res.data) {
        rate = res.data;
    }
    return rate;
}

getCourseSave = async (user_id) => {
    let courseSave = null;
    let res = await axios.get(`http://localhost:8017/getCourseSave?user_id=${user_id}`);
    if (res.data) {
        courseSave = res.data;
    }
    return courseSave;
}

getCourseSaveById = async (user_id, course_id) => {
    let courseSave = null;
    let res = await axios.get(`http://localhost:8017/getCourseSaveById?user_id=${user_id}&course_id=${course_id}`);
    if (res.data) {
        courseSave = res.data;
    }
    return courseSave;
}
getCourseJoinById = async (user_id, course_id) => {
    let courseJoin = null;
    let res = await axios.get(`http://localhost:8017/getCourseJoinById?user_id=${user_id}&course_id=${course_id}`);
    if (res.data) {
        courseJoin = res.data;
    }
    return courseJoin;
}

getAllCourseBookMark = async (user_id) => {
    let courses = null;
    let res = await axios.get(`http://localhost:8017/getAllCourseBookMark?user_id=${user_id}`);
    if (res.data) {
        courses = res.data;
    }
    return courses;
}

getAllCourseHistory = async (user_id) => {
    let courses = null;
    let res = await axios.get(`http://localhost:8017/getAllCourseHistory?user_id=${user_id}`);
    if (res.data) {
        courses = res.data;
    }
    return courses;
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
            category = await getAllCategory(req),
            courseSave = null,
            course = await getAllCourse();
        if (user) {
            courseSave = await getCourseSave(user._id);
            if (courseSave) {
                courseSave.forEach(element => {
                    courseItem = course.find(x => x._id === element.course_id);
                    courseItem.isSaved = true;
                });
            }
        }

        res.render('learn/learn', { user, category, course });
    });

    router.get("/course", async (req, res) => {
        let user = await getUser(req),
            category = await getAllCategory(),
            // course = await getAllCourse(),
            course = await getCourseById(req),
            lession = await getLession(req),
            comment = await getCourseComment(req),
            rate = await getCourseRate(req),
            courseSave = null,
            courseJoin = null;

        if (user) {
            courseSave = await getCourseSaveById(user._id, req.query._id);
            courseJoin = await getCourseJoinById(user._id, req.query._id);
        }
        if (courseSave) {
            course.isSaved = true;
        }
        if (courseJoin) {
            course.isJoined = true;
        }
        console.log(courseJoin);
        if (course) {
            res.render('learn/course', { user, category, course, lession, comment, rate });
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
        const payerID = req.query.PayerID;
        const paymentID = req.query.paymentId;
        const amount = req.query.amount;
        const description = req.query.description;
        const user = await getUser(req);
        const supporter = await getSupporter();
        console.log(user)
        const execute_payment_json = {
            "payer_id": payerID,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": amount
                }
            }]
        };
        if (payerID && paymentID) {
            paypal.payment.execute(paymentID, execute_payment_json, async function (error, payment) {
                if (error) {
                    console.log(error.response);
                    res.render('donate/supporters', { user: user, supporter });
                } else {
                    console.log("Get Payment Response");
                    console.log(JSON.stringify(payment));


                    // res.render('success');
                    res.render('donate/supporters', { user: user, supporter });
                }
            });
        }
        else {
            res.render('donate/supporters', { user: user, supporter });
        }


    });
    //paypal
    router.post('/pay', (req, res) => {
        let amount = req.body.amount,
            content = req.body.content,
            user_id = req.body.user_id,
            user_name = req.body.user_name,
            avatar = req.body.avatar

        var create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": `http://localhost:1999/supporters?amount=${amount}`,
                "cancel_url": "http://localhost:1999/donate"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "Ủng hộ tổ chức giáo dục miễn phí MYCLASS",
                        // "sku": "item",
                        "price": amount,
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": amount
                },
                "description": content
            }]
        };
        paypal.payment.create(create_payment_json, async function (error, payment) {
            if (error) {
                throw error;
            } else {
                //thêm vàoDB

                await insertSupporter(
                    {
                        user_id: user_id,
                        user_name: user_name,
                        user_avater: avatar,
                        amount: amount,
                        description: content,
                    }
                );

                console.log("Create Payment Response");
                for (var index = 0; index < payment.links.length; index++) {
                    //Redirect user to this endpoint for redirect url
                    if (payment.links[index].rel === 'approval_url') {
                        res.redirect(payment.links[index].href);
                    }
                }
            }
        });
    });


    router.get("/bookmark", async (req, res) => {
        console.log('bookmark');

        let user = await getUser(req),
            course = null;
        if (user) {
            course = await getAllCourseBookMark(user._id);
        }
        res.render('bookmark/bookmark', { user, course });
    });

    router.get("/history", async (req, res) => {
        console.log('history');
        let user = await getUser(req),
            course = null;
        if (user) {
            course = await getAllCourseHistory(user._id);
        }
        res.render('history/history', { user, course });
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