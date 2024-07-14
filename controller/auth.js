const passport = require('passport');

const auth = {};

//auth.home
auth.buildHome = async function (req, res){
    //#swagger.tags=['we did it']
    res.render('home')
}

// Render the login page
auth.loginPage = function (req, res) {
    res.render('login'); 
};

// Handle logout and render the logout page
auth.logOutPage = async function (req, res) {
    res.render('home');
};

// Handle login with Google
auth.loginGoogle = async function (req, res) {
    res.send('logging with google');
};

// Authenticate with Google
auth.authPage = passport.authenticate('google', {
    scope: ['profile']
});

//Handle Google callback
auth.handleGoogleCallback = async (req, res) => {
    if (req.isAuthenticated()) {
        // Pass the user object to the view
        res.render('userpage', { user: req.user });
    } else {
        res.redirect('/login');
    }
};

module.exports = auth;
