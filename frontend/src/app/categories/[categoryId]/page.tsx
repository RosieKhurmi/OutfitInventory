"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import type { Category } from "@/lib/types";

export default function CategoryItemsPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = use(params);
  const [category, setCategory] = useState<Category | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadCategory() {
      const res = await apiFetch("/categories");
      if (cancelled) return;

      if (!res.ok) {
        setError(`Couldn't load category (${res.status})`);
        return;
      }

      const categories: Category[] = await res.json();
      const match = categories.find((c) => c.id === categoryId);
      if (match) {
        setCategory(match);
      } else {
        setNotFound(true);
      }
    }

    loadCategory().catch((err) => {
      if (!cancelled) setError(err instanceof Error ? err.message : String(err));
    });

    return () => {
      cancelled = true;
    };
  }, [categoryId]);

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="w-full max-w-2xl">
        <Link href="/categories" className="text-sm underline">
          ← Back to categories
        </Link>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center">
        {error && <p className="text-sm text-red-600">{error}</p>}
        {!error && notFound && (
          <p className="text-sm text-neutral-500">Category not found.</p>
        )}
        {!error && !notFound && (
          <>
            <h1 className="text-2xl font-semibold">
              {category ? category.name : "Loading…"}
            </h1>
            {category && (
              <p className="mt-2 text-sm text-neutral-500">
                Item browsing not wired up yet.
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
}
