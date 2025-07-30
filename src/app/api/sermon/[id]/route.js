import SermonController from "../../_controllers/sermonController.js";

const sermonController = new SermonController();

export async function GET(req, { params }) {
    return sermonController.getById(req, params);
}

export async function PUT(req, { params }) {
    return sermonController.update(req, params);
}

export async function DELETE(req, { params }) {
    return sermonController.delete(req, params);
}