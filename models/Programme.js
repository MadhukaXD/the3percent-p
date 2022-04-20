const mongoose = require('mongoose');

const ProgrammeSchema = new mongoose.Schema({
    ProgrammeTitle: {
        type: String,
        required: true,
        unique: true,
    },
    ProgrammeDescription: {
        type: String,
        required: false
    },
    Level: {
        type: String,
        required: false
    },
    Location: {
        type: String,
        required: false
    },
    Goal: {
        type: String,
        required: false
    },
    MainMuscleWorked: {
        type: String,
        required: false
    },
    OtherMuscleWorked: {
        type: String,
    },
    Gender: {
        type: String,
        required: false
    },
    Workout: [
        {
            WorkoutTitle: {
                type: String,
                required: true,
                unique: true,
            },
            WorkoutDescription: {
                type: String,
                required: false,
            },
            Exercise:
                [
                    {
                        ExerciseTitle: {
                            type: String,
                            required: true,
                            unique: true,
                        },
                        ExerciseDescription: {
                            type: String,
                            required: false,
                        },
                        ExerciseCategory: {
                            type: String,
                            required: false
                        },
                        Type: {
                            type: String,
                            required: false
                        },
                        MainMuscleWorked: {
                            type: String,
                            required: false
                        },
                        OtherMuscleWorked: {
                            type: String,
                        },
                        Equipment: {
                            type: String,
                        },
                        MechanicsType: {
                            type: String,
                        },
                        Level: {
                            type: String,
                            required: false
                        },
                        Sport: {
                            type: String,
                        },
                        Force: {
                            type: String,
                        },
                        VideoTitle: {
                            type: String,
                        },
                        VideoURL: {
                            type: String,
                        },
                        Image: {
                            type: String,
                        },
                        Date: {
                            type: Date,
                            default: Date.now(),
                        },
                    }
                ],

        }
    ],

    Date: {
        type: Date,
        default: Date.now(),
    },
},
    {
        timestamps: true
    }
);

module.exports = Programme = mongoose.model('programme', ProgrammeSchema);