const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Programme = require('../../models/Programme');

// @route   POST api/workout
// @desc    Create Programme
// @access  Public
router.post('/', [
    check('ProgrammeTitle', 'ProgrammeTitle is required')
        .not()
        .isEmpty(),
],

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const {
            ProgrammeTitle,
            ProgrammeDescription,
            Level,
            Location,
            Goal,
            MainMuscleWorked,
            OtherMuscleWorked,
            Gender,
            Workout
        } = req.body;

        const programmesFields = {};
        if (ProgrammeTitle) programmesFields.ProgrammeTitle = ProgrammeTitle;
        if (ProgrammeDescription) programmesFields.ProgrammeDescription = ProgrammeDescription;
        if (Level) programmesFields.Level = Level;
        if (Location) programmesFields.Location = Location;
        if (Goal) programmesFields.Goal = Goal;
        if (MainMuscleWorked) programmesFields.MainMuscleWorked = MainMuscleWorked;
        if (OtherMuscleWorked) programmesFields.OtherMuscleWorked = OtherMuscleWorked;
        if (Gender) programmesFields.Gender = Gender;
        if (Workout) programmesFields.Workout = Workout;


        try {
            let programme = await Programme.findOne({ ProgrammeTitle });

            if (programme) {

                programme = await Programme.findOneAndUpdate(
                    { ProgrammeTitle: ProgrammeTitle },
                    { $set: programmesFields },
                    { new: true }
                );

                return res.json("Workout Successfully updated");
            }


            // create 
            programme = new Programme(programmesFields);

            await programme.save();

            res.json("New Programme Successfully added");

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error')
        }
    });

// @route   Get api/workouts
// @desc    Get all Programmes
// @access  Public

router.get('/', async (req, res) => {
    try {
        const programmes = await Programme.find().sort({ date: -1 });
        res.json(programmes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   Get api/exercise/:id
// @desc    Get Programme by id
// @access  Public

router.get('/:id', async (req, res) => {
    try {
        //const id = req.params.id;

        const programme = await Programme.findById(req.params.id);

        if (!programme) {
            return res.status(404).json({ msg: 'Programme not found' });

        }
        res.json(programme);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Programme not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/exercise/:exercise
// @desc    Delete a Programme
// @access  Public

router.delete('/:id', async (req, res) => {
    try {
        const programme = await Programme.findById(req.params.id);

        if (!programme) {
            return res.status(404).json({ msg: 'Programme not found' });
        }

        await programme.remove();

        res.json({ msg: 'Programme deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
