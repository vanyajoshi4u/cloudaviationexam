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

const navPaper2Questions: MCQuestion[] = [
  {
    id: 101,
    question: "You have a flight plan IFR from Amsterdam to London with a deviation from ATS route. The airway clearance reads: clearance to London via flight planned route. Which statement is correct?",
    options: [
      "The route according to the flight plan is accepted",
      "The filed deviation is not acceptable",
      "You will get a separate clearance for the deviation",
      "It is not allowed to file such a flight plan",
    ],
    correct: 0,
  },
  {
    id: 102,
    question: "During an IFR flight, TAS and time appear to deviate from the data in the flight plan. The minimum deviations that should be reported to ATC are:",
    options: [
      "TAS 5 kts and time 5 minutes",
      "TAS 3% and time 3 minutes",
      "TAS 5% and time 3 minutes",
      "TAS 10 kts and time 2 minutes",
    ],
    correct: 2,
  },
  {
    id: 103,
    question: "On an ATC flight plan, to indicate that you will overfly waypoint ROMEO at 120 kts on FL 085, you will write:",
    options: [
      "ROMEO/K0120 FL085",
      "ROMEO/N0120 F085",
      "ROMEO/FL085 N0120",
      "ROMEO/F085 N0120",
    ],
    correct: 1,
  },
  {
    id: 104,
    question: "In the appropriate box of a flight plan form, corresponding time of departure, the time indicated is that at which the aircraft intends to:",
    options: ["Start up", "Take off", "Go off blocks", "Pass the departure beacon"],
    correct: 2,
  },
  {
    id: 105,
    question: "If it takes 132.4 mins to travel 840 NM, what is your speed in km/h?",
    options: ["290 km/h", "966 km/h", "705 km/h", "120 km/h"],
    correct: 2,
  },
  {
    id: 106,
    question: "On a Lambert conformal conic chart, the quoted scale is correct:",
    options: [
      "Along the parallel of origin",
      "Along the prime meridian",
      "Along the two standard parallels",
      "In the area between the standard parallels",
    ],
    correct: 2,
  },
  {
    id: 107,
    question: "On which of the following chart projections is it not possible to represent the North or South poles?",
    options: [
      "Direct Mercator",
      "Lambert's conformal",
      "Polar stereographic",
      "Transverse Mercator",
    ],
    correct: 0,
  },
  {
    id: 108,
    question: "What is the approximate date of perihelion, when the Earth is nearest to the Sun?",
    options: [
      "End of March",
      "Beginning of January",
      "Beginning of July",
      "End of December",
    ],
    correct: 1,
  },
  {
    id: 109,
    question: "The tank capacity of an aircraft is 310 US GAL. Fuel specific gravity is 0.78 kg/litre. The tanks are now 3/4 full. You want to refuel so that total fuel will be 850 kg. How much fuel will you have to refuel (in pounds)?",
    options: ["410 lbs", "320 lbs", "360 lbs", "164 lbs"],
    correct: 2,
  },
  {
    id: 110,
    question: "Under colour code rules for EFIS, a selected heading is coloured:",
    options: ["Green", "White", "Yellow", "Magenta"],
    correct: 3,
  },
  {
    id: 111,
    question: "What is the maximum possible value of dip angle?",
    options: ["180 degrees", "45 degrees", "90 degrees", "66 degrees"],
    correct: 2,
  },
  {
    id: 112,
    question: "Which take-off speed is affected by the presence or absence of stopway and/or clearway?",
    options: ["VMCA", "VMCG", "V1", "V2"],
    correct: 2,
  },
  {
    id: 113,
    question: "The clearway is defined as:",
    options: [
      "An area beyond runway, not less than 500 ft wide, centrally located about the extended centerline of the runway",
      "An area at the end of the stopway which can only be used in TODA calculation",
      "An area which must not exceed TODA by more than 15%",
      "A rectangular area 90 ft either side of the centerline at the end of the runway",
    ],
    correct: 0,
  },
  {
    id: 114,
    question: "In which month is the difference between apparent noon and mean noon the greatest?",
    options: [
      "November and February",
      "January and July",
      "June and December",
      "March and September",
    ],
    correct: 0,
  },
  {
    id: 115,
    question: "The prime factor in determining the maximum unambiguous range of primary radar is the:",
    options: [
      "Size of the parabolic receiver aerial",
      "Height of the transmitter above the ground",
      "Pulse recurrence rate",
      "Power output",
    ],
    correct: 2,
  },
  {
    id: 116,
    question: "In a primary radar, the maximum range requires:",
    options: [
      "Short PRI and high PRF",
      "High pulse effect and long PRI",
      "High pulse effect and short PRI",
      "Long PRI and high PRF",
    ],
    correct: 1,
  },
  {
    id: 117,
    question: "Secondary Surveillance Radar is a form of ______ radar with ______ type emission operating in the ______ band:",
    options: [
      "Secondary, FM, SHF",
      "Primary, pulse, SHF",
      "Primary, pulse, UHF",
      "Secondary, pulse, UHF",
    ],
    correct: 3,
  },
  {
    id: 118,
    question: "Secondary radars require:",
    options: [
      "A target which will always be ground based",
      "A quiescent target",
      "A target which will respond to interrogation – either an aircraft or ground-based transponder",
      "A target which will always be an aircraft",
    ],
    correct: 2,
  },
  {
    id: 119,
    question: "What are the frequencies used for interrogation and response for SSR?",
    options: [
      "1090 MHz interrogation from aircraft, 1030 MHz response from ground",
      "1090 MHz interrogation from ground, 1030 MHz response from aircraft",
      "1030 MHz interrogation from ground, 1090 MHz response from aircraft",
      "1030 MHz interrogation from aircraft, 1090 MHz response from ground",
    ],
    correct: 2,
  },
  {
    id: 120,
    question: "Which of the following are errors of a DGI? 1) Earth rate 2) Transport wander 3) Banking when pitched up 4) Annual movement of poles 5) Mechanical problems",
    options: ["1, 2, 3, 5", "2, 3, 5", "All 5", "3, 4, 5"],
    correct: 0,
  },
  {
    id: 121,
    question: "The term gyro drift applies to movement of the gyro axis in the:",
    options: [
      "Horizontal plane",
      "Vertical plane",
      "Both vertical and horizontal plane",
    ],
    correct: 0,
  },
  {
    id: 122,
    question: "Convergency on a Transverse Mercator chart is correct at:",
    options: [
      "The parallel of origin",
      "The equator and the poles",
      "The datum meridian and the equator",
      "The datum meridian only",
    ],
    correct: 2,
  },
  {
    id: 123,
    question: "Given: FL250 GS 300 kts F/F 607 lbs/hr; FL270 GS 270 kts F/F 560 lbs/hr; FL290 GS 250 kts F/F 514 lbs/hr. The most economical flight level is:",
    options: ["FL 250", "FL 270", "FL 280"],
    correct: 1,
  },
  {
    id: 124,
    question: "Radio bearings are:",
    options: ["Great Circle", "Rhumb Line", "Straight lines"],
    correct: 0,
  },
  {
    id: 125,
    question: "In an INS, ground speed is calculated:",
    options: [
      "From TAS and W/V from RNAV data",
      "By integrating gyro precession in N/S and E/W directions",
      "By integrating measured acceleration",
      "From TAS and W/V from ADC",
    ],
    correct: 2,
  },
  {
    id: 126,
    question: "If pitot tube is blocked then VSI will:",
    options: ["Under-read", "Over-read", "Read normal"],
    correct: 2,
  },
  {
    id: 127,
    question: "The speed V2 is defined for jet aeroplanes as:",
    options: [
      "Take-off climb speed or speed at 35 ft",
      "Lift-off speed",
      "Take-off decision speed",
      "Critical engine failure speed",
    ],
    correct: 0,
  },
  {
    id: 128,
    question: "The rotation speed (VR):",
    options: [
      "Must not be less than 1.05 VMCA",
      "Must not be more than 1.05 VMCA",
      "Is the airspeed at which the aeroplane lifts off the ground",
      "Is always equal to V1 for aeroplanes with 2 engines",
    ],
    correct: 0,
  },
  {
    id: 129,
    question: "DOM: 33510 kg, Load: 7600 kg, Final reserve fuel: 983 kg, Alternate fuel: 1100 kg, Contingency fuel: 102 kg. The estimated landing mass at alternate should be:",
    options: ["42312 kg", "42093 kg", "42210 kg", "42195 kg"],
    correct: 3,
  },
];

