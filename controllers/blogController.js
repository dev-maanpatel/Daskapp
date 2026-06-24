const fs = require("fs");
const path = require("path");
const Blog = require("../models/blogModel");

const removeImage = (imagePath) => {
    if (!imagePath) return;

    const cleanPath = imagePath.replace(/^\//, "");
    const filePath = path.join(__dirname, "..", "public", cleanPath);

    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
};

const blogList = async (req, res) => {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.render("blog/view-blogs", { title: "DeskApp | Blogs", blogs });
};

const addBlogPage = (req, res) => {
    res.render("blog/add-blog", { title: "DeskApp | Add Blog", error: null });
};

const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.render("blog/add-blog", { title: "DeskApp | Add Blog", error: "Title and content are required" });
        }

        await Blog.create({
            title,
            content,
            image: req.file ? "/uploads/" + req.file.filename : ""
        });

        res.redirect("/blogs");
    } catch (error) {
        res.render("blog/add-blog", { title: "DeskApp | Add Blog", error: "Blog not added" });
    }
};

const editBlogPage = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.redirect("/blogs");
    res.render("blog/edit-blog", { title: "DeskApp | Edit Blog", blog, error: null });
};

const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.redirect("/blogs");

        blog.title = req.body.title;
        blog.content = req.body.content;

        if (req.file) {
            removeImage(blog.image);
            blog.image = "/uploads/" + req.file.filename;
        }

        await blog.save();
        res.redirect("/blogs");
    } catch (error) {
        res.redirect("/blogs");
    }
};

const deleteBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
        removeImage(blog.image);
        await blog.deleteOne();
    }
    res.redirect("/blogs");
};

module.exports = { blogList, addBlogPage, createBlog, editBlogPage, updateBlog, deleteBlog };
