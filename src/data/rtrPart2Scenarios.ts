export interface AtisInfo {
  designator: string;
  timeOfObservation: string;
  runwayInUse: string;
  wind: string;
  visibility: string;
  weather?: string;
  clouds: string;
  temperature: string;
  dewpoint: string;
  qnh: string;
  remarks?: string;
}

export interface RtrScenario {
  id: number;
  scenarioContext: string;
  flightInfo: {
    aircraftId: string;
    aircraftType: string;
    rtCallSign: string;
    registration: string;
    departure: string;
    destination: string;
    atsRoute: string;
    standNo: string;
    runwayInUse: string;
    taxiway: string;
    flightLevel: string;
    alternateAirdrome: string;
    pob: string;
    endurance: string;
    exerciseStartTime: string;
  };
  atisInfo: AtisInfo;
  frequencies: {
    description: string;
    frequency: string;
  }[];
  squawk: string;
  questions: string[];
}

export interface RtrPart2Paper {
  id: string;
  title: string;
  scenarios: RtrScenario[];
}

const paper1Scenarios: RtrScenario[] = [
  {
    id: 1,
    scenarioContext: "AIC 887 parked on bay NO 11. Carry out the following RT communication from Delhi Surface Movement Control (SMC)",
    flightInfo: {
      aircraftId: "AIC-887",
      aircraftType: "B777-300ER",
      rtCallSign: "Air India-887",
      registration: "VT-AED",
      departure: "VIDP-DELHI",
      destination: "VILK-LUCKNOW",
      atsRoute: "R460 ALIGARH PAVRU",
      standNo: "11",
      runwayInUse: "09",
      taxiway: "C, D",
      flightLevel: "360",
      alternateAirdrome: "VEGT-Guhwati",
      pob: "152",
      endurance: "0500 Hrs",
      exerciseStartTime: "1105 UTC",
    },
    atisInfo: {
      designator: "K",
      timeOfObservation: "1100 UTC",
      runwayInUse: "09",
      wind: "340°/03 Knots",
      visibility: "3000 Metres",
      clouds: "SCT 1500 FT, BKN 2500 FT",
      temperature: "12°C",
      dewpoint: "08°C",
      qnh: "1016 hPa",
      remarks: "No significant weather",
    },
    frequencies: [
      { description: "DELHI SMC", frequency: "118.55 MHz" },
      { description: "DELHI CONTROL TOWER", frequency: "118.10 MHz" },
      { description: "DELHI APPROACH", frequency: "121.35 MHz" },
      { description: "DELHI AREA CONTROL", frequency: "119.50 MHz" },
      { description: "LUCKNOW APPROACH", frequency: "121.20 MHz" },
      { description: "LUCKNOW TWR", frequency: "118.75 MHz" },
    ],
    squawk: "7700",
    questions: [
      "Radio Check",
      "Time Check",
      "Obtain Departure Information",
    ],
  },
  {
    id: 2,
    scenarioContext: "AIC 887 at Stand No 11 Security Check completed. Give your necessary flight details to Delhi Surface Movement Control (SMC).",
    flightInfo: {
      aircraftId: "AIC-887",
      aircraftType: "B777-300ER",
      rtCallSign: "Air India-887",
      registration: "VT-AED",
      departure: "VIDP-DELHI",
      destination: "VILK-LUCKNOW",
      atsRoute: "R460 ALIGARH PAVRU",
      standNo: "11",
      runwayInUse: "09",
      taxiway: "C, D",
      flightLevel: "360",
      alternateAirdrome: "VEGT-Guhwati",
      pob: "152",
      endurance: "0500 Hrs",
      exerciseStartTime: "1105 UTC",
    },
    atisInfo: {
      designator: "K",
      timeOfObservation: "1100 UTC",
      runwayInUse: "09",
      wind: "340°/03 Knots",
      visibility: "3000 Metres",
      clouds: "SCT 1500 FT, BKN 2500 FT",
      temperature: "12°C",
      dewpoint: "08°C",
      qnh: "1016 hPa",
    },
    frequencies: [
      { description: "DELHI SMC", frequency: "118.55 MHz" },
      { description: "DELHI CONTROL TOWER", frequency: "118.10 MHz" },
      { description: "DELHI APPROACH", frequency: "121.35 MHz" },
      { description: "DELHI AREA CONTROL", frequency: "119.50 MHz" },
      { description: "LUCKNOW APPROACH", frequency: "121.20 MHz" },
      { description: "LUCKNOW TWR", frequency: "118.75 MHz" },
    ],
    squawk: "7700",
    questions: [
      "Obtain permission for Pushback and Startup.",
      "After start up take action for taxi as per Taxi route given to you.",
      "During taxiing, your P1 observed that taxiway edge light intensity is too high. Request ATC to reduce intensity of Taxiway edge light.",
      "Request ATC clearance from Surface Movement Control.",
    ],
  },
  {
    id: 3,
    scenarioContext: "You have been changed over from Delhi Surface Movement Control to Delhi Control Tower",
    flightInfo: {
      aircraftId: "AIC-887",
      aircraftType: "B777-300ER",
      rtCallSign: "Air India-887",
      registration: "VT-AED",
      departure: "VIDP-DELHI",
      destination: "VILK-LUCKNOW",
      atsRoute: "R460 ALIGARH PAVRU",
      standNo: "11",
      runwayInUse: "09",
      taxiway: "C, D",
      flightLevel: "360",
      alternateAirdrome: "VEGT-Guhwati",
      pob: "152",
      endurance: "0500 Hrs",
      exerciseStartTime: "1105 UTC",
    },
    atisInfo: {
      designator: "K",
      timeOfObservation: "1100 UTC",
      runwayInUse: "09",
      wind: "340°/03 Knots",
      visibility: "3000 Metres",
      clouds: "SCT 1500 FT, BKN 2500 FT",
      temperature: "12°C",
      dewpoint: "08°C",
      qnh: "1016 hPa",
    },
    frequencies: [
      { description: "DELHI SMC", frequency: "118.55 MHz" },
      { description: "DELHI CONTROL TOWER", frequency: "118.10 MHz" },
      { description: "DELHI APPROACH", frequency: "121.35 MHz" },
      { description: "DELHI AREA CONTROL", frequency: "119.50 MHz" },
      { description: "LUCKNOW APPROACH", frequency: "121.20 MHz" },
      { description: "LUCKNOW TWR", frequency: "118.75 MHz" },
    ],
    squawk: "7700",
    questions: [
      "You are approaching Holding Point D for Runway-09. Seek permission to enter Runway 09.",
      "After line up Rwy-09, Obtain Take off permission from TWR.",
      "During take off roll below V1 you observed one Blue Bull on the Runway and had abandoned take off. Inform ATC regarding this occurrence. Your all operation is normal. Inform Tower about the same you want to continue flight as per flight plan request revised clearance for departure from ATC. Request for enter and line up Runway 09.",
      "Obtain Take off permission from Tower.",
      "Your airborne time 1125. Report airborne time to ATC.",
    ],
  },
  {
    id: 4,
    scenarioContext: "You have been changed over from Delhi TOWER to Delhi APPROACH",
    flightInfo: {
      aircraftId: "AIC-887",
      aircraftType: "B777-300ER",
      rtCallSign: "Air India-887",
      registration: "VT-AED",
      departure: "VIDP-DELHI",
      destination: "VILK-LUCKNOW",
      atsRoute: "R460 ALIGARH PAVRU",
      standNo: "11",
      runwayInUse: "09",
      taxiway: "C, D",
      flightLevel: "360",
      alternateAirdrome: "VEGT-Guhwati",
      pob: "152",
      endurance: "0500 Hrs",
      exerciseStartTime: "1105 UTC",
    },
    atisInfo: {
      designator: "K",
      timeOfObservation: "1100 UTC",
      runwayInUse: "09",
      wind: "340°/03 Knots",
      visibility: "3000 Metres",
      clouds: "SCT 1500 FT, BKN 2500 FT",
      temperature: "12°C",
      dewpoint: "08°C",
      qnh: "1016 hPa",
    },
    frequencies: [
      { description: "DELHI SMC", frequency: "118.55 MHz" },
      { description: "DELHI CONTROL TOWER", frequency: "118.10 MHz" },
      { description: "DELHI APPROACH", frequency: "121.35 MHz" },
      { description: "DELHI AREA CONTROL", frequency: "119.50 MHz" },
      { description: "LUCKNOW APPROACH", frequency: "121.20 MHz" },
      { description: "LUCKNOW TWR", frequency: "118.75 MHz" },
    ],
    squawk: "7700",
    questions: [
      "You are passing 4000 feet for F160. Contact Delhi Approach on appropriate frequency as advised by Tower and inform the altitude passing (4000 feet) to Approach seek permission for climb to FL 360 as filed in FPL.",
      "While passing FL160 you encountered bad weather ahead. You decided to deviate 10 NM right of track until abeam LKN. Request permission from ATC for deviation to Right of track.",
    ],
  },
  {
    id: 5,
    scenarioContext: "You have been changed over from Delhi APPROACH to Delhi CONTROL",
    flightInfo: {
      aircraftId: "AIC-887",
      aircraftType: "B777-300ER",
      rtCallSign: "Air India-887",
      registration: "VT-AED",
      departure: "VIDP-DELHI",
      destination: "VILK-LUCKNOW",
      atsRoute: "R460 ALIGARH PAVRU",
      standNo: "11",
      runwayInUse: "09",
      taxiway: "C, D",
      flightLevel: "360",
      alternateAirdrome: "VEGT-Guhwati",
      pob: "152",
      endurance: "0500 Hrs",
      exerciseStartTime: "1105 UTC",
    },
    atisInfo: {
      designator: "K",
      timeOfObservation: "1100 UTC",
      runwayInUse: "09",
      wind: "340°/03 Knots",
      visibility: "3000 Metres",
      clouds: "SCT 1500 FT, BKN 2500 FT",
      temperature: "12°C",
      dewpoint: "08°C",
      qnh: "1016 hPa",
    },
    frequencies: [
      { description: "DELHI SMC", frequency: "118.55 MHz" },
      { description: "DELHI CONTROL TOWER", frequency: "118.10 MHz" },
      { description: "DELHI APPROACH", frequency: "121.35 MHz" },
      { description: "DELHI AREA CONTROL", frequency: "119.50 MHz" },
      { description: "LUCKNOW APPROACH", frequency: "121.20 MHz" },
      { description: "LUCKNOW TWR", frequency: "118.75 MHz" },
    ],
    squawk: "7700",
    questions: [
      "You are passing FL170 for F250 as per app instructions over ALI-ALIGARAH flying 10 NM right of track due. Establish contact with Delhi Area Control, report deviation due weather to ATC and request FL 360.",
      "Over Lucknow Weather normal 1205, FL 360, Estimate BBN 1235, GGC 1255. Transmit your position report.",
    ],
  },
  {
    id: 6,
    scenarioContext: "You have been changed over from Delhi Area Control to Lucknow Approach",
    flightInfo: {
      aircraftId: "AIC-887",
      aircraftType: "B777-300ER",
      rtCallSign: "Air India-887",
      registration: "VT-AED",
      departure: "VIDP-DELHI",
      destination: "VILK-LUCKNOW",
      atsRoute: "R460 ALIGARH PAVRU",
      standNo: "11",
      runwayInUse: "09",
      taxiway: "C, D",
      flightLevel: "360",
      alternateAirdrome: "VEGT-Guhwati",
      pob: "152",
      endurance: "0500 Hrs",
      exerciseStartTime: "1105 UTC",
    },
    atisInfo: {
      designator: "K",
      timeOfObservation: "1100 UTC",
      runwayInUse: "09",
      wind: "340°/03 Knots",
      visibility: "3000 Metres",
      clouds: "SCT 1500 FT, BKN 2500 FT",
      temperature: "12°C",
      dewpoint: "08°C",
      qnh: "1016 hPa",
    },
    frequencies: [
      { description: "DELHI SMC", frequency: "118.55 MHz" },
      { description: "DELHI CONTROL TOWER", frequency: "118.10 MHz" },
      { description: "DELHI APPROACH", frequency: "121.35 MHz" },
      { description: "DELHI AREA CONTROL", frequency: "119.50 MHz" },
      { description: "LUCKNOW APPROACH", frequency: "121.20 MHz" },
      { description: "LUCKNOW TWR", frequency: "118.75 MHz" },
    ],
    squawk: "7700",
    questions: [
      "At GAYA 1255, DHANBAD 1310 ETA CEA 1330 maintaining FL 360. Give Position report to Kolkata Area Control Centre and Request for Descend clearance.",
      "While descending OVER DHNABAD you experience pressurization failure take action to descend FL 100. Declare emergency to Kolkata Area Control Centre as per RT procedure.",
      "At Flight Level 100 cabin pressurization stated working normal, Inform ATC regarding cancelling of emergency and your intention.",
    ],
  },
];

