import UserManager from "../daos/mongodb/managers/UserMongo.dao.js";
import CartService from "../services/cart.service.js"

export default class UserService {

    constructor() {
        this.userDao = new UserManager()
        this.cartService = new CartService()
    }

    async addUser(newUser) {
        let newCart = await this.cartService.createCart()

        let user = await this.userDao.addUser(newUser, newCart)

        return user
    }

    async findUser(email) {
        let user = await this.userDao.findUser(email)

        return user
    }

    async updatePassword(email, newPassword) {
        await this.userDao.updatePassword(email, newPassword)
    }
}