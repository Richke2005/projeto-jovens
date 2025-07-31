import Controller from "./controller.js";
import SermonService from "../_services/sermonService.js";

const sermonService = new SermonService();

export default class SermonController extends Controller{
  constructor() {
    super(sermonService);
  }

    async getLastSermon(req, params) {
    try {
      const sermon = await this.service.findLast();
      if (!sermon) {
        return Response.json({ message: "No sermons found" }, { status: 404 });
      }
      return Response.json(sermon, { status: 200 });
    } catch (error) {
      console.error("Error fetching last sermon:", error);
      return Response.json({ message: "Internal server error" }, { status: 500 });
    }
  }
}