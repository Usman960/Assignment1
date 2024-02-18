const Users = require("../models/User");
const Projects = require("../models/Project");
var express = require("express");
var router = express.Router();

router.post("/getById", async (req, res) => {
    try {
        const project = await Projects.findOne({ ProjectID: req.body.ProjectID })
        if (!project) return res.json({ msg: "Project not found" })
        res.json({ msg: "Project found", data: project })
    } catch (error) {
        console.error(error)
    }
});

router.post("/getByIdWithUser", async (req, res) => {
    try {
        const project = await Projects.findOne({ ProjectID: req.body.ProjectID }).populate("user")
        if (!project) return res.json({ msg: "Project not found" })
        res.json({ msg: "Project found", data: project })
    } catch (error) {
        console.error(error)
    }
});

/******* above are all the routes that WILL NOT pass through the middleware ********/

router.use((req, res, next) => {
    if (!req.user.employer) return res.json({ msg: "NOT EMPLOYER" })
    else next()
})

/******* below are all the routes that WILL pass through the middleware ********/

router.post("/createProject", async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email })
        if (!user) return res.json({ msg: "USER NOT FOUND" })
        await Projects.create({ ...req.body, user: user._id })
        res.json({ msg: "PROJECT ADDED" })
    } catch (error) {
        console.error(error)
    }
});

router.post("/deleteById", async (req, res) => {
    try {
        const project = await Projects.findOne({ ProjectID: req.body.ProjectID })
        if (!project) return res.json({ msg: "PROJECT NOT FOUND" })
        await Projects.deleteOne({ ProjectID: req.body.ProjectID })
        res.json({ msg: "PROJECT DELETED" })
    } catch (error) {
        console.error(error)
    }
});

// Update project route
router.post("/updateProject", async (req, res) => {
    try {
        const { ProjectID, ...updatedFields } = req.body;
        const project = await Projects.findOne({ ProjectID });
        if (!project) {
            return res.json({ msg: "Project not found" });
        }
        Object.assign(project, updatedFields);
        await project.save();
        return res.json({ msg: "Project updated", data: project });
    } catch (error) {
        console.error(error);
    }
});
module.exports = router