const paper2FlightInfo = {
  aircraftId: "AIC-212",
  aircraftType: "A320neo",
  rtCallSign: "Air India-212",
  registration: "VT-ILP",
  departure: "VAJB-JABALPUR",
  destination: "VAID-INDORE",
  atsRoute: "GOLOX A791 BPL Q16 MUBDO",
  standNo: "5",
  runwayInUse: "09",
  taxiway: "C, D",
  flightLevel: "320",
  alternateAirdrome: "VABP-Bhopal",
  pob: "180",
  endurance: "0500 Hrs",
  exerciseStartTime: "1105 UTC",
};

const paper2AtisInfo: AtisInfo = {
  designator: "K",
  timeOfObservation: "1100 UTC",
  runwayInUse: "09",
  wind: "340°/03 Knots",
  visibility: "3000 Metres",
  clouds: "SCT 1500 FT, BKN 2500 FT",
  temperature: "12°C",
  dewpoint: "08°C",
  qnh: "1016 hPa",
  remarks: "No significant weather",
};

const paper2Frequencies = [
  { description: "JABALPUR SMC", frequency: "121.90 MHz" },
  { description: "JABALPUR TWR", frequency: "118.10 MHz" },
  { description: "JABALPUR APPROACH", frequency: "119.30 MHz" },
  { description: "MUMBAI AREA CONTROL", frequency: "124.05 MHz" },
  { description: "INDORE TWR", frequency: "118.70 MHz" },
  { description: "INDORE APPROACH", frequency: "120.30 MHz" },
];

