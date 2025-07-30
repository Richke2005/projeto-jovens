import { prisma } from "../_database/db.js";

export default class Service {
    constructor(model){
        this.model = model;
        this.client = prisma[model];
    }

    async create(data) {
        try {
            return await this.client.create({ data });
        } catch (error) {
            console.error("Error creating record:", error);
            throw error;
        }
    }

    async findAll() {
        try {
            return await this.client.findMany();
        } catch (error) {
            console.error("Error fetching records:", error);
            throw error;
        }
    }

    async findAll(skip = 0, take = 10) {
        try {
            return await this.client.findMany({
                skip: skip,
                take: take
            });
            
        } catch (error) {
            console.error("Error fetching all records:", error);
            throw error;
        }
    }

    async findById(id) {
        try {
            return await this.client.findUnique({ where: { id } });
        } catch (error) {
            console.error("Error fetching record by ID:", error);
            throw error;
        }
    }

    async update(id, data) {
        try {
            return await this.client.update({ where: { id }, data });
        } catch (error) {
            console.error("Error updating record:", error);
            throw error;
        }
    }

    async delete(id) {
        try {
            return await this.client.delete({ where: { id } });
        } catch (error) {
            console.error("Error deleting record:", error);
            throw error;
        }
    }

    async count() {
        try {
            return await this.client.count();
        } catch (error) {
            console.error("Error counting records:", error);
            throw error;
        }
    }
}