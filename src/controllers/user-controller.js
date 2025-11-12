import User from '../models/user-model.js'
import UserService from "../services/user-service.js";

class UserController {

    async createUser(request, reply) {
        try {
            const newUser = await UserService.createUser(request.body);
            reply.send(newUser);
        } catch (e) {
            reply.status(500).send(e)
        }
    }

    async getAllUsers(request, reply) {
        try {
            const users = await UserService.findAllUsers();
            reply.send(users);
        } catch (e) {
            reply.status(500).send(e)
        }
    }

    async getUserById(request, reply) {
        try {
            const user = await UserService.findUserById(request.params.id);
            reply.send(user);
        } catch (e) {
             reply.status(404).send(e)
        }
    }

    async updateUser(request, reply) {
        try {
            await UserService.updateUser(request.params.id, request.body);
            reply.send({ message: "User updated" });
        } catch (e) {
            reply.status(404).send(e)
        }
    }

    async deleteUser(request, reply) {
        try {
            await UserService.deleteUser(request.params.id);
            reply.status(204).send("User deleted");
        } catch (e) {
            reply.status(404).send(e)
        }
    }
}

export default new UserController();