const paper2Scenarios: RtrScenario[] = [
  {
    id: 1,
    scenarioContext: "Abbreviate correct phraseology / state meaning.",
    flightInfo: paper2FlightInfo,
    atisInfo: paper2AtisInfo,
    frequencies: paper2Frequencies,
    squawk: "7700",
    questions: [
      "A) \"I request verification of: (clearance, instruction, action, information).\"",
      "B) \"Ignore.\"",
      "C) MONITOR.",
      "D) \"My transmission is ended and I expect a response from you.\"",
      "E) RECLEARED.",
    ],
  },
  {
    id: 2,
    scenarioContext: "You are on taxiway C.",
    flightInfo: paper2FlightInfo,
    atisInfo: paper2AtisInfo,
    frequencies: paper2Frequencies,
    squawk: "7700",
    questions: [
      "You ingested FOD in your left engine. Take action.",
    ],
  },
  {
    id: 3,
    scenarioContext: "You are lined up runway 09.",
    flightInfo: paper2FlightInfo,
    atisInfo: paper2AtisInfo,
    frequencies: paper2Frequencies,
    squawk: "7700",
    questions: [
      "Request line up and ATC clearance.",
    ],
  },
  {
    id: 4,
    scenarioContext: "You are airborne and passing 2500 feet.",
    flightInfo: paper2FlightInfo,
    atisInfo: paper2AtisInfo,
    frequencies: paper2Frequencies,
    squawk: "7700",
    questions: [
      "One Helicopter passed you at 6 NM. Take action.",
    ],
  },
  {
    id: 5,
    scenarioContext: "You are at FL 200.",
    flightInfo: paper2FlightInfo,
    atisInfo: paper2AtisInfo,
    frequencies: paper2Frequencies,
    squawk: "7700",
    questions: [
      "Severe turbulence caused you height loss of 10,000 feet. Take action.",
    ],
  },
  {
    id: 6,
    scenarioContext: "You are in flight.",
    flightInfo: paper2FlightInfo,
    atisInfo: paper2AtisInfo,
    frequencies: paper2Frequencies,
    squawk: "7700",
    questions: [
      "Your left engine got fire. Take action.",
    ],
  },
];

