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

    const { cid } = await pinata.upload.public.fileArray([file], {groupId: groupId});
    const url = await pinata.gateways.public.convert(cid);
    return Response.json(url, {status: 200});
}