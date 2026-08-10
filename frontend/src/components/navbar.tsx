import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/logout-button";

export async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="flex items-center justify-between border-b border-neutral-200 p-4 dark:border-neutral-800">
      <nav className="flex items-center gap-4 text-sm font-medium">
        <Link className="underline" href="/">
          Home
        </Link>
        <Link className="underline" href="/categories">
          Categories
        </Link>
      </nav>
      <div className="flex items-center gap-4 text-sm font-medium">
        {user ? (
          <LogoutButton />
        ) : (
          <>
            <Link className="underline" href="/auth/login">
              Log in
            </Link>
            <Link className="underline" href="/auth/signup">
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
