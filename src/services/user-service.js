import User from '../models/user-model.js'

class UserService {

    async createUser(payload) {
        const user = new User(payload);
        const result = await user.save();
        return result;
    }

    async findAllUsers() {
        const allUsers = await User.find();
        return allUsers;
    }

    async findUserById(id) {
        const user = await User.findById(id);
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return user;
    }

    async updateUser(id, payload) {
        const updatedUserData = await User.findByIdAndUpdate(id, payload, { new: true })
        if (!updatedUserData) {
            throw new Error(`User with id ${id} not found`);
        }
        return updatedUserData;
    }

    async deleteUser(id) {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            throw new Error(`User with id ${id} not found`);
        }
    }

}

export default new UserService();