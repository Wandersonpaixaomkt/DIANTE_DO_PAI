export type DailyReading = {
  day: string;
  ref: string;
  title: string;
};

export type Verse = {
  n: number;
  text: string;
};

export type Passage = {
  book: string;
  verses: Verse[];
};

export type ReviewItem = {
  q: string;
  a: string;
};

export type TopicPoint = {
  title: string;
  refs?: string;
  body: string;
};

export type Topic = {
  numeral: string;
  title: string;
  points: TopicPoint[];
  synopsis: string;
  aid?: {
    kicker?: string;
    heading: string;
    quote: string;
    source: string;
  };
};

export const lesson = {
  masthead: "Estudantes da Bíblia",
  mastheadVerse: "Persiste em ler, … e ensinar (1 Tm 4.13)",
  series: "Lições Bíblicas CPAD",
  audience: "Adultos",
  quarter: "4º Trimestre de 2026",
  courseTitle:
    "O Deus da Aliança — Advertências, promessas e bênçãos no livro de Deuteronômio",
  commentator: "Osiel Gomes",
  number: 2,
  roman: "II",
  title: "Recapitulando a jornada no deserto",
  date: "11 de outubro de 2026",
  keyword: "Incredulidade",
  anchorBook: "Deuteronômio",
  hymns: ["58", "225", "365"],
  hymnBook: "Harpa Cristã",
  goldenText: {
    text: "O Senhor, vosso Deus, que vai adiante de vós, por vós pelejará, conforme tudo o que fez convosco, diante de vossos olhos, no Egito.",
    ref: "Dt 1.30",
  },
  practicalTruth:
    "Confiar em Deus conduz à vitória; já a incredulidade leva à derrota e ao fracasso espiritual.",
  daily: [
    {
      day: "Segunda",
      ref: "Dt 1.9-12",
      title: "A liderança compartilhada fortalece a obra de Deus",
    },
    {
      day: "Terça",
      ref: "Êx 18.21; At 6.3",
      title: "A liderança segundo Deus é compartilhada, criteriosa e espiritual",
    },
    {
      day: "Quarta",
      ref: "Dt 1.21; Hb 11.6",
      title: "A promessa exige fé para ser alcançada",
    },
    {
      day: "Quinta",
      ref: "Dt 1.28; Pv 3.5,6",
      title: "A incredulidade distorce a visão e enfraquece o coração",
    },
    {
      day: "Sexta",
      ref: "Dt 1.34,35",
      title: "A incredulidade impede o cumprimento da promessa divina",
    },
    {
      day: "Sábado",
      ref: "Dt 1.41,42; Is 1.19",
      title: "A obediência no tempo de Deus conduz à vitória",
    },
  ] satisfies DailyReading[],
  classReading: {
    ref: "Deuteronômio 1.9-12,19-21,26-28,34-36",
    passages: [
      {
        book: "Deuteronômio 1",
        verses: [
          {
            n: 9,
            text: "E, no mesmo tempo, eu vos falei, dizendo: Eu sozinho não poderei levar-vos.",
          },
          {
            n: 10,
            text: "O Senhor, vosso Deus já vos tem multiplicado; e eis que já hoje em multidão sois como as estrelas dos céus.",
          },
          {
            n: 11,
            text: "O Senhor, Deus de vossos pais, vos aumente, como sois, ainda mil vezes mais e vos abençoe, como vos tem falado.",
          },
          {
            n: 12,
            text: "Como suportaria eu sozinho as vossas moléstias, e as vossas cargas, e as vossas diferenças?",
          },
          {
            n: 19,
            text: "Então, partimos de Horebe e caminhamos por todo aquele grande e tremendo deserto que vistes, pelo caminho das montanhas dos amorreus, como o Senhor, nosso Deus, nos ordenara; e chegamos a Cades-Barneia.",
          },
          {
            n: 20,
            text: "Então, eu vos disse: Chegados sois às montanhas dos amorreus, que o Senhor, nosso Deus, nos dará.",
          },
          {
            n: 21,
            text: "Eis que o Senhor, teu Deus, te deu esta terra diante de ti; sobe e possuí-a como te falou o Senhor, Deus de teus pais; não temas e não te assustes.",
          },
          {
            n: 26,
            text: "Porém vós não quisestes subir, mas fostes rebeldes ao mandado do Senhor, vosso Deus.",
          },
          {
            n: 27,
            text: "E murmurastes nas vossas tendas e dissestes: Porquanto o Senhor nos aborrece e nos tirou da terra do Egito para nos entregar nas mãos dos amorreus, para destruir-nos.",
          },
          {
            n: 28,
            text: "Para onde subiremos? Nossos irmãos fizeram com que se derretesse o nosso coração, dizendo: Maior e mais alto é este povo do que nós; as cidades são grandes e fortificadas até aos céus; e também vimos ali filhos dos gigantes.",
          },
          {
            n: 34,
            text: "Ouvindo, pois, o Senhor a voz das vossas palavras, indignou-se e jurou, dizendo:",
          },
          {
            n: 35,
            text: "Nenhum dos homens desta maligna geração verá esta boa terra que jurei dar a vossos pais,",
          },
          {
            n: 36,
            text: "salvo Calebe, filho de Jefoné; ele a verá, e a terra que pisou darei a ele e a seus filhos; porquanto perseverou em seguir ao Senhor.",
          },
        ],
      },
    ] satisfies Passage[],
  },
  plan: {
    introduction:
      "Estudaremos a recapitulação feita por Moisés acerca da jornada de Israel no deserto, especialmente os acontecimentos em Cades-Barneia. Ao recordar os erros da antiga geração, o líder de Israel evidencia como a incredulidade, a murmuração e a desobediência impediram o povo de alcançar a promessa divina. Ao mesmo tempo, a lição destaca a importância da liderança sábia, da fé perseverante e da obediência ao Senhor. Trata-se de um chamado à Igreja para que aprenda com o passado e permaneça fiel.",
    objectives: [
      "Enfatizar o valor da liderança compartilhada na obra de Deus",
      "Elencar os perigos espirituais da incredulidade",
      "Refletir sobre as consequências da desobediência a Deus",
    ],
    motivation:
      "A jornada de Israel no deserto revela lições atuais sobre fé, obediência e perseverança. Ela auxilia-nos a perceber que os erros do passado servem de advertência para nossa caminhada espiritual hoje. Essa lição é um desafio a confiarmos plenamente em Deus e a permanecermos firmes na sua Palavra.",
    method:
      "Para iniciar a aula, sugerimos a seguinte pergunta à classe: “Qual experiência com Deus você jamais esqueceu?”. Permita que dois ou três alunos compartilhem respostas rápidas. Em seguida, explique que Moisés utilizou a recordação como instrumento pedagógico e espiritual para fortalecer a nova geração. Mostre que recordar os feitos de Deus preserva a fé, corrige erros e fortalece a perseverança. A partir disso, introduza a ideia central da lição: Israel fracassou quando esqueceu a fidelidade divina e deu lugar à incredulidade. Assim, a memória espiritual torna-se essencial para uma caminhada cristã firme e obediente (Lm 3.21).",
    application:
      "A jornada de Israel no deserto revela que a incredulidade, a murmuração e a desobediência afastam o crente das promessas de Deus. Em contraste, a fé, a perseverança e a submissão à vontade do Senhor conduzem à vitória espiritual.",
    teacherNotes: [
      "Revista Ensinador Cristão. Vale a pena conhecer essa revista que traz reportagens, artigos, entrevistas e subsídios de apoio à Lições Bíblicas Adultos. Na edição 107, p.37, você encontrará um subsídio especial para esta lição.",
      "Auxílios especiais: 1) O texto “O Exemplo de Moisés”, localizado após o primeiro tópico, auxilia na compreensão do tema da liderança compartilhada; 2) O texto “Diga Não à Incredulidade”, localizado ao fim do segundo tópico, aprofunda a reflexão sobre o perigo espiritual da incredulidade enfrentado pela nação de Israel.",
    ],
  },
  commentaryIntro:
    "Analisaremos nesta lição a primeira parte do primeiro grande discurso de Moisés em Deuteronômio, em que ele relembra a trajetória de Israel no deserto e a rebeldia do povo em Cades-Barneia, que se recusou a entrar na Terra Prometida. Assim, o propósito do livro é conduzir a nova geração à reflexão para que ela aprenda com os erros do passado e não os repita, bem como reconheça que a desobediência compromete o cumprimento das promessas divinas e afasta o povo da vontade de Deus. A lição, portanto, será dividida em três partes: o valor da liderança compartilhada (1.9-18); a recusa de entrar em Canaã (1.19-33); e a sentença divina em razão da desobediência (1.34-46).",
  topics: [
    {
      numeral: "I",
      title: "O valor da liderança compartilhada",
      points: [
        {
          title: "A necessidade de liderança",
          refs: "Dt 1.9-12; Gn 15.5",
          body: "A Bíblia evidencia que o crescimento do povo de Deus exige liderança estruturada e compartilhada. Em Deuteronômio 1.9-12, ainda dentro do primeiro discurso de Moisés, vê-se que o legislador de Israel reconhece que não poderia conduzir sozinho uma multidão que crescia conforme a promessa feita a Abraão (Gn 15.5). Com o aumento do povo, surgem também demandas, conflitos e responsabilidades. Por isso, Moisés institui auxiliares, pois compreende que liderar isoladamente conduz ao esgotamento. A liderança compartilhada fortalece a tomada de decisões e protege a obra. Deve, contudo, ser criteriosa e evitar a escolha de pessoas sem vocação, pois Deus requer obreiros comprometidos com a sua vontade.",
        },
        {
          title: "Critérios espirituais para compartilhar a liderança",
          refs: "1Tm 5.22; Êx 18.13-27; At 6.1-6",
          body: "A necessidade de cooperadores não justifica escolhas precipitadas. A Escritura adverte quanto à imposição apressada de mãos (1Tm 5.22) e indica que a liderança deve ser cuidadosamente discernida. Moisés, orientado por Jetro (Êx 18.13-27), selecionou homens com qualidades evidentes: sabedoria, experiência e caráter. A liderança não é fruto de conveniência, e sim de vocação e preparo. Assim como na Igreja Primitiva, a escolha envolve critérios objetivos e participação comunitária (At 6.1-6). Deus requer líderes capazes de servir com responsabilidade, discernimento e compromisso com a sua obra.",
        },
        {
          title: "O exercício justo e subordinado da liderança",
          refs: "Dt 1.16,17; Am 3.3",
          body: "Os líderes escolhidos deveriam agir com justiça e imparcialidade, pois representariam o próprio Deus diante do povo. Não poderiam favorecer pessoas, e sim julgar com equidade (Dt 1.16,17). A liderança delegada exige submissão à autoridade estabelecida e mantém unidade de propósito (Am 3.3). Os líderes deveriam recorrer a Moisés em casos difíceis, evitando, assim, decisões independentes. Desse modo, o êxito ministerial depende da fidelidade às orientações recebidas e do temor ao Senhor. A liderança, portanto, sustenta-se na justiça, na unidade e na consciência de que toda autoridade procede de Deus.",
        },
      ],
      synopsis: "A liderança sábia e compartilhada fortalece a obra de Deus.",
      aid: {
        heading: "O exemplo de Moisés",
        quote:
          "Foi um tremendo fardo para Moisés guiar a nação. Ele poderia não ter completado a tarefa, caso não contasse com a ajuda de Deus e de outras pessoas. Assim como nações, empresas e organizações, na medida em que as igrejas crescem, tornam-se complexas. Surgem as necessidades e disputas internas. Um líder não pode tomar sozinho todas as decisões. Precisa de colaboradores fiéis. Talvez, assim como Moisés, você tenha uma propensão para tentar fazer todo o trabalho sozinho. Por medo ou vergonha, não pede ajuda. Mas lembre-se, Moisés tomou uma sábia decisão ao compartilhar a liderança com outros. Em vez de tentar lidar com as maiores responsabilidades sozinho, procure compartilhar a carga de forma que outros possam ajudá-lo e exercitar seus dons e habilidades dados por Deus em prol da Igreja. Moisés demonstrou ter algumas qualidades comuns nos bons líderes, como sabedoria, experiência e compreensão. Elas são bem diferentes daquelas que costumam ajudar a eleger os líderes de hoje: boa aparência, riqueza, popularidade e disposição para fazer qualquer coisa para chegar ao topo. As qualidades demonstradas por Moisés devem ser cultivadas por nós que lideramos e devem ser identificadas naqueles a quem elegemos como líderes.",
        source:
          "Bíblia de Estudo Aplicação Pessoal. 1ª edição. Rio de Janeiro: CPAD, 2013, pp.232,233.",
      },
    },
    {
      numeral: "II",
      title: "A recusa de entrar na Terra Prometida",
      points: [
        {
          title: "Uma recordação resumida",
          refs: "Dt 1.19-21; Hb 11.6",
          body: "Moisés relembra a jornada desde Horebe até Cades-Barneia e destaca os desafios do deserto e o cuidado constante de Deus (Dt 1.19-21). Mesmo diante de um caminho árido, a promessa estava garantida: “Eis que o Senhor, teu Deus, te deu esta terra diante de ti; sobe e possui-a” (Dt 1.21). Cades-Barneia torna-se símbolo decisivo: lugar de milagres, mas também de incredulidade. Foi ali que o povo esteve às portas da bênção, porém recuou por falta de fé. Essa memória serve de alerta à próxima geração: sem fé é impossível agradar a Deus (Hb 11.6), e a incredulidade impede o cumprimento das suas promessas.",
        },
        {
          title: "Fracassando pela linguagem da incredulidade",
          refs: "Dt 1.21,25,28; Pv 3.5,6",
          body: "Dando continuidade à recordação anterior, Moisés mostra que, mesmo diante da promessa confirmada (Dt 1.21), o povo permitiu que a incredulidade moldasse as suas decisões. Embora os espias reconhecessem que a terra fosse boa (Dt 1.25), as suas palavras foram dominadas pelo medo e pelo desânimo (Dt 1.28). Assim, contrariaram a confiança que deveriam ter em Deus. A narrativa revela que estratégias humanas tornam-se obstáculos quando dissociadas da fé (Pv 3.5,6). A incredulidade não só impede a ação divina, como também contamina a comunidade, gera temor e afasta o povo do cumprimento das promessas.",
        },
        {
          title: "Pecados marcantes na vida de Israel",
          refs: "Dt 1.26,27,31; Hb 3.12; 1Co 10.10",
          body: "Dando sequência ao quadro anterior, a incredulidade expressa pelos espias resultou em pecados concretos no povo. Israel recusou subir, rebelou-se contra a ordem divina e passou a murmurar nas suas tendas (Dt 1.26,27). A desobediência e a falta de fé distorceram a percepção que o povo tinha de Deus, o que o levou a duvidar do seu amor e cuidado. Mesmo diante das promessas e do agir poderoso do Senhor, Israel preferiu retroceder. Moisés, porém, reafirma o cuidado divino e compara-o ao de um pai que cuida e guia o seu filho (Dt 1.31). A lição é clara: a incredulidade gera pecado e impede o avanço espiritual (Hb 3.12; 1Co 10.10).",
        },
      ],
      synopsis: "A incredulidade impediu Israel de entrar na Terra Prometida.",
      aid: {
        heading: "Diga não à incredulidade",
        quote:
          "Moisés relembrou a Israel a história da missão dos espias à Terra Prometida (Nm 13–14). Recordou que, quando eles retornaram com o relatório sobre os gigantes e as cidades muradas, os israelitas temeram prosseguir e começaram a reclamar de sua condição. Mas o relato da minoria, Josué e Calebe, enfatizava que a terra era fértil, o inimigo vulnerável e Deus estava ao lado deles. Tornamo-nos temerosos e ficamos imobilizados quando focamos os aspectos negativos de uma situação. Mas é muito melhor olhar o lado positivo: a orientação de Deus e suas promessas. Diante de uma importante decisão, descubra o que deve fazer e aja com fé. Olhe para as bênçãos enquanto confia em Deus para vencer os obstáculos. Os problemas não podem roubar sua vitória!",
        source:
          "Bíblia de Estudo Aplicação Pessoal. 1ª edição. Rio de Janeiro: CPAD, 2013, p.233.",
      },
    },
    {
      numeral: "III",
      title: "A sentença divina pela desobediência",
      points: [
        {
          title: "A gravidade da rebeldia e o valor da fidelidade",
          refs: "Dt 1.35; Nm 14.30; Dt 31.7,8",
          body: "É severa a expressão divina ao chamar Israel de “geração maligna” (Dt 1.35), mas ela é resultado do desprezo às bênçãos e aos cuidados do Senhor. A rebeldia, evidenciada desde o episódio do bezerro de ouro (Êx 32), revela um coração resistente à Palavra. Por causa disso, aquela geração não entrou na Terra Prometida. Deus, contudo, preserva dois remanescentes fiéis: Calebe e Josué, que não cederam à incredulidade (Nm 14.30). Moisés, ainda que falho (Nm 20.10-12), demonstrou coração pastoral ao interceder pelo povo (Nm 20.6) e, tempos depois, encorajou Josué com maturidade espiritual (Dt 31.7,8).",
        },
        {
          title: "A formação da nova geração pela fidelidade",
          refs: "Dt 1.39; 6.6,7; Pv 22.6; Sl 78.5-8",
          body: "Em continuidade ao contraste entre rebeldia e fidelidade, o Senhor revela que os filhos herdariam a promessa que os seus pais desprezaram (Dt 1.39). Aqueles considerados frágeis foram preservados da sentença, o que evidencia a graça divina. Isso, contudo, não isenta a responsabilidade dos pais: cabe-lhes formar os filhos na fé e na obediência (Dt 6.6,7). A geração anterior fracassou por causa do seu mau exemplo, porém Deus reafirma o seu cuidado e propósito redentor. Assim, os pais devem ensinar, corrigir, testemunhar e conduzir os seus filhos no caminho do Senhor para que estes não repitam os erros do passado (Pv 22.6; Sl 78.5-8).",
        },
        {
          title: "As consequências da desobediência persistente",
          refs: "Dt 1.41,42,44; Is 1.19; 2Co 7.10",
          body: "Dando sequência à sentença divina, Israel passa a experimentar na prática os efeitos da sua rebeldia. Os que rejeitaram a promessa agora tentam agir por conta própria, fora do tempo e da direção de Deus (Dt 1.41,42). O resultado não poderia ser outro: derrota e frustração (Dt 1.44). O choro que se segue não nasce de arrependimento sincero, mas de remorso, não sendo, portanto, ouvido pelo Senhor. A desobediência prolonga o deserto e gera estagnação espiritual. Mais uma lição clara: não devemos agir fora da vontade de Deus, pois isso gera fracasso. Arrependimento tardio sem mudança real não conduz à bênção; o essencial é viver em obediência contínua (Is 1.19; 2Co 7.10).",
        },
      ],
      synopsis: "A desobediência trouxe juízo, mas a fidelidade preservou a promessa.",
    },
  ] satisfies Topic[],
  conclusion:
    "Recapitular a jornada de Israel, especialmente em Cades-Barneia, é contemplar um verdadeiro espelho espiritual. Moisés evidencia que os pecados do povo — rebeldia, desobediência, orgulho e desprezo à voz de Deus — foram determinantes para o seu fracasso. A sua intenção era advertir a nova geração para que esta não repetisse os mesmos erros. Assim como Israel necessitava de fé, obediência e liderança para entrar na Terra Prometida, a Igreja depende desses fundamentos para avançar rumo ao cumprimento da promessa eterna.",
  review: [
    {
      q: "De acordo com a lição, o que a Bíblia evidencia?",
      a: "A Bíblia evidencia que o crescimento do povo de Deus exige liderança estruturada e compartilhada.",
    },
    {
      q: "Quais eram as qualidades evidentes dos homens selecionados por Moisés?",
      a: "Moisés, orientado por Jetro (Êx 18.13-27), seleciona homens com qualidades evidentes: sabedoria, experiência e caráter.",
    },
    {
      q: "Embora os espias reconhecessem que a terra era boa, como foram caracterizadas as palavras deles?",
      a: "Embora os espias reconhecessem a bondade da terra (Dt 1.25), a sua linguagem foi dominada pelo medo e pelo desânimo (Dt 1.28).",
    },
    {
      q: "Como os pais devem agir para conduzir os seus filhos no caminho do Senhor?",
      a: "Os pais devem ensinar, corrigir e testemunhar, conduzindo os seus filhos no caminho do Senhor para que não repitam os erros do passado (Pv 22.6; Sl 78.5-8).",
    },
    {
      q: "Com base na afirmação “A desobediência prolonga o deserto e gera estagnação espiritual”, qual lição aprendemos claramente?",
      a: "Mais uma lição clara: não devemos agir fora da vontade de Deus, pois isso gera fracasso.",
    },
  ] satisfies ReviewItem[],
  teacherSubsidy: {
    heading: "Recapitulando a jornada no deserto",
    body: [
      "O discurso de Moisés reiterava a importância de a nova geração aprender com os erros do passado e não os repetir. Durante a trajetória pelo deserto, os hebreus foram rebeldes e contradizentes aos mandamentos do Senhor (Nm 14.29; Dt 9.23,24). Isso trouxe problemas significativos para o preparo e entrada na Terra Prometida. O primeiro desafio de Moisés para lidar com a inconstância do povo se deu quando saíram das terras egípcias. Moisés precisava organizar a nação e estabelecer novas lideranças a fim de que não se sobrecarregasse com as demandas que surgiam dentre o povo. Mesmo contando com a direção de Deus e sendo criterioso na escolha dos líderes, Moisés deparou-se com a insegurança e insubmissão da parte deles (Êx 18.13-26). Como se não bastasse a incredulidade e insubmissão, o pessimismo era outro problema sério que contaminava os hebreus (Nm 13.31-33).",
      "Na obra Teologia do Antigo Testamento (CPAD), Roy B. Zuck discorre que “em Cades-Barneia (Dt 1.19-46), Moisés exortara o povo a ocupar imediatamente a terra de Canaã, pedido que eles não honraram, embora o Senhor fosse o guerreiro poderoso que lutaria por eles (v.30). O resultado disso foi a rejeição daquela geração má e a transferência da responsabilidade e das bênçãos do concerto para a geração seguinte (v.39). Este é um desenvolvimento muito importante, pois fornece pelo menos parte da razão para o documento de renovação do concerto. Uma geração de Israel poderia falhar, mas a promessa estava intacta. Deus confirmaria as promessas inúmeras vezes, porque Ele não pode negar a si mesmo” (pp.90,91). Nesse contexto, percebe-se que a insistência de Moisés contribuiu significativamente para que a próxima geração entendesse o propósito do Concerto e o levasse adiante da maneira como Deus esperava. Para tanto, havia um aspecto importante que não poderia faltar na vida e no ministério de Moisés: a credibilidade. Ter um excelente testemunho de servo de Deus diz muito mais do que palavras e isso Moisés entendia muito bem. Ele era homem santo, verdadeiro para com Deus e honrado, como provam os milagres que Deus operou por intermédio dele no Egito, bem como na travessia do deserto. Sua autoridade foi defendida e confirmada por Deus em razão de sua fidelidade e compromisso com a missão para a qual havia sido separado (Êx 3). Tais circunstâncias assemelham-se às demandas da igreja hoje. Lidar com pessoas, independentemente da época, é sempre um desafio. Nestes dias trabalhosos, pastores e líderes precisam empregar energia e convicção para levar adiante os projetos definidos para a Obra de Deus. Deus levanta pastores e líderes para conduzir uma nova geração rumo à vida eterna com Ele.",
    ],
  },
} as const;

export const toc = [
  { id: "texto-aureo", label: "Texto áureo" },
  { id: "leitura-diaria", label: "Leitura diária" },
  { id: "leitura-classe", label: "Leitura em classe" },
  { id: "hinos", label: "Hinos sugeridos" },
  { id: "plano", label: "Plano de aula" },
  { id: "comentario", label: "Comentário" },
  { id: "topico-1", label: "I. Liderança compartilhada" },
  { id: "topico-2", label: "II. A recusa em Canaã" },
  { id: "topico-3", label: "III. A sentença divina" },
  { id: "conclusao", label: "Conclusão" },
  { id: "revisando", label: "Revisando o conteúdo" },
  { id: "subsidio", label: "Subsídio do professor" },
] as const;
