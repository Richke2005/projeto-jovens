import Layer from "./layer.js";
import SermonService from "@/app/api/_services/sermonService.js";

const sermonService = new SermonService();

class SermonLayer extends Layer {
    constructor() {
        super(sermonService);
    }

    async getLastSermon() {
        return await this.service.findLast();
    }
}

export default SermonLayer;