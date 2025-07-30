import SermonController from "../_controllers/sermonController.js";

const sermonController = new SermonController();

export async function GET(req, { params }) {
  return sermonController.getAll(req, params, { isPaginated: true });
}

export async function POST(req, { params }) {
  return sermonController.create(req, params);
}

