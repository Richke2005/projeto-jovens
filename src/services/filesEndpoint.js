import JovensAPI from "./api";

class FilesEndpoint extends JovensAPI {
    constructor() {
        super("files");
    }

    async uploadFile(file, groupId) {
        const formData = new FormData();
        formData.set("groupId", groupId);
        formData.set("file", file);
        

        try {
            const response = await fetch(`${this.baseURL}/${this.route}`, {
                method: "POST",
                body: formData
            });
         
            return response.json()
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error;
        }
    }
}

export default FilesEndpoint;