const paper3FlightInfo = {
  aircraftId: "AIC-492",
  aircraftType: "A321neo",
  rtCallSign: "Air India-492",
  registration: "VT-ILO",
  departure: "VIAR-AMRITSAR",
  destination: "VIDP-DELHI",
  atsRoute: "W25 A466 ELKUX SAM",
  standNo: "5",
  runwayInUse: "09",
  taxiway: "C, D",
  flightLevel: "310",
  alternateAirdrome: "VIDN-Jewar",
  pob: "180",
  endurance: "0500 Hrs",
  exerciseStartTime: "0505 UTC",
};

const paper3AtisInfo: AtisInfo = {
  designator: "K",
  timeOfObservation: "0500 UTC",
  runwayInUse: "09",
  wind: "340°/03 Knots",
  visibility: "3000 Metres",
  clouds: "SCT 1500 FT, BKN 2500 FT",
  temperature: "12°C",
  dewpoint: "08°C",
  qnh: "1016 hPa",
  remarks: "No significant weather",
};

const paper3Frequencies = [
  { description: "AMRITSAR SMC", frequency: "121.90 MHz" },
  { description: "AMRITSAR TWR", frequency: "118.10 MHz" },
  { description: "AMRITSAR APPROACH", frequency: "119.30 MHz" },
  { description: "DELHI AREA CONTROL", frequency: "119.50 MHz" },
  { description: "DELHI APPROACH", frequency: "121.35 MHz" },
  { description: "DELHI TWR", frequency: "118.10 MHz" },
];

