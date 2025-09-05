import { StateLaw, Script } from './types';

export const stateLaws: Record<string, StateLaw> = {
  CA: {
    stateAbbreviation: 'CA',
    title: 'California Rights Summary',
    summary: 'California provides strong protections for citizens during police encounters, including robust recording rights and search protections.',
    rights: [
      'Right to remain silent (5th Amendment)',
      'Right to refuse consent to search',
      'Right to record police interactions in public',
      'Right to ask if you are free to leave',
      'Right to an attorney before questioning',
      'Right to know reason for detention',
      'Right to refuse field sobriety tests (with consequences)'
    ],
    prohibitedActions: [
      'Do not physically resist arrest',
      'Do not lie or provide false information',
      'Do not consent to searches without warrant',
      'Do not answer questions without attorney present',
      'Do not interfere with police duties',
      'Do not flee from lawful detention'
    ]
  },
  NY: {
    stateAbbreviation: 'NY',
    title: 'New York Rights Summary',
    summary: 'New York law provides specific protections during police encounters, with strong stop-and-frisk limitations.',
    rights: [
      'Right to remain silent',
      'Right to refuse consent to search',
      'Right to record in public spaces',
      'Right to ask for badge number and name',
      'Right to legal representation',
      'Right to know reason for stop',
      'Right to refuse to answer immigration questions'
    ],
    prohibitedActions: [
      'Do not physically resist',
      'Do not provide false identification',
      'Do not consent to vehicle searches',
      'Do not answer questions about immigration status',
      'Do not run from police',
      'Do not interfere with arrest of others'
    ]
  },
  TX: {
    stateAbbreviation: 'TX',
    title: 'Texas Rights Summary',
    summary: 'Texas law balances law enforcement needs with citizen rights, with specific provisions for traffic stops and searches.',
    rights: [
      'Right to remain silent',
      'Right to refuse consent to search',
      'Right to record police (in public)',
      'Right to ask if you are being detained',
      'Right to an attorney',
      'Right to see search warrant',
      'Right to refuse field sobriety tests (license consequences)'
    ],
    prohibitedActions: [
      'Do not physically resist arrest',
      'Do not lie about your identity when required',
      'Do not consent to searches',
      'Do not interfere with police duties',
      'Do not flee from lawful detention',
      'Do not provide false documents'
    ]
  },
  FL: {
    stateAbbreviation: 'FL',
    title: 'Florida Rights Summary',
    summary: 'Florida law provides constitutional protections with specific provisions for vehicle stops and searches.',
    rights: [
      'Right to remain silent',
      'Right to refuse consent to search',
      'Right to record police interactions',
      'Right to ask if you are free to leave',
      'Right to an attorney',
      'Right to know reason for detention',
      'Right to refuse field sobriety tests'
    ],
    prohibitedActions: [
      'Do not physically resist',
      'Do not provide false information',
      'Do not consent to searches',
      'Do not answer questions without attorney',
      'Do not interfere with police work',
      'Do not flee from police'
    ]
  },
  IL: {
    stateAbbreviation: 'IL',
    title: 'Illinois Rights Summary',
    summary: 'Illinois provides strong citizen protections with specific recording rights and search limitations.',
    rights: [
      'Right to remain silent',
      'Right to refuse consent to search',
      'Right to record police (one-party consent)',
      'Right to ask if you are being detained',
      'Right to an attorney',
      'Right to know charges against you',
      'Right to refuse field sobriety tests'
    ],
    prohibitedActions: [
      'Do not physically resist arrest',
      'Do not lie to police officers',
      'Do not consent to searches',
      'Do not answer questions without lawyer',
      'Do not interfere with police duties',
      'Do not attempt to flee'
    ]
  },
  WA: {
    stateAbbreviation: 'WA',
    title: 'Washington Rights Summary',
    summary: 'Washington state provides comprehensive protections including strong privacy rights and recording permissions.',
    rights: [
      'Right to remain silent',
      'Right to refuse consent to search',
      'Right to record police interactions',
      'Right to ask if you are free to leave',
      'Right to an attorney',
      'Right to know reason for stop',
      'Right to refuse field sobriety tests (consequences apply)'
    ],
    prohibitedActions: [
      'Do not physically resist',
      'Do not provide false identification',
      'Do not consent to searches',
      'Do not answer questions without attorney',
      'Do not interfere with police work',
      'Do not flee from detention'
    ]
  }
};

