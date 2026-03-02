export interface RtrScenario {
  id: number;
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

const sampleScenarios: RtrScenario[] = [
  {
    id: 1,
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
    frequencies: [
      { description: "ATIS", frequency: "123.450 MHz" },
      { description: "DELHI TOWER", frequency: "118.100 MHz" },
      { description: "DELHI GROUND", frequency: "121.900 MHz" },
      { description: "DEP (VABB) ATC", frequency: "119.300 MHz" },
      { description: "APP/CTR", frequency: "125.800 MHz" },
      { description: "DEST (VEJS) ATC", frequency: "124.500 MHz" },
    ],
    squawk: "7700",
    questions: [
      "O/H IBUDA. Req descent to land.",
      "Report your position and altitude to ATC.",
      "Request radar vectors for ILS approach RWY 27.",
    ],
  },
  {
    id: 2,
    flightInfo: {
      aircraftId: "VT-KLM",
      aircraftType: "B737",
      rtCallSign: "Indigo-KLM",
      registration: "VT-KLM",
      departure: "VIDP (Delhi)",
      destination: "VOGO (Goa)",
      atsRoute: "DCT JDH W15 FL240 IFR",
      standNo: "5",
      runwayInUse: "28",
      taxiway: "A, B",
      flightLevel: "240",
      alternateAirdrome: "VABB-Mumbai",
      pob: "180",
      endurance: "0430 Hrs",
      exerciseStartTime: "0800 UTC",
    },
    frequencies: [
      { description: "ATIS", frequency: "126.400 MHz" },
      { description: "DEL GROUND", frequency: "121.900 MHz" },
      { description: "DEL TOWER", frequency: "118.100 MHz" },
      { description: "DEL DEPARTURE", frequency: "126.100 MHz" },
      { description: "MUMBAI CTR", frequency: "125.200 MHz" },
      { description: "GOA APP", frequency: "120.300 MHz" },
    ],
    squawk: "4521",
    questions: [
      "Request startup clearance and ATIS information.",
      "Report ready for pushback and engine start.",
      "Request taxi clearance to holding point RWY 28.",
    ],
  },
  {
    id: 3,
    flightInfo: {
      aircraftId: "VT-SPA",
      aircraftType: "A320",
      rtCallSign: "SpiceJet-SPA",
      registration: "VT-SPA",
      departure: "VOBL (Bengaluru)",
      destination: "VEPY (Bagdogra)",
      atsRoute: "G450 HYD R460 FL350 IFR",
      standNo: "22",
      runwayInUse: "09",
      taxiway: "E, F",
      flightLevel: "350",
      alternateAirdrome: "VECC-Kolkata",
      pob: "174",
      endurance: "0530 Hrs",
      exerciseStartTime: "0630 UTC",
    },
    frequencies: [
      { description: "ATIS", frequency: "127.850 MHz" },
      { description: "BLR TOWER", frequency: "118.500 MHz" },
      { description: "BLR GROUND", frequency: "121.750 MHz" },
      { description: "BLR DEPARTURE", frequency: "124.000 MHz" },
      { description: "HYD CTR", frequency: "119.800 MHz" },
      { description: "CCU APPROACH", frequency: "121.300 MHz" },
    ],
    squawk: "7700",
    questions: [
      "Declare medical emergency and request priority landing at nearest suitable aerodrome.",
      "Report fuel endurance and number of persons on board.",
      "Request ambulance and medical assistance on arrival.",
    ],
  },
  {
    id: 4,
    flightInfo: {
      aircraftId: "VT-RJN",
      aircraftType: "C172",
      rtCallSign: "VT-RJN",
      registration: "VT-RJN",
      departure: "VIJP (Jaipur)",
      destination: "VAUD (Ahmedabad)",
      atsRoute: "VFR via Ajmer, Udaipur FL065",
      standNo: "GA-3",
      runwayInUse: "27",
      taxiway: "A",
      flightLevel: "065",
      alternateAirdrome: "VAUD-Ahmedabad",
      pob: "2",
      endurance: "0400 Hrs",
      exerciseStartTime: "0500 UTC",
    },
    frequencies: [
      { description: "ATIS", frequency: "124.200 MHz" },
      { description: "JPR TOWER", frequency: "118.300 MHz" },
      { description: "JPR GROUND", frequency: "121.600 MHz" },
      { description: "MUMBAI FIR", frequency: "125.500 MHz" },
      { description: "AMD APP", frequency: "119.700 MHz" },
      { description: "AMD TOWER", frequency: "118.800 MHz" },
    ],
    squawk: "3456",
    questions: [
      "Request VFR departure clearance to the south.",
      "Report overhead Ajmer at 6,500 ft.",
      "Request joining instructions for Ahmedabad.",
    ],
  },
  {
    id: 5,
    flightInfo: {
      aircraftId: "VT-EXP",
      aircraftType: "B777",
      rtCallSign: "Air India-EXP",
      registration: "VT-EXP",
      departure: "VOCI (Kochi)",
      destination: "OMDB (Dubai)",
      atsRoute: "A474 BOM W45 FL390 IFR",
      standNo: "8",
      runwayInUse: "27",
      taxiway: "B, C",
      flightLevel: "390",
      alternateAirdrome: "OMSJ-Sharjah",
      pob: "310",
      endurance: "0700 Hrs",
      exerciseStartTime: "0300 UTC",
    },
    frequencies: [
      { description: "ATIS", frequency: "126.750 MHz" },
      { description: "COK TOWER", frequency: "118.900 MHz" },
      { description: "COK GROUND", frequency: "121.800 MHz" },
      { description: "MUMBAI OCEANIC", frequency: "126.900 MHz" },
      { description: "BOMBAY CTR", frequency: "125.200 MHz" },
      { description: "DUBAI APP", frequency: "124.900 MHz" },
    ],
    squawk: "2301",
    questions: [
      "Request oceanic clearance for crossing into Mumbai FIR.",
      "Report entering oceanic airspace with position and estimate.",
      "Request descent and approach instructions from Dubai.",
    ],
  },
  {
    id: 6,
    flightInfo: {
      aircraftId: "VT-NGP",
      aircraftType: "Q400",
      rtCallSign: "IndiGo-NGP",
      registration: "VT-NGP",
      departure: "VANP (Nagpur)",
      destination: "VOHS (Hyderabad)",
      atsRoute: "R460 HYD A201 FL200 IFR",
      standNo: "14",
      runwayInUse: "14",
      taxiway: "D",
      flightLevel: "200",
      alternateAirdrome: "VOBL-Bengaluru",
      pob: "78",
      endurance: "0330 Hrs",
      exerciseStartTime: "0930 UTC",
    },
    frequencies: [
      { description: "ATIS", frequency: "125.100 MHz" },
      { description: "NAG TOWER", frequency: "118.700 MHz" },
      { description: "NAG GROUND", frequency: "121.500 MHz" },
      { description: "NAGPUR CTR", frequency: "124.300 MHz" },
      { description: "HYD APPROACH", frequency: "119.100 MHz" },
      { description: "HYD TOWER", frequency: "118.100 MHz" },
    ],
    squawk: "5501",
    questions: [
      "Request weather deviation 20 NM left of track due to CB.",
      "Report clear of weather and request direct to destination.",
      "Request RNAV approach RWY 09L at Hyderabad.",
    ],
  },
];

export const rtrPart2Papers: RtrPart2Paper[] = [
  { id: "rtr2-paper-1", title: "Radio Telephony Paper 1", scenarios: sampleScenarios },
  { id: "rtr2-paper-2", title: "Radio Telephony Paper 2", scenarios: sampleScenarios },
  { id: "rtr2-paper-3", title: "Radio Telephony Paper 3", scenarios: sampleScenarios },
  { id: "rtr2-paper-4", title: "Radio Telephony Paper 4", scenarios: sampleScenarios },
  { id: "rtr2-paper-5", title: "Radio Telephony Paper 5", scenarios: sampleScenarios },
];
