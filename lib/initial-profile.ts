import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export const initialProfile = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      // Redirect to sign-in page
      redirect("/sign-in");
    }

    // Validate user data
    if (!user.id) throw new Error("Unauthorized");
    if (!user.firstName || !user.lastName) throw new Error("User name incomplete");
    if (!user.emailAddresses?.[0]?.emailAddress) throw new Error("Email not found");
    if (!user.imageUrl) throw new Error("Profile image not found");

    // Check existing profile
    const profile = await db.profile.findUnique({
      where: { userId: user.id }
    });

    if (profile) return profile;

    // Create new profile
    const newProfile = await db.profile.create({
      data: {
        userId: user.id,
        name: `${user.firstName} ${user.lastName}`.trim(),
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress
      }
    });

    return newProfile;

  } catch (error) {
    console.error("initialProfile error:", error);
    // Redirect to error page or sign-in
    redirect("/sign-in");
  }
};