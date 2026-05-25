import { createFileRoute, Link } from "@tanstack/react-router";
import { strapi } from "@/lib/strapi";
import { useAsync } from "@/hooks/useStrapi";
import { ArticleCard } from "@/components/ArticleCard";
import { CategoryCard } from "@/components/CategoryCard";
import { Loader, ErrorState, EmptyState } from "@/components/States";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NexaTech Solutions" },
      { name: "description", content: "Latest articles and categories from our Strapi-powered blog." },
    ],
  }),
  component: Home,
});

function Home() {
  const articles = useAsync(() => strapi.getArticles({ pageSize: 6 }));
  const categories = useAsync(() => strapi.getCategories());

  return (
    <div>
      {/* Hero */}
      // Sterge linia asta si adauga cod sectiune Hero din Homepage

      {/* Latest articles */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold">Latest articles</h2>
            <p className="mt-2 text-muted-foreground">Fresh reads from the team.</p>
          </div>
          <Link to="/articles" className="hidden text-sm font-medium text-primary hover:underline sm:block">
            View all →
          </Link>
        </div>
        {articles.loading && <Loader />}
        {articles.error && <ErrorState error={articles.error} />}
        {articles.data && articles.data.data.length === 0 && (
          <EmptyState title="No articles yet" hint="Add some content in your Strapi admin." />
        )}
        {articles.data && articles.data.data.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.data.data.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="border-t border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Categories</h2>
            <p className="mt-2 text-muted-foreground">Browse by topic.</p>
          </div>
          {categories.loading && <Loader />}
          {categories.error && <ErrorState error={categories.error} />}
          {categories.data && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.data.data.map((c) => (
                <CategoryCard key={c.id} category={c} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
