export type VerseSpec =
  | { kind: "verses"; chapter: number; verses: string }
  | { kind: "chapters"; start: number; end: number };

export type ScriptureRef = {
  label: string;
  title: string;
  book: string;
  spec: VerseSpec;
};

export type ScripturePiece =
  | { type: "text"; text: string }
  | { type: "ref"; ref: ScriptureRef };

type Book = { name: string; aliases: string[] };

const BOOKS: Book[] = [
  { name: "Gênesis", aliases: ["Gn", "Gênesis", "Genesis"] },
  { name: "Êxodo", aliases: ["Êx", "Ex", "Êxodo", "Exodo"] },
  { name: "Levítico", aliases: ["Lv", "Levítico", "Levitico"] },
  { name: "Números", aliases: ["Nm", "Números", "Numeros"] },
  { name: "Deuteronômio", aliases: ["Dt", "Deuteronômio", "Deuteronomio"] },
  { name: "Josué", aliases: ["Js", "Josué", "Josue"] },
  { name: "Juízes", aliases: ["Jz", "Juízes", "Juizes"] },
  { name: "Rute", aliases: ["Rt", "Rute"] },
  { name: "1 Samuel", aliases: ["1Sm", "1 Sm", "1 Samuel"] },
  { name: "2 Samuel", aliases: ["2Sm", "2 Sm", "2 Samuel"] },
  { name: "1 Reis", aliases: ["1Rs", "1 Rs", "1 Reis"] },
  { name: "2 Reis", aliases: ["2Rs", "2 Rs", "2 Reis"] },
  { name: "1 Crônicas", aliases: ["1Cr", "1 Cr", "1 Crônicas", "1 Cronicas"] },
  { name: "2 Crônicas", aliases: ["2Cr", "2 Cr", "2 Crônicas", "2 Cronicas"] },
  { name: "Esdras", aliases: ["Ed", "Esdras"] },
  { name: "Neemias", aliases: ["Ne", "Neemias"] },
  { name: "Ester", aliases: ["Et", "Ester"] },
  { name: "Jó", aliases: ["Jó", "Job"] },
  { name: "Salmos", aliases: ["Sl", "Salmos", "Salmo"] },
  { name: "Provérbios", aliases: ["Pv", "Provérbios", "Proverbios"] },
  { name: "Eclesiastes", aliases: ["Ec", "Eclesiastes"] },
  { name: "Cânticos", aliases: ["Ct", "Cânticos", "Canticos", "Cantares"] },
  { name: "Isaías", aliases: ["Is", "Isaías", "Isaias"] },
  { name: "Jeremias", aliases: ["Jr", "Jeremias"] },
  { name: "Lamentações", aliases: ["Lm", "Lamentações", "Lamentacoes"] },
  { name: "Ezequiel", aliases: ["Ez", "Ezequiel"] },
  { name: "Daniel", aliases: ["Dn", "Daniel"] },
  { name: "Oséias", aliases: ["Os", "Oséias", "Oseias"] },
  { name: "Joel", aliases: ["Jl", "Joel"] },
  { name: "Amós", aliases: ["Am", "Amós", "Amos"] },
  { name: "Obadias", aliases: ["Ob", "Obadias"] },
  { name: "Jonas", aliases: ["Jn", "Jonas"] },
  { name: "Miquéias", aliases: ["Mq", "Miquéias", "Miqueias"] },
  { name: "Naum", aliases: ["Na", "Naum"] },
  { name: "Habacuque", aliases: ["Hc", "Habacuque"] },
  { name: "Sofonias", aliases: ["Sf", "Sofonias"] },
  { name: "Ageu", aliases: ["Ag", "Ageu"] },
  { name: "Zacarias", aliases: ["Zc", "Zacarias"] },
  { name: "Malaquias", aliases: ["Ml", "Malaquias"] },
  { name: "Mateus", aliases: ["Mt", "Mateus"] },
  { name: "Marcos", aliases: ["Mc", "Marcos"] },
  { name: "Lucas", aliases: ["Lc", "Lucas"] },
  { name: "João", aliases: ["Jo", "João", "Joao"] },
  { name: "Atos", aliases: ["At", "Atos"] },
  { name: "Romanos", aliases: ["Rm", "Romanos"] },
  { name: "1 Coríntios", aliases: ["1Co", "1 Co", "1 Coríntios", "1 Corintios"] },
  { name: "2 Coríntios", aliases: ["2Co", "2 Co", "2 Coríntios", "2 Corintios"] },
  { name: "Gálatas", aliases: ["Gl", "Gálatas", "Galatas"] },
  { name: "Efésios", aliases: ["Ef", "Efésios", "Efesios"] },
  { name: "Filipenses", aliases: ["Fp", "Fl", "Filipenses"] },
  { name: "Colossenses", aliases: ["Cl", "Colossenses"] },
  { name: "1 Tessalonicenses", aliases: ["1Ts", "1 Ts", "1 Tessalonicenses"] },
  { name: "2 Tessalonicenses", aliases: ["2Ts", "2 Ts", "2 Tessalonicenses"] },
  { name: "1 Timóteo", aliases: ["1Tm", "1 Tm", "1 Timóteo", "1 Timoteo"] },
  { name: "2 Timóteo", aliases: ["2Tm", "2 Tm", "2 Timóteo", "2 Timoteo"] },
  { name: "Tito", aliases: ["Tt", "Tito"] },
  { name: "Filemom", aliases: ["Fm", "Filemom"] },
  { name: "Hebreus", aliases: ["Hb", "Hebreus"] },
  { name: "Tiago", aliases: ["Tg", "Tiago"] },
  { name: "1 Pedro", aliases: ["1Pe", "1 Pe", "1 Pedro"] },
  { name: "2 Pedro", aliases: ["2Pe", "2 Pe", "2 Pedro"] },
  { name: "1 João", aliases: ["1Jo", "1 Jo", "1 João", "1 Joao"] },
  { name: "2 João", aliases: ["2Jo", "2 Jo", "2 João", "2 Joao"] },
  { name: "3 João", aliases: ["3Jo", "3 Jo", "3 João", "3 Joao"] },
  { name: "Judas", aliases: ["Jd", "Judas"] },
  { name: "Apocalipse", aliases: ["Ap", "Apocalipse"] },
];

const ALIASES = BOOKS.flatMap((book) =>
  book.aliases.map((alias) => ({ name: book.name, alias })),
).sort((a, b) => b.alias.length - a.alias.length);

const SPEC =
  /^(\d+)(?:\.(\d+)((?:\s*,\s*\d+)+|\s*[-–—]\s*\d+(?![.\d]))?|\s*[-–—]\s*(\d+)(?![.\d]))?/;

function isLetterOrNumber(ch: string | undefined) {
  return !!ch && /[\p{L}\p{N}]/u.test(ch);
}

function matchBookAt(text: string, index: number) {
  if (isLetterOrNumber(text[index - 1])) return null;
  for (const entry of ALIASES) {
    if (!text.startsWith(entry.alias, index)) continue;
    const end = index + entry.alias.length;
    if (isLetterOrNumber(text[end])) continue;
    if (!/^\s+\d/.test(text.slice(end))) continue;
    return { name: entry.name, alias: entry.alias, end };
  }
  return null;
}

function parseSpec(text: string, index: number) {
  const match = SPEC.exec(text.slice(index));
  if (!match) return null;
  const chapter = Number(match[1]);
  const printed = match[0];
  if (match[2]) {
    const tail = (match[3] ?? "").replace(/\s/g, "").replace(/[–—]/g, "-");
    let verses = `${match[2]}${tail}`;
    let end = index + printed.length;
    let shown = printed;
    while (true) {
      const more = /^,\s*(\d+)(?:[-–—](\d+))?(?![.\d])/.exec(text.slice(end));
      if (!more) break;
      verses += "," + (more[2] ? `${more[1]}-${more[2]}` : more[1]);
      shown += more[0];
      end += more[0].length;
    }
    return {
      spec: {
        kind: "verses" as const,
        chapter,
        verses,
      },
      end,
      printed: shown,
    };
  }
  if (match[4]) {
    return {
      spec: {
        kind: "chapters" as const,
        start: chapter,
        end: Number(match[4]),
      },
      end: index + printed.length,
      printed,
    };
  }
  return {
    spec: { kind: "chapters" as const, start: chapter, end: chapter },
    end: index + printed.length,
    printed,
  };
}

function acceptable(spec: VerseSpec) {
  if (spec.kind === "chapters") {
    return spec.end >= spec.start && spec.end - spec.start <= 2;
  }
  return spec.chapter >= 1 && spec.chapter <= 150 && spec.verses.length > 0;
}

function pretty(spec: VerseSpec) {
  if (spec.kind === "verses") return `${spec.chapter}.${spec.verses}`;
  if (spec.start === spec.end) return String(spec.start);
  return `${spec.start}–${spec.end}`;
}

function makeRef(book: string, label: string, spec: VerseSpec): ScriptureRef {
  return {
    label,
    title: `${book} ${pretty(spec)}`,
    book,
    spec,
  };
}

