import TicketManager from "../daos/mongodb/managers/TicketManager.class.js"

export default class TicketService {

    constructor() {
        this.ticketDao = new TicketManager()
    }

    async createTicket(ticket) {
        let newTicket = await this.ticketDao.createTicket(ticket)

        return newTicket
    }
}