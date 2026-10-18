import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  ChevronDown,
  List,
  Minus,
  Plus,
  X,
} from "lucide-react";
import { lesson, toc } from "@/data/lesson";
import { Button } from "@/components/ui/button";
import { ScriptureProvider, ScriptureText } from "@/components/scripture-text";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg";

function useReaderSize() {
  const [size, setSize] = useState<Size>("md");

  useEffect(() => {
    const stored = window.localStorage.getItem("lesson-size") as Size | null;
    if (stored === "sm" || stored === "md" || stored === "lg") {
      setSize(stored);
      document.documentElement.dataset.size = stored;
    }
  }, []);

  function apply(next: Size) {
    setSize(next);
    document.documentElement.dataset.size = next;
    window.localStorage.setItem("lesson-size", next);
  }

  return { size, apply };
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    function onScroll() {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? (el.scrollTop / max) * 100 : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    function update() {
      const offset = 140;
      let current = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= offset) current = id;
      }
      setActive(current);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ids]);
  return active;
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="font-display text-primary mb-3 text-center text-xs font-semibold tracking-caps uppercase">
      {children}
    </p>
  );
}

function Ornament() {
  return (
    <div className="ornament my-10" aria-hidden="true">
      <span className="ornament-diamond" />
    </div>
  );
}

