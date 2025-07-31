import Service from "./service.js";

export default class EventService extends Service{
    constructor() {
        super("event");
    }

    async findAll(skip = 0, take = 10) {
        try {
            return await this.client.findMany({
                skip: skip,
                take: take,
                orderBy:{
                    start_date: 'desc'
                }
            });
            
        } catch (error) {
            console.error("Error fetching all records:", error);
            throw error;
        }
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