import Project from '../models/project-model.js'
import User from "../models/user-model.js";

class ProjectService {

    async createProject(projectManager, projectData) {
        const projectManagerUser = await User.findById(projectManager);
        if (!projectManagerUser) {
            throw ({
                statusCode: 404,
                error: "Not Found",
                message: `Project manager with id ${projectManager} not found`
            });
        }

        const project = new Project(projectData);
        const result = await project.save();

        return result;
    }

    async findAllProjects() {
        const allProjects = await Project.find().populate(
            "projectManager",
            "firstName lastName email"
        ).populate(
            "teamMembers",
            "firstName lastName email role"
        );

        return allProjects;
    }

    async findProjectById(id) {
        const project = await Project.findById(id);
        if (!project) {
            throw ({
                statusCode: 404,
                error: "Not Found",
                message: `Project with id ${id} not found`
            });
        }
        return project;
    }

    async updateProject(projectId, updates) {
        if (updates.projectManager) {
            const projectManagerUser = await User.findById(updates.projectManager);
            if (!projectManagerUser || !["Admin", "Project Manager"].includes(projectManagerUser.role)) {
                throw ({
                    statusCode: 400,
                    error: "Bad Request",
                    message: "Invalid project manager"
                });
            }
        }

        if (updates.teamMembers) {
            for (let memberId of updates.teamMembers) {
                const teamMemberUser = await User.findById(memberId);
                if (!teamMemberUser) {
                    throw ({
                        statusCode: 400,
                        error: "Bad Request",
                        message: `Invalid team member: ${memberId}`
                    });
                }
            }
        }

        const updatedProjectData = await Project.findByIdAndUpdate(projectId, updates, { new: true });
        if (!updatedProjectData) {
            throw ({
                statusCode: 404,
                error: "Not Found",
                message: `Project with id ${id} not found`
            });
        }

        return updatedProjectData;
    }

    async deleteProject(id) {
        const project = await Project.findByIdAndDelete(id);
        if (!project) {
            throw ({
                statusCode: 404,
                error: "Not Found",
                message: `Project with id ${id} not found`
            });
        }
    }
}

export default new ProjectService();