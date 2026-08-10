"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import type { Category } from "@/lib/types";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadCategories() {
      const res = await apiFetch("/categories");
      if (cancelled) return;

      if (!res.ok) {
        setError(`Couldn't load categories (${res.status})`);
        return;
      }

      setCategories(await res.json());
    }

    loadCategories().catch((err) => {
      if (!cancelled) setError(err instanceof Error ? err.message : String(err));
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="text-2xl font-semibold">Categories</h1>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {!error && categories === null && (
        <p className="mt-2 text-sm text-neutral-500">Loading…</p>
      )}

      {!error && categories?.length === 0 && (
        <p className="mt-2 text-sm text-neutral-500">No categories yet.</p>
      )}

      {!error && categories && categories.length > 0 && (
        <ul className="mt-6 grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/categories/${category.id}`}
                className="flex items-center justify-between rounded border border-neutral-200 px-4 py-3 text-sm hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-900"
              >
                <span>{category.name}</span>
                {category.is_default && (
                  <span className="text-xs text-neutral-500">Default</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
