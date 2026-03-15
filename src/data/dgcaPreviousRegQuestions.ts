import { type Topic, type MCQuestion } from "./icJoshiQuestions";

const regPaper1Questions: MCQuestion[] = [
  {
    id: 1,
    question: "The definition of a 'reporting point' is 'specified geographical location…':",
    options: [
      "At which the position of the aircraft must be reported",
      "In relation to which the position of the aircraft must be reported",
      "At which the position of the aircraft can be reported",
      "In relation to which the position of the aircraft can be reported",
    ],
    correct: 1,
  },
  {
    id: 2,
    question: "The visibility required when flying at (or) below 3000 ft in a controlled airspace:",
    options: ["5 kms", "8 kms", "10 kms", "3 kms"],
    correct: 0,
  },
  {
    id: 3,
    question: "The lateral separation required if an A/C is holding at a level:",
    options: ["10 NMs", "10 mins", "5 mins", "20 NMs"],
    correct: 2,
  },
  {
    id: 4,
    question: "Threshold lights are:",
    options: ["Red", "Green", "Yellow", "Alternate Red & Green"],
    correct: 1,
  },
  {
    id: 5,
    question: "The 3rd section of an air report contains:",
    options: ["ETA", "Met Info", "ATS Info", "Position Info"],
    correct: 1,
  },
  {
    id: 6,
    question: "Crossing of an ATS route should be at angle of:",
    options: ["60°", "90°", "45°", "30°"],
    correct: 1,
  },
  {
    id: 7,
    question: "Information about facilities on an aerodrome is found in:",
    options: ["AICs", "NOTAMs", "AIRAC", "AIP"],
    correct: 3,
  },
  {
    id: 8,
    question: "Petroleum in bulk is petroleum in receptacle, which exceeds:",
    options: ["1000 lts", "900 lts", "1500 lts", "500 lts"],
    correct: 1,
  },
  {
    id: 9,
    question: "Control Zone is from:",
    options: [
      "Surface of earth to a specified upper limit",
      "5000 to unlimited",
      "At least 700",
      "None of the above",
    ],
    correct: 0,
  },
  {
    id: 10,
    question: "If an A/C has R/T failure then it will acknowledge signals from the ATC during day by:",
    options: [
      "Switching on/off Nav lights",
      "Rocking Wings",
      "Flickering Anti-collision lights",
      "Flying low",
    ],
    correct: 1,
  },
  {
    id: 11,
    question: "Anti-collision lights are required on aircraft above:",
    options: ["1500 kg", "15000 kg", "5700 kgs", "All aircraft"],
    correct: 2,
  },
  {
    id: 12,
    question: "The pilot has to inform the ATC if the ETA changes by:",
    options: ["5 mins", "3 mins", "10 mins", "2 mins"],
    correct: 1,
  },
  {
    id: 13,
    question: "Night flying hours can be logged between ______ mins after sunset to ______ mins before sunrise:",
    options: ["20 mins", "45 mins", "1 hrs", "15 mins"],
    correct: 0,
  },
  {
    id: 14,
    question: "Runway direction is measured from:",
    options: ["True North", "Compass North", "Magnetic North", "North Pole"],
    correct: 2,
  },
  {
    id: 15,
    question: "If the marshaller has either arm placed level with shoulder and moved laterally across throat, it indicates:",
    options: ["Stop", "Cut Engines", "Continue straight", "Turn Off"],
    correct: 1,
  },
  {
    id: 16,
    question: "If an IFR A/C is flying at 5000 outside controlled airspace then it will fly at:",
    options: ["Altitude", "RVSM levels", "Climb/cruise level", "Above minimum flight altitude"],
    correct: 3,
  },
  {
    id: 17,
    question: "Red pyrotechnical light to A/C in flight indicates:",
    options: [
      "Notwithstanding any previous instruction, do not land for the time being",
      "Proceed to alternate",
      "Keep circling",
      "Total refusal to land",
    ],
    correct: 0,
  },
  {
    id: 18,
    question: "The minimum separation above FL 290 is:",
    options: ["2000 ft", "3000 ft", "4000 ft", "5000 ft"],
    correct: 0,
  },
  {
    id: 19,
    question: "If a climbing A/C is crossing the level of another A/C, the separation required is:",
    options: ["15 NMs", "15 Mins", "20 NMs", "5 Mins"],
    correct: 1,
  },
  {
    id: 20,
    question: "Operator has to preserve the contents of the flight data recorder for a period of _____ hrs:",
    options: ["3 hrs", "24 hrs", "25 hrs", "12 hrs"],
    correct: 2,
  },
  {
    id: 21,
    question: "The alert phase starts when an A/C cleared to land fails to land within _______ of estimated time of landing:",
    options: ["3 mins", "2 mins", "5 mins", "10 mins"],
    correct: 2,
  },
  {
    id: 22,
    question: "No smoking shall be permitted within ______ meters of A/C or fueling equipment:",
    options: ["15 mtrs", "10 mtrs", "30 mtrs", "50 mtrs"],
    correct: 2,
  },
  {
    id: 23,
    question: "What is defined as 'A unit established to provide flight information and alerting service'?",
    options: [
      "Air Traffic Service Unit",
      "Aeronautical Service",
      "Area Control Service",
      "Flight Information Centre",
    ],
    correct: 3,
  },
  {
    id: 24,
    question: "In which class of airspace does ATC provide separation for IFR traffic from all other IFR traffic, but relies on VFR traffic to provide its own separation from all other traffic?",
    options: ["Class B", "Class C", "Class D", "Class E"],
    correct: 2,
  },
  {
    id: 25,
    question: "The aerodrome reference code is referred to in Annex 14 and other ICAO documents. What is the purpose of the code?",
    options: [
      "To describe the rescue and firefighting facilities at the aerodrome",
      "To describe the expected weather factor at the aerodrome",
      "To describe the type of aircraft the aerodrome is intended to serve",
      "To describe the length of the primary runway at the aerodrome",
    ],
    correct: 2,
  },
  {
    id: 26,
    question: "To which of the following must the pilot of a helicopter give way if it is on a converging course with him and there is a risk of collision?",
    options: [
      "A balloon only",
      "A glider or a balloon",
      "A glider, a balloon or an airship",
      "A glider, a balloon, an airship or an aeroplane towing a glider",
    ],
    correct: 3,
  },
  {
    id: 27,
    question: "What shape and colour is a landing direction indicator?",
    options: [
      "A white capital T, land along the stem towards the crosspiece",
      "An orange or red windsock, land towards the mast",
      "A white or orange capital T, land along the stem towards the crosspiece",
      "An orange wedge shape in 3 dimensions, land towards the point of the wedge",
    ],
    correct: 2,
  },
  {
    id: 28,
    question: "How would you recognise an aiming point marking on a runway?",
    options: [
      "2 thick yellow lines close to and parallel to runway centreline",
      "2 thick white lines close to and parallel to runway centreline",
      "2 pairs of yellow lines close to and parallel to runway centreline",
      "2 pairs of white lines close to and parallel to runway centreline",
    ],
    correct: 1,
  },
  {
    id: 29,
    question: "On a normal aerodrome, what colour should apron safety lines be painted?",
    options: [
      "White",
      "Yellow",
      "Any colour which contrasts with surface",
      "Any colour which contrasts with the aircraft stand markings",
    ],
    correct: 3,
  },
  {
    id: 30,
    question: "What colour are (i) taxiway edge lights and (ii) runway edge lights?",
    options: [
      "i) yellow ii) white",
      "i) green ii) white",
      "i) blue ii) white",
      "i) green ii) yellow",
    ],
    correct: 2,
  },
  {
    id: 31,
    question: "What lights will a pilot see from the PAPI system if he is slightly low on the instrument approach glideslope?",
    options: [
      "3 white lights inboard of 1 red light",
      "3 red lights inboard of 1 white light",
      "1 white light inboard of 1 red light",
      "1 red light inboard of 3 white lights",
    ],
    correct: 1,
  },
  {
    id: 32,
    question: "How can a pilot determine from a distance that an aerodrome sign contains mandatory instructions?",
    options: [
      "The writing will be red on a white background",
      "The writing will be white on a red background",
      "The sign will be outlined in yellow and black stripes",
      "The sign will be yellow on a black background, or vice versa",
    ],
    correct: 1,
  },
  {
    id: 33,
    question: "How should a closed part of a runway be marked?",
    options: [
      "With yellow and black marker boards",
      "With red and white marker boards",
      "With a white cross on the surface",
      "With white chevrons on the surface",
    ],
    correct: 2,
  },
  {
    id: 34,
    question: "The pilot of an aircraft which has the right of way must do certain things to reduce the risk of collision. Apart from monitoring the other aircraft's actions, what else must he do?",
    options: [
      "Maintain heading, speed, and altitude",
      "Maintain heading and altitude only",
      "Maintain altitude and speed only",
      "Maintain heading and speed only",
    ],
    correct: 3,
  },
  {
    id: 35,
    question: "Which of the following occurrences to an aircraft in flight should be considered an aviation accident?",
    options: [
      "An engine disintegrates but causes no further damage",
      "A wingtip is broken in a collision",
      "One passenger is stabbed by another",
      "A passenger suffers second degree burns from a loose galley kettle",
    ],
    correct: 1,
  },
  {
    id: 36,
    question: "Which of the following occurrences to an aircraft in flight should be considered a serious incident?",
    options: [
      "An engine disintegration that prevents flap retraction",
      "A passenger is taken ill with an infectious disease",
      "The pilot takes avoiding action to prevent a near collision",
      "A crew member falls and breaks his leg",
    ],
    correct: 2,
  },
  {
    id: 37,
    question: "ICAO Annex 2 lists the Rules of the Air. Where do they apply?",
    options: [
      "Over the high seas only",
      "Everywhere unless they conflict with the laws of the state being over flown",
      "Over the territory of signatory nations only",
      "Everywhere",
    ],
    correct: 1,
  },
  {
    id: 38,
    question: "What is the minimum flight visibility for flight in VFR if an aircraft is flying at 5000 feet in Class G airspace at a speed of 120 knots and in sight of the surface?",
    options: ["8000 meters", "5000 meters", "1500 meters", "There is no minimum"],
    correct: 1,
  },
  {
    id: 39,
    question: "If pilot sees the symbol 'X' during SAR operations, how can he tell the survivor that he understands the message?",
    options: [
      "Fly low past the symbol and turn away sharply",
      "Rock wings",
      "Fly in circle around the symbol",
      "Fly low past and climb steeply",
    ],
    correct: 1,
  },
  {
    id: 40,
    question: "What is the minimum horizontal distance which an aeroplane must stay away from cloud in Class D airspace at 2000 feet in order to fly under VFR?",
    options: [
      "1500 meters",
      "1800 meters",
      "No minimum, provided the aircraft has a flight visibility of 5000 meters",
      "No minimum, provided the aircraft is in sight of the surface",
    ],
    correct: 0,
  },
  {
    id: 41,
    question: "What is correctly described as 'A situation wherein apprehension exists as to the safety of an aircraft and its occupants'?",
    options: [
      "The emergency phase",
      "The uncertainty phase",
      "The alert phase",
      "The distress phase",
    ],
    correct: 1,
  },
  {
    id: 42,
    question: "What Mode A transponder code means an aircraft is suffering unlawful interference?",
    options: ["7000", "7500", "7600", "7700"],
    correct: 1,
  },
  {
    id: 43,
    question: "If navigation lights fail, the duty of the pilot is:",
    options: [
      "To continue to destination",
      "Land at nearest aerodrome",
      "Switch on obstruction lights",
      "Land at alternate",
    ],
    correct: 1,
  },
  {
    id: 44,
    question: "UTC means:",
    options: [
      "Universal Time Check",
      "Coordinated Universal Time",
      "United Time Check",
      "None of the above",
    ],
    correct: 1,
  },
  {
    id: 45,
    question: "IFR flight shall not be commenced if the weather at destination and alternate is:",
    options: ["Above minima", "At minima", "Below minima", "IMC prevails"],
    correct: 2,
  },
  {
    id: 46,
    question: "Publicity material may be dropped from an A/C if it has the permission of:",
    options: ["DM/Commissioner", "DGCA", "Aerodrome Officer", "ICAO"],
    correct: 0,
  },
  {
    id: 47,
    question: "Anti-collision lights are ______ lights:",
    options: ["Steady Red", "Rotating Red/White", "Flashing Red", "Red & White"],
    correct: 2,
  },
];

