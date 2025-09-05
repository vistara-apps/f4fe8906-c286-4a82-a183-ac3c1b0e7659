import { StateLaw, Script } from './types';

export const stateLaws: Record<string, StateLaw> = {
  CA: {
    stateAbbreviation: 'CA',
    title: 'California Rights Summary',
    summary: 'California provides strong protections for citizens during police encounters.',
    rights: [
      'Right to remain silent',
      'Right to refuse consent to search',
      'Right to record police interactions',
      'Right to ask if you are free to leave',
      'Right to an attorney'
    ],
    prohibitedActions: [
      'Do not physically resist',
      'Do not lie or provide false information',
      'Do not consent to searches',
      'Do not answer questions without an attorney'
    ]
  },
  NY: {
    stateAbbreviation: 'NY',
    title: 'New York Rights Summary',
    summary: 'New York law provides specific protections during police encounters.',
    rights: [
      'Right to remain silent',
      'Right to refuse consent to search',
      'Right to record in public spaces',
      'Right to ask for badge number and name',
      'Right to legal representation'
    ],
    prohibitedActions: [
      'Do not physically resist',
      'Do not provide false identification',
      'Do not consent to vehicle searches',
      'Do not answer questions about immigration status'
    ]
  },
  TX: {
    stateAbbreviation: 'TX',
    title: 'Texas Rights Summary',
    summary: 'Texas law balances law enforcement needs with citizen rights.',
    rights: [
      'Right to remain silent',
      'Right to refuse consent to search',
      'Right to record police (in public)',
      'Right to ask if you are being detained',
      'Right to an attorney'
    ],
    prohibitedActions: [
      'Do not physically resist arrest',
      'Do not lie about your identity',
      'Do not consent to searches',
      'Do not interfere with police duties'
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

WHAT NOT TO SAY:
• Do not admit guilt or fault
• Do not answer questions about where you're going/coming from
• Do not consent to vehicle searches
• Do not get out of the vehicle unless ordered`,
    spanishText: `QUÉ DECIR:
• "Estoy ejerciendo mi derecho a permanecer en silencio."
• "No consiento a ningún registro."
• "¿Soy libre de irme?"
• "Me gustaría hablar con un abogado."

QUÉ NO DECIR:
• No admita culpa o falta
• No responda preguntas sobre a dónde va/viene
• No consienta registros del vehículo
• No salga del vehículo a menos que se lo ordenen`,
    relatedLaws: ['CA', 'NY', 'TX']
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

WHAT NOT TO SAY:
• Do not answer questions about your activities
• Do not provide information about others
• Do not sign anything without an attorney
• Do not waive your rights`,
    spanishText: `QUÉ DECIR:
• "Estoy ejerciendo mi derecho a permanecer en silencio."
• "No deseo responder preguntas."
• "¿Estoy detenido o soy libre de irme?"
• "Quiero hablar con un abogado."

QUÉ NO DECIR:
• No responda preguntas sobre sus actividades
• No proporcione información sobre otros
• No firme nada sin un abogado
• No renuncie a sus derechos`,
    relatedLaws: ['CA', 'NY', 'TX']
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

WHAT NOT TO SAY:
• Do not give permission for searches
• Do not help with the search
• Do not answer questions about items found
• Do not physically resist`,
    spanishText: `QUÉ DECIR:
• "No consiento a ningún registro."
• "Estoy ejerciendo mis derechos de la Cuarta Enmienda."
• "¿Tienen una orden judicial?"
• "Quiero hablar con un abogado."

QUÉ NO DECIR:
• No dé permiso para registros
• No ayude con el registro
• No responda preguntas sobre artículos encontrados
• No se resista físicamente`,
    relatedLaws: ['CA', 'NY', 'TX']
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
