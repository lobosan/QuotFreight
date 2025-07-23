import { NextResponse } from "next/server";
import { withAuth } from "@workos-inc/authkit-nextjs";

export async function GET() {
  const { entitlements, organizationId } = await withAuth({ ensureSignedIn: true });
  return NextResponse.json({ entitlements, organizationId });
}
