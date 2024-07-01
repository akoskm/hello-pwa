import Link from "next/link";

export const CredentialsForm = ({
  newUser = false,
  action,
}: {
  newUser?: boolean;
  action: (formData: FormData) => Promise<never>;
}) => (
  <main className="flex min-h-screen flex-col items-center p-24">
    <form action={action} className="flex flex-col gap-4 prose">
      <h1>{newUser ? "Sign up" : "Sign in"}</h1>
      <label className="input input-bordered flex items-center gap-2">
        Email
        <input
          name="email"
          type="text"
          className="grow"
          placeholder="hellopwa@akoskm.com"
          required
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        Password
        <input name="password" type="password" className="grow" required />
      </label>
      {!newUser && (
        <div>
          New user?{" "}
          <Link href="/signup" className="link">
            Sign up
          </Link>
        </div>
      )}
      <button className={"btn btn-primary"}>Submit</button>
    </form>
  </main>
);
