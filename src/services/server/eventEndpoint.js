import JovensAPI from "./api.js";

class EventEndpoint extends JovensAPI {
    constructor() {
        super("event");
    }

    async getLastEvent() {
        try {
            const response = await fetch(`${this.baseURL}/${this.route}/last`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching last event:", error);
            return null;
        }
    }
}

export default EventEndpoint;