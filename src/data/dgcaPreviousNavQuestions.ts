import { type Topic, type MCQuestion } from "./icJoshiQuestions";

const navPaper1Questions: MCQuestion[] = [
  {
    id: 1,
    question: "If static source to ASI becomes blocked during descent, the instrument will:",
    options: [
      "Continue to indicate speed at time of blockage",
      "Under read",
      "Over read",
    ],
    correct: 2,
  },
  {
    id: 2,
    question: "Coordinates of a heliport are 48°50'N 002°16.5'E. The coordinates of the antipodes are:",
    options: [
      "48°50'S 177°43.5'W",
      "48°50'S 177°43.5'E",
      "48°50'N 177°43.5'W",
    ],
    correct: 0,
  },
  {
    id: 3,
    question: "If static line becomes blocked:",
    options: [
      "ASI over-reads at higher altitude and under-indicates at lower altitude at which blockage occurred",
      "ASI will over-read at lower altitude and under-read at higher altitude than at which blockage occurred",
      "ASI pointer will become fixed at time of blockage",
    ],
    correct: 0,
  },
  {
    id: 4,
    question: "An aircraft accelerating on a westerly heading in N/H, effect on direct reading magnetic compass?",
    options: [
      "Apparent turn to North",
      "Apparent turn to South",
      "Apparent turn to West",
    ],
    correct: 0,
  },
  {
    id: 5,
    question: "The coded identification of the VOR is transmitted about every ______ seconds:",
    options: ["20 seconds", "10 seconds", "30 seconds"],
    correct: 2,
  },
  {
    id: 6,
    question: "Climb time 40 min, fuel flow 3000 lbs/hr. Cruise time 130 min and fuel flow 2000 lbs/hr. Descend time is 20 min and fuel flow is 1500 lbs/hr. What is the total fuel consumed?",
    options: ["7500 lbs", "6500 lbs", "6833 lbs"],
    correct: 2,
  },
  {
    id: 7,
    question: "The handling and performance problems encountered when an aircraft is overloaded include:",
    options: [
      "The stall speed is reduced",
      "A reduced rate of climb and reduced climb gradient",
      "Little possibility of overstressing the airframe if the mass is above maximum authorized weights",
    ],
    correct: 1,
  },
  {
    id: 8,
    question: "What is the difference in nautical miles between position 41°25'N and 79°30'N, both positions are on the same meridian?",
    options: ["2225", "2285", "2345"],
    correct: 1,
  },
  {
    id: 9,
    question: "Your aircraft has maximum certified take off mass of 140000 kg. Today your calculated TOM is 130000 kg. What should be put on flight plan under wake turbulence category?",
    options: ["L", "M", "H"],
    correct: 2,
  },
  {
    id: 10,
    question: "Which of the following is correct?",
    options: [
      "A tail heavy aeroplane is less stable and stalls at lower speed than nose heavy airplane",
      "CG is given in % of MAC from Leading edge of wing where MAC is always positive",
      "If the actual CG is located behind the AFT limit, longitudinal stability increases",
    ],
    correct: 0,
  },
  {
    id: 11,
    question: "TAS 140 kts, HDG 005T, W/V 265/25, find drift and ground speed:",
    options: ["11R – 140 kts", "10R – 146 kts", "9R – 140 kts"],
    correct: 1,
  },
  {
    id: 12,
    question: "Principal advantage of DVOR is:",
    options: [
      "Site errors are considerably reduced",
      "A continuous readout of range as well as bearing is obtained",
      "Transmitted frequency of station is monitored",
    ],
    correct: 0,
  },
  {
    id: 13,
    question: "You are on a cross country flight from VOR A to VOR B, aircraft flying magnetic heading 120M to follow the track of 120M. Midway aircraft changes over to VOR B, QDM of which is 120M. The CDI will:",
    options: [
      "CDI will indicate 3 dots fly right, OBS 120 and FROM changes to TO",
      "CDI centered and changes FROM to TO, OBS 120",
      "CDI will indicate 3 dots fly left OBS 300, TO",
    ],
    correct: 1,
  },
  {
    id: 14,
    question: "DOM 33510. Traffic Load 7600, Final reserve 983, Alternate fuel 1100, Contingency fuel 102. Estimated landing mass at destination alternate will be:",
    options: ["42093 kg", "42210 kg", "42195 kg"],
    correct: 2,
  },
  {
    id: 15,
    question: "Concerning the NAVSTAR GPS, which of the following statement is true?",
    options: [
      "Inclination of the orbit is 55° and orbital period is 12 hrs",
      "Inclination of the orbit is 65° and orbital period is 12 hrs",
      "Inclination of the orbit is 55° and orbital period is 11.5 hrs",
    ],
    correct: 0,
  },
  {
    id: 16,
    question: "After flying for 16 min at 100 kts TAS with 20 kts tailwind, if you have to return to airfield of departure, it will take:",
    options: ["20 min", "24 min", "16 min"],
    correct: 1,
  },
  {
    id: 17,
    question: "Runway QDM 305M. Wind 260/30M. Calculate the crosswind component:",
    options: ["18 kts", "24 kts", "21 kts"],
    correct: 1,
  },
  {
    id: 18,
    question: "The operation of a radio altimeter of a modern aircraft is based on:",
    options: [
      "Combination of FM and pulse modulation",
      "FM of carrier wave",
      "AM of carrier wave",
    ],
    correct: 1,
  },
  {
    id: 19,
    question: "Special SSR codes are as follows: Emergency______, Radio failure______, Entering IFR airspace______, Unlawful interference______.",
    options: [
      "7700, 7600, 2000, 7500",
      "7700, 2000, 7600, 7500",
      "7500, 7600, 7700, 2000",
    ],
    correct: 0,
  },
  {
    id: 20,
    question: "What is the main advantage of RIMC over direct reading magnetic compass?",
    options: [
      "It has no moving parts",
      "It magnifies the earth's magnetic field in order to attain greater accuracy",
      "It senses, rather than seeking the magnetic meridian",
    ],
    correct: 2,
  },
  {
    id: 21,
    question: "Given – time and fuel flow as follows: 3 hr 25 min → 400 imp gallon; 1 hr 47 min → 1075 lbs; 1 hr 20 min → 187 ltr/hr. Which of the following options are correct?",
    options: [
      "117 imp gal/hr, 603 lbs/hr, 140 ltr/hr",
      "117 imp gal/hr, 600 lbs/hr, 140 ltr/hr",
      "115 imp gal/hr, 500 lbs/hr, 140 ltr/hr",
    ],
    correct: 1,
  },
  {
    id: 22,
    question: "An aircraft is 100 NM SW of VOR, HDG 080. Pilot intends to home to VOR on 210 radial. Setting on OBS and indication on CDI should be:",
    options: [
      "030, TO, Fly right",
      "030, TO, Fly left",
      "210, FROM, Fly right",
    ],
    correct: 0,
  },
  {
    id: 23,
    question: "Maximum range of ground RADAR is limited by:",
    options: [
      "Number of cycles per second",
      "Number of pulses per second",
      "Ratio of pulse width to pulse repetition period",
    ],
    correct: 2,
  },
  {
    id: 24,
    question: "In order to fly from A (10N 030W) to B (30N 050W), maintaining a constant true course, it is necessary to fly:",
    options: [
      "Great Circle route",
      "Rhumb Line route",
      "A straight line plotted on Lambert chart",
    ],
    correct: 1,
  },
  {
    id: 25,
    question: "Parallel of latitude on direct Mercator chart are:",
    options: [
      "Parallel, straight lines, equally spaced",
      "Parallel, straight lines, unequally spaced",
      "Parallel, straight lines, converging at poles",
    ],
    correct: 1,
  },
  {
    id: 26,
    question: "Which of the following statement concerning AM is correct?",
    options: [
      "The amplitude of RF is modulated by the amplitude of AF",
      "The frequency of RF is modulated by the frequency of AF",
      "The frequency of RF is modulated by the amplitude of AF",
    ],
    correct: 0,
  },
  {
    id: 27,
    question: "On the take-off performance, requirement is that:",
    options: [
      "Aircraft net flight path must clear all the obstacles by 400 feet",
      "Aircraft net flight path must clear all the obstacles by 35 feet",
      "Aircraft net flight path must clear all the obstacles by 50 feet",
    ],
    correct: 1,
  },
  {
    id: 28,
    question: "Course 040T, TAS 120 kts, wind 30 kts. From which direction will the wind give greatest drift?",
    options: ["215T", "235T", "240T"],
    correct: 0,
  },
  {
    id: 29,
    question: "Which of the following statement is correct about earth's magnetic field?",
    options: [
      "It may be permanent, temporary or transient",
      "It does not affect aircraft deviation",
      "It has the large magnetic blue pole in North Canada",
    ],
    correct: 0,
  },
  {
    id: 30,
    question: "Unless otherwise stated on the charts for SID, the routes shown are given with:",
    options: ["Magnetic Heading", "True Course", "Magnetic Course"],
    correct: 2,
  },
  {
    id: 31,
    question: "A twin engine aircraft is to fly from A to B, Track 245°T, Distance is 830 NM. W/V 310/40, 2 eng TAS 280 kts, 1 eng TAS 220 kts. If the ETD is 0800Z, find the ETA at one engine inoperative PET:",
    options: ["0623Z", "0943Z", "1023Z"],
    correct: 1,
  },
  {
    id: 32,
    question: "MTOW: 64400 KG, MLM: 56200 KG, MZFM: 53000 KG, DOM: 35500 KG, Traffic Load: 14500 KG, Min take off fuel: 7400 KG. Find maximum allowable take off fuel (trip fuel 4900):",
    options: ["11100 kg", "11400 kg", "14400 kg"],
    correct: 2,
  },
  {
    id: 33,
    question: "Aircraft sets course from 4000 PALT and climbs to 16000 PALT. ROC is 500 FPM. Mean winds 200/20 kts, maintains a constant RAS of 130 kts, at 4000 temp is ISA-5°C and at 16000 ISA-5°C. The time and distance in nil wind will be:",
    options: ["24 min / 80 NM", "24 min / 60 NM", "40 min / 103 NM"],
    correct: 0,
  },
  {
    id: 34,
    question: "Satellites required to produce a 4D fix are:",
    options: ["3", "4", "5"],
    correct: 1,
  },
  {
    id: 35,
    question: "True heading: 233°, TAS 480 kts, Track 240°, Ground speed 523 kts. Calculate W/V:",
    options: ["110/75", "110/80", "109/70"],
    correct: 0,
  },
];

export const dgcaPreviousNavPaper1: Topic = {
  id: "dgca-prev-nav-paper-1",
  title: "Navigation Paper 1",
  questions: navPaper1Questions,
};

export const dgcaPreviousNavTopics: Topic[] = [dgcaPreviousNavPaper1];
