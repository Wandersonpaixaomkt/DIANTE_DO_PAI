import { strict as assert } from "node:assert";
import { test } from "node:test";
import { parseScripture } from "./scripture.ts";

test("preserva intervalos de versículos antes de pontuação e após uma lista", () => {
  const examples = [
    ["Deuteronômio 1.1-8.", "Deuteronômio 1.1-8"],
    ["(Dt 7.16,24-26)", "Deuteronômio 7.16,24-26"],
    ["(Hb 3.7-19).", "Hebreus 3.7-19"],
  ];
  for (const [input, title] of examples) {
    const references = parseScripture(input).filter((piece) => piece.type === "ref");
    assert.equal(references.length, 1);
    assert.equal(references[0].ref.title, title);
  }
});
