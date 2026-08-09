import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-semibold">Outfit Inventory</h1>
      <p className="max-w-md text-center text-sm text-neutral-500">
        AI-powered clothing labeler. Scaffold only — upload, wardrobe, and
        auth flows are not wired up yet.
      </p>
      <nav className="flex gap-4 text-sm font-medium">
        <Link className="underline" href="/upload">
          Upload
        </Link>
        <Link className="underline" href="/wardrobe">
          Wardrobe
        </Link>
        <Link className="underline" href="/login">
          Log in
        </Link>
        <Link className="underline" href="/signup">
          Sign up
        </Link>
      </nav>
    </main>
  );
}
