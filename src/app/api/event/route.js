import EventController from "../_controllers/eventController.js";

const eventController = new EventController();

export async function GET(req, { params }) {
  return eventController.getAll(req, params, { isPaginated: true });
}

export async function POST(req, { params }) {
  return eventController.create(req, params);
}