import express from 'express';
import admin from './admin';
import users from './users';
import passport from '../utils/passport';

const router = express.Router();

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/api/loginFailure',
    failureFlash: true
}), async (req, res) => {
    res.json({ success: true });
});

router.get('/loginFailure', (req, res) => {
    res.json({ flashMessage: req.flash('error') })
});

router.use((req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.json({ message: 'Need to authenticate.' });
    }
});

router.use('/admin', admin);
router.use('/', users);

router.use((err, req, res, next) => {
    const { status, message } = err;
    const { error: flashMessage } = req.flash();

    res.json({ flashMessage });
});

export default router;
