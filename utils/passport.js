import knex from './knex';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';

passport.use(new LocalStrategy({
    usernameField: 'email',
},
    (email, password, done) => {
        knex('users')
            .where('email', '=', email)
            .first()
            .asCallback(async (err, user) => {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false, { message: 'Incorrect email address.' });
                }

                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    return done(null, false, { message: 'Incorrect password.' });
                }

                return done(null, user);
            });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    knex('users')
        .where('id', '=', id)
        .first()
        .asCallback(done);
});

export default passport;
