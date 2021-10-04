const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { body, validationResult } = require("express-validator");
const Todo = require("../models/Todo");

router.get("/", auth, async (req, res) => {
    try {
        const todo = await Todo.find({ user: req.user.id }).sort({
            date: -1,
        });
        res.json(todo);
    } catch (err) {
        console.error(err.message);
        res.status(404).send("server error");
    }
});

router.post(
    "/",
    [auth, [body("heading", "Please enter the task heading").not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { heading, desc, stdate, endate, comments, stat } = req.body;

        try {
            const newTodo = new Todo({
                heading,
                desc,
                stdate,
                endate,
                comments,
                stat,
                user: req.user.id,
            });

            const todo = await newTodo.save();
            res.json(todo);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

router.put("/:id", auth, async (req, res) => {
    const { heading, desc, stdate, endate, comments, stat } = req.body;

    const todoFields = {};
    if (heading) todoFields.heading = heading;
    if (desc) todoFields.desc = desc;
    if (stdate) todoFields.stdate = stdate;
    if (endate) todoFields.endate = endate;
    if (comments) todoFields.comments = comments;
    if (stat) todoFields.status = stat;

    try {
        let todo = await Todo.findById(req.params.id);

        if (!todo) return res.status(404).json({ msg: "contact not found" });

        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "not authorized" });
        }
        todo = await Todo.findByIdAndUpdate(
            req.params.id,
            { $set: todoFields },
            { new: true }
        );

        res.json(todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        let todo = await Todo.findById(req.params.id);

        if (!todo) return res.status(404).json({ msg: "contact not found" });

        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "not authorized" });
        }
        await Todo.findByIdAndRemove(req.params.id);

        res.json({ msg: "contact removes" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