const paper3Scenarios: RtrScenario[] = [
  {
    id: 1,
    scenarioContext: "Transmit the following in RT phraseology.",
    flightInfo: paper3FlightInfo,
    atisInfo: paper3AtisInfo,
    frequencies: paper3Frequencies,
    squawk: "7700",
    questions: [
      "A) \"Permission for proposed action granted.\"",
      "B) \"Pass me the following information.\"",
      "C) \"I request verification of (Clearance, Instruction, action, information).\"",
      "D) Vis 4500m — Transmit in RT phraseology.",
      "E) FL120 — Transmit in RT phraseology.",
    ],
  },
  {
    id: 2,
    scenarioContext: "AIC 492 parked on Stand No 5. Carry out the following RT communication from Amritsar Surface Movement Control (SMC).",
    flightInfo: paper3FlightInfo,
    atisInfo: paper3AtisInfo,
    frequencies: paper3Frequencies,
    squawk: "7700",
    questions: [
      "Request Pushback and Taxi.",
      "Request ATC clearance.",
      "You have reached Runway Holding Point. Take action.",
      "Request Line Up on Runway 09.",
    ],
  },
  {
    id: 3,
    scenarioContext: "You are outbound Amritsar.",
    flightInfo: paper3FlightInfo,
    atisInfo: paper3AtisInfo,
    frequencies: paper3Frequencies,
    squawk: "7700",
    questions: [
      "Request Departure clearance from ATC.",
    ],
  },
  {
    id: 4,
    scenarioContext: "You are at FL100.",
    flightInfo: paper3FlightInfo,
    atisInfo: paper3AtisInfo,
    frequencies: paper3Frequencies,
    squawk: "7700",
    questions: [
      "You face Severe Turbulence. Take action.",
    ],
  },
  {
    id: 5,
    scenarioContext: "You are in flight.",
    flightInfo: paper3FlightInfo,
    atisInfo: paper3AtisInfo,
    frequencies: paper3Frequencies,
    squawk: "7700",
    questions: [
      "Bomb threat onboard. Request priority landing.",
      "Request Descend to Land.",
    ],
  },
  {
    id: 6,
    scenarioContext: "You are on approach to Delhi.",
    flightInfo: paper3FlightInfo,
    atisInfo: paper3AtisInfo,
    frequencies: paper3Frequencies,
    squawk: "7700",
    questions: [
      "Established on ILS Runway 09. Request further descent.",
      "Vacate Runway and inform ATC.",
    ],
  },
];

