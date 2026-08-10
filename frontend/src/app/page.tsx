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
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-semibold">Outfit Inventory</h1>
      <p className="max-w-md text-center text-sm text-neutral-500">
        AI-powered clothing labeler. Upload, wardrobe browsing, and AI
        labeling are still in progress — auth is wired up.
      </p>
    </main>
  );
}
