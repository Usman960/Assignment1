const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    ProjectID: String,
    position: String,
    description: String,
    hourly_rate: String,
    duration: String,
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'Users' },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Project = mongoose.model('Projects', ProjectSchema);

module.exports = Project;