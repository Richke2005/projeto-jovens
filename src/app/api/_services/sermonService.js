import Service from "./service.js";

export default class SermonService extends Service {
    constructor() {
        super("sermon");
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
    
    async findByTitle(title) {
        try {
            return await this.client.findUnique({ where: { title } });
        } catch (error) {
            console.error("Error fetching sermon by title:", error);
            throw error;
        }
    }

    async findByPreacher(preacherId) {
        try {
            return await this.client.findMany({ where: { preacherId } });
        } catch (error) {
            console.error("Error fetching sermons by speaker ID:", error);
            throw error;
        }
    }

}