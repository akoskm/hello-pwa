"use server";

import { signIn } from "./actions";
import { CredentialsForm } from "@/components/credentials-form";

export default async function Signin() {
  return <CredentialsForm action={signIn} />;
}
