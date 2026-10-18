import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, List, Minus, Plus, X } from "lucide-react";
import { ScriptureProvider, ScriptureText } from "@/components/scripture-text";
import { Button } from "@/components/ui/button";
import suppliedLessons from "@/data/supplied-lessons.json";
import type { CatalogLesson } from "@/data/lesson-catalog";

type ReaderSize = "sm" | "md" | "lg";
type Section = { id: string; title: string; blocks: { type: string; text: string }[] };

function Index({ sections, onPick }: { sections: Section[]; onPick?: () => void }) {
  return <nav aria-label="Índice da lição">
    <p className="text-muted mb-3 text-xs tracking-caps uppercase">Índice</p>
    <ol className="flex flex-col gap-0.5">{sections.map((section) => <li key={section.id}>
      <a href={`#${section.id}`} onClick={onPick} className="text-muted hover:bg-surface-2 hover:text-ink block rounded-md px-3 py-2 text-sm leading-snug">{section.title}</a>
    </li>)}</ol>
  </nav>;
}

export function SuppliedLessonReader({ lesson, onOpenLessons, onSelectLesson }: { lesson: CatalogLesson; onOpenLessons: () => void; onSelectLesson: (number: number) => void }) {
  const sections = suppliedLessons[String(lesson.number) as keyof typeof suppliedLessons] as Section[];
  const [indexOpen, setIndexOpen] = useState(false);
  const [size, setSize] = useState<ReaderSize>(() => {
    const saved = localStorage.getItem("lesson-size");
    return saved === "sm" || saved === "lg" ? saved : "md";
  });
  useEffect(() => { document.documentElement.dataset.size = size; localStorage.setItem("lesson-size", size); }, [size]);
  useEffect(() => { setIndexOpen(false); }, [lesson.number]);
  useEffect(() => {
    if (!indexOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIndexOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [indexOpen]);
  return <ScriptureProvider defaultBook="Deuteronômio">
    <div className="min-h-dvh bg-bg text-fg">
      <header className="no-print sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4 sm:h-16 sm:px-6">
          <BookOpen className="text-primary size-5 shrink-0" strokeWidth={1.6} />
          <div className="min-w-0 flex-1"><p className="font-display text-ink truncate text-sm font-semibold sm:text-base">Estudantes da Bíblia</p><p className="text-muted hidden truncate text-xs sm:block">Lições Bíblicas CPAD · Adultos · Lição {lesson.number}</p></div>
          <Button variant="outline" size="sm" onClick={onOpenLessons} aria-label="Escolher lição"><BookOpen className="size-4" /> Lições</Button>
          <Button variant="ghost" size="icon" aria-label="Diminuir texto" disabled={size === "sm"} onClick={() => setSize(size === "lg" ? "md" : "sm")}><Minus className="size-4" /></Button>
          <span className="text-muted hidden w-5 text-center font-display sm:block" aria-hidden="true">{size === "sm" ? "A−" : size === "lg" ? "A+" : "A"}</span>
          <Button variant="ghost" size="icon" aria-label="Aumentar texto" disabled={size === "lg"} onClick={() => setSize(size === "sm" ? "md" : "lg")}><Plus className="size-4" /></Button>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Abrir índice" aria-expanded={indexOpen} onClick={() => setIndexOpen(true)}><List className="size-5" /></Button>
        </div>
      </header>
      {indexOpen && <div className="no-print fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Índice da lição">
        <button type="button" className="absolute inset-0 bg-ink/40" aria-label="Fechar índice" onClick={() => setIndexOpen(false)} />
        <div className="bg-surface absolute inset-y-0 right-0 flex w-full max-w-xs flex-col shadow-card"><div className="flex h-14 items-center justify-between border-b border-border px-4"><p className="font-display font-semibold">Índice</p><Button variant="ghost" size="icon" aria-label="Fechar" onClick={() => setIndexOpen(false)}><X className="size-5" /></Button></div><div className="flex-1 overflow-y-auto p-4"><Index sections={sections} onPick={() => setIndexOpen(false)} /></div></div>
      </div>}
      <div className="mx-auto flex max-w-6xl">
        <aside className="no-print hidden w-64 shrink-0 lg:block"><div className="sticky top-20 max-h-[calc(100dvh-6rem)] overflow-y-auto px-6 py-10"><Index sections={sections} /></div></aside>
        <main className="reader-body min-w-0 flex-1 px-4 pt-6 pb-24 sm:px-8 sm:pt-10">
          <header className="mb-4"><figure className="overflow-hidden rounded-xl shadow-card"><img src="/hero.jpg" alt="Multidão caminhando pelo deserto rumo à luz" className="aspect-video w-full object-cover" /></figure>
            <div className="mt-8 text-center"><p className="text-muted text-xs tracking-caps uppercase">4º trimestre de 2026 · Adultos</p><p className="font-display text-primary mt-4 text-5xl font-semibold sm:text-6xl">{String(lesson.number).padStart(2, "0")}</p><h1 className="font-display mt-3 text-3xl leading-tight font-semibold sm:text-4xl">{lesson.title}</h1><p className="text-muted mx-auto mt-4 max-w-xl text-base leading-relaxed">O Deus da Aliança — Advertências, promessas e bênçãos no livro de Deuteronômio</p><p className="text-subtle mt-3 text-sm">Lições Bíblicas CPAD Adultos · Comentarista Osiel Gomes</p></div>
          </header>
          {sections.map((section) => <section key={section.id} id={section.id} className="scroll-mt-20">
            <div className="ornament my-10" aria-hidden="true"><span className="ornament-diamond" /></div>
            <h2 className="font-display text-primary mb-6 text-center text-sm font-semibold tracking-wide uppercase">{section.title}</h2>
            <div className={section.title === "Texto áureo" ? "border-primary bg-surface space-y-4 rounded-xl border-l-4 px-6 py-6 shadow-card sm:px-8" : section.title.startsWith("Sinopse") || section.title.startsWith("Auxílio") || section.title.startsWith("Ampliando") ? "bg-surface space-y-4 rounded-xl px-6 py-6 shadow-card sm:px-8" : "space-y-5"}>
              {section.blocks.map((block, index) => block.type === "heading" ? <h3 key={index} className="font-display text-ink pt-2 text-lg font-semibold">{block.text}</h3> : <p key={index} className={section.title === "Texto áureo" ? "font-display text-xl leading-relaxed italic sm:text-2xl" : section.title === "Revisando o conteúdo" && index % 2 === 0 ? "font-semibold leading-relaxed" : "leading-relaxed"}><ScriptureText text={block.text} /></p>)}
            </div>
          </section>)}
          <nav aria-label="Navegar entre lições" className="no-print mt-12 flex flex-wrap justify-between gap-3 border-t border-border pt-6"><Button variant="outline" size="sm" onClick={() => onSelectLesson(lesson.number - 1)}><ArrowLeft className="size-4" /> Lição {String(lesson.number - 1).padStart(2, "0")}</Button><Button variant="outline" size="sm" onClick={() => onSelectLesson(lesson.number + 1)}>Lição {String(lesson.number + 1).padStart(2, "0")} <ArrowRight className="size-4" /></Button></nav>
          <footer className="text-subtle mt-16 border-t border-border pt-8 text-center text-sm"><p>Lições Bíblicas CPAD · Adultos · 4º trimestre de 2026</p><p className="mt-1">Comentarista: Osiel Gomes</p></footer>
        </main>
      </div>
    </div>
  </ScriptureProvider>;
}