const regPaper2Questions: MCQuestion[] = [
  {
    id: 101,
    question: "Threshold is the:",
    options: [
      "Beginning of that portion of runway suitable for landing",
      "Intersection with a taxi track where aircrafts hold before cleared to enter runway",
      "Beginning of the runway where aircrafts line up",
    ],
    correct: 0,
  },
  {
    id: 102,
    question: "During aircraft refueling, unauthorised persons are not allowed within a distance of:",
    options: ["25 m", "15 m", "30 m"],
    correct: 1,
  },
  {
    id: 103,
    question: "In Public transport aircraft, Flight Navigator is required if the flight is to be made for a great circle distance of ______ NM in absence of any radio aids:",
    options: [
      "More than 600 NM",
      "More than 1000 NM",
      "500 NM over featureless terrain",
    ],
    correct: 0,
  },
  {
    id: 104,
    question: "Non-scheduled aircraft away from its base can fly without a fresh certificate of release provided:",
    options: [
      "One week has not elapsed",
      "The aircraft has not been flown for over 15 hrs",
      "Three days have not elapsed",
    ],
    correct: 2,
  },
  {
    id: 105,
    question: "Routes with 'W' designator means:",
    options: ["Routes in Western sector", "Domestic Routes", "RNAV routes"],
    correct: 1,
  },
  {
    id: 106,
    question: "Aerodrome Met Minima is laid down by:",
    options: [
      "Airport Authority of India",
      "Operator and authorised by DGCA",
      "Govt. Met Officer for the particular Aerodrome",
    ],
    correct: 1,
  },
  {
    id: 107,
    question: "Aircraft should give position reports:",
    options: [
      "Every half hour when flying in controlled airspace",
      "Immediately after crossing a reporting point when flying en-route",
      "Only while crossing FIR",
    ],
    correct: 1,
  },
  {
    id: 108,
    question: "During fuelling operations, smoking shall not be permitted within:",
    options: ["15 m", "25 m", "30 m"],
    correct: 2,
  },
  {
    id: 109,
    question: "Series of green flashes to aircraft on ground from tower means:",
    options: [
      "Taxi clear of landing area",
      "Clear to taxi",
      "Clear for take-off",
    ],
    correct: 1,
  },
  {
    id: 110,
    question: "Incident should be notified to DGCA:",
    options: [
      "Immediately by any means of communication available",
      "2 hrs within the time the incident was confirmed",
      "48 hrs",
    ],
    correct: 2,
  },
  {
    id: 111,
    question: "Red flag hoisted over a control tower means:",
    options: [
      "Nothing to the pilot",
      "Air display in progress",
      "Only fixed wing flying in progress",
    ],
    correct: 1,
  },
  {
    id: 112,
    question: "If any person carries arms and explosives in the aircraft in contravention of the aircraft rules, he shall be punished with:",
    options: [
      "Rigorous imprisonment for 12 months",
      "Imprisonment for two years and liable for fine up to Rs. 1000",
      "Imprisonment for three months and fine up to Rs. 750",
    ],
    correct: 1,
  },
  {
    id: 113,
    question: "Track separation between aircraft using VOR should be at least:",
    options: [
      "30° beyond 10 NM from the VOR",
      "10° beyond 30 NM from the VOR",
      "15° at a distance of 15 NM from the VOR",
    ],
    correct: 2,
  },
  {
    id: 114,
    question: "The change in average TAS between reporting points from the TAS filed in the flight plan has to be reported to the ATC if it changes by more than:",
    options: ["10% or 5 kt", "3% or 5 kt", "5% or 10 kt"],
    correct: 2,
  },
  {
    id: 115,
    question: "Before joining an ATS route, the Pilot should obtain the required permission from the ATS unit:",
    options: [
      "10 min prior to joining the track",
      "30 min prior to joining the track",
      "At the time of joining",
    ],
    correct: 0,
  },
  {
    id: 116,
    question: "The objective of preventing collision between aircraft is accomplished by:",
    options: [
      "Alerting Services",
      "Flight Information Service",
      "Air Traffic Control Service",
    ],
    correct: 2,
  },
  {
    id: 117,
    question: "For operators who have not established their minima in respect of aerodromes where ATC is provided, the prescribed visibility minima for non-precision approach procedure is:",
    options: ["2 km", "1500 m", "5 km"],
    correct: 0,
  },
  {
    id: 118,
    question: "In case of displaced threshold, the runway edge lights between the beginning of the runway and displaced threshold shall:",
    options: [
      "Be fixed light showing variable white light",
      "Show red light in the direction of approach",
      "Show amber light in the direction of approach",
    ],
    correct: 1,
  },
  {
    id: 119,
    question: "Aircrafts are forbidden to operate within a distance of ______ from the international border:",
    options: ["10 NM", "15 NM", "15 km"],
    correct: 0,
  },
  {
    id: 120,
    question: "In India, airspace within ATS route segment and outside the ATS route segment and controlled airspace are classified as respectively:",
    options: ["D & G", "B & C", "A & C"],
    correct: 0,
  },
  {
    id: 121,
    question: "The area within radius of 10 NM from Mathura Oil Refinery is:",
    options: ["Prohibited Area", "Restricted Area", "Advisory Area"],
    correct: 0,
  },
  {
    id: 122,
    question: "The Certificate of Airworthiness of aircraft shall be deemed to be suspended when an aircraft:",
    options: [
      "Is involved in a serious violation of aircraft rules specified in the aircraft rules",
      "Is involved in accident/incident",
      "Is modified or repaired otherwise than in accordance with the provisions of Aircraft Rules",
    ],
    correct: 1,
  },
];

export const dgcaPreviousRegPaper1: Topic = {
  id: "dgca-prev-reg-paper-1",
  title: "Regulations Paper 1",
  questions: regPaper1Questions,
};

export const dgcaPreviousRegPaper2: Topic = {
  id: "dgca-prev-reg-paper-2",
  title: "Regulations Paper 2",
  questions: regPaper2Questions,
};

export const dgcaPreviousRegTopics: Topic[] = [dgcaPreviousRegPaper1, dgcaPreviousRegPaper2];
