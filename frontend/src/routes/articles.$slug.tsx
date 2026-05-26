import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { strapi, strapiImage } from "@/lib/strapi";
import { useAsync } from "@/hooks/useStrapi";
import { SmartImage } from "@/components/SmartImage";
import { Loader, ErrorState } from "@/components/States";

export const Route = createFileRoute("/articles/$slug")({
  component: ArticlePage,
});

// Sterge linia asta si adauga cod pagina FAQ

// Sterge linia asta si adauga cod pagina Servicii

const termeniSections = [
  {
	title: "1. Acceptarea Termenilor",
	content: "Prin accesarea și utilizarea platformei NexaTech Solutions, confirmați că ați citit, înțeles și acceptat toți termenii și condițiile prezentului acord. Dacă nu sunteți de acord cu acești termeni, vă rugăm să nu utilizați serviciile noastre.",
  },
  {
	title: "2. Serviciile Oferite",
	content: "NexaTech Solutions oferă servicii de dezvoltare software, consultanță IT, infrastructură cloud și securitate cibernetică. Ne rezervăm dreptul de a modifica, suspenda sau întrerupe orice serviciu în orice moment, cu notificare prealabilă de minimum 30 de zile.",
  },
  {
	title: "3. Proprietatea Intelectuală",
	content: "Toate materialele, codul sursă și conținutul livrat în cadrul proiectelor devin proprietatea clientului după achitarea integrală a serviciilor. NexaTech Solutions își rezervă dreptul de a utiliza proiectele finalizate ca referință în portofoliu, cu acordul prealabil al clientului.",
  },
  {
	title: "4. Confidențialitate și Protecția Datelor",
	content: "Ne angajăm să protejăm informațiile confidențiale ale clienților conform GDPR și legislației române în vigoare. Datele colectate sunt utilizate exclusiv pentru furnizarea serviciilor contractate și nu vor fi transmise terților fără consimțământul explicit al clientului.",
  },
  {
	title: "5. Limitarea Răspunderii",
	content: "NexaTech Solutions nu poate fi responsabilă pentru daune indirecte, incidentale sau consecvente rezultate din utilizarea serviciilor noastre. Răspunderea noastră totală nu va depăși valoarea contractului încheiat cu clientul respectiv.",
  },
  {
	title: "6. Garanție și Suport",
	content: "Oferim garanție de 6 luni pentru bug-uri identificate după lansarea proiectului, cu condiția că acestea nu sunt cauzate de modificări efectuate de client. Suportul tehnic este disponibil conform SLA-urilor agreate în contractul de servicii.",
  },
  {
	title: "7. Plăți și Facturare",
	content: "Plățile se efectuează conform graficului stabilit în contract. Întârzierile la plată pot duce la suspendarea serviciilor, cu notificare prealabilă de 7 zile. Toate prețurile sunt exprimate în EUR și nu includ TVA.",
  },
  {
	title: "8. Modificarea Termenilor",
	content: "NexaTech Solutions își rezervă dreptul de a actualiza acești termeni în orice moment. Clienții vor fi notificați prin email cu minimum 14 zile înainte de intrarea în vigoare a modificărilor. Continuarea utilizării serviciilor după această dată constituie acceptarea noilor termeni.",
  },
];
 
function TermeniContent() {
  return (
	<div className="space-y-4">
  	<p className="text-muted-foreground leading-relaxed border-l-4 border-primary pl-4 italic">
    	Ultima actualizare: Mai 2026. Vă rugăm să citiți cu atenție acești termeni înainte de a utiliza serviciile NexaTech Solutions.
  	</p>
      {termeniSections.map((section) => (
    	<div key={section.title} className="rounded-xl border border-border bg-card p-6">
      	<h3 className="font-bold text-lg mb-2">{section.title}</h3>
      	<p className="text-muted-foreground leading-relaxed">{section.content}</p>
        </div>
  	))}
	</div>
  );
}


const tehnologiiItems = [
  {
	category: "Frontend",
	color: "bg-blue-500/10 text-blue-500",
	techs: [
  	{ name: "React", desc: "Librărie JavaScript pentru interfețe dinamice și reactive." },
  	{ name: "TypeScript", desc: "Superset JavaScript cu tipare statice pentru cod robust." },
  	{ name: "Tailwind CSS", desc: "Framework CSS utility-first pentru design rapid și consistent." },
  	{ name: "Next.js", desc: "Framework React cu SSR și SSG pentru aplicații performante." },
	],
  },
  {
	category: "Backend",
	color: "bg-green-500/10 text-green-500",
	techs: [
  	{ name: "Node.js", desc: "Runtime JavaScript pentru aplicații server-side scalabile." },
  	{ name: "Python", desc: "Limbaj versatil pentru API-uri, AI și automatizare." },
  	{ name: "Strapi", desc: "Headless CMS open-source pentru gestionarea conținutului." },
  	{ name: ".NET", desc: "Platformă Microsoft pentru aplicații enterprise robuste." },
	],
  },
  {
	category: "Cloud & DevOps",
	color: "bg-orange-500/10 text-orange-500",
	techs: [
  	{ name: "AWS", desc: "Amazon Web Services — lider mondial în servicii cloud." },
  	{ name: "Azure", desc: "Platforma cloud Microsoft pentru soluții enterprise." },
  	{ name: "Docker", desc: "Containerizare pentru deployment consistent și portabil." },
  	{ name: "Kubernetes", desc: "Orchestrare containere pentru scalabilitate automată." },
	],
  },
  {
	category: "Baze de Date",
	color: "bg-purple-500/10 text-purple-500",
	techs: [
  	{ name: "PostgreSQL", desc: "Bază de date relațională open-source de înaltă performanță." },
  	{ name: "MongoDB", desc: "Bază de date NoSQL pentru date flexibile și scalabile." },
  	{ name: "Redis", desc: "Stocare în memorie pentru caching și sesiuni rapide." },
  	{ name: "MySQL", desc: "Sistem de management al bazelor de date relaționale." },
	],
  },
];
 