const paper4FlightInfo = {
  aircraftId: "6E-254",
  aircraftType: "B777-X",
  rtCallSign: "Ifly-254",
  registration: "VT-AJU",
  departure: "VABB-MUMBAI",
  destination: "VOGO-GOA",
  atsRoute: "W28 BEDOL Q9 EPKOS KOLHAPUR W56 BELGAUM W163 GOA",
  standNo: "5",
  runwayInUse: "09",
  taxiway: "C, D",
  flightLevel: "310",
  alternateAirdrome: "VABM-Belgaum",
  pob: "180",
  endurance: "0500 Hrs",
  exerciseStartTime: "0505 UTC",
};

const paper4AtisInfo: AtisInfo = {
  designator: "K",
  timeOfObservation: "0500 UTC",
  runwayInUse: "09",
  wind: "340°/03 Knots",
  visibility: "3000 Metres",
  clouds: "SCT 1500 FT, BKN 2500 FT",
  temperature: "12°C",
  dewpoint: "08°C",
  qnh: "1016 hPa",
  remarks: "No significant weather",
};

const paper4Frequencies = [
  { description: "MUMBAI SMC", frequency: "121.90 MHz" },
  { description: "MUMBAI TWR", frequency: "118.10 MHz" },
  { description: "MUMBAI APPROACH", frequency: "119.30 MHz" },
  { description: "MUMBAI AREA CONTROL", frequency: "124.05 MHz" },
  { description: "GOA APPROACH", frequency: "120.30 MHz" },
  { description: "GOA TWR", frequency: "118.70 MHz" },
];

const paper4Scenarios: RtrScenario[] = [
  {
    id: 1,
    scenarioContext: "Translate to RT phraseology.",
    flightInfo: paper4FlightInfo,
    atisInfo: paper4AtisInfo,
    frequencies: paper4Frequencies,
    squawk: "7700",
    questions: [
      "A) CLOUDS FEW020 SCT080 BKN200 — Transmit in RT phraseology.",
      "B) VISIBILITY 10000M — Transmit in RT phraseology.",
      "C) \"Annul my last transmission.\"",
      "D) \"Repeat for emphasis.\"",
    ],
  },
  {
    id: 2,
    scenarioContext: "You are on Taxiway C, taxiing out.",
    flightInfo: paper4FlightInfo,
    atisInfo: paper4AtisInfo,
    frequencies: paper4Frequencies,
    squawk: "7700",
    questions: [
      "You see a fire tender on Taxiway C. Take action.",
      "Ask for ATC clearance and take off Runway 09.",
      "On take off roll you see a vehicle on the Runway. Take action.",
    ],
  },
  {
    id: 3,
    scenarioContext: "You are airborne after take off from Mumbai.",
    flightInfo: paper4FlightInfo,
    atisInfo: paper4AtisInfo,
    frequencies: paper4Frequencies,
    squawk: "7700",
    questions: [
      "A) After take off, ask for further climb. Change frequency. Request level change or further climb.",
      "B) Relay transmission of other aircraft.",
    ],
  },
  {
    id: 4,
    scenarioContext: "You are in flight at your cleared flight level.",
    flightInfo: paper4FlightInfo,
    atisInfo: paper4AtisInfo,
    frequencies: paper4Frequencies,
    squawk: "7700",
    questions: [
      "Unable to maintain cleared FL due to turbulence. Take action.",
    ],
  },
  {
    id: 5,
    scenarioContext: "You are in flight en route to Goa.",
    flightInfo: paper4FlightInfo,
    atisInfo: paper4AtisInfo,
    frequencies: paper4Frequencies,
    squawk: "7700",
    questions: [
      "Weather deviation 10 NM from route. Ask permission.",
      "After deviation, ask to resume normal navigation and take permission.",
    ],
  },
  {
    id: 6,
    scenarioContext: "You are 50 NM from Goa.",
    flightInfo: paper4FlightInfo,
    atisInfo: paper4AtisInfo,
    frequencies: paper4Frequencies,
    squawk: "7700",
    questions: [
      "Lightning strike and severe structural damage. Take action to land at Goa.",
      "Reply to further clearance for landing at Goa.",
    ],
  },
];

const paper5FlightInfo = {
  aircraftId: "SEJ-541",
  aircraftType: "B787-D",
  rtCallSign: "SpiceJet-541",
  registration: "VT-KNU",
  departure: "VERC-RANCHI",
  destination: "VERP-RAIPUR",
  atsRoute: "W100 KINKI ENTAP",
  standNo: "5",
  runwayInUse: "09",
  taxiway: "C, D",
  flightLevel: "310",
  alternateAirdrome: "VEJH-Jharsuguda",
  pob: "180",
  endurance: "0500 Hrs",
  exerciseStartTime: "0905 UTC",
};

