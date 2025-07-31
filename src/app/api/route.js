export async function GET(req, { params }) {
   return Response.json({
    message: "API is working",
    status: "success"
  });
};