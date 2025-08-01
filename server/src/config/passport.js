const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const db = require("../config/db");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
    done(err, results[0]);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
        if (results.length > 0) return done(null, results[0]);

        db.query(
          "INSERT INTO users (name, email, provider) VALUES (?, ?, ?)",
          [profile.displayName, email, "google"],
          (err, result) => {
            if (err) return done(err);
            db.query("SELECT * FROM users WHERE id = ?", [result.insertId], (err, rows) => {
              done(null, rows[0]);
            });
          }
        );
      });
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      const username = profile.username;
      db.query("SELECT * FROM users WHERE username = ?", [username], (err, results) => {
        if (results.length > 0) return done(null, results[0]);

        db.query(
          "INSERT INTO users (name, username, provider) VALUES (?, ?, ?)",
          [profile.displayName || username, username, "github"],
          (err, result) => {
            if (err) return done(err);
            db.query("SELECT * FROM users WHERE id = ?", [result.insertId], (err, rows) => {
              done(null, rows[0]);
            });
          }
        );
      });
    }
  )
);
