"use server";

import { signIn, signOut } from "@/auth";

export async function singInWithGoogle() {
  await signIn("google", { redirectTo: "/dashboard" });
}

export async function signOutSocialAuth() {
  await signOut({ redirectTo: "/" });
}
