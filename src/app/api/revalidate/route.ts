import type {NextRequest} from "next/server";

import {revalidatePath} from "next/cache";

export async function GET(request: NextRequest) {

  const searchParams = request.nextUrl.searchParams;

  if (searchParams.get("secret") !== process.env.REVALIDATE_SECRET) {
    return Response.json({revalidated: false, error: "Invalid secret"});
  }

  if (!searchParams.has("path")) {
    return Response.json({revalidated: false, error: "Missing path"});
  }

  revalidatePath(`/${searchParams.get("path")}`);

  return Response.json({revalidated: true});
}