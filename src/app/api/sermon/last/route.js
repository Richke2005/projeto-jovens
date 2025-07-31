import SermonController from "../../_controllers/sermonController.js";

const sermonController = new SermonController();

export async function GET(req, { params }) {
    return sermonController.getLastSermon(req, params);
}