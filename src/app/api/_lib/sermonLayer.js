import Layer from "./layer.js";
import SermonService from "../_services/sermonService.js";

const sermonService = new SermonService();

class SermonLayer extends Layer {
    constructor() {
        super(sermonService);
    }

    async getLast() {
        return await this.service.findLast();
    }
}

export default SermonLayer;