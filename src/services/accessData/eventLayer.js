import Layer from "./layer.js";
import EventService from "@/app/api/_services/eventService.js";

const eventService = new EventService();

class EventLayer extends Layer {
    constructor() {
        super(eventService);
    }

    async getLastEvent() {
        return await this.service.findLast();
    }
}

export default EventLayer;