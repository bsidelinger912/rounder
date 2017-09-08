const passport = require('passport');

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }

  // if they aren't redirect them to the home page
  return res.status(401).json({
    success: false,
    message: 'Unauthorized',
  });
}

module.exports = (app) => {  // , passport) => {
  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  app.get('/', (req, res) => {
    res.render('index.ejs'); // load the index.ejs file
  });

  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  app.get('/login', (req, res) => {
    // render the page and pass in any flash data if it exists
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  /* app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true, // allow flash messages
  }));*/

  app.post('/login', (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'There was an unknown error',
        });
      }

      if (!user) {
        return res.status(400).json({
          success: false,
          message: info.message,
        });
      }

      return req.logIn(user, (error) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: 'There was an unknown error',
          });
        }

        return res.json({
          success: true,
          // TODO: remove user password here!
          user,
        });
      });
    })(req, res, next);
  });

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  app.get('/signup', (req, res) => {
    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  app.post('/signup', (req, res, next) => {
    passport.authenticate('local-signup', (err, user, info) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: info.message || 'There was an unknown error',
        });
      }

      return req.logIn(user, (error) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: 'There was an unknown error',
          });
        }

        return res.json({
          success: true,
          // TODO: remove user password here!
          user,
        });
      });
    })(req, res, next);
  });

  // process the signup form
  /* app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true, // allow flash messages
  }));*/

  // =====================================
  // PROFILE SECTION =====================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile.ejs', {
      user: req.user, // get the user out of session and pass to template
    });
  });

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
