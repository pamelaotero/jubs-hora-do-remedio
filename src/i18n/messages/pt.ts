import { APP_NAME } from '@/constants/app';

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export const pt = {
  brand: {
    tagline: 'sua receita na hora certa',
    homeAria: `${APP_NAME}, página inicial`,
  },

  seo: {
    keywords:
      'receita médica em tabela de horários, receita em tabela de horários, tabela de remédios, organizar receita médica, horários da receita médica, horário de remédio, receita médica, receita veterinária, remédio na hora certa, tabela de medicamentos PDF, planilha de remédios Excel, lembrete de remédio, agenda de remédios, Google Agenda, calendário de medicamentos, cronograma de medicação, remédio para cachorro, Shih Tzu',
    pages: {
      home: {
        title: `Receita médica em tabela de horários: PDF, Excel e agenda | ${APP_NAME}`,
        description:
          'Transforme receitas médicas e veterinárias em uma tabela de horários de remédios na hora certa. Grátis e sem cadastro: baixe em PDF, Excel ou adicione à sua agenda.',
      },
      privacy: {
        title: `Privacidade e LGPD | ${APP_NAME}`,
        description: `Como o ${APP_NAME} protege seus dados: a receita é lida no seu aparelho e nunca é salva. Sem cadastro, sem cookies de rastreamento.`,
      },
      reading: { title: `Lendo a receita | ${APP_NAME}`, description: '' },
      review: { title: `Conferir receita | ${APP_NAME}`, description: '' },
      schedule: { title: `Tabela de horários | ${APP_NAME}`, description: '' },
      recipes: { title: `Receita atual | ${APP_NAME}`, description: '' },
      settings: { title: `Configurações | ${APP_NAME}`, description: '' },
    },
    notFoundTitle: `Página não encontrada | ${APP_NAME}`,
    ogImageAlt: `${APP_NAME}: sua receita médica vira uma tabela de horários`,
  },

  nav: {
    main: 'Principal',
    home: 'Início',
    recipes: 'Receita atual',
    privacy: 'Privacidade e LGPD',
    privacyShort: 'LGPD',
    settings: 'Configurações',
    skip: 'Pular para o conteúdo',
    language: 'Idioma',
  },

  footer: {
    label: 'Rodapé',
    tagline: 'Cuidado em cada detalhe',
    privacy: 'Privacidade',
    noStorage: 'Não salvamos receitas nem dados de saúde',
    createdBy: 'Criado por',
  },

  hero: {
    eyebrowPeople: 'Para você, sua família',
    eyebrowPet: 'e seu pet',
    title: 'Sua receita vira uma tabela de horários.',
    lead: 'Recebeu uma receita médica ou veterinária? Envie e receba um cronograma com o horário certinho de cada dose.',
    leadStrong: 'Cuidar de quem você ama, de duas ou de quatro patas, fica muito mais fácil.',
    fillManually: 'Preencher à mão',
    trySample: 'Ver com receita de exemplo',
    privacyPrefix: 'Seus dados de saúde ficam só com você:',
    privacyStrong: 'não guardamos sua receita nem enviamos para ninguém',
    privacySuffix: '. Tudo acontece no seu celular ou computador e é apagado quando você fecha a página.',
    privacyLink: 'Saiba mais',
  },

  upload: {
    title: 'Toque para enviar a receita',
    hint: 'Receita médica ou veterinária · PDF ou foto (JPG, PNG) · nada é enviado nem salvo',
  },

  features: {
    label: 'Benefícios',
    items: [
      { title: 'A rotina ideal', description: 'Um cronograma personalizado para você ou para o seu pet.' },
      { title: 'Mais saúde', description: 'Respeite as doses e a frequência da receita médica.' },
      { title: 'Todos bem cuidados', description: 'Da família ao pet: organização e carinho todos os dias.' },
    ],
  },

  preview: {
    title: 'Tabela de Horários',
    example: 'Exemplo',
    daysLabel: 'Quantidade de dias',
    days: (n: number) => `${n} dias`,
    noDoses: 'Sem doses',
    seeFull: 'Ver tabela completa',
  },

  howItWorks: {
    title: 'Como transformar sua receita médica em tabela de horários',
    lead: 'Em menos de um minuto, a receita médica ou veterinária vira um cronograma de remédios fácil de seguir.',
    steps: [
      {
        title: 'Envie a receita médica',
        description: 'Uma foto ou o PDF da receita médica ou veterinária. Também dá para digitar os remédios à mão.',
      },
      {
        title: 'Confira as doses',
        description: 'Revise nome, dose, frequência e duração de cada remédio antes de gerar a tabela.',
      },
      {
        title: 'Receba a tabela',
        description: 'Uma tabela semanal com cada horário, pronta para imprimir, marcar e seguir na hora certa.',
      },
    ],
  },

  formats: {
    title: 'Baixe em PDF, Excel ou direto na sua agenda',
    items: [
      {
        title: 'PDF para imprimir',
        description: 'Tabela de remédios em A4 com quadradinhos para marcar cada dose com caneta. Ótima para a geladeira.',
      },
      {
        title: 'Planilha Excel',
        description: 'Arquivo .xlsx com uma aba por semana, para editar, compartilhar ou abrir no Google Planilhas.',
      },
      {
        title: 'Agenda e calendário',
        description: 'Arquivo .ics com alarme em cada dose para Google Agenda, Apple Calendário ou Outlook.',
      },
    ],
  },

  faq: {
    title: 'Perguntas frequentes',
    items: [
      {
        question: 'Como transformar uma receita médica em tabela de horários?',
        answer: `Envie a foto ou o PDF da receita médica no ${APP_NAME}, confira os remédios e toque em “Gerar tabela”. Você recebe uma tabela com o horário de cada dose, que pode baixar em PDF, Excel ou adicionar à agenda.`,
      },
      {
        question: 'Funciona para receita veterinária, de cachorro ou gato?',
        answer: `Sim. O ${APP_NAME} organiza receitas de pessoas e de pets. Ele nasceu para a Jujuba, uma Shih Tzu que precisava de seis remédios em horários diferentes.`,
      },
      {
        question: 'Posso colocar os horários dos remédios no Google Agenda?',
        answer:
          'Sim. Baixe o arquivo de calendário (.ics) e abra no celular, ou importe no Google Agenda, Apple Calendário ou Outlook. Cada dose vira um lembrete com alarme na hora certa.',
      },
      {
        question: 'Minha receita fica salva em algum lugar?',
        answer:
          'Não. A receita é lida no seu aparelho e existe só enquanto a página está aberta. Não pedimos cadastro e nada é enviado para servidores.',
      },
      {
        question: `O ${APP_NAME} é gratuito?`,
        answer: 'Sim, é grátis e não precisa de cadastro.',
      },
      {
        question: `O ${APP_NAME} substitui o médico ou o veterinário?`,
        answer: 'Não. Ele só organiza os horários. Confira sempre com a receita original e, em caso de dúvida, fale com quem receitou.',
      },
    ],
  },

  consent: {
    title: 'Antes de ler sua receita',
    bodyPrefix: 'Receitas têm dados de saúde. Por isso, o arquivo',
    bodyMiddle: 'é lido',
    bodyStrong: 'só no seu aparelho',
    bodySuffix: ': nada é enviado nem guardado.',
    note: 'A leitura automática pode errar. Na próxima tela você confere e corrige tudo antes da tabela ser criada.',
    accept: 'Entendi e quero continuar.',
    cancel: 'Cancelar',
    confirm: 'Ler receita',
  },

  steps: {
    label: 'Etapas',
    items: ['Enviar receita', 'Conferir', 'Tabela e lembretes'],
  },

  reading: {
    title: 'Lendo sua receita…',
    text: (fileName: string) =>
      `Lendo “${fileName}” no seu aparelho. Procurando nomes de remédios, doses e horários.`,
  },

  review: {
    title: 'Confira antes de gerar a tabela',
    descriptionManual: 'Preencha os remédios da receita. Você pode adicionar quantos precisar.',
    descriptionFile: (n: number) =>
      `Encontramos ${plural(n, 'remédio', 'remédios')}. Confira cada campo com a receita e corrija o que for preciso.`,
    simulated:
      'Protótipo: a leitura automática ainda é simulada e preenche uma receita de exemplo. Edite os campos à vontade.',
    add: 'Adicionar remédio',
    generate: 'Gerar tabela',
    incomplete: 'Preencha nome, dose, data e horário de todos os remédios.',
  },

  patient: {
    nameLabel: 'Para quem é (opcional)',
    namePlaceholder: 'Ex.: Jujuba',
    typeLabel: 'Tipo de receita',
    merge: 'Juntar horários próximos',
    mergeDescription:
      'Doses com até 1 hora de diferença passam para o horário mais cedo. Confirme com o médico ou o veterinário antes.',
  },

  medication: {
    title: (n: number) => `Remédio ${n}`,
    remove: 'Remover',
    removeAria: (title: string) => `Remover ${title}`,
    name: 'Nome',
    namePlaceholder: 'Ex.: Dipirona 500 mg',
    dose: 'Dose',
    dosePlaceholder: 'Ex.: 1 comprimido, 20 gotas',
    frequency: 'Frequência',
    duration: 'Por quanto tempo',
    days: 'Dias de tratamento',
    startDate: 'Data da 1ª dose',
    startTime: 'Horário da 1ª dose',
    notes: 'Observações',
    notesPlaceholder: 'Ex.: dar após a refeição',
    unnamed: 'Remédio sem nome',
  },

  options: {
    patientType: { pet: 'Pet', pessoa: 'Pessoa' },
    interval: (hours: number) => {
      if (hours === 24) return '1 vez ao dia';
      if (hours === 48) return 'Dia sim, dia não';
      return `A cada ${hours} horas`;
    },
    duration: { dias: 'Número de dias', acabar: 'Até acabar o frasco/caixa', continuo: 'Uso contínuo' },
    durationDays: (n: number) => plural(n, 'dia', 'dias'),
  },

  dates: {
    weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    weekdaysLong: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayMonth: (day: string, month: string) => `${day}/${month}`,
  },

  schedule: {
    title: 'Tabela de horários',
    titleWithName: (name: string) => `Tabela de horários — ${name}`,
    description: 'Toque num quadradinho para marcar uma dose que já foi dada antes de imprimir.',
    previous: 'Anterior',
    next: 'Próxima',
    nextAria: 'Próxima semana',
    week: (week: number, total: number) => `Semana ${week} de ${total}`,
    time: 'Horário',
    medicine: 'Remédio',
    noDose: 'Sem dose',
    markGiven: 'Marcar dose como dada',
    given: 'Dose dada',
    notesLabel: 'Observações',
    openEnded: 'Uso contínuo ou até acabar: mostramos as próximas 4 semanas.',
    merged: 'Horários próximos foram juntados. Confirme com quem receitou.',
    back: 'Voltar e editar',
    clear: 'Apagar tudo e recomeçar',
    cleared: 'Tudo apagado. Nada ficou salvo.',
  },

  exportPanel: {
    title: 'Baixar e lembrar',
    pdf: 'Baixar PDF para imprimir',
    xlsx: 'Baixar Excel',
    ics: 'Adicionar ao calendário',
    generating: 'Gerando…',
    help: 'Os arquivos são criados no seu aparelho. Calendário: abra o arquivo .ics no celular — cada dose vira um evento com alarme. No Google Agenda pelo computador, use Configurações › Importar.',
    ready: (fileName: string) => `Arquivo pronto: ${fileName}`,
    failed: 'Não foi possível gerar o arquivo. Tente novamente.',
  },

  exportFile: {
    baseName: 'tabela',
    defaultName: 'remedios',
    pdfTitle: 'Remédios',
    week: (week: number, total: number) => `semana ${week} de ${total}`,
    pdfInstructions: 'Marque com X cada dose dada. Cinza = sem dose. Confira sempre com a receita original.',
    givenShort: 'dado',
    givenCell: '✔ dado',
    generatedWith: `Gerado com ${APP_NAME} · a receita foi lida só no seu aparelho`,
    sheet: (n: number) => `Semana ${n}`,
    time: 'Horário',
    medicine: 'Remédio',
    dose: 'Dose',
    icsDefaultDescription: 'Dose da receita',
    icsAlarm: (name: string) => `Hora do remédio: ${name}`,
  },

  recipes: {
    title: 'Receita atual',
    description: 'A receita aberta agora, só nesta aba. Não existe histórico de receitas.',
    privacy: `O ${APP_NAME} não salva receitas — de propósito. Receitas têm dados de saúde, que a LGPD trata como dados sensíveis, então a receita é processada só no seu dispositivo e não é enviada, armazenada nem compartilhada. Ela existe só enquanto esta aba estiver aberta: ao fechar ou recarregar a página, tudo é apagado. Se quiser guardar, baixe o PDF, o Excel ou o calendário no seu aparelho.`,
    unnamed: 'Receita sem nome',
    medicationCount: (n: number) => plural(n, 'remédio', 'remédios'),
    planReady: 'tabela gerada',
    planPending: 'tabela ainda não gerada',
    viewSchedule: 'Ver tabela',
    edit: 'Conferir e editar',
    clear: 'Apagar agora',
    cleared: 'Receita apagada da memória.',
    emptyTitle: 'Nenhuma receita aberta',
    emptyDescription: 'Envie uma receita na página inicial para transformá-la em uma tabela de horários.',
    emptyAction: 'Enviar receita',
  },

  settings: {
    title: 'Configurações',
    description: 'Ajuste como as novas receitas começam. Vale para esta aba aberta.',
    newRecipes: 'Novas receitas',
    defaultType: 'Tipo padrão de receita',
    merge: 'Juntar horários próximos por padrão',
    mergeDescription: 'Doses com até 1 hora de diferença passam para o horário mais cedo.',
    display: 'Exibição',
    previewDays: 'Dias na prévia da página inicial',
    privacy: 'Suas preferências também não são salvas: nada vai para cookies, armazenamento do navegador ou servidores.',
    reset: 'Restaurar padrão',
    resetDone: 'Configurações restauradas.',
    privacyLink: 'Privacidade e LGPD',
  },

  privacy: {
    title: 'Privacidade e LGPD',
    description: 'Como o site trata seus dados, de acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).',
    highlightTitle: 'Este site não salva receitas.',
    highlightBody: 'Sua receita é processada diretamente no seu dispositivo. O documento não é enviado, armazenado nem compartilhado pela plataforma — nem temporariamente. Ao fechar a página, tudo some.',
    draft: 'Rascunho para o protótipo. Revisar com um profissional de direito antes de publicar.',
    summaryTitle: 'Resumo',
    summary: [
      'Receitas trazem dados de saúde, que a LGPD trata como dados pessoais sensíveis (art. 5º, II e art. 11).',
      `O ${APP_NAME} foi feito para não coletar esses dados: a tabela é gerada no seu próprio navegador.`,
      'Nenhuma receita, nome ou horário é armazenado — nem no servidor, nem no navegador.',
      'Não há cadastro, login nem histórico: não temos como ver, guardar ou compartilhar suas receitas.',
    ],
    sections: [
      {
        title: 'Por que não salvamos receitas',
        body: `Receitas médicas e veterinárias revelam diagnósticos, tratamentos e remédios. Guardar esse tipo de informação exigiria uma base legal específica, medidas de segurança reforçadas e responsabilidade por possíveis vazamentos. Para não colocar seus dados em risco, o ${APP_NAME} foi construído para simplesmente não armazená-los: o que não é guardado não pode vazar.`,
      },
      {
        title: 'O que acontece com a sua receita',
        body: `O arquivo é lido apenas na memória do navegador enquanto a página está aberta. O ${APP_NAME} não envia a receita para servidores, não grava no navegador (sem localStorage, cookies ou banco de dados) e não mantém histórico. Os arquivos PDF, Excel e de calendário são criados no seu aparelho e salvos por você. "Apagar tudo" limpa a memória na hora.`,
      },
      {
        title: 'Envio, cache e registros técnicos',
        body: 'A receita não é enviada para nenhum servidor, nem por um instante: o site não faz upload de arquivos. O documento também não fica no cache do navegador, porque é aberto direto do seu aparelho e não é baixado da internet. Não existem registros (logs) com o conteúdo da receita. Como qualquer site, a hospedagem (Vercel) registra apenas dados técnicos de acesso, como endereço IP e página visitada, que não incluem nada da sua receita.',
      },
      {
        title: 'Cookies e estatísticas',
        body: 'Não usamos cookies de rastreamento nem ferramentas de estatística. Se isso mudar, vamos pedir seu consentimento antes, com opção de recusar.',
      },
      {
        title: 'Seus direitos',
        body: 'Como não guardamos seus dados, não há o que acessar, corrigir ou apagar do nosso lado.',
      },
      {
        title: 'Aviso de saúde',
        body: `O ${APP_NAME} organiza horários e não dá orientação médica ou veterinária. Em caso de dúvida, fale com quem receitou e confira sempre com a receita original.`,
      },
    ],
    back: 'Voltar ao início',
  },

  support: {
    title: `Gostou? Apoie o ${APP_NAME}`,
    description: `O ${APP_NAME} é gratuito, sem cadastro e feito de forma comunitária. Se ele ajudou você ou o seu pet, pode pagar um café para manter o projeto no ar.`,
    disclaimer: 'Totalmente opcional: o apoio não libera nada a mais e nenhum dado seu é coletado.',
    coffee: 'Pague um café',
    pixTitle: 'Pix',
    pixReveal: 'Mostrar chave Pix',
    pixKeyLabel: 'Chave Pix (celular)',
    pixHolder: (name: string) => `Titular: ${name}`,
    pixCopy: 'Copiar chave',
    pixCopied: 'Chave Pix copiada!',
    pixCopyFailed: 'Não deu para copiar. Selecione a chave e copie manualmente.',
  },

  notFound: {
    title: 'Página não encontrada',
    description: 'Parece que o farejador se perdeu. Vamos voltar ao início?',
    action: 'Ir para o início',
  },

  sample: {
    patientName: 'Jujuba',
    drops: (n: number) => `${n} gotas`,
    quarterTablet: '¼ comprimido',
    halfTablet: '½ comprimido',
    vonauNote: 'Se tiver vômito ou náusea, manter por mais 3 dias.',
    glicolNote: 'Dar até o fim do frasco.',
    vermivetNote: 'Repetir a dose 7 dias após a última.',
  },
};

export type Messages = typeof pt;
