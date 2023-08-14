const express = require('express');
require('dotenv').config();
const passport = require('passport');
const cookieSession = require('cookie-session');
 require('./passport');
const cors = require('cors');
const authRoute =require("./routes/auth")
const app = express();

app.use(cookieSession(
    {
        name: "session", keys: [process.env.COOKIE_SECRET], maxAge: 24 * 60 * 60 * 100}
))

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

app.use("/auth", authRoute)

app.listen('5000', () => {
    console.log('Server is running on port 5000');
})