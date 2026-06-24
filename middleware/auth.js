const requireAuth = (req, res, next) => {
    if (!req.cookies || !req.cookies.userId) {
        return res.redirect('/signin');
    }
    next();
};

const redirectIfLoggedIn = (req, res, next) => {
    if (req.cookies && req.cookies.userId) {
        return res.redirect('/dashboard');
    }
    next();
};

module.exports = { requireAuth, redirectIfLoggedIn };
