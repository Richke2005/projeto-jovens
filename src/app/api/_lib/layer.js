class Layer {
    constructor(service) {
        this.service = service;
    }

    async getAll(options = { isPaginated: false, page: 1, limit: 10 }) {
        if (options.isPaginated) {
            const page = options.page || 1;
            const limit = options.limit || 10;
            const offset = (page - 1) * limit;
            return await this.service.findAll(offset, limit);
        }
        return await this.service.findAll();
    }

    async getById(id) {
        return await this.service.findById(id);
    }

    async create(data) {
        return await this.service.create(data);
    }

    async update(id, data) {
        return await this.service.update(id, data);
    }

    async delete(id) {
        return await this.service.delete(id);
    }

    async count() {
        return await this.service.count();
    }
}

export default Layer;