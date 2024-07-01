"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { signOut } from "./action";

export default async function Navigation() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase.auth.getUser();
  const isLoggedIn = !!data?.user;

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          Todo List
        </Link>
      </div>
      <div className="flex-none">
        {isLoggedIn ? (
          <div className="flex gap-2">
            <p className="self-center">{data.user.email}</p>
            <form action={signOut}>
              <button className="btn">Sign out</button>
            </form>
          </div>
        ) : (
          <Link href="/signin" className="btn">
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
}
