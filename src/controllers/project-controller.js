import ProjectService from "../services/project-service.js";

class ProjectController {

    async createProject(request, reply) {
        try {
            const { projectManager } = request.body;

            const newProject = await ProjectService.createProject(projectManager, request.body);

            reply.send(newProject);
        } catch (e) {
            reply.status(400).send(e)
        }
    }

    async getAllProject(request, reply) {
        try {
            const projects = await ProjectService.findAllProjects();

            reply.send(projects);
        } catch (e) {
            reply.status(400).send(e)
        }
    }

    async getProjectById(request, reply) {
        try {
            const project = await ProjectService.findProjectById(request.params.id);

            reply.send(project);
        } catch (e) {
            reply.status(400).send(e)
        }
    }

    async updateProject(request, reply) {
        try {
            const projectId = request.params.id;
            const updates = request.body;

            const updatedProject = await ProjectService.updateProject(projectId, updates);

            reply.send(updatedProject);
        } catch (e) {
            reply.status(400).send(e)
        }
    }

    async deleteProject(request, reply) {
        try {
            await ProjectService.deleteProject(request.params.id);

            reply.status(204).send("");
        } catch (e) {
            reply.status(500).send(e)
        }
    }
}

export default new ProjectController();