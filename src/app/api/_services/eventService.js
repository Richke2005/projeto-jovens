import Service from "./service.js";

export default class EventService extends Service{
    constructor() {
        super("event");
    }

    async findLast(){
        try{
            return await this.client.findFirst({
                orderBy: {
                    start_date: 'desc'
                }
            });
        }catch(error){
            console.error("Error fetching last event:", error);
            throw error;
        }
    }
}