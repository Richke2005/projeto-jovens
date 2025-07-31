import Controller from "./controller.js";
import EventService from "../_services/eventService.js";

const eventService = new EventService();

export default class EventController extends Controller{
  constructor() {
    super(eventService);
  }

  async getLastEvent(req, params) {
    try {
      const event = await this.service.findLast();
      if (!event) {
        return Response.json({ message: "No events found" }, { status: 404 });
      }
      return Response.json(event, { status: 200 });
    } catch (error) {
      console.error("Error fetching last event:", error);
      return Response.json({ message: "Internal server error" }, { status: 500 });
    }
  }
}