const paper5AtisInfo: AtisInfo = {
  designator: "B",
  timeOfObservation: "0900 UTC",
  runwayInUse: "09",
  wind: "340°/03 Knots",
  visibility: "3000 Metres",
  clouds: "SCT 1500 FT, BKN 2500 FT",
  temperature: "12°C",
  dewpoint: "08°C",
  qnh: "1016 hPa",
  remarks: "No significant weather",
};

const paper5Frequencies = [
  { description: "RANCHI SMC", frequency: "121.90 MHz" },
  { description: "RANCHI TWR", frequency: "118.10 MHz" },
  { description: "RANCHI APPROACH", frequency: "119.30 MHz" },
  { description: "KOLKATA AREA CONTROL", frequency: "120.50 MHz" },
  { description: "RAIPUR APPROACH", frequency: "120.30 MHz" },
  { description: "RAIPUR TWR", frequency: "118.70 MHz" },
];

const paper5Scenarios: RtrScenario[] = [
  {
    id: 1,
    scenarioContext: "Transmit this phraseology.",
    flightInfo: paper5FlightInfo,
    atisInfo: paper5AtisInfo,
    frequencies: paper5Frequencies,
    squawk: "7700",
    questions: [
      "A) How would you report the cloud conditions FEW 200 SCT 150?",
      "B) How would you report the visibility 100m?",
      "C) How would you cancel your previous call?",
      "D) How would you ask for a repetition to stress the message?",
    ],
  },
  {
    id: 2,
    scenarioContext: "SEJ 541 parked on Stand No 5. Carry out the following RT communication.",
    flightInfo: paper5FlightInfo,
    atisInfo: paper5AtisInfo,
    frequencies: paper5Frequencies,
    squawk: "7700",
    questions: [
      "Request start up.",
      "Request pushback.",
      "Ready to taxi.",
      "Holding short of runway 09.",
      "Request takeoff clearance.",
    ],
  },
  {
    id: 3,
    scenarioContext: "You are airborne passing 3000 feet.",
    flightInfo: paper5FlightInfo,
    atisInfo: paper5AtisInfo,
    frequencies: paper5Frequencies,
    squawk: "7700",
    questions: [
      "Contact Departure and request climb to FL350.",
      "Relay transmission of other aircraft.",
    ],
  },
  {
    id: 4,
    scenarioContext: "You are at FL320.",
    flightInfo: paper5FlightInfo,
    atisInfo: paper5AtisInfo,
    frequencies: paper5Frequencies,
    squawk: "7700",
    questions: [
      "You experience moderate icing. Inform ATC and request level change.",
    ],
  },
  {
    id: 5,
    scenarioContext: "You are in flight en route to Raipur.",
    flightInfo: paper5FlightInfo,
    atisInfo: paper5AtisInfo,
    frequencies: paper5Frequencies,
    squawk: "7700",
    questions: [
      "Medical emergency onboard. Request priority landing.",
      "Request direct routing to destination.",
    ],
  },
  {
    id: 6,
    scenarioContext: "You are on approach to Raipur.",
    flightInfo: paper5FlightInfo,
    atisInfo: paper5AtisInfo,
    frequencies: paper5Frequencies,
    squawk: "7700",
    questions: [
      "Established on ILS runway 27, request landing clearance.",
      "After landing, vacate runway and report taxi instructions required.",
    ],
  },
];

const paper6FlightInfo = {
  aircraftId: "AI-912",
  aircraftType: "B787-D",
  rtCallSign: "Air India-912",
  registration: "VT-PPO",
  departure: "VEBS-BHUBANESWAR",
  destination: "VANP-NAGPUR",
  atsRoute: "W113W OPASA N895 SADEV RUXAL",
  standNo: "5",
  runwayInUse: "32",
  taxiway: "C, D",
  flightLevel: "350",
  alternateAirdrome: "VARP-Raipur",
  pob: "180",
  endurance: "0500 Hrs",
  exerciseStartTime: "0905 UTC",
};

