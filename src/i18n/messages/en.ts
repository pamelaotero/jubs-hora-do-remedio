import { APP_NAME } from '@/constants/app';
import type { Messages } from './pt';

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export const en: Messages = {
  brand: {
    tagline: 'your prescription, right on time',
    homeAria: `${APP_NAME}, home page`,
  },

  seo: {
    keywords:
      'medical prescription to schedule, doctor prescription schedule, prescription to schedule, medication schedule, medication chart, medicine timetable, pill schedule PDF, medication schedule Excel, medication reminder, medication calendar, Google Calendar medication reminder, pet medication schedule, dog medication chart, take medicine on time',
    pages: {
      home: {
        title: `Prescription to Medication Schedule — PDF, Excel & Calendar | ${APP_NAME}`,
        description:
          'Turn prescriptions for people and pets into a medication schedule, right on time. Free, no sign-up: printable PDF, Excel spreadsheet or Google/Apple Calendar reminders.',
      },
      privacy: {
        title: `Privacy | ${APP_NAME}`,
        description: `How ${APP_NAME} protects your data: your prescription is read on your device and never stored. No sign-up, no tracking cookies.`,
      },
      reading: { title: `Reading prescription | ${APP_NAME}`, description: '' },
      review: { title: `Review prescription | ${APP_NAME}`, description: '' },
      schedule: { title: `Medication schedule | ${APP_NAME}`, description: '' },
      recipes: { title: `Current prescription | ${APP_NAME}`, description: '' },
      settings: { title: `Settings | ${APP_NAME}`, description: '' },
    },
    notFoundTitle: `Page not found | ${APP_NAME}`,
    ogImageAlt: `${APP_NAME}: turn your prescription into a medication schedule`,
  },

  nav: {
    main: 'Main',
    home: 'Home',
    recipes: 'Current prescription',
    privacy: 'Privacy & LGPD',
    privacyShort: 'Privacy',
    settings: 'Settings',
    skip: 'Skip to content',
    language: 'Language',
  },

  footer: {
    label: 'Footer',
    tagline: 'Care in every detail',
    privacy: 'Privacy',
    noStorage: 'We never store prescriptions or health data',
    createdBy: 'Created by',
    helpTitle: 'Questions?',
    helpBody: 'Talk to me on WhatsApp.',
    helpCta: 'Message on WhatsApp',
    helpMessage: 'Hi! I have a question about Jubs.',
  },

  hero: {
    eyebrowPeople: 'For you, your family',
    eyebrowPet: 'and your pet',
    title: 'Your prescription becomes a medication schedule.',
    lead: 'Got a medical or vet prescription? Upload it and get a schedule with the right time for every dose.',
    leadStrong: 'Caring for the ones you love, on two legs or four, just got much easier.',
    fillManually: 'Fill in manually',
    trySample: 'Try a sample prescription',
    privacyPrefix: 'Your health data stays with you:',
    privacyStrong: 'we never keep your prescription or send it to anyone',
    privacySuffix: '. Everything happens on your phone or computer and is erased when you close the page.',
    privacyLink: 'Learn more',
  },

  upload: {
    title: 'Tap to upload your prescription',
    hint: 'Medical or vet prescription · PDF or photo (JPG, PNG) · nothing is uploaded or stored',
  },

  features: {
    label: 'Benefits',
    items: [
      { title: 'The ideal routine', description: 'A personalized schedule for you or your pet.' },
      { title: 'Better health', description: 'Follow the doses and frequency of the prescription.' },
      { title: 'Everyone cared for', description: 'From family to pets: organized, loving care every day.' },
    ],
  },

  preview: {
    title: 'Medication Schedule',
    example: 'Example',
    daysLabel: 'Number of days',
    days: (n: number) => `${n} days`,
    noDoses: 'No doses',
    leadExample: 'See what the file you get looks like. Switch tabs to view it as PDF or Excel and download the sample.',
    leadOwn: 'Preview of your schedule in each format.',
    tabsLabel: 'Preview format',
    tabs: { pdf: 'PDF', xlsx: 'Excel', days: 'Days' },
    pdfCaption: 'A4 PDF to print, with a box to tick off each dose with a pen.',
    xlsxCaption: '.xlsx spreadsheet with one tab per week. Opens in Excel and Google Sheets.',
    downloadExample: (format: string) => `Download ${format} sample`,
    download: (format: string) => `Download ${format}`,
    exampleNote: 'Sample with made-up data, created on your device.',
    filePrefix: 'sample-',
    moreRows: (n: number) => `+ ${n} more ${n === 1 ? 'time' : 'times'} in the full file`,
    seeFull:'See full schedule',
  },

  howItWorks: {
    title: 'How to turn a medical prescription into a medication schedule',
    lead: 'In under a minute, your doctor’s or vet’s prescription becomes an easy-to-follow medication timetable.',
    steps: [
      {
        title: 'Upload the prescription',
        description: 'A photo or PDF of the medical or vet prescription. You can also type the medicines in manually.',
      },
      {
        title: 'Check the doses',
        description: 'Review name, dose, frequency and duration of each medicine before creating the schedule.',
      },
      {
        title: 'Get your schedule',
        description: 'A weekly chart with every dose time, ready to print, tick off and follow right on time.',
      },
    ],
  },

  formats: {
    title: 'Download as PDF, Excel or straight to your calendar',
    items: [
      {
        title: 'Printable PDF',
        description: 'An A4 medication chart with a checkbox for every dose. Perfect for the fridge door.',
      },
      {
        title: 'Excel spreadsheet',
        description: 'An .xlsx file with one sheet per week to edit, share or open in Google Sheets.',
      },
      {
        title: 'Calendar reminders',
        description: 'An .ics file with an alarm for each dose for Google Calendar, Apple Calendar or Outlook.',
      },
    ],
  },

  faq: {
    title: 'Frequently asked questions',
    items: [
      {
        question: 'How do I turn a prescription into a medication schedule?',
        answer: `Upload a photo or PDF of the prescription to ${APP_NAME}, check the medicines and tap “Create schedule”. You get a chart with the time of every dose that you can download as PDF or Excel, or add to your calendar.`,
      },
      {
        question: 'Does it work for vet prescriptions, for dogs or cats?',
        answer: `Yes. ${APP_NAME} organizes prescriptions for people and pets. It was born for Jujuba, a Shih Tzu puppy who needed six medicines at different times.`,
      },
      {
        question: 'Can I add my medication times to Google Calendar?',
        answer:
          'Yes. Download the calendar file (.ics) and open it on your phone, or import it into Google Calendar, Apple Calendar or Outlook. Each dose becomes a reminder with an alarm, right on time.',
      },
      {
        question: 'Is my prescription stored anywhere?',
        answer:
          'No. Your prescription is read on your device and only exists while the page is open. No sign-up, and nothing is sent to any server.',
      },
      {
        question: `Is ${APP_NAME} free?`,
        answer: 'Yes, it is free and requires no sign-up.',
      },
      {
        question: `Does ${APP_NAME} replace my doctor or vet?`,
        answer: 'No. It only organizes the times. Always check against the original prescription and ask the prescriber if in doubt.',
      },
    ],
  },

  consent: {
    title: 'Before reading your prescription',
    bodyPrefix: 'Prescriptions contain health data. That is why the file',
    bodyMiddle: 'is read',
    bodyStrong: 'only on your device',
    bodySuffix: ': nothing is uploaded or stored.',
    note: 'Automatic reading can make mistakes. On the next screen you can check and fix everything before the schedule is created.',
    accept: 'I understand and want to continue.',
    cancel: 'Cancel',
    confirm: 'Read prescription',
  },

  steps: {
    label: 'Steps',
    items: ['Upload', 'Review', 'Schedule & reminders'],
  },

  reading: {
    title: 'Reading your prescription…',
    text: (fileName: string) => `Reading “${fileName}” on your device. Looking for medicine names, doses and times.`,
  },

  review: {
    title: 'Check before creating the schedule',
    descriptionManual: 'Fill in the medicines from the prescription. You can add as many as you need.',
    descriptionFile: (n: number) =>
      `We found ${plural(n, 'medicine', 'medicines')}. Check each field against the prescription and fix anything needed.`,
    simulated: 'Prototype: automatic reading is still simulated and fills in a sample prescription. Feel free to edit.',
    add: 'Add medicine',
    generate: 'Create schedule',
    incomplete: 'Fill in name, dose, date and time for every medicine.',
  },

  patient: {
    nameLabel: 'Who is it for (optional)',
    namePlaceholder: 'e.g. Jujuba',
    typeLabel: 'Prescription type',
    merge: 'Merge nearby times',
    mergeDescription: 'Doses up to 1 hour apart move to the earlier time. Check with your doctor or vet first.',
  },

  medication: {
    title: (n: number) => `Medicine ${n}`,
    remove: 'Remove',
    removeAria: (title: string) => `Remove ${title}`,
    name: 'Name',
    namePlaceholder: 'e.g. Ibuprofen 400 mg',
    dose: 'Dose',
    dosePlaceholder: 'e.g. 1 tablet, 20 drops',
    frequency: 'Frequency',
    duration: 'For how long',
    days: 'Treatment days',
    startDate: 'First dose date',
    startTime: 'First dose time',
    notes: 'Notes',
    notesPlaceholder: 'e.g. give after meals',
    unnamed: 'Unnamed medicine',
  },

  options: {
    patientType: { pet: 'Pet', pessoa: 'Person' },
    interval: (hours: number) => {
      if (hours === 24) return 'Once a day';
      if (hours === 48) return 'Every other day';
      return `Every ${hours} hours`;
    },
    duration: { dias: 'Number of days', acabar: 'Until the bottle/box runs out', continuo: 'Ongoing' },
    durationDays: (n: number) => plural(n, 'day', 'days'),
  },

  dates: {
    weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    weekdaysLong: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayMonth: (day: string, month: string) => `${month}/${day}`,
  },

  schedule: {
    title: 'Medication schedule',
    titleWithName: (name: string) => `Medication schedule — ${name}`,
    description: 'Tap a box to mark a dose as given before printing.',
    previous: 'Previous',
    next: 'Next',
    nextAria: 'Next week',
    week: (week: number, total: number) => `Week ${week} of ${total}`,
    time: 'Time',
    medicine: 'Medicine',
    noDose: 'No dose',
    markGiven: 'Mark dose as given',
    given: 'Dose given',
    notesLabel: 'Notes',
    openEnded: 'Ongoing or until it runs out: we show the next 4 weeks.',
    merged: 'Nearby times were merged. Check with the prescriber.',
    back: 'Back and edit',
    clear: 'Clear everything and start over',
    cleared: 'Everything cleared. Nothing was stored.',
  },

  exportPanel: {
    title: 'Download & reminders',
    pdf: 'Download printable PDF',
    xlsx: 'Download Excel',
    ics: 'Add to calendar',
    generating: 'Generating…',
    help: 'Files are created on your device. Calendar: open the .ics file on your phone — each dose becomes an event with an alarm. In Google Calendar on a computer, use Settings › Import.',
    ready: (fileName: string) => `File ready: ${fileName}`,
    failed: 'Could not create the file. Please try again.',
  },

  exportFile: {
    baseName: 'schedule',
    defaultName: 'medication',
    pdfTitle: 'Medication',
    week: (week: number, total: number) => `week ${week} of ${total}`,
    pdfInstructions: 'Mark each dose given with an X. Grey = no dose. Always check against the original prescription.',
    givenShort: 'given',
    givenCell: '✔ given',
    generatedWith: `Made with ${APP_NAME} · the prescription was read only on your device`,
    sheet: (n: number) => `Week ${n}`,
    time: 'Time',
    medicine: 'Medicine',
    dose: 'Dose',
    icsDefaultDescription: 'Prescription dose',
    icsAlarm: (name: string) => `Medicine time: ${name}`,
  },

  recipes: {
    title: 'Current prescription',
    description: 'The prescription open right now, in this tab only. There is no prescription history.',
    privacy: `${APP_NAME} does not store prescriptions — on purpose. Prescriptions contain health data, which privacy laws treat as sensitive, so your prescription is processed only on your device and is never uploaded, stored or shared. It only exists while this tab is open: closing or reloading the page erases everything. To keep it, download the PDF, Excel or calendar file to your device.`,
    unnamed: 'Unnamed prescription',
    medicationCount: (n: number) => plural(n, 'medicine', 'medicines'),
    planReady: 'schedule created',
    planPending: 'schedule not created yet',
    viewSchedule: 'View schedule',
    edit: 'Review and edit',
    clear: 'Delete now',
    cleared: 'Prescription removed from memory.',
    emptyTitle: 'No prescription open',
    emptyDescription: 'Upload a prescription on the home page to turn it into a medication schedule.',
    emptyAction: 'Upload prescription',
  },

  settings: {
    title: 'Settings',
    description: 'Choose how new prescriptions start. Applies to this open tab.',
    newRecipes: 'New prescriptions',
    defaultType: 'Default prescription type',
    merge: 'Merge nearby times by default',
    mergeDescription: 'Doses up to 1 hour apart move to the earlier time.',
    display: 'Display',
    previewDays: 'Days in the home page preview',
    privacy: 'Your preferences are not stored either: nothing goes to cookies, browser storage or servers.',
    reset: 'Restore defaults',
    resetDone: 'Settings restored.',
    privacyLink: 'Privacy & LGPD',
  },

  privacy: {
    title: 'Privacy & LGPD',
    description: 'How this site handles your data, in line with Brazil’s General Data Protection Law (LGPD) and similar laws such as GDPR.',
    highlightTitle: 'This site does not store prescriptions.',
    highlightBody: 'Your prescription is processed directly on your device. The document is not uploaded, stored or shared by the platform — not even temporarily. When you close the page, it is gone.',
    draft: 'Prototype draft. Have it reviewed by a legal professional before publishing.',
    summaryTitle: 'Summary',
    summary: [
      'Prescriptions contain health data, which privacy laws such as GDPR and Brazil’s LGPD treat as sensitive personal data.',
      `${APP_NAME} is designed not to collect this data: the schedule is created in your own browser.`,
      'No prescription, name or time is stored — not on a server, not in your browser.',
      'There is no sign-up, login or history: we have no way to see, keep or share your prescriptions.',
    ],
    sections: [
      {
        title: 'Why we do not store prescriptions',
        body: `Medical and vet prescriptions reveal diagnoses, treatments and medicines. Storing that kind of information would require a specific legal basis, stronger security measures and responsibility for possible leaks. To keep your data out of risk, ${APP_NAME} is built to simply not store it: what is never kept cannot leak.`,
      },
      {
        title: 'What happens to your prescription',
        body: `The file is only read in the browser’s memory while the page is open. ${APP_NAME} does not upload the prescription, does not write to your browser (no localStorage, cookies or database) and keeps no history. The PDF, Excel and calendar files are created on your device and saved by you. “Clear everything” wipes the memory instantly.`,
      },
      {
        title: 'Uploads, cache and technical logs',
        body: 'Your prescription is never sent to a server, not even for a moment: the site does not upload files. The document is not kept in the browser cache either, because it is opened straight from your device and not downloaded from the internet. There are no logs containing the prescription. Like any website, the hosting provider (Vercel) only records technical access data, such as IP address and page visited, which include nothing from your prescription.',
      },
      {
        title: 'Cookies and analytics',
        body: 'We do not use tracking cookies. To know how many people use the site, we count visits anonymously with Vercel Web Analytics: it uses no cookies, does not identify you and only records general data such as the page visited, country, device type and where the visit came from. Nothing from your prescription is part of this count.',
      },
      {
        title: 'Your rights',
        body: 'Since we do not store your data, there is nothing on our side to access, correct or delete.',
      },
      {
        title: 'Health notice',
        body: `${APP_NAME} organizes times and does not give medical or veterinary advice. If in doubt, talk to the prescriber and always check against the original prescription.`,
      },
    ],
    back: 'Back to home',
  },

  support: {
    title: `Enjoying it? Support ${APP_NAME}`,
    description: `${APP_NAME} is free, needs no sign-up and is a community project. If it helped you or your pet, you can buy me a coffee to keep it running.`,
    disclaimer: 'Completely optional: support unlocks nothing extra and none of your data is collected.',
    coffee: 'Buy me a coffee',
    pixTitle: 'Pix',
    pixReveal: 'Show Pix key',
    pixKeyLabel: 'Pix key (phone)',
    pixHolder: (name: string) => `Account holder: ${name}`,
    pixCopy: 'Copy key',
    pixCopied: 'Pix key copied!',
    pixCopyFailed: 'Could not copy. Select the key and copy it manually.',
  },

  notFound: {
    title: 'Page not found',
    description: 'Looks like our sniffer got lost. Shall we go back home?',
    action: 'Go to home',
  },

  sample: {
    patientName: 'Jujuba',
    drops: (n: number) => `${n} drops`,
    quarterTablet: '¼ tablet',
    halfTablet: '½ tablet',
    vonauNote: 'If vomiting or nausea persists, continue for 3 more days.',
    glicolNote: 'Give until the bottle is finished.',
    vermivetNote: 'Repeat the dose 7 days after the last one.',
  },
};