function TocNav({
  active,
  onPick,
  className,
}: {
  active: string;
  onPick?: () => void;
  className?: string;
}) {
  return (
    <nav aria-label="Índice da lição" className={className}>
      <p className="text-muted mb-3 text-xs tracking-caps uppercase">
        Índice
      </p>
      <ol className="flex flex-col gap-0.5">
        {toc.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={onPick}
              className={cn(
                "block rounded-md px-3 py-2 text-sm leading-snug transition-colors duration-150",
                active === item.id
                  ? "bg-surface-2 text-primary"
                  : "text-muted hover:bg-surface-2 hover:text-ink",
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function LessonReader({ onOpenLessons, onSelectLesson }: { onOpenLessons?: () => void; onSelectLesson?: (number: number) => void } = {}) {
  const { size, apply } = useReaderSize();
  const progress = useScrollProgress();
  const ids = useMemo(() => toc.map((t) => t.id), []);
  const active = useActiveSection(ids);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <ScriptureProvider defaultBook={lesson.anchorBook}>
    <div className="bg-bg text-fg min-h-dvh">
      <div
        className="bg-primary no-print pointer-events-none fixed top-0 right-0 left-0 z-50 h-0.5 origin-left"
        style={{ transform: `scaleX(${progress / 100})` }}
        aria-hidden="true"
      />

      <header className="border-border bg-bg/90 no-print sticky top-0 z-40 border-b backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4 sm:h-16 sm:px-6">
          <BookOpen className="text-primary size-5 shrink-0" strokeWidth={1.6} />
          <div className="min-w-0 flex-1">
            <p className="font-display text-ink truncate text-sm font-semibold tracking-tight sm:text-base">
              {lesson.masthead}
            </p>
            <p className="text-muted hidden truncate text-xs sm:block">
              {lesson.series} · {lesson.audience} · Lição {lesson.number}
            </p>
          </div>
          <div className="flex items-center gap-1">
            {onOpenLessons && (
              <Button variant="outline" size="sm" className="mr-1 gap-2" onClick={onOpenLessons} aria-label="Escolher lição">
                <BookOpen className="size-4" /> <span>Lições</span>
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Diminuir texto"
              disabled={size === "sm"}
              onClick={() => apply(size === "lg" ? "md" : "sm")}
            >
              <Minus className="size-4" />
            </Button>
            <span
              className="text-muted w-7 text-center font-display tabular-nums"
              aria-hidden="true"
            >
              {size === "sm" ? "A−" : size === "lg" ? "A+" : "A"}
            </span>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Aumentar texto"
              disabled={size === "lg"}
              onClick={() => apply(size === "sm" ? "md" : "lg")}
            >
              <Plus className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Abrir índice"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <List className="size-5" />
            </Button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div className="no-print fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-ink/40"
            aria-label="Fechar índice"
            onClick={() => setMenuOpen(false)}
          />
          <div className="bg-surface absolute inset-y-0 right-0 flex w-full max-w-xs flex-col shadow-card">
            <div className="flex h-14 items-center justify-between border-b border-border px-4">
              <p className="font-display font-semibold">Índice</p>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Fechar"
                onClick={() => setMenuOpen(false)}
              >
                <X className="size-5" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <TocNav active={active} onPick={() => setMenuOpen(false)} />
            </div>
          </div>
        </div>
      ) : null}

      <div className="mx-auto flex max-w-6xl">
        <aside className="no-print hidden w-64 shrink-0 lg:block">
          <div className="sticky top-20 max-h-[calc(100dvh-6rem)] overflow-y-auto px-6 py-10">
            <TocNav active={active} />
          </div>
        </aside>

        <main className="reader-body min-w-0 flex-1 px-4 pt-6 pb-24 sm:px-8 sm:pt-10">
          <Cover />
          <Golden />
          <Daily />
          <ClassReading />
          <Hymns />
          <Plan />
          <Commentary />
          <Topics />
          <Conclusion />
          <Review />
          <Subsidy />
          {onSelectLesson && (
            <nav aria-label="Navegar entre lições" className="no-print mt-12 flex flex-wrap justify-between gap-3 border-t border-border pt-6">
              <Button variant="outline" size="sm" onClick={() => onSelectLesson(1)}>← Lição 01</Button>
              <Button variant="outline" size="sm" onClick={() => onSelectLesson(3)}>Lição 03 →</Button>
            </nav>
          )}
          <footer className="text-subtle mt-16 border-t border-border pt-8 text-center text-sm">
            <p>
              {lesson.series} · {lesson.audience} · {lesson.quarter}
            </p>
            <p className="mt-1">Comentarista: {lesson.commentator}</p>
          </footer>
        </main>
      </div>
    </div>
    </ScriptureProvider>
  );
}

function Cover() {
  return (
    <header className="mb-4">
      <figure className="overflow-hidden rounded-xl shadow-card">
        <img
          src="/hero.jpg"
          alt="Multidão caminhando pelo deserto rumo à luz, vista por trás"
          className="aspect-video w-full object-cover outline outline-1 -outline-offset-1 outline-ink/10"
        />
      </figure>
      <div className="mt-8 text-center">
        <p className="text-muted text-xs tracking-caps uppercase">
          {lesson.quarter} · {lesson.date}
        </p>
        <p className="font-display text-primary mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">
          {lesson.roman}
        </p>
        <h1 className="font-display mt-3 text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
          {lesson.title}
        </h1>
        <p className="text-muted mx-auto mt-4 max-w-xl text-base leading-relaxed">
          {lesson.courseTitle}
        </p>
        <p className="text-subtle mt-3 text-sm">
          {lesson.series} {lesson.audience} · Comentarista {lesson.commentator}
        </p>
        <div className="mt-5 inline-flex items-center rounded-full border border-border bg-surface px-4 py-1.5 text-xs tracking-caps uppercase">
          Palavra-chave · {lesson.keyword}
        </div>
      </div>
    </header>
  );
}

function Golden() {
  return (
    <section id="texto-aureo" className="scroll-mt-20">
      <Ornament />
      <SectionLabel>Texto áureo</SectionLabel>
      <blockquote className="border-primary bg-surface rounded-xl border-l-4 px-6 py-6 shadow-card sm:px-8">
        <p className="font-display text-xl leading-snug italic sm:text-2xl">
          “{lesson.goldenText.text}”
        </p>
        <cite className="text-primary mt-4 block text-sm not-italic tracking-wide">
          <ScriptureText text={lesson.goldenText.ref} />
        </cite>
      </blockquote>
      <div className="mt-8">
        <SectionLabel>Verdade prática</SectionLabel>
        <p className="text-center text-lg leading-relaxed">
          {lesson.practicalTruth}
        </p>
      </div>
    </section>
  );
}

function Daily() {
  return (
    <section id="leitura-diaria" className="scroll-mt-20">
      <Ornament />
      <SectionLabel>Leitura diária</SectionLabel>
      <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {lesson.daily.map((item) => (
          <li
            key={item.day}
            className="bg-surface rounded-xl px-4 py-4 shadow-card"
          >
            <p className="text-primary text-xs font-semibold tracking-caps uppercase">
              {item.day}
            </p>
            <p className="mt-1 font-semibold">
              <ScriptureText text={item.ref} />
            </p>
            <p className="text-muted mt-1 text-sm leading-snug">{item.title}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ClassReading() {
  return (
    <section id="leitura-classe" className="scroll-mt-20">
      <Ornament />
      <SectionLabel>Leitura bíblica em classe</SectionLabel>
      <h2 className="font-display mb-6 text-center text-2xl font-semibold">
        <ScriptureText text={lesson.classReading.ref} />
      </h2>
      <div className="space-y-8">
        {lesson.classReading.passages.map((passage) => (
          <div key={passage.book}>
            <h3 className="font-display mb-4 text-center text-xl font-semibold">
              {passage.book}
            </h3>
            <ol className="space-y-4">
              {passage.verses.map((v) => (
                <li key={`${passage.book}-${v.n}`} className="flex gap-3">
                  <span className="text-primary w-8 shrink-0 pt-0.5 text-right font-semibold tabular-nums">
                    {v.n}
                  </span>
                  <p className="min-w-0 leading-relaxed">{v.text}</p>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}

function Hymns() {
  return (
    <section id="hinos" className="scroll-mt-20">
      <Ornament />
      <SectionLabel>Hinos sugeridos</SectionLabel>
      <p className="text-muted mb-4 text-center text-sm">
        {lesson.hymnBook}
      </p>
      <ul className="flex flex-wrap justify-center gap-3">
        {lesson.hymns.map((n) => (
          <li
            key={n}
            className="bg-surface min-w-20 rounded-full px-5 py-2.5 text-center shadow-card"
          >
            <span className="font-display text-xl font-semibold">{n}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Plan() {
  const { plan } = lesson;
  return (
    <section id="plano" className="scroll-mt-20">
      <Ornament />
      <SectionLabel>Plano de aula</SectionLabel>
      <div className="space-y-8">
        <article>
          <h3 className="font-display text-xl font-semibold">1. Introdução</h3>
          <p className="mt-3 leading-relaxed">
            <ScriptureText text={plan.introduction} />
          </p>
        </article>
        <article>
          <h3 className="font-display text-xl font-semibold">
            2. Apresentação da lição
          </h3>
          <p className="mt-4 text-sm font-semibold tracking-wide uppercase">
            A) Objetivos
          </p>
          <ol className="mt-2 space-y-2">
            {plan.objectives.map((o, i) => (
              <li key={o} className="flex gap-3">
                <span className="text-primary font-semibold">
                  {["I", "II", "III"][i]}
                </span>
                <span>
                  <ScriptureText text={o} />
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-sm font-semibold tracking-wide uppercase">
            B) Motivação
          </p>
          <p className="mt-2 leading-relaxed">
            <ScriptureText text={plan.motivation} />
          </p>
          <p className="mt-5 text-sm font-semibold tracking-wide uppercase">
            C) Sugestão de método
          </p>
          <p className="mt-2 leading-relaxed">
            <ScriptureText text={plan.method} />
          </p>
        </article>
        <article>
          <h3 className="font-display text-xl font-semibold">
            3. Conclusão da lição
          </h3>
          <p className="mt-3 text-sm font-semibold tracking-wide uppercase">
            A) Aplicação
          </p>
          <p className="mt-2 leading-relaxed">
            <ScriptureText text={plan.application} />
          </p>
        </article>
        <article>
          <h3 className="font-display text-xl font-semibold">
            4. Subsídio ao professor
          </h3>
          <ul className="mt-3 space-y-3">
            {plan.teacherNotes.map((n) => (
              <li key={n} className="text-muted leading-relaxed">
                <ScriptureText text={n} />
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

function Commentary() {
  return (
    <section id="comentario" className="scroll-mt-20">
      <Ornament />
      <SectionLabel>Comentário</SectionLabel>
      <h2 className="font-display mb-4 text-center text-2xl font-semibold">
        Introdução
      </h2>
      <p className="drop-cap leading-relaxed">
        <ScriptureText text={lesson.commentaryIntro} />
      </p>
    </section>
  );
}

function Topics() {
  return (
    <>
      {lesson.topics.map((topic, i) => (
        <section
          key={topic.numeral}
          id={`topico-${i + 1}`}
          className="scroll-mt-20"
        >
          <Ornament />
          <p className="font-display text-primary text-center text-4xl font-semibold">
            {topic.numeral}
          </p>
          <h2 className="font-display mt-2 mb-8 text-center text-2xl font-semibold tracking-tight sm:text-3xl">
            {topic.title}
          </h2>
          <ol className="space-y-8">
            {topic.points.map((p, idx) => (
              <li key={p.title}>
                <h3 className="font-display text-lg font-semibold sm:text-xl">
                  <span className="text-primary mr-2">{idx + 1}.</span>{" "}
                  {p.title}
                  {p.refs ? (
                    <span className="text-muted ml-2 text-base font-normal">
                      (<ScriptureText text={p.refs} />)
                    </span>
                  ) : null}
                </h3>
                <p className="mt-3 leading-relaxed">
                  <ScriptureText text={p.body} />
                </p>
              </li>
            ))}
          </ol>
          <p className="border-border text-muted mt-8 border-t pt-5 text-center italic">
            Sinopse {topic.numeral} — <ScriptureText text={topic.synopsis} />
          </p>
          {topic.aid ? (
            <aside className="bg-surface mt-8 rounded-xl px-5 py-6 shadow-card sm:px-7">
              <p className="text-primary text-xs font-semibold tracking-caps uppercase">
                {(topic.aid as { kicker?: string }).kicker ??
                  "Auxílio bibliológico"}
              </p>
              <h3 className="font-display mt-2 text-xl font-semibold">
                {topic.aid.heading}
              </h3>
              <blockquote className="mt-4 leading-relaxed italic">
                “<ScriptureText text={topic.aid.quote} />”
              </blockquote>
              <p className="text-muted mt-4 text-sm">
                <ScriptureText text={topic.aid.source} />
              </p>
            </aside>
          ) : null}
        </section>
      ))}
    </>
  );
}

function Conclusion() {
  return (
    <section id="conclusao" className="scroll-mt-20">
      <Ornament />
      <SectionLabel>Conclusão</SectionLabel>
      <p className="leading-relaxed">
        <ScriptureText text={lesson.conclusion} />
      </p>
    </section>
  );
}

function Review() {
  return (
    <section id="revisando" className="scroll-mt-20">
      <Ornament />
      <SectionLabel>Revisando o conteúdo</SectionLabel>
      <ol className="space-y-3">
        {lesson.review.map((item, i) => (
          <li key={item.q}>
            <details className="bg-surface group rounded-xl shadow-card">
              <summary className="flex cursor-pointer list-none items-start gap-3 px-4 py-4 sm:px-5">
                <span className="text-primary font-display mt-0.5 w-6 shrink-0 text-lg font-semibold">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1 font-medium leading-snug">
                  <ScriptureText text={item.q} />
                </span>
                <ChevronDown className="text-muted mt-1 size-5 shrink-0 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <p className="text-muted border-t border-border px-4 py-4 leading-relaxed sm:px-5 sm:pl-14">
                <ScriptureText text={item.a} />
              </p>
            </details>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Subsidy() {
  const s = lesson.teacherSubsidy;
  return (
    <section id="subsidio" className="scroll-mt-20">
      <Ornament />
      <SectionLabel>Subsídios Ensinador Cristão</SectionLabel>
      <h2 className="font-display mb-6 text-center text-2xl font-semibold">
        {s.heading}
      </h2>
      <div className="space-y-5">
        {s.body.map((p) => (
          <p key={p.slice(0, 48)} className="leading-relaxed">
            <ScriptureText text={p} />
          </p>
        ))}
      </div>
    </section>
  );
}