const navPaper3Questions: MCQuestion[] = [
  {
    id: 201,
    question: "When accelerating on an easterly heading in the Northern hemisphere, the compass card of a direct reading magnetic compass will turn:",
    options: [
      "Anti-clockwise giving an apparent turn toward the south",
      "Clockwise giving an apparent turn toward the north",
      "Clockwise giving an apparent turn toward the south",
      "Anti-clockwise giving an apparent turn toward the north",
    ],
    correct: 1,
  },
  {
    id: 202,
    question: "At what approximate date is the earth furthest from the sun (aphelion)?",
    options: [
      "Beginning of July",
      "End of December",
      "Beginning of January",
      "End of September",
    ],
    correct: 0,
  },
  {
    id: 203,
    question: "004°00'N, 030°00'W: 600 NM South, then 600 NM East, then 600 NM North, then 600 NM West. The final position of the aircraft is:",
    options: [
      "04°00'N 029°58'W",
      "04°00'N 030°02'W",
      "04°00'N 030°00'W",
      "03°58'N 030°02'W",
    ],
    correct: 2,
  },
  {
    id: 204,
    question: "Parallels of latitude, except the equator, are:",
    options: [
      "Both Rhumb Lines and Great Circles",
      "Great Circles",
      "Rhumb Lines",
      "Neither Rhumb Lines nor Great Circles",
    ],
    correct: 2,
  },
  {
    id: 205,
    question: "Given: Great circle from P to Q measured at P = 095° (Southern hemisphere). Conversion angle P–Q = 7°. What is the rhumb line track P–Q?",
    options: ["081°", "102°", "088°", "109°"],
    correct: 2,
  },
  {
    id: 206,
    question: "At what approximate latitude is the length of one minute of arc along a meridian equal to one NM (1852 m)?",
    options: ["45°", "0°", "90°", "30°"],
    correct: 0,
  },
  {
    id: 207,
    question: "The distance between the parallels of latitude 17°23'S and 23°59'N is:",
    options: ["4122 NM", "636 NM", "2473 NM", "2482 NM"],
    correct: 3,
  },
  {
    id: 208,
    question: "What is the longitude of a position 6 NM to the east of 58°42'N 094°00'W?",
    options: ["093°53.1'W", "093°54.0'W", "093°48.5'W", "094°12.0'W"],
    correct: 0,
  },
  {
    id: 209,
    question: "Given DOM 33510 kg, Traffic load 7600 kg, Trip fuel 2040 kg, Final reserve 983 kg, Alternative fuel 1100 kg, Contingency 5% of trip fuel. Estimated landing mass at destination is:",
    options: ["43295 kg", "43110 kg", "42925 kg"],
    correct: 0,
  },
  {
    id: 210,
    question: "What is the time required to travel along the parallel of latitude 60°N between meridians 015°E and 025°W at a groundspeed of 480 kt?",
    options: ["1 hr 45 min", "1 hr 15 min", "2 hr 30 min", "5 hr 00 min"],
    correct: 0,
  },
  {
    id: 211,
    question: "Given: value for the Ellipticity of the Earth is 1/297. Earth's semi-major axis, as measured at the equator, equals 6378.4 km. What is the semi-minor axis (km) of the earth at the axis of the Poles?",
    options: ["6356.9", "6378.4", "6367.0", "6399.9"],
    correct: 0,
  },
  {
    id: 212,
    question: "The circumference of the earth is approximately:",
    options: ["21600 NM", "43200 NM", "5400 NM", "10800 NM"],
    correct: 0,
  },
  {
    id: 213,
    question: "The coordinates of a place are N17°50' E002°16.5'. The coordinates of the antipodes are:",
    options: [
      "S41°10' W177°43.5'",
      "S48°50' E177°43.5'",
      "S17°50' W177°43.5'",
      "S41°10' E177°43.5'",
    ],
    correct: 2,
  },
  {
    id: 214,
    question: "The time it takes for the Earth to complete one orbit around the Sun is:",
    options: [
      "360 days 45 hours 5 minutes 48 seconds",
      "360 days 5 hours 45 minutes 48 seconds",
      "365 days 45 hours 48 minutes 5 seconds",
      "365 days 5 hours 48 minutes 45 seconds",
    ],
    correct: 3,
  },
  {
    id: 215,
    question: "In international aviation, the following units shall be used for horizontal distance:",
    options: [
      "Meters, Statute miles and Nautical miles",
      "Kilometers, Feet and Nautical miles",
      "Meters, Kilometers and Nautical miles",
      "Kilometers, Statute miles and Nautical miles",
    ],
    correct: 2,
  },
  {
    id: 216,
    question: "When dealing with heights and altitudes in international aviation, we use the following units:",
    options: [
      "Meter and Foot",
      "Foot, Kilometer and decimals of Nautical mile",
      "Foot and Yard",
      "All 3 answers are correct",
    ],
    correct: 0,
  },
  {
    id: 217,
    question: "The sensitivity of a direct reading compass varies:",
    options: [
      "Inversely with the vertical component of the earth's magnetic field",
      "Directly with the vertical component of the earth's magnetic field",
      "Inversely with both vertical and horizontal components",
      "Directly with the horizontal component of the earth's magnetic field",
    ],
    correct: 3,
  },
  {
    id: 218,
    question: "The total Magnetic Force of the terrestrial magnetic field:",
    options: [
      "Is horizontal in all positions on the surface of the Earth",
      "Is vertical at the magnetic equator",
      "Is strongest at the magnetic poles",
      "Will be stronger at higher altitudes because the attenuation is less",
    ],
    correct: 2,
  },
  {
    id: 219,
    question: "T/O weight 65000 lbs, landing weight 49750 lbs, climb fuel 4500 lbs, descent fuel 1950 lbs. Find the mid-cruise weight:",
    options: ["24500 kgs", "56100 kgs", "56500 lbs", "56100 lbs"],
    correct: 3,
  },
  {
    id: 220,
    question: "Using the following data, determine the maximum allowable takeoff fuel: MTOM 64400 kg, MLM 56200 kg, MZFM 53300 kg, DOM 35500 kg, Traffic load 14500 kg, Trip fuel 4900 kg, Minimum takeoff fuel 7400 kg:",
    options: ["11100 lbs", "10900 kgs", "11100 kgs"],
    correct: 2,
  },
  {
    id: 221,
    question: "An aircraft has a flight time of 2 hrs 30 mins. A contingency fuel of 30% is carried. What is the total endurance?",
    options: ["03:15", "02:45", "03:45"],
    correct: 0,
  },
  {
    id: 222,
    question: "During a flight at night, a position has to be reported to ATC. The aeroplane is at a distance of 750 NM from the ground station and at FL 350. The frequency to be used is:",
    options: ["17286 KHz", "123.9 MHz", "5649 KHz", "1136 KHz"],
    correct: 2,
  },
  {
    id: 223,
    question: "You are required to uplift 40 US gallons of AVGAS with Sp. Gravity of 0.72. How many kilograms is this?",
    options: ["109 kg", "450 kg", "100 kg"],
    correct: 0,
  },
  {
    id: 224,
    question: "Coefficient B, as used in aircraft magnetism, represents:",
    options: [
      "The resultant deviation from magnetism along the aircraft lateral axis",
      "A value representing the deviation registered on headings East and West",
      "Hard iron magnetism along the longitudinal axis",
      "Soft iron magnetism along the lateral axis",
    ],
    correct: 0,
  },
];

export const dgcaPreviousNavPaper1: Topic = {
  id: "dgca-prev-nav-paper-1",
  title: "Navigation Paper 1",
  questions: navPaper1Questions,
};

export const dgcaPreviousNavPaper2: Topic = {
  id: "dgca-prev-nav-paper-2",
  title: "Navigation Paper 2",
  questions: navPaper2Questions,
};

export const dgcaPreviousNavPaper3: Topic = {
  id: "dgca-prev-nav-paper-3",
  title: "Navigation Paper 3",
  questions: navPaper3Questions,
};

export const dgcaPreviousNavTopics: Topic[] = [dgcaPreviousNavPaper1, dgcaPreviousNavPaper2, dgcaPreviousNavPaper3];
