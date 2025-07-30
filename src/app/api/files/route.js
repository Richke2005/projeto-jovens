import { pinata } from "@/utils/config";

export async function POST(request) {
    const data = await request.formData();
    const groupId = data.get("groupId");
    const file = data.get("file");

    if (!groupId) {
        return Response.json({error: "Group ID is required"}, {status: 400});
    }
    if (!file) {
        return Response.json({error: "File is required"}, {status: 400});
    }
    
    const { cid } = await pinata.upload.public.file(file, {groupId: groupId});
    const url = await pinata.gateways.public.convert(cid);
    return Response.json(url, {status: 200});
}

export async function GET(request) {
    const url = new URL(request.url);
    const groupId = url.searchParams.get("groupId");
    
    if (!groupId) {
        return Response.json({error: "Group ID is required"}, {status: 400});
    }
    
    const files = await pinata.upload.public.list({groupId: groupId});
    return Response.json(files, {status: 200});
}

export async function DELETE(request) {
    const url = new URL(request.url);
    const groupId = url.searchParams.get("groupId");
    const fileName = url.searchParams.get("fileName");
    
    if (!groupId) {
        return Response.json({error: "Group ID is required"}, {status: 400});
    }
    if (!fileName) {
        return Response.json({error: "File name is required"}, {status: 400});
    }
    
    await pinata.upload.public.delete(fileName, {groupId: groupId});
    return Response.json({message: "File deleted successfully"}, {status: 200});
}