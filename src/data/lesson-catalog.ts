export type CatalogLesson = {
  number: number;
  title: string;
  url: string;
  summary?: string;
  reading?: string;
};

const origin = "https://escolabiblicadominical.org/";

export const lessonCatalog: CatalogLesson[] = [
  { number: 1, title: "Deuteronômio: O Livro da Aliança", url: origin + "licao-01-deuteronomio-o-livro-da-alianca/", reading: "Deuteronômio 1.1-8", summary: "Uma introdução ao contexto, à estrutura e ao propósito de Deuteronômio, com destaque para a aliança e o chamado à fidelidade." },
  { number: 2, title: "Recapitulando a Jornada no Deserto", url: origin + "licao-02-recapitulando-a-jornada-no-deserto/", reading: "Deuteronômio 1.9-12,19-21,26-28,34-36", summary: "Moisés relembra a caminhada de Israel, a liderança compartilhada e as consequências da incredulidade." },
  { number: 3, title: "A Fidelidade de Deus diante da Infidelidade de Israel", url: origin + "licao-03-a-fidelidade-de-deus-diante-da-infidelidade-de-israel/", reading: "Deuteronômio 4.1-4,25-31", summary: "O contraste entre a fidelidade de Deus e os desvios de Israel conduz a uma reflexão sobre obediência, arrependimento e restauração." },
  { number: 4, title: "O Chamado à Obediência", url: origin + "licao-04-o-chamado-a-obediencia/", reading: "Deuteronômio 5.1-10,16-21,29", summary: "Os mandamentos são retomados no contexto da aliança, convidando o povo a ouvir, aprender e praticar a Palavra." },
  { number: 5, title: "O Grande Mandamento", url: origin + "licao-05-o-grande-mandamento/", summary: "A lição apresenta o amor a Deus como centro da vida de fé e da transmissão do ensino às próximas gerações." },
  { number: 6, title: "A Aliança e as Bênçãos da Obediência", url: origin + "licao-06-a-alianca-e-as-bencaos-da-obediencia/", summary: "Uma reflexão sobre a relação entre a aliança, a fidelidade e as bênçãos associadas à obediência." },
  { number: 7, title: "Maldições e Bênçãos da Aliança", url: origin + "licao-07-maldicoes-e-bencaos-da-alianca/", summary: "A lição examina as advertências e promessas da aliança e as consequências das escolhas do povo." },
  { number: 8, title: "Escolhendo a Vida ou a Morte", url: origin + "licao-08-escolhendo-a-vida-ou-a-morte/", summary: "Moisés apresenta ao povo uma escolha decisiva e o convida a permanecer no caminho da vida e da fidelidade." },
  { number: 9, title: "A Sucessão de Moisés", url: origin + "licao-09-a-sucessao-de-moises/", summary: "A passagem da liderança de Moisés a Josué destaca continuidade, coragem e confiança na presença de Deus." },
  { number: 10, title: "O Cântico de Moisés — Advertência e Esperança", url: origin + "licao-10-o-cantico-de-moises-advertencia-e-esperanca/", summary: "O cântico reúne memória, advertência e esperança, lembrando a fidelidade de Deus ao longo da história de Israel." },
  { number: 11, title: "A Bênção Final de Moisés", url: origin + "licao-11-a-bencao-final-de-moises/" },
  { number: 12, title: "A Morte de Moisés e a Continuidade da Promessa", url: origin + "licao-12-a-morte-de-moises-e-a-continuidade-da-promessa/" },
  { number: 13, title: "O Cumprimento de Deuteronômio em Cristo", url: origin + "licao-13-o-cumprimento-de-deuteronomio-em-cristo/" },
];
