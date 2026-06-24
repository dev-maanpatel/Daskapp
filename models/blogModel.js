const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true,
            trim: true
        },
        image: {
            type: String,
            default: ""
        }
    },
);

module.exports = mongoose.model("Blog", blogSchema);
