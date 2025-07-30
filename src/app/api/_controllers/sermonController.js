import Controller from "./controller.js";
import SermonService from "../_services/sermonService.js";

const sermonService = new SermonService();

export default class SermonController extends Controller{
  constructor() {
    super(sermonService);
  }
}