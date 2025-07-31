import Layer from "./layer.js";
import EventService from "../_services/eventService.js";

const eventService = new EventService();

class EventLayer extends Layer {
    constructor() {
        super(eventService);
    }
}

export default EventLayer;