const paper6AtisInfo: AtisInfo = {
  designator: "B",
  timeOfObservation: "0900 UTC",
  runwayInUse: "32",
  wind: "340°/03 Knots",
  visibility: "3000 Metres",
  clouds: "SCT 1500 FT, BKN 2500 FT",
  temperature: "12°C",
  dewpoint: "08°C",
  qnh: "1016 hPa",
  remarks: "No significant weather",
};

const paper6Frequencies = [
  { description: "BHUBANESWAR SMC", frequency: "121.90 MHz" },
  { description: "BHUBANESWAR TWR", frequency: "118.10 MHz" },
  { description: "BHUBANESWAR APPROACH", frequency: "119.30 MHz" },
  { description: "KOLKATA AREA CONTROL", frequency: "120.50 MHz" },
  { description: "NAGPUR APPROACH", frequency: "120.30 MHz" },
  { description: "NAGPUR TWR", frequency: "118.70 MHz" },
];

const paper6Scenarios: RtrScenario[] = [
  {
    id: 1,
    scenarioContext: "Transmit this phraseology.",
    flightInfo: paper6FlightInfo,
    atisInfo: paper6AtisInfo,
    frequencies: paper6Frequencies,
    squawk: "7700",
    questions: [
      "A) 080 degrees — Transmit in RT phraseology.",
      "B) TSRA — Transmit in RT phraseology.",
      "C) FU — Transmit in RT phraseology.",
      "D) 1010 QNH — Transmit in RT phraseology.",
      "E) \"Continue in accordance with the conditions specified\" — Transmit in its literal sense.",
    ],
  },
  {
    id: 2,
    scenarioContext: "SpiceJet 541 parked on Stand No 5. Carry out the following RT communication.",
    flightInfo: paper6FlightInfo,
    atisInfo: paper6AtisInfo,
    frequencies: paper6Frequencies,
    squawk: "7700",
    questions: [
      "Request start up.",
      "Request pushback.",
      "Ready to taxi.",
      "You are holding short of runway 32, when wind direction changed. Take action.",
      "Request takeoff clearance.",
    ],
  },
  {
    id: 3,
    scenarioContext: "You are airborne passing 2600 feet.",
    flightInfo: paper6FlightInfo,
    atisInfo: paper6AtisInfo,
    frequencies: paper6Frequencies,
    squawk: "7700",
    questions: [
      "Request further climb.",
      "B) Relay transmission of other aircraft.",
    ],
  },
  {
    id: 4,
    scenarioContext: "You are passing FL340.",
    flightInfo: paper6FlightInfo,
    atisInfo: paper6AtisInfo,
    frequencies: paper6Frequencies,
    squawk: "7700",
    questions: [
      "You get a Resolution Advisory (RA). Take action.",
    ],
  },
  {
    id: 5,
    scenarioContext: "You are in cruise phase.",
    flightInfo: paper6FlightInfo,
    atisInfo: paper6AtisInfo,
    frequencies: paper6Frequencies,
    squawk: "7700",
    questions: [
      "You experience severe turbulence. Take action.",
    ],
  },
  {
    id: 6,
    scenarioContext: "You are cleared for ILS approach runway 29 at Nagpur.",
    flightInfo: paper6FlightInfo,
    atisInfo: paper6AtisInfo,
    frequencies: paper6Frequencies,
    squawk: "7700",
    questions: [
      "Established on ILS runway 29, request landing clearance.",
      "After landing, you have vacated the runway and you are at taxiway Z3. No fuel left. Request assistance.",
    ],
  },
];

export const rtrPart2Papers: RtrPart2Paper[] = [
  { id: "rtr2-paper-1", title: "Radio Telephony Paper 1", scenarios: paper1Scenarios },
  { id: "rtr2-paper-2", title: "Radio Telephony Paper 2", scenarios: paper2Scenarios },
  { id: "rtr2-paper-3", title: "Radio Telephony Paper 3", scenarios: paper3Scenarios },
  { id: "rtr2-paper-4", title: "Radio Telephony Paper 4", scenarios: paper4Scenarios },
  { id: "rtr2-paper-5", title: "Radio Telephony Paper 5", scenarios: paper5Scenarios },
  { id: "rtr2-paper-6", title: "Radio Telephony Paper 6", scenarios: paper6Scenarios },
];
