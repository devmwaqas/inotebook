const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// Route 1: Fetch all notes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
});

// Route 2: Add notes
router.post('/addnotes', fetchuser, [
    body('title', 'Title is required.').notEmpty(),
    body('description', 'Title is required.').notEmpty(),

], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const result = await Notes.create({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag
        });

        if (result) {
            res.json({ "msg": "success", "response": "Notes successfully created." })
        } else {
            res.json({ "msg": "error", "response": "Something went wrong please try again." })
        }
    } catch (error) {
        res.status(500).send();
    }
});

//Route 3: Update notes by id
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(401).send("Not allowed");
        } else if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        const { title, description, tag } = req.body;
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        const status = await Notes.findByIdAndUpdate(note.id, { $set: newNote }, { new: true });

        if (status) {
            res.json({ "msg": "success", "response": "Notes successfully updated." })
        } else {
            res.json({ "msg": "error", "response": "Something went wrong please try again." })
        }
    } catch (error) {
        res.status(500).send();
    }
});

// Route 4: Delete notes 

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {

        const note = await Notes.findById(req.params.id);

        if (!note) {
            return res.status(401).send("Not allowed");
        } else if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        const status = await Notes.findByIdAndDelete(req.params.id);

        if (status) {
            res.json({ 'msg': 'success', 'response': 'Notes sucessfully deleted.' })
        } else {
            res.json({ 'msg': 'error', 'response': 'Something went wrong. Please try again.' })
        }

    } catch (error) {
        res.status(500).send();
    }

});

module.exports = router