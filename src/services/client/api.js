class JovensClientAPI{
    constructor(route) {
        this.baseURL = '/api';
        this.route = route;
    }
    
    async getAll() {
        try {
            const response = await fetch(`${this.baseURL}/${this.route}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
        } catch (error) {
        console.error("Error fetching sermons:", error);
        return [];
        }
    }

    async getAll(page = 1, limit = 10) {
        try {
            const response = await fetch(`${this.baseURL}/${this.route}?page=${page}&limit=${limit}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        return await response.json();
        } catch (error) {
        console.error("Error fetching sermons:", error);
        return [];
        }
    }

    async getById(id) {
        try {
            const response = await fetch(`${this.baseURL}/${this.route}/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching sermon by ID:", error);
            return null;
        }
    }

    async create(data) {
        try {
            const response = await fetch(`${this.baseURL}/${this.route}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error creating sermon:", error);
            return null;
        }
    }

    async update(id, data) {
        try {
            const response = await fetch(`${this.baseURL}/${this.route}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error updating sermon:", error);
            return null;
        }
    }

    async delete(id) {
        try {
            const response = await fetch(`${this.baseURL}/${this.route}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error deleting sermon:", error);
            return null;
        }
    }

    async count() {
        try {
            const response = await fetch(`${this.baseURL}/${this.route}/count`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error counting sermons:", error);
            return 0;
        }
    }
}

export default JovensClientAPI;