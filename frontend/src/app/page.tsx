import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function Home({ searchParams }: PageProps<"/">) {
  const { code } = await searchParams;

  if (typeof code === "string") {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
    redirect("/wardrobe");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-semibold">Outfit Inventory</h1>
      <p className="max-w-md text-center text-sm text-neutral-500">
        AI-powered clothing labeler. Upload, wardrobe browsing, and AI
        labeling are still in progress — auth is wired up.
      </p>
      <nav className="flex gap-4 text-sm font-medium">
        <Link className="underline" href="/upload">
          Upload
        </Link>
        <Link className="underline" href="/wardrobe">
          Wardrobe
        </Link>
        <Link className="underline" href="/auth/login">
          Log in
        </Link>
        <Link className="underline" href="/auth/signup">
          Sign up
        </Link>
      </nav>
    </main>
  );
}
