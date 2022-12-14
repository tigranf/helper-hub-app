// * Variables & Setup * -----------------------------

const express = require('express');
const app = express();
const expressPort = 3000;
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const { User } = require('./models');
const { Helper } = require('./models');
const { Admin } = require('./models');
const { Review } = require('./models');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    session({
        secret: 'SomeSuperDuperLongHardToGuessSecretStringForHashingCookieSessions', // used to sign the cookie
        resave: false,                                                              // updates the session even w/ no changes if true
        saveUninitialized: true,                                                   // always creates a session if true
        cookie: {
            maxAge: 2592000000,                                                  //expiration time in milliseconds (30 days usually)
            secure: false,                                                      // if true, only accepts https requests
        }
    })
);
app.listen(expressPort, _ => {
    console.log(`Express server listening on port ${expressPort}`);
});


// * FUNCTIONS * -----------------------------

function checkAuth(req, res, next) {
    if (req.session && req.session.user) {
        console.log('authenticated user', req.session);
        next();
    } else if (req.session && req.session.helper) {
        console.log('authenticated helper', req.session);
        next();
    } else {
        console.log('unauthorized user', req.session);
        res.redirect('/error');
    }
}

// * ROUTES * --------------------------------

// HOME
app.get('/', (req, res) => {
    console.log(req.session);
    res.render('index');
});

// USER SIGNUP
app.get('/userSignUp', (req, res) => {
    res.render('userSignUp');
});
app.post('/userSignUp', async (req, res) => {
    console.log('body', req.body);
    let hashedPass = await bcrypt.hash(req.body.password, 10);
    let newUser = await User.create({
        fname: req.body.fName,
        lname: req.body.lName,
        email: req.body.email,
        password: hashedPass,
        avatar: '/images/redyellow_ball.png',
        createdAt: new Date(),
        updatedAt: new Date()
    }).catch(err => {
        console.log(err);
        res.redirect('/error');
    });
    console.log("🚀 ~ file: server.js:39 ~ app.post ~ newUser", newUser)
    res.redirect('/login?type=user');
});

//HELPER SIGNUP
app.get('/helperContinue', (req, res) => {
    res.render('helperContinue');
});
app.post('/helperContinue', async (req, res) => {
    console.log('body', req.body);
    let hashedPass = await bcrypt.hash(req.body.password, 10).catch(err => {
        console.log(err);
        res.redirect('/error');
    });
    console.log("🚀 ~ file: server.js:47 ~ app.post ~ hashedPass", hashedPass)
    req.session.newHelper = {
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        password: hashedPass,
        avatar: '/images/suitcase.png',
        title: '',
        bio: '',
        experience: '',
        rating: 0,
        reviews: [],
        stripeUrl: `https://stripe.com/${req.body.email}`,
        createdAt: undefined,
        updatedAt: undefined
    };
    res.redirect('/helperSignUp');
});
app.get('/helperSignUp', (req, res) => {
    console.log('newHelper', req.session.newHelper);
    if (!req.session.newHelper) res.redirect('/error');
    res.render('helperSignUp');
});
app.post('/helperSignUp', async (req, res) => {
    console.log('body', req.body);
    let newHelper = await Helper.create({
        fname: req.session.newHelper.fName,
        lname: req.session.newHelper.lName,
        email: req.session.newHelper.email,
        password: req.session.newHelper.password,
        avatar: req.session.newHelper.avatar,
        title: req.body.title,
        bio: req.body.bio,
        experience: req.body.experience,
        rating: req.session.newHelper.rating,
        reviews: req.session.newHelper.reviews,
        stripeUrl: req.session.newHelper.stripeUrl,
        createdAt: new Date(),
        updatedAt: new Date()
    }).catch(err => {
        console.log(err);
        res.redirect('/error');
    });
    console.log("🚀 ~ file: server.js:90 ~ app.post ~ newHelper", newHelper)
    res.redirect('/login?type=helper');
});

// LOGIN
app.get('/login', (req, res) => {
    console.log('queries at /login', req.query);
    if (req.query == undefined || req.query.type == undefined || req.query.v == undefined) {
        res.redirect('/error')
        return;
    }

    if (req.session.helper && req.query.type == 'helper') {
        res.redirect('/helperDash');
        return;
    } else if (req.session.user && req.query.type == 'user') {
        res.redirect('/userDash');
        return;
    }

    if (req.query.v === 'false') {
        console.log('wrong password');
        res.render('login', {
            v: false,
            type: req.query.type,
        });
    } else res.render('login', { v: true, type: req.query.type });
});
app.post('/login', async (req, res) => {
    let { email, password } = req.body;
    console.log("🚀 ~ file: server.js:163 ~ app.post ~ password", password)
    console.log("🚀 ~ file: server.js:163 ~ app.post ~ email", email)
    if (req.query.type == 'user') {
        let user = await User.findOne({
            where: {
                email: email,
            }
        }).catch(err => {
            console.log(err);
            res.redirect('/error');
        });
        if (!user) {
            res.redirect('/login?v=false&type=user');
            return;
        }
        let result = await bcrypt.compare(password, user.password).catch(err => {
            console.log(err);
            res.redirect('/error');
        });
        if (result) {
            req.session.user = user;
            res.redirect('/success?type=user');
        } else {
            res.redirect('/login?v=false&type=user');
        }
    } else if (req.query.type == 'helper') {
        let helper = await Helper.findOne({
            where: {
                email: email,
            }
        }).catch(err => {
            console.log(err);
            res.redirect('/error');
        });
        console.log("🚀 ~ file: server.js:191 ~ app.post ~ helper", helper)
        if (!helper) {
            res.redirect('/login?v=false&type=helper');
            return;
        }
        let result = await bcrypt.compare(password, helper.password).catch(err => {
            console.log(err);
            res.redirect('/error');
        });
        if (result) {
            req.session.helper = helper;
            res.redirect('/success?type=helper');
        } else {
            res.redirect('/login?v=false&type=helper');
        }
    }
});

// SUCCESS PAGE
app.get('/success', checkAuth, (req, res) => {
    // console.log('session at /success', req.session);
    console.log('session at /success');
    if (req.query.type == 'user') {
        res.render('success', { account: req.session.user });
    } else if (req.query.type == 'helper') {
        res.render('success', { account: req.session.helper });
    } else res.redirect('/error');
});

// LOGOUT ROUTE
app.post('/logout', (req, res) => {
    req.session.destroy(_ => {
        console.log('logged out');
        res.redirect('/');
    });
});

// USE DASHBOARD
app.get('/userDash', checkAuth, (req, res) => { res.render('userDash', { account: req.session.user }) });

// HELPER DASHBOARD
app.get('/helperDash', checkAuth, (req, res) => { res.render('helperDash', { account: req.session.helper }) });

// ERROR AND LOST ROUTES
app.get('/error', (req, res) => {
    res.render('error');
});
app.get('*', (req, res) => {
    res.render('lost');
});