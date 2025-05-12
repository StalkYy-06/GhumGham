const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const db = require("./db");

//Configuring Google auth strategy

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log("Google profile received:", profile.id, profile.displayName);
            try {
                const [results] = await db.query(
                    "SELECT * FROM users WHERE google_id = ?",
                    [profile.id]
                );

                if (results.length > 0) {
                    return done(null, results[0]);
                }

                const newUser = {
                    name: profile.displayName,
                    email: profile.emails && profile.emails[0] ? profile.emails[0].value : null,
                    google_id: profile.id,
                    avatar_url: profile.photos && profile.photos[0] ? profile.photos[0].value : null,
                    created_at: new Date()
                };

                const [insertResult] = await db.query(
                    "INSERT INTO users (name, email, google_id, avatar_url, created_at) VALUES (?, ?, ?, ?, ?)",
                    [newUser.name, newUser.email, newUser.google_id, newUser.avatar_url, newUser.created_at]
                );

                newUser.id = insertResult.insertId;
                return done(null, newUser);
            } catch (err) {
                return done(err);
            }
        }
    )
);

// serializing user into session
passport.serializeUser((user, done) => {
    done(null, user.id); //stores user detail
})

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    try {
        const [results] = await db.query(
            "SELECT * FROM users WHERE id = ?",
            [id]
        );

        if (results.length === 0) {
            return done(null, false);
        }

        const user = {
            id: results[0].id,
            name: results[0].name,
            email: results[0].email,
            google_id: results[0].google_id,
            bio: results[0].bio || null,
            avatar_url: results[0].avatar_url || null
        };

        done(null, user);
    } catch (err) {
        done(err);
    }
});