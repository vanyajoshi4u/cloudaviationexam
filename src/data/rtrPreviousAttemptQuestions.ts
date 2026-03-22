import { MCQuestion, Topic } from "./icJoshiQuestions";

const march2026Questions: MCQuestion[] = [
  {
    id: 1,
    question: "What happens to current when load impedance is increased?",
    options: ["Current increases", "Current decreases", "Current remains the same", "Current becomes zero"],
    correct: 1,
  },
  {
    id: 2,
    question: "CPDLC full form is:",
    options: [
      "Controller Pilot Data Link Communications",
      "Central Pilot Data Link Control",
      "Controller Pilot Direct Link Communication",
      "Central Pilot Data Loop Communications",
    ],
    correct: 0,
  },
  {
    id: 3,
    question: "PIC full form is:",
    options: [
      "Pilot in Charge",
      "Pilot in Command",
      "Pilot in Control",
      "Principal in Command",
    ],
    correct: 1,
  },
  {
    id: 4,
    question: "Final approach is initiated at what distance?",
    options: ["8 NM", "10 NM", "5 NM", "15 NM"],
    correct: 0,
  },
  {
    id: 5,
    question: "Very High Frequency Omnidirectional Radio Range is called?",
    options: ["VHFORR", "VOR", "VORTAC", "VORR"],
    correct: 1,
  },
  {
    id: 6,
    question: "Emergency VHF frequency is:",
    options: ["121.5 MHz", "123.45 MHz", "118.0 MHz", "243.0 MHz"],
    correct: 0,
  },
  {
    id: 7,
    question: "The word 'INTERPILOT' is used:",
    options: [
      "For communication between pilots on a designated frequency",
      "For distress communication only",
      "For ATC to pilot communication",
      "For ground crew communication",
    ],
    correct: 0,
  },
  {
    id: 8,
    question: "'DISREGARD' means:",
    options: [
      "Consider this message as not sent / Ignore the previous transmission",
      "Repeat the message",
      "Acknowledge the message",
      "Standby for further instructions",
    ],
    correct: 0,
  },
  {
    id: 9,
    question: "When 'Cleared for Take-off' – the word 'take-off' is used:",
    options: [
      "Only when an actual take-off clearance is being issued or cancelled",
      "At any time during taxi instructions",
      "Only during emergencies",
      "Only by the pilot, never by ATC",
    ],
    correct: 0,
  },
  {
    id: 10,
    question: "Read back of QNH and Wind is:",
    options: ["Required", "Not required", "Optional", "Only for IFR flights"],
    correct: 0,
  },
  {
    id: 11,
    question: "Frequency range of HF is:",
    options: ["3 MHz to 30 MHz", "30 MHz to 300 MHz", "300 kHz to 3 MHz", "30 kHz to 300 kHz"],
    correct: 0,
  },
  {
    id: 12,
    question: "Attenuation means:",
    options: [
      "Reduction in the strength of a signal as it travels through a medium",
      "Increase in signal strength",
      "Change of frequency",
      "Reflection of radio waves",
    ],
    correct: 0,
  },
  {
    id: 13,
    question: "ATSMHS stands for:",
    options: [
      "ATS Message Handling System",
      "Air Traffic Service Message Handling System",
      "ATS Message Handling Service",
      "Air Transport System Message Handling System",
    ],
    correct: 0,
  },
  {
    id: 14,
    question: "The phrase 'ACKNOWLEDGE' means:",
    options: [
      "Let me know that you have received and understood this message",
      "I have received your message",
      "Repeat your last transmission",
      "Wait for further instructions",
    ],
    correct: 0,
  },
  {
    id: 15,
    question: "How to read Flight Level 360?",
    options: [
      "Flight Level Three Six Zero",
      "Flight Level Three Sixty",
      "Flight Level Three Hundred Sixty",
      "Flight Level Thirty Six Thousand",
    ],
    correct: 0,
  },
  {
    id: 16,
    question: "Scattering of radio waves occurs when:",
    options: [
      "Radio waves encounter small particles or irregularities in the atmosphere",
      "Radio waves travel in a straight line",
      "Radio waves are reflected by the ground",
      "Radio waves pass through a vacuum",
    ],
    correct: 0,
  },
  {
    id: 17,
    question: "Ionospheric refraction is:",
    options: [
      "Bending of radio waves as they pass through the ionosphere",
      "Reflection of radio waves from the ground",
      "Absorption of radio waves by the troposphere",
      "Scattering of radio waves in the stratosphere",
    ],
    correct: 0,
  },
  {
    id: 18,
    question: "Hearing ability of the human ear is:",
    options: [
      "20 Hz to 20,000 Hz",
      "20 Hz to 200,000 Hz",
      "200 Hz to 20,000 Hz",
      "2 Hz to 2,000 Hz",
    ],
    correct: 0,
  },
  {
    id: 19,
    question: "During fuel dumping, other aircraft will maintain distance from the fuel dumping aircraft.",
    options: ["True", "False"],
    correct: 0,
  },
  {
    id: 20,
    question: "Reason for VHF frequency returning from the ionosphere is called?",
    options: [
      "Sporadic-E propagation",
      "Ionospheric refraction",
      "Ground wave propagation",
      "Tropospheric ducting",
    ],
    correct: 0,
  },
  {
    id: 21,
    question: "VHF communication over ground is based on:",
    options: [
      "Line of sight propagation",
      "Sky wave propagation",
      "Ground wave propagation",
      "Ionospheric propagation",
    ],
    correct: 0,
  },
  {
    id: 22,
    question: "An aircraft sends multiple distinct messages to multiple ATS on the same RF channel. This is called:",
    options: [
      "Selective calling",
      "Broadcast",
      "Multi-call",
      "Relay communication",
    ],
    correct: 1,
  },
  {
    id: 23,
    question: "For uniform quantization, if the number of quantization levels is doubled, the signal-to-quantization noise ratio will:",
    options: [
      "Increase by approximately 6 dB",
      "Decrease by 6 dB",
      "Remain the same",
      "Double exactly",
    ],
    correct: 0,
  },
  {
    id: 24,
    question: "When should a pilot use the phrase 'take-off'?",
    options: [
      "Only when ATC issues or the pilot reads back a take-off clearance, or when cancelling take-off",
      "At any time during taxi",
      "During pushback instructions",
      "When requesting engine start",
    ],
    correct: 0,
  },
];

export const rtrPrevMarch2026Topic: Topic = {
  id: "rtr-prev-march-2026",
  title: "March, 2026",
  questions: march2026Questions,
};

export const rtrPreviousAttemptTopics: Topic[] = [rtrPrevMarch2026Topic];
