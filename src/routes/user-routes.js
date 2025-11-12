import userController from '../controllers/user-controller.js';

export default async function userRoute(fastify, options) {

    fastify.post('/', userController.createUser);
    fastify.get('/', userController.getAllUsers);
    fastify.get('/:id', userController.getUserById);
    fastify.put('/:id', userController.updateUser);
    fastify.delete('/:id', userController.deleteUser);

}