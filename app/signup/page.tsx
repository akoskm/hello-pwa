"use server";

import { redirect } from "next/navigation";
import { signUp } from "./actions";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { CredentialsForm } from "@/components/credentials-form";

export default async function Signup() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.auth.getUser();
  const isLoggedIn = !!data?.user;

  if (isLoggedIn) {
    return redirect("/");
  }

  return <CredentialsForm newUser action={signUp} />;
}
