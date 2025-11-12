import projectController from '../controllers/project-controller.js';

export default async function projectRoute(fastify, options) {

    fastify.post('/', projectController.createProject);
    fastify.get('/', projectController.getAllProject);
    fastify.get('/:id', projectController.getProjectById);
    fastify.put('/:id', projectController.updateProject);
    fastify.delete('/:id', projectController.deleteProject);

}