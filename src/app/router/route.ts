import { withAuth } from "@workos-inc/authkit-nextjs";
import { redirect } from "next/navigation";
import { workos } from "../api/workos";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const { user, role, organizationId } = await withAuth({ ensureSignedIn: true });

  if (!role) {
    return redirect("/pricing");
  }

  if (organizationId) {
    await workos.auditLogs.createEvent(organizationId, {
      action: "user.logged_in",
      occurredAt: new Date(),
      actor: {
        type: "user",
        id: user?.id,
        name: user?.firstName + " " + user?.lastName,
        metadata: {
          role: role || "",
        },
      },
      targets: [
        {
          type: "user",
          id: user?.id,
          name: user?.firstName + " " + user?.lastName,
        },
      ],
      context: {
        location: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
      },
      metadata: {},
    });
  }

  // Redirect based on the user's role
  switch (role) {
    case "admin":
      return redirect("/dashboard");
    case "member":
      return redirect("/product");
    default:
      return redirect("/pricing");
  }
};
