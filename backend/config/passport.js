const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

//Configuring Google auth strategy

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID, // Google OAuth Client ID
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google OAuth Client Secret
            callbackURL: process.env.CALLBACK_URL, // Redirect URL after Google login
        },
        (accessToken, refreshToken, profile, done) => {
            console.log("Google Profile:", profile);

            return done(null, profile);
        }
    )
);

// serializing user into session
passport.serializeUser((user, done) => {
    done(null, user); //stores user detail
})

// Deserialize user from session
passport.deserializeUser((user, done) => {
    done(null, user); // Retrieve user details from session
});