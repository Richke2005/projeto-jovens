import Controller from "./controller.js";
import EventService from "../_services/eventService.js";

const eventService = new EventService();

export default class EventController extends Controller{
  constructor() {
    super(eventService);
  }
}