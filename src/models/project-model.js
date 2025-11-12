import mongoose from 'mongoose';
import User from './user-model.js';

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    projectManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        validate: {
            validator: async function(manager) {
                const user = await User.findById(manager);
                return ["Admin", "Project Manager"].includes(user.role)
            },
            message: props => `User role must be either "Admin" or "Project Manager"`
        }
    },
    teamMembers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        validate: {
            validator: async function(teamMembers) {
                const invalidMembers = [];

                for (const memberId of teamMembers) {
                    const teamMemberUser = await User.findById(memberId);
                    if (!teamMemberUser) invalidMembers.push(memberId);
                }

                if (invalidMembers.length > 0) {
                    throw new Error (`These users do not exist: ${invalidMembers.join(", ")}`)
                }

                return true;
            },
            message: props => "Some users do not exist"
        }
    }

})

export default mongoose.model('Project', ProjectSchema);