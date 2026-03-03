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
      destination: "VECC-KOLKATTA",
      atsRoute: "V10 ALI G452 LKN GGY R460 TEPAL CEA",
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
      { description: "KOLKATA AREA CONTROL", frequency: "120.50 MHz" },
      { description: "KOLKATA TWR", frequency: "118.25 MHz" },
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
      destination: "VECC-KOLKATTA",
      atsRoute: "V10 ALI G452 LKN GGY R460 TEPAL CEA",
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
      { description: "KOLKATA AREA CONTROL", frequency: "120.50 MHz" },
      { description: "KOLKATA TWR", frequency: "118.25 MHz" },
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
      destination: "VECC-KOLKATTA",
      atsRoute: "V10 ALI G452 LKN GGY R460 TEPAL CEA",
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
      { description: "KOLKATA AREA CONTROL", frequency: "120.50 MHz" },
      { description: "KOLKATA TWR", frequency: "118.25 MHz" },
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
      destination: "VECC-KOLKATTA",
      atsRoute: "V10 ALI G452 LKN GGY R460 TEPAL CEA",
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
      { description: "KOLKATA AREA CONTROL", frequency: "120.50 MHz" },
      { description: "KOLKATA TWR", frequency: "118.25 MHz" },
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
      destination: "VECC-KOLKATTA",
      atsRoute: "V10 ALI G452 LKN GGY R460 TEPAL CEA",
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
      { description: "KOLKATA AREA CONTROL", frequency: "120.50 MHz" },
      { description: "KOLKATA TWR", frequency: "118.25 MHz" },
    ],
    squawk: "7700",
    questions: [
      "You are passing FL170 for F250 as per app instructions over ALI-ALIGARAH flying 10 NM right of track due. Establish contact with Delhi Area Control, report deviation due weather to ATC and request FL 360.",
      "Over Lucknow Weather normal 1205, FL 360, Estimate BBN 1235, GGC 1255. Transmit your position report.",
    ],
  },
  {
    id: 6,
    scenarioContext: "You have been changed over from Delhi Area Control to Kolkata Area Control",
    flightInfo: {
      aircraftId: "AIC-887",
      aircraftType: "B777-300ER",
      rtCallSign: "Air India-887",
      registration: "VT-AED",
      departure: "VIDP-DELHI",
      destination: "VECC-KOLKATTA",
      atsRoute: "V10 ALI G452 LKN GGY R460 TEPAL CEA",
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
      { description: "KOLKATA AREA CONTROL", frequency: "120.50 MHz" },
      { description: "KOLKATA TWR", frequency: "118.25 MHz" },
    ],
    squawk: "7700",
    questions: [
      "At GAYA 1255, DHANBAD 1310 ETA CEA 1330 maintaining FL 360. Give Position report to Kolkata Area Control Centre and Request for Descend clearance.",
      "While descending OVER DHNABAD you experience pressurization failure take action to descend FL 100. Declare emergency to Kolkata Area Control Centre as per RT procedure.",
      "At Flight Level 100 cabin pressurization stated working normal, Inform ATC regarding cancelling of emergency and your intention.",
    ],
  },
];

const sampleScenarios: RtrScenario[] = paper1Scenarios.map(s => ({
  ...s,
  scenarioContext: "",
}));

export const rtrPart2Papers: RtrPart2Paper[] = [
  { id: "rtr2-paper-1", title: "Radio Telephony Paper 1", scenarios: paper1Scenarios },
  { id: "rtr2-paper-2", title: "Radio Telephony Paper 2", scenarios: sampleScenarios },
  { id: "rtr2-paper-3", title: "Radio Telephony Paper 3", scenarios: sampleScenarios },
  { id: "rtr2-paper-4", title: "Radio Telephony Paper 4", scenarios: sampleScenarios },
  { id: "rtr2-paper-5", title: "Radio Telephony Paper 5", scenarios: sampleScenarios },
];
