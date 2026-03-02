export interface RtrScenario {
  id: number;
  flightInfo: {
    aircraftId: string;
    aircraftType: string;
    departure: string;
    route: string;
    destination: string;
    otherInfo: string;
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
      aircraftId: "VT-AZA",
      aircraftType: "ATR",
      departure: "VABB (Mumbai)",
      route: "WION BPL A791 FL180 IFR",
      destination: "VEJS (Jaisalmer)",
      otherInfo: "Chartered flight",
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
      departure: "VIDP (Delhi)",
      route: "DCT JDH W15 FL240 IFR",
      destination: "VOGO (Goa)",
      otherInfo: "Scheduled commercial flight",
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
      departure: "VOBL (Bengaluru)",
      route: "G450 HYD R460 FL350 IFR",
      destination: "VEPY (Bagdogra)",
      otherInfo: "Medical emergency on board",
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
      departure: "VIJP (Jaipur)",
      route: "VFR via Ajmer, Udaipur FL065",
      destination: "VAUD (Ahmedabad)",
      otherInfo: "Training flight, student pilot",
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
      departure: "VOCI (Kochi)",
      route: "A474 BOM W45 FL390 IFR",
      destination: "OMDB (Dubai)",
      otherInfo: "International flight, overwater",
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
      departure: "VANP (Nagpur)",
      route: "R460 HYD A201 FL200 IFR",
      destination: "VOHS (Hyderabad)",
      otherInfo: "Thunderstorm activity en route",
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
