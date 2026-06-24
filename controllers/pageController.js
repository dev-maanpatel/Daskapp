const dashboardPage = (req, res) => {
    res.render("dashboard/dashboard", { title: "DeskApp | Dashboard" });
};

module.exports = { dashboardPage };
