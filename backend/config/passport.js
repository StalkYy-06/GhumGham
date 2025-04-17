const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const db = require("./db");

//Configuring Google auth strategy

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID, // Google OAuth Client ID
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google OAuth Client Secret
            callbackURL: process.env.CALLBACK_URL, // Redirect URL after Google login
        },
        (accessToken, refreshToken, profile, done) => {
            db.query(
                "SELECT * FROM users WHERE google_id = ?",
                [profile.id],
                (err, results) => {
                    if (err) {
                        return done(err);
                    }

                    if (results.length > 0) {
                        return done(null, results[0]);
                    } else {
                        const newUser = {
                            google_id: profile.id,
                            name: profile.displayName,
                            email: profile.emails[0].value,
                        };

                        db.query(
                            "INSERT INTO users (google_id, name, email) VALUES (?, ?, ?)",
                            [newUser.google_id, newUser.name, newUser.email],
                            (err, results) => {
                                if (err) {
                                    return done(err);
                                }
                                newUser.id = result.insertId;
                                return done(null, newUser);
                            }
                        );
                    }
                }
            );

        }
    )
);

// serializing user into session
passport.serializeUser((user, done) => {
    done(null, user.id); //stores user detail
})

// Deserialize user from session
passport.deserializeUser((id, done) => {
    db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
        if (err) {
            return done(err);
        }
        done(null, results[0]); // Return user object
    });
});