export const scripts: Record<string, Script> = {
  'traffic-stop': {
    scriptId: 'traffic-stop',
    title: 'Traffic Stop Script',
    scenario: 'traffic-stop',
    englishText: `WHAT TO SAY:
• "I am exercising my right to remain silent."
• "I do not consent to any searches."
• "Am I free to leave?"
• "I would like to speak to an attorney."
• "Officer, may I see your badge number?"

WHAT NOT TO SAY:
• Do not admit guilt or fault
• Do not answer questions about where you're going/coming from
• Do not consent to vehicle searches
• Do not get out of the vehicle unless ordered
• Do not argue about the stop
• Do not make sudden movements`,
    spanishText: `QUÉ DECIR:
• "Estoy ejerciendo mi derecho a permanecer en silencio."
• "No consiento a ningún registro."
• "¿Soy libre de irme?"
• "Me gustaría hablar con un abogado."
• "Oficial, ¿puedo ver su número de placa?"

QUÉ NO DECIR:
• No admita culpa o falta
• No responda preguntas sobre a dónde va/viene
• No consienta registros del vehículo
• No salga del vehículo a menos que se lo ordenen
• No discuta sobre la parada
• No haga movimientos bruscos`,
    relatedLaws: ['CA', 'NY', 'TX', 'FL', 'IL', 'WA']
  },
  'questioning': {
    scriptId: 'questioning',
    title: 'Police Questioning Script',
    scenario: 'questioning',
    englishText: `WHAT TO SAY:
• "I am exercising my right to remain silent."
• "I do not wish to answer questions."
• "Am I being detained or am I free to leave?"
• "I want to speak to an attorney."
• "I do not consent to any searches."

WHAT NOT TO SAY:
• Do not answer questions about your activities
• Do not provide information about others
• Do not sign anything without an attorney
• Do not waive your rights
• Do not lie or provide false information
• Do not volunteer information`,
    spanishText: `QUÉ DECIR:
• "Estoy ejerciendo mi derecho a permanecer en silencio."
• "No deseo responder preguntas."
• "¿Estoy detenido o soy libre de irme?"
• "Quiero hablar con un abogado."
• "No consiento a ningún registro."

QUÉ NO DECIR:
• No responda preguntas sobre sus actividades
• No proporcione información sobre otros
• No firme nada sin un abogado
• No renuncie a sus derechos
• No mienta o proporcione información falsa
• No ofrezca información voluntariamente`,
    relatedLaws: ['CA', 'NY', 'TX', 'FL', 'IL', 'WA']
  },
  'search': {
    scriptId: 'search',
    title: 'Search Consent Script',
    scenario: 'search',
    englishText: `WHAT TO SAY:
• "I do not consent to any searches."
• "I am exercising my Fourth Amendment rights."
• "Do you have a warrant?"
• "I want to speak to an attorney."
• "I am not resisting, but I do not consent."

WHAT NOT TO SAY:
• Do not give permission for searches
• Do not help with the search
• Do not answer questions about items found
• Do not physically resist
• Do not touch or interfere with officers
• Do not volunteer information about belongings`,
    spanishText: `QUÉ DECIR:
• "No consiento a ningún registro."
• "Estoy ejerciendo mis derechos de la Cuarta Enmienda."
• "¿Tienen una orden judicial?"
• "Quiero hablar con un abogado."
• "No me estoy resistiendo, pero no consiento."

QUÉ NO DECIR:
• No dé permiso para registros
• No ayude con el registro
• No responda preguntas sobre artículos encontrados
• No se resista físicamente
• No toque o interfiera con los oficiales
• No ofrezca información sobre pertenencias`,
    relatedLaws: ['CA', 'NY', 'TX', 'FL', 'IL', 'WA']
  },
  'arrest': {
    scriptId: 'arrest',
    title: 'Arrest Situation Script',
    scenario: 'arrest',
    englishText: `WHAT TO SAY:
• "I am exercising my right to remain silent."
• "I want to speak to an attorney immediately."
• "I do not consent to any searches."
• "I am not resisting arrest."
• "Please note that I am complying."

WHAT NOT TO SAY:
• Do not physically resist arrest
• Do not answer questions without an attorney
• Do not sign anything
• Do not make statements about guilt or innocence
• Do not argue with officers
• Do not discuss the case with anyone except your lawyer`,
    spanishText: `QUÉ DECIR:
• "Estoy ejerciendo mi derecho a permanecer en silencio."
• "Quiero hablar con un abogado inmediatamente."
• "No consiento a ningún registro."
• "No me estoy resistiendo al arresto."
• "Por favor note que estoy cumpliendo."

QUÉ NO DECIR:
• No se resista físicamente al arresto
• No responda preguntas sin un abogado
• No firme nada
• No haga declaraciones sobre culpabilidad o inocencia
• No discuta con los oficiales
• No discuta el caso con nadie excepto su abogado`,
    relatedLaws: ['CA', 'NY', 'TX', 'FL', 'IL', 'WA']
  },
  'home-search': {
    scriptId: 'home-search',
    title: 'Home Search Script',
    scenario: 'search',
    englishText: `WHAT TO SAY:
• "I do not consent to you entering my home."
• "Do you have a search warrant?"
• "I am exercising my Fourth Amendment rights."
• "I want to speak to an attorney."
• "I am stepping outside and closing the door."

WHAT NOT TO SAY:
• Do not let officers in without a warrant
• Do not consent to any searches
• Do not answer questions about who lives there
• Do not leave the door open
• Do not volunteer information
• Do not physically resist if they have a warrant`,
    spanishText: `QUÉ DECIR:
• "No consiento que entren a mi casa."
• "¿Tienen una orden de registro?"
• "Estoy ejerciendo mis derechos de la Cuarta Enmienda."
• "Quiero hablar con un abogado."
• "Voy a salir y cerrar la puerta."

QUÉ NO DECIR:
• No permita que los oficiales entren sin una orden
• No consienta a ningún registro
• No responda preguntas sobre quién vive ahí
• No deje la puerta abierta
• No ofrezca información voluntariamente
• No se resista físicamente si tienen una orden`,
    relatedLaws: ['CA', 'NY', 'TX', 'FL', 'IL', 'WA']
  },
  'general': {
    scriptId: 'general',
    title: 'General Encounter Script',
    scenario: 'general',
    englishText: `WHAT TO SAY:
• "I am exercising my right to remain silent."
• "Am I free to leave?"
• "I do not consent to any searches."
• "I want to speak to an attorney."
• "I am not answering questions."

WHAT NOT TO SAY:
• Do not volunteer information
• Do not answer questions about your identity (unless required by law)
• Do not consent to searches
• Do not physically resist
• Do not run or flee
• Do not lie to officers`,
    spanishText: `QUÉ DECIR:
• "Estoy ejerciendo mi derecho a permanecer en silencio."
• "¿Soy libre de irme?"
• "No consiento a ningún registro."
• "Quiero hablar con un abogado."
• "No voy a responder preguntas."

QUÉ NO DECIR:
• No ofrezca información voluntariamente
• No responda preguntas sobre su identidad (a menos que la ley lo requiera)
• No consienta a registros
• No se resista físicamente
• No corra o huya
• No mienta a los oficiales`,
    relatedLaws: ['CA', 'NY', 'TX', 'FL', 'IL', 'WA']
  }
};

export const US_STATES = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' }
];
