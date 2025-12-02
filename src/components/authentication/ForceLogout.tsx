"use client";

import { signOutSocialAuth } from "@/actions/auth/social-auth";
import { useEffect } from "react";

export function ForceLogout() {
  useEffect(() => {
    signOutSocialAuth();
  }, []);
  return null;
}
