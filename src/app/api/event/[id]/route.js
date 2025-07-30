import EventController from "../../_controllers/eventController.js";

const eventController = new EventController();

export async function GET(req, { params }) {
    return eventController.getById(req, params);
}

export async function PUT(req, { params }) {
    return eventController.update(req, params);
}

export async function DELETE(req, { params }) {
    return eventController.delete(req, params);
}