import express from 'express';
import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash';
import bodyParser from 'body-parser';
import path from 'path';
import router from './routes';
import 'dotenv/config';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true,
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', router);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server is running on port ${port}`));
