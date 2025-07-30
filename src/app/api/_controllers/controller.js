export default class Controller{
    constructor(service) {
        this.service = service;
    }

    async getAll(req, params, options = { isPaginated: false }) {
        try{
            if (options.isPaginated) {
                const { searchParams } = req.nextUrl;
                const page = Number(searchParams.get("page")) || 1;
                const limit = Number(searchParams.get("limit")) || 10;
                const offset = (page - 1) * limit;
                const paginatedRecords = await this.service.findAll(offset, limit);

                return Response.json(paginatedRecords, { status: 200 });
            }

            const records = await this.service.findAll();
            if (!records || records.length === 0) {
                return Response.json({ message: "No records found"}, { status: 404 });
            }

            return Response.json(records, { status: 200 });
            
        }catch (error) {
            console.error("Error fetching all records:", error);
            throw error;
        }
    }
    
    async getById(req, params) {
        try{
            const { id } = await params;

            const record = await this.service.findById(id);
            if (!record) {
                return Response.json({ message: "Record not found" }, { status: 404 });
            }
            return Response.json(record, { status: 200 });

        }catch (error) {
            console.error("Error fetching record by ID:", error);
            throw error;
        }
    }

    async create(req, params) {
        const data = await req.json();
        try{
            const newRecord = await this.service.create(data);
            return Response.json({ message: "New record created", newRecord }, { status: 201 });
        }catch (error) {
            console.error("Error creating record:", error);
            throw error;
        }
    }
    
    async update(req, params) {
        try{
            const { id } = await params;
            const data = await req.json();

            const updatedRecord = await this.service.update(id, data);
            if (!updatedRecord) {
                return Response.json({ message: "Record not found" }, { status: 404 });
            }
            return Response.json({message: "updated sucessfully"}, { status: 200 });
        }catch (error) {
            console.error("Error updating record:", error);
            throw error;
        }
    }
    
    async delete(req, params) {
        try{
            const { id } = await params;
            const deletedRecord = await this.service.delete(id);
            if (!deletedRecord) {
                return Response.json({ message: "Record not found" }, { status: 404 });
            }
            return Response.json({message: "deleted sucessfully"}, { status: 200 });
        }catch (error) {
            console.error("Error deleting record:", error);
            throw error;
        }
    }

    async count(req, params) {
        try {
            const count = await this.service.count();
            return Response.json(count, { status: 200 });
        } catch (error) {
            console.error("Error counting records:", error);
            return Response.json({ message: "Error counting records" }, { status: 500 });
        }
    }
}