import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { X } from "lucide-react";
import {
  fetchPassage,
  parseScripture,
  type LoadedPassage,
  type ScriptureRef,
} from "@/lib/scripture";

const ScriptureContext = createContext<{
  open: (ref: ScriptureRef) => void;
  defaultBook?: string;
} | null>(null);

export function ScriptureProvider({
  defaultBook,
  children,
}: {
  defaultBook?: string;
  children: ReactNode;
}) {
  const [active, setActive] = useState<ScriptureRef | null>(null);

  return (
    <ScriptureContext.Provider value={{ open: setActive, defaultBook }}>
      {children}
      <VerseDialog refData={active} onClose={() => setActive(null)} />
    </ScriptureContext.Provider>
  );
}

export function ScriptureText({ text }: { text: string }) {
  const ctx = useContext(ScriptureContext);
  const parts = useMemo(
    () => parseScripture(text, ctx?.defaultBook),
    [text, ctx?.defaultBook],
  );

  if (!ctx || (parts.length === 1 && parts[0].type === "text")) {
    return <>{text}</>;
  }

  return (
    <>
      {parts.map((part, index) =>
        part.type === "text" ? (
          <span key={index}>{part.text}</span>
        ) : (
          <button
            key={index}
            type="button"
            className="inline cursor-pointer border-0 bg-transparent p-0 text-primary underline decoration-dotted decoration-primary/50 underline-offset-4 hover:decoration-solid"
            style={{ font: "inherit" }}
            aria-haspopup="dialog"
            aria-label={`Ler ${part.ref.title}`}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              ctx.open(part.ref);
            }}
          >
            {part.ref.label}
          </button>
        ),
      )}
    </>
  );
}

function VerseDialog({
  refData,
  onClose,
}: {
  refData: ScriptureRef | null;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [passage, setPassage] = useState<LoadedPassage | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (refData && !dialog.open) dialog.showModal();
    if (!refData && dialog.open) dialog.close();
  }, [refData]);

  useEffect(() => {
    if (!refData) return;
    const controller = new AbortController();
    setStatus("loading");
    setPassage(null);
    fetchPassage(refData, controller.signal)
      .then((loaded) => {
        setPassage(loaded);
        setStatus("ready");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setStatus("error");
      });
    return () => controller.abort();
  }, [refData]);

  const manyChapters =
    passage != null && new Set(passage.verses.map((verse) => verse.chapter)).size > 1;

  return (
    <dialog
      ref={dialogRef}
      className="verse-dialog"
      aria-labelledby="verse-dialog-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0">
          <p className="text-primary text-xs font-semibold tracking-caps uppercase">
            Almeida
          </p>
          <h2
            id="verse-dialog-title"
            className="font-display mt-1 text-2xl leading-tight font-semibold"
          >
            {refData?.title}
          </h2>
        </div>
        <button
          type="button"
          className="text-muted hover:text-ink -mr-1 inline-flex size-9 shrink-0 items-center justify-center rounded-full"
          aria-label="Fechar"
          onClick={onClose}
        >
          <X className="size-5" />
        </button>
      </div>
      <div className="verse-dialog-body px-5 py-5 sm:px-6">
        {status === "loading" ? (
          <p className="text-muted">Buscando o texto…</p>
        ) : null}
        {status === "error" ? (
          <p className="text-muted leading-relaxed">
            Não foi possível abrir este trecho agora. Verifique a conexão e tente de novo.
          </p>
        ) : null}
        {status === "ready" && passage ? (
          <ol className="space-y-4">
            {passage.verses.map((verse) => (
              <li
                key={`${verse.chapter}-${verse.verse}`}
                className="flex gap-3"
              >
                <span className="text-primary w-12 shrink-0 pt-0.5 text-right font-semibold tabular-nums">
                  {manyChapters ? `${verse.chapter}.${verse.verse}` : verse.verse}
                </span>
                <p className="min-w-0 leading-relaxed">{verse.text}</p>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </dialog>
  );
}
