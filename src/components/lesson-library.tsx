import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, ExternalLink, FileText, X } from "lucide-react";
import { LessonReader } from "@/components/lesson-reader";
import { LessonCover } from "@/components/lesson-cover";
import { SuppliedLessonReader } from "@/components/supplied-lesson-reader";
import { Button } from "@/components/ui/button";
import { lessonCatalog, type CatalogLesson } from "@/data/lesson-catalog";

function lessonFromUrl() {
  const number = Number(new URLSearchParams(window.location.search).get("licao"));
  return Number.isInteger(number) && number >= 1 && number <= 13 ? number : 2;
}

export function LessonLibrary() {
  const [number, setNumber] = useState(lessonFromUrl);
  const [menuOpen, setMenuOpen] = useState(false);
  const lesson = lessonCatalog[number - 1];

  useEffect(() => {
    const onPopState = () => setNumber(lessonFromUrl());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = priorOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const selectLesson = useCallback((next: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("licao", String(next));
    url.hash = "";
    window.history.pushState({}, "", url);
    setNumber(next);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    document.title = `Lição ${String(number).padStart(2, "0")} — ${lesson.title}`;
  }, [number, lesson.title]);

  return (
    <>
      {number === 2 ? (
        <LessonReader onOpenLessons={() => setMenuOpen(true)} onSelectLesson={selectLesson} />
      ) : (number === 1 || (number >= 3 && number <= 6)) ? (
        <SuppliedLessonReader key={number} lesson={lesson} onOpenLessons={() => setMenuOpen(true)} onSelectLesson={selectLesson} />
      ) : (
        <LessonOverview lesson={lesson} onOpenLessons={() => setMenuOpen(true)} onSelectLesson={selectLesson} />
      )}
      {menuOpen && (
        <div className="no-print fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-labelledby="lesson-menu-title">
          <button type="button" className="absolute inset-0 bg-ink/50" aria-label="Fechar menu de lições" onClick={() => setMenuOpen(false)} />
          <div className="bg-surface absolute inset-y-0 right-0 flex w-full max-w-md flex-col shadow-xl">
            <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-5">
              <div>
                <p className="text-primary text-[10px] font-semibold tracking-caps uppercase">4º trimestre de 2026</p>
                <h2 id="lesson-menu-title" className="mt-1 text-xl font-semibold">Escolha uma lição</h2>
                <p className="text-muted mt-1 text-sm">O Deus da Aliança · Adultos</p>
              </div>
              <Button variant="ghost" size="icon" aria-label="Fechar menu" onClick={() => setMenuOpen(false)}><X className="size-5" /></Button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-3" aria-label="Lições do trimestre">
              {lessonCatalog.map((item) => (
                <button key={item.number} type="button" aria-current={item.number === number ? "page" : undefined} onClick={() => selectLesson(item.number)} className={`flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition-colors ${item.number === number ? "bg-surface-2 text-primary" : "text-ink hover:bg-surface-2"}`}>
                  <span className="font-display mt-0.5 w-7 shrink-0 text-sm font-semibold tabular-nums">{String(item.number).padStart(2, "0")}</span>
                  <span className="min-w-0 text-sm leading-snug"><span className="block font-semibold">{item.title}</span>{item.number >= 11 && <span className="text-muted mt-1 block text-xs">Aguardando conteúdo na fonte</span>}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

function LessonOverview({ lesson, onOpenLessons, onSelectLesson }: { lesson: CatalogLesson; onOpenLessons: () => void; onSelectLesson: (number: number) => void }) {
  const available = lesson.number < 11;
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="no-print sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4 sm:h-16 sm:px-6">
          <BookOpen className="text-primary size-5 shrink-0" strokeWidth={1.6} />
          <div className="min-w-0 flex-1"><p className="font-display truncate text-sm font-semibold sm:text-base">Estudantes da Bíblia</p><p className="text-muted hidden text-xs sm:block">Lições Bíblicas CPAD · Adultos · Lição {lesson.number}</p></div>
          <Button variant="outline" size="sm" className="gap-2" onClick={onOpenLessons} aria-label="Escolher lição"><BookOpen className="size-4" />Lições</Button>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-5 pt-10 pb-24 sm:px-8 sm:pt-16">
        <div className="mb-9"><LessonCover number={lesson.number} /></div>
        <p className="text-muted text-center text-xs tracking-caps uppercase">4º trimestre de 2026 · Adultos</p>
        <p className="font-display text-primary mt-5 text-center text-5xl font-semibold">{String(lesson.number).padStart(2, "0")}</p>
        <h1 className="font-display mt-4 text-center text-3xl leading-tight font-semibold sm:text-5xl">{lesson.title}</h1>
        <p className="text-muted mx-auto mt-5 max-w-xl text-center text-base leading-relaxed">O Deus da Aliança — Advertências, promessas e bênçãos no livro de Deuteronômio</p>
        <div className="ornament my-10" aria-hidden="true"><span className="ornament-diamond" /></div>
        {available ? (
          <section className="rounded-xl border border-border bg-surface p-6 shadow-card sm:p-9">
            <p className="text-primary text-xs font-semibold tracking-caps uppercase">Visão geral</p>
            <p className="reader-body mt-4">{lesson.summary}</p>
            {lesson.reading && <p className="text-muted mt-5 text-sm"><strong className="text-ink">Leitura bíblica:</strong> {lesson.reading}</p>}
            {lesson.number === 1 ? (
              <div className="mt-7 border-t border-border pt-6">
                <p className="text-muted mb-4 text-sm">A lição completa está disponível no PDF enviado com o projeto.</p>
                <a href="/licoes/licao-01.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-fg hover:opacity-90"><FileText className="size-4" />Abrir lição completa em PDF</a>
              </div>
            ) : (
              <div className="mt-7 border-t border-border pt-6">
                <p className="text-muted mb-4 text-sm">Para consultar o texto completo, acesse a publicação original.</p>
                <a href={lesson.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-fg hover:opacity-90">Ler lição completa <ExternalLink className="size-4" /></a>
              </div>
            )}
          </section>
        ) : (
          <section className="rounded-xl border border-border bg-surface p-7 text-center shadow-card sm:p-10">
            <BookOpen className="text-primary mx-auto size-7" strokeWidth={1.5} />
            <h2 className="font-display mt-4 text-xl font-semibold">Conteúdo em breve</h2>
            <p className="text-muted mx-auto mt-3 max-w-md leading-relaxed">A publicação original ainda informa que a lição completa será disponibilizada em breve.</p>
            <a href={lesson.url} target="_blank" rel="noopener noreferrer" className="text-primary mt-5 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4">Verificar na fonte <ExternalLink className="size-4" /></a>
          </section>
        )}
        <p className="text-subtle mt-5 text-center text-xs">Fonte: <a className="underline underline-offset-2" href={lesson.url} target="_blank" rel="noopener noreferrer">Escola Bíblica Dominical</a> · Comentarista: Osiel Gomes</p>
        <nav className="no-print mt-10 flex items-center justify-between gap-3 border-t border-border pt-6" aria-label="Navegar entre lições">
          <Button variant="outline" size="sm" disabled={lesson.number === 1} onClick={() => onSelectLesson(lesson.number - 1)}><ArrowLeft className="size-4" /> Anterior</Button>
          <span className="text-muted text-xs tabular-nums">{lesson.number} de 13</span>
          <Button variant="outline" size="sm" disabled={lesson.number === 13} onClick={() => onSelectLesson(lesson.number + 1)}>Próxima <ArrowRight className="size-4" /></Button>
        </nav>
      </main>
    </div>
  );
}
