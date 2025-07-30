import EventController from "../../_controllers/eventController.js";

const eventController = new EventController();

export async function GET(req, { params }) {
    return eventController.count(req, params);
}