const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { requireAuth, redirectIfLoggedIn } = require("../middleware/auth");
const { loginPage, registerPage, signUp, signIn, logout } = require("../controllers/authController");
const { dashboardPage } = require("../controllers/pageController");
const { blogList, addBlogPage, createBlog, editBlogPage, updateBlog, deleteBlog } = require("../controllers/blogController");

router.get("/", (req, res) => {
    if (req.cookies && req.cookies.userId) {
        return res.redirect("/dashboard");
    }
    return res.redirect("/signin");
});

router.get("/signin", redirectIfLoggedIn, loginPage);
router.post("/signin", signIn);
router.get("/signup", redirectIfLoggedIn, registerPage);
router.post("/signup", signUp);
router.get("/logout", logout);

router.get("/dashboard", requireAuth, dashboardPage);

router.get("/blogs", requireAuth, blogList);
router.get("/blogs/add", requireAuth, addBlogPage);
router.post("/blogs/add", requireAuth, upload.single("image"), createBlog);
router.get("/blogs/edit/:id", requireAuth, editBlogPage);
router.post("/blogs/edit/:id", requireAuth, upload.single("image"), updateBlog);
router.post("/blogs/delete/:id", requireAuth, deleteBlog);

module.exports = router;
