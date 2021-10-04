const mongoose = require("mongoose");

const MemorySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    heading: {
        type: String,
        required: true,
    },
    desc: String,
    comments: [
        {
            msg: String,
        },
    ],
    stdate: Date,
    endate: Date,
    stat: String,
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Memory", MemorySchema);