function TehnologiiContent() {
  return (
	<div className="space-y-8">
      {tehnologiiItems.map((group) => (
    	<div key={group.category}>
      	<h2 className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${group.color}`}>
            {group.category}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {group.techs.map((tech) => (
              <div key={tech.name} className="rounded-xl border border-border bg-card p-4 flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${group.color.split(" ")[0]}`} />
                <div>
                  <h3 className="font-semibold">{tech.name}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{tech.desc}</p>
                </div>
              </div>
        	))}
          </div>
        </div>
  	))}
	</div>
  );
}


function ArticlePage() {
  const { slug } = Route.useParams();
  const { data: article, loading, error } = useAsync(() => strapi.getArticle(slug), [slug]);

  if (loading) return <Loader label="Loading article…" />;
  if (error) return <div className="mx-auto max-w-3xl px-4 py-12"><ErrorState error={error} /></div>;
  if (!article) return null;

  const date = article.publishedAt ? new Date(article.publishedAt).toLocaleDateString(undefined, {
    year: "numeric", month: "long", day: "numeric",
  }) : "";

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link to="/articles" className="text-sm text-muted-foreground hover:text-primary">
        ← Back to articles
      </Link>
      <header className="mt-6">
        {article.category?.name && (
          <span className="text-xs font-medium uppercase tracking-widest text-primary">
            {article.category.name}
          </span>
        )}
        <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">{article.title}</h1>
        {article.description && (
          <p className="mt-4 text-lg text-muted-foreground">{article.description}</p>
        )}
        <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
          <span>{article.author?.name || "Anonymous"}</span>
          <span>·</span>
          <time>{date}</time>
        </div>
      </header>
      <div className="mt-8 overflow-hidden rounded-xl">
        <SmartImage src={strapiImage(article.cover)} alt={article.title} />
      </div>
      {slug === "faq" ? (
        <div className="mt-10">
          <FAQContent />
        </div>
      ) : slug === "servicii" ? (
        <div className="mt-10">
          <ServiciiContent />
        </div>
      ) : slug === "tehnologii" ? (
        <div className="mt-10">
          <TehnologiiContent />
        </div>
      ) : slug === "termeni-si-conditii" ? (
        <div className="mt-10">
          <TermeniContent />
        </div>
      ) : (
        typeof article.content === "string" && (
          <div className="prose prose-neutral mt-10 max-w-none whitespace-pre-wrap text-base leading-relaxed text-foreground/90">
            {article.content}
          </div>
        )
      )}
      {Array.isArray(article.blocks) && article.blocks.length > 0 && (
        <div className="mt-10 space-y-6">
          {article.blocks.map((b, i) => {
            const block = b as {
              __component?: string;
              body?: string;
              title?: string;
              file?: { url?: string; alternativeText?: string; formats?: { large?: { url: string } } };
              files?: { url?: string; alternativeText?: string; formats?: { large?: { url: string } } }[];
            };

            if (block.__component === "shared.rich-text" && block.body) {
              return <p key={i} className="whitespace-pre-wrap text-base leading-relaxed">{block.body}</p>;
            }

            if (block.__component === "shared.quote") {
              return (
                <blockquote key={i} className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                  <p>{block.body}</p>
                  {block.title && <footer className="mt-2 text-sm">— {block.title}</footer>}
                </blockquote>
              );
            }

            if (block.__component === "shared.media" && block.file) {
              const url = block.file.formats?.large?.url || block.file.url;
              return (
                <div key={i} className="overflow-hidden rounded-xl">
                  <img
                    src={url}
                    alt={block.file.alternativeText || ""}
                    className="w-full object-cover"
                  />
                </div>
              );
            }

            if (block.__component === "shared.slider" && Array.isArray(block.files)) {
              return (
                <div key={i} className="grid gap-4 sm:grid-cols-2">
                  {block.files.map((file, j) => (
                    <div key={j} className="overflow-hidden rounded-xl">
                      <img
                        src={file.formats?.large?.url || file.url}
                        alt={file.alternativeText || ""}
                        className="w-full object-cover aspect-video"
                      />
                    </div>
                  ))}
                </div>
              );
            }

            return null;
          })}
        </div>
      )}
    </article>
  );
}