export function parseScripture(text: string, defaultBook?: string): ScripturePiece[] {
  const pieces: ScripturePiece[] = [];
  let buffer = "";
  let index = 0;

  function flush() {
    if (!buffer) return;
    pieces.push({ type: "text", text: buffer });
    buffer = "";
  }

  while (index < text.length) {
    const book = matchBookAt(text, index);
    if (book) {
      let cursor = book.end;
      while (text[cursor] === " " || text[cursor] === "\n") cursor += 1;
      const spec = parseSpec(text, cursor);
      if (spec && /^\s*[-–—]\s*\d+\.\d+/.test(text.slice(spec.end))) {
        buffer += text.slice(index, book.end);
        index = book.end;
        continue;
      }
      if (spec && acceptable(spec.spec)) {
        flush();
        const label = text.slice(index, spec.end).replace(/\s+/g, " ").trim();
        pieces.push({ type: "ref", ref: makeRef(book.name, label, spec.spec) });
        index = spec.end;
        let current = book.name;
        while (index < text.length) {
          const sep = /^\s*;\s*(?:[Cc]f\.?\s*)?/.exec(text.slice(index));
          if (!sep?.[0]) break;
          const nextAt = index + sep[0].length;
          const nextBook = matchBookAt(text, nextAt);
          if (nextBook) {
            let after = nextBook.end;
            while (text[after] === " " || text[after] === "\n") after += 1;
            const nextSpec = parseSpec(text, after);
            if (!nextSpec || !acceptable(nextSpec.spec)) break;
            pieces.push({ type: "text", text: sep[0] });
            const nextLabel = text
              .slice(nextAt, nextSpec.end)
              .replace(/\s+/g, " ")
              .trim();
            pieces.push({
              type: "ref",
              ref: makeRef(nextBook.name, nextLabel, nextSpec.spec),
            });
            current = nextBook.name;
            index = nextSpec.end;
            continue;
          }
          const nextSpec = parseSpec(text, nextAt);
          if (!nextSpec || !acceptable(nextSpec.spec)) break;
          pieces.push({ type: "text", text: sep[0] });
          pieces.push({
            type: "ref",
            ref: makeRef(current, nextSpec.printed, nextSpec.spec),
          });
          index = nextSpec.end;
        }
        continue;
      }
    }

    if (defaultBook && text[index] === "(") {
      const bare = /^\(\s*(\d+\.\d+(?:\s*[-–—]\s*\d+)?(?:\s*,\s*\d+)*)\s*\)/.exec(
        text.slice(index),
      );
      if (bare) {
        const inner = bare[1].replace(/\s+/g, "");
        const spec = parseSpec(inner, 0);
        if (
          spec &&
          spec.end === inner.length &&
          spec.spec.kind === "verses" &&
          acceptable(spec.spec)
        ) {
          flush();
          pieces.push({ type: "text", text: text.slice(index, index + 1) });
          const open = text.slice(index).indexOf(bare[1]);
          pieces.push({
            type: "ref",
            ref: makeRef(defaultBook, bare[1].replace(/\s+/g, ""), spec.spec),
          });
          const closeAt = index + open + bare[1].length;
          pieces.push({ type: "text", text: text.slice(closeAt, index + bare[0].length) });
          index += bare[0].length;
          continue;
        }
      }
    }

    buffer += text[index];
    index += 1;
  }

  flush();
  return pieces;
}

export type LoadedVerse = {
  chapter: number;
  verse: number;
  text: string;
};

export type LoadedPassage = {
  title: string;
  verses: LoadedVerse[];
};

const cache = new Map<string, LoadedPassage>();

function cacheKey(ref: ScriptureRef) {
  return `${ref.book}|${ref.spec.kind}|${pretty(ref.spec)}`;
}

type ApiVerse = { chapter: number; verse: number; text: string };

export async function fetchPassage(
  ref: ScriptureRef,
  signal?: AbortSignal,
): Promise<LoadedPassage> {
  const key = cacheKey(ref);
  const hit = cache.get(key);
  if (hit) return hit;

  const spec = ref.spec;
  const queries =
    spec.kind === "verses"
      ? [`${ref.book} ${spec.chapter}:${spec.verses}`]
      : Array.from(
          { length: spec.end - spec.start + 1 },
          (_, i) => `${ref.book} ${spec.start + i}`,
        );

  const parts = await Promise.all(
    queries.map(async (query) => {
      const url = `https://bible-api.com/${encodeURIComponent(query)}?translation=almeida`;
      const response = await fetch(url, { signal });
      if (!response.ok) throw new Error("missing");
      const data = (await response.json()) as { verses?: ApiVerse[] };
      return data.verses ?? [];
    }),
  );

  const loaded: LoadedPassage = {
    title: ref.title,
    verses: parts.flat().map((verse) => ({
      chapter: verse.chapter,
      verse: verse.verse,
      text: verse.text.replace(/\s+/g, " ").trim(),
    })),
  };
  if (loaded.verses.length === 0) throw new Error("empty");
  cache.set(key, loaded);
  return loaded;
}
