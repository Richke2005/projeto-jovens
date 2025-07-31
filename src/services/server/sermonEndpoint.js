import JovensAPI from "./api.js";

class SermonEndpoint extends JovensAPI {
    constructor() {
        super("sermon");
    }

    async getLastSermon() {
        try {
            const response = await fetch(`${this.baseURL}/${this.route}/last`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching last sermon:", error);
            return null;
        }
    }
}

export default SermonEndpoint;