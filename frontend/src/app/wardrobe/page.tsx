import { LogoutButton } from "@/components/logout-button";

export default function WardrobePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-semibold">Your wardrobe</h1>
      <p className="mt-2 text-sm text-neutral-500">
        Wardrobe browsing not wired up yet.
      </p>
      <div className="mt-4">
        <LogoutButton />
      </div>
    </main>
  );
}
