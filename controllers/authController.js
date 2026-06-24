const User = require("../models/userModel");

const loginPage = (req, res) => {
    res.render("auth/signin", { title: "DeskApp | Sign In", error: null });
};

const registerPage = (req, res) => {
    res.render("auth/signup", { title: "DeskApp | Sign Up", error: null });
};

const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.render("auth/signup", { title: "DeskApp | Sign Up", error: "All fields are required" });
        }

        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.render("auth/signup", { title: "DeskApp | Sign Up", error: "Email already registered" });
        }

        await User.create({ name, email, password });
        return res.redirect("/signin");
    } catch (error) {
        return res.render("auth/signup", { title: "DeskApp | Sign Up", error: "Signup failed" });
    }
};

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.render("auth/signin", { title: "DeskApp | Sign In", error: "Invalid email or password" });
        }

        res.cookie("userId", user._id.toString(), { httpOnly: true });
        return res.redirect("/dashboard");
    } catch (error) {
        return res.render("auth/signin", { title: "DeskApp | Sign In", error: "Login failed" });
    }
};

const logout = (req, res) => {
    res.clearCookie("userId");
    return res.redirect("/signin");
};

module.exports = { loginPage, registerPage, signUp, signIn, logout };
