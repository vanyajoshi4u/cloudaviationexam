import { MCQuestion, Topic } from "./icJoshiQuestions";

// Ch 16 – Scale (converted from open-ended to MCQ)
const ch16Questions: MCQuestion[] = [
  { id: 1, question: "What is the Representative Fraction if one centimetre represents five kilometres?", options: ["1:50,000", "1:500,000", "1:5,000,000", "1:250,000"], correct: 1 },
  { id: 2, question: "What is the Representative Fraction if one centimetre represents 5.4 nautical miles?", options: ["1:500,000", "1:1,000,000", "1:540,000", "1:5,400,000"], correct: 1 },
  { id: 3, question: "The Representative Fraction of a chart is 1:500,000. How many centimetres would represent 30 kilometres on the ground?", options: ["3 cm", "6 cm", "12 cm", "15 cm"], correct: 1 },
  { id: 4, question: "On a chart 5 cm represents 7 nautical miles. What is the scale as a Representative Fraction?", options: ["1:130,000", "1:260,000", "1:520,000", "1:700,000"], correct: 1 },
  { id: 5, question: "On a chart 14.8 cm represents 20 nautical miles. What is the chart scale as a Representative Fraction?", options: ["1:200,000", "1:250,000", "1:300,000", "1:350,000"], correct: 1 },
  { id: 6, question: "On a chart, one centimetre represents 3.5 kilometres. What is the scale as a Representative Fraction?", options: ["1:250,000", "1:300,000", "1:350,000", "1:400,000"], correct: 2 },
];

// Ch 18 – Mercator Charts - Properties
const ch18Questions: MCQuestion[] = [
  { id: 1, question: "A normal Mercator chart is a projection that is:", options: ["(i) Cylindrical, (ii) Perspective and (iii) Non-Perspective", "(ii) Perspective, (iv) Conformal and (v) Conical", "(i) Cylindrical, (iii) Non-Perspective and (iv) Conformal", "(iii) Non-Perspective, (iv) Conformal and (vi) Azimuthal"], correct: 2 },
  { id: 2, question: "A direct Mercator graticule is:", options: ["Rectangular", "Square", "Circular", "Convergent"], correct: 0 },
  { id: 3, question: "On a normal Mercator chart, rhumb lines are represented as:", options: ["Curves concave to the Equator", "Curves convex to the Equator", "Complex curves", "Straight lines"], correct: 3 },
  { id: 4, question: "On a direct Mercator, Great Circles can be represented as:", options: ["Straight lines", "Curves", "Straight lines and curves"], correct: 2 },
  { id: 5, question: "On a direct Mercator, with the exception of the meridians and the Equator, Great Circles are represented as:", options: ["Curves concave to the Nearer Pole", "Curves convex to the Equator", "Curves concave to the Equator", "Straight lines"], correct: 2 },
  { id: 6, question: "The angle between a straight line on a Mercator chart and the corresponding great circle is:", options: ["Zero", "Earth convergency", "Conversion Angle", "Chart Convergence"], correct: 2 },
  { id: 7, question: "If the rhumb line track from Turin (45N 008E) to Khartoum (15N 032E) is 145°(T), what is the direction of the great circle track measured at Turin?", options: ["133°(T)", "139°(T)", "145°(T)", "151°(T)"], correct: 1 },
  { id: 8, question: "In the previous question, what is the direction of the great circle track from Khartoum to Turin?", options: ["319°(T)", "325°(T)", "331°(T)", "337°(T)"], correct: 2 },
  { id: 9, question: "On a Mercator chart, the rhumb line track from Durban (30S 032E) to Perth (30S 116E) is 090°(T). What is the great circle track from Perth to Durban?", options: ["291°(T)", "312°(T)", "228°(T)", "249°(T)"], correct: 3 },
  { id: 10, question: "At 60S on a Mercator chart, chart convergence is:", options: ["Greater than Earth convergency", "Correct", "Less than Earth convergency", "Equal to ch.long × 0.866"], correct: 2 },
];

// Ch 19 – Mercator Charts - Scale (converted from open-ended + 1 MCQ)
const ch19Questions: MCQuestion[] = [
  { id: 1, question: "On a Mercator chart, the scale at the Equator is 1:3,500,000. What is the approximate scale at 37S?", options: ["1:2,000,000", "1:2,800,000", "1:3,500,000", "1:4,400,000"], correct: 1 },
  { id: 2, question: "On a Mercator chart, the scale at 50°N is 1:4,500,000. What is the approximate scale at the Equator?", options: ["1:4,500,000", "1:5,500,000", "1:6,000,000", "1:7,000,000"], correct: 3 },
  { id: 3, question: "On a Mercator chart, the scale at 15°N is 1:1,500,000. What is the approximate scale at 47°S?", options: ["1:1,060,000", "1:1,500,000", "1:2,000,000", "1:2,200,000"], correct: 0 },
  { id: 4, question: "On a Mercator chart the spacing of meridians 1° apart is 5.42 cm. What is the scale of the chart as a representative fraction in latitude 56N?", options: ["1:1,000,000", "1:1,147,000", "1:1,500,000", "1:2,000,000"], correct: 1 },
  { id: 5, question: "A Mercator chart has a scale of 1:3,000,000 at 60N. In what latitude is the scale 1:6,000,000?", options: ["At the Equator", "At 30°N/S", "At 45°N/S", "At 60°N/S"], correct: 0 },
  { id: 6, question: "On a particular Direct Mercator wall chart, the 180°W to 180°E parallel of latitude at 53°N is 133 cm long. What is the scale of the chart at 30°S?", options: ["1:3,000,000", "1:18,000,000", "1:21,000,000", "1:27,000,000"], correct: 3 },
];

// Ch 20 – Mercator Charts - Plotting
const ch20Questions: MCQuestion[] = [
  { id: 1, question: "An aircraft receives a QTE from airfield 'A' of 063°T. Airfield A is in the Northern Hemisphere. The convergency between the aircraft and the airfield is 6°. What bearing should be plotted on a Mercator chart from the airfield?", options: ["060°(T)", "063°(T)", "066°(T)", "069°(T)"], correct: 2 },
  { id: 2, question: "An aircraft receives a QTE from airfield 'B' of 315°(T). Airfield B is in the Southern Hemisphere. The convergency between the aircraft and the airfield is 2°. What bearing should be plotted on a Mercator chart from the airfield?", options: ["314°", "315°", "316°", "317°"], correct: 2 },
  { id: 3, question: "An aircraft flying in the Northern Hemisphere has an RMI reading of 050° to VOR beacon 'C'. Variation at the aircraft is 5°E. Variation at the VOR beacon is 8°E. If the convergency between the aircraft meridian and the VOR meridian is 4°, what bearing should be plotted on a Mercator chart from the beacon to the aircraft?", options: ["234°", "236°", "233°", "238°"], correct: 1 },
  { id: 4, question: "An aircraft flying in the Southern Hemisphere has an RMI reading of 130° to VOR beacon 'D'. Variation at the aircraft is 5°W. Variation at the VOR beacon is 2°W. If the convergency between the aircraft meridian and the VOR meridian is 2°, what bearing should be plotted on a Mercator chart from the beacon to the aircraft?", options: ["310°", "307°", "308°", "309°"], correct: 3 },
  { id: 5, question: "An aircraft and an NDB are in the Northern Hemisphere. The aircraft's heading is 236°M. Variation is 13°W at the aircraft and 11°W at the NDB. The relative bearing (RBI) of the NDB is 226(R). Convergency between the aircraft's meridian and the meridian of the NDB is 4°. What bearing should be plotted from the NDB on a Mercator chart?", options: ["271°(T)", "269°(T)", "273°(T)", "275°(T)"], correct: 0 },
  { id: 6, question: "Repeat the above question but with the aircraft and the NDB being in the Southern Hemisphere. What bearing should be plotted from the NDB on a Mercator chart?", options: ["269°(T)", "267°(T)", "271°(T)", "265°(T)"], correct: 1 },
  { id: 7, question: "The great circle bearing of a radio facility at 175°W from an aircraft at 175°E is 068°(T). Given that the convergency between the meridians is 6°, what bearing should be plotted from the radio facility on a Mercator chart? (Northern Hemisphere)", options: ["248°", "245°", "254°", "251°"], correct: 3 },
  { id: 8, question: "Repeat the above question for an aircraft and radio facility in the Southern Hemisphere.", options: ["248°T", "245°T", "254°T", "251°T"], correct: 1 },
];

// Ch 22 – Lambert's Conformal Chart - 2
const ch22Questions: MCQuestion[] = [
  { id: 1, question: "A Lamberts Conical conformal chart has standard parallels at 63°N and 41°N. What is the constant of the cone?", options: [".891", ".788", ".656", ".707"], correct: 1 },
  { id: 2, question: "Scale on a Lambert's conformal conic chart:", options: ["Is constant", "Is constant along a meridian of longitude", "Varies slightly as a function of latitude and longitude", "Is constant along a parallel of latitude"], correct: 3 },
  { id: 3, question: "On a conformal chart, the standard parallels are 41°20'N and 11°40'N. What is the constant of the cone?", options: [".660", ".202", ".446", ".895"], correct: 2 },
  { id: 4, question: "Scale on a Lambert conformal chart is:", options: ["Constant along a line of latitude", "Constant along a line of longitude", "Constant everywhere", "Correct at the parallel of origin"], correct: 0 },
  { id: 5, question: "On a Lambert chart, the constant of the cone is .78585. What is the parallel of tangency?", options: ["51°02'", "51°36'", "51°15'", "51°48'"], correct: 3 },
  { id: 6, question: "On a Lambert's chart the constant of the cone is 0.80. A is at 53N 04W. You plan to fly to B. The initial Lambert's chart straight-line track is 070°(T) and the Rhumb Line track from A to B is 082°(T). What is the longitude of B?", options: ["26E", "34W", "11E", "15E"], correct: 0 },
];

// Ch 23 – Mid Course Test (Ch 22A in textbook)
const ch23Questions: MCQuestion[] = [
  { id: 1, question: "What is the shortest distance in kilometres between San Francisco (38N 123W) and Dubai (25N 057E)?", options: ["7020", "8073", "13001", "11250"], correct: 2 },
  { id: 2, question: "A Great Circle has a Northern Vertex of 50N 100W. The Southern Vertex is?", options: ["40S 100W", "40S 080E", "50S 100W", "50S 080E"], correct: 3 },
  { id: 3, question: "An ICAO nautical mile is defined as?", options: ["6080 feet", "1852 metres", "1863 feet", "6062 feet"], correct: 1 },
  { id: 4, question: "How much is the polar diameter of the Earth different from the equatorial diameter?", options: ["Less by 40 km", "Greater by 27 statute miles", "Less by 27 statute miles", "Greater by 27 nautical miles"], correct: 2 },
  { id: 5, question: "The maximum difference between geodetic and geocentric latitude occurs at about?", options: ["45° North and South", "90° North and South", "60° North and South", "0° (Equator)"], correct: 0 },
  { id: 6, question: "Required course 045°(T), W/V = 190°(T)/30, FL=55@ISA, Variation = 15°E. CAS = 120 knots. What is magnetic heading and G/S?", options: ["052°(M) 154", "067°(M) 154", "037°(M) 154", "037°(M) 113"], correct: 2 },
  { id: 7, question: "What is the shortest distance in kilometres between Cairo (30°17'N 030°10'E) and Durban (29°48'S 030°10'E)?", options: ["3605", "4146", "4209", "6676"], correct: 3 },
  { id: 8, question: "An aircraft at latitude 02°20'N tracks 180°(T) for 685 km. What is its latitude at the end of the flight?", options: ["02°50'S", "02°10'S", "04°20'S", "08°55'S"], correct: 0 },
  { id: 9, question: "An aircraft is at latitude 10N and is flying South at 444 km/hour. After 3 hours the latitude is?", options: ["10S", "02N", "02S", "0N/S"], correct: 2 },
  { id: 10, question: "The circumference of the Earth is approximately?", options: ["43200 nm", "10800 nm", "21600 nm", "5400 nm"], correct: 2 },
  { id: 11, question: "SAT = +35°C. Pressure altitude (corrected for barometric error) = 5000 feet. What is true altitude?", options: ["4550 feet", "5550 feet", "4920 feet", "5320 feet"], correct: 1 },
  { id: 12, question: "Given that the value of ellipticity of the Earth is 1/297 and that the semi-major axis measured at the axis of the Equator is 6378.4 km, what is the semi-major axis measured at the axis of the Poles?", options: ["6399.9 km", "6356.9 km", "6378.4 km", "6367.0 km"], correct: 1 },
  { id: 13, question: "You plan to fly a track of 348°(T), Drift is 17° port, Variation = 32°W. Deviation is 4°E. What compass heading should you fly?", options: ["041°", "033°", "016°", "359°"], correct: 1 },
  { id: 14, question: "At a specific location, the value of magnetic variation:", options: ["Depends on the value of magnetic heading", "Depends on the value of true heading", "Varies slowly over time", "Depends on the type of compass installed"], correct: 2 },
  { id: 15, question: "At the magnetic equator:", options: ["Dip is zero", "Variation is zero", "Deviation is zero", "The isogonal is an agonic line"], correct: 0 },
  { id: 16, question: "The value of magnetic variation on a chart changes with time. This is due to:", options: ["Movement of the magnetic poles, causing an increase", "Increase in the magnetic field, causing an increase", "Reduction in the magnetic field, causing a decrease", "Movement of the magnetic poles, which can cause either an increase or a decrease"], correct: 3 },
  { id: 17, question: "The direct reading magnetic compass is made aperiodic (dead beat) by:", options: ["Using long magnets", "Keeping the magnetic assembly mass close to the pivot point and using damping wires", "Pendulous suspension of the magnetic assembly", "Using the lowest acceptable viscosity compass liquid"], correct: 1 },
  { id: 18, question: "Given: True Track = 352°(T), Variation = 11°W, Deviation = -5°, Drift = 10°R. What is Heading (C)?", options: ["078°(C)", "346°(C)", "358°(C)", "025°(C)"], correct: 2 },
  { id: 19, question: "Pressure Altitude is 27,000 feet, OAT = -35°C, Mach No = 0.45, W/V = 270/85, Track = 200°(T). What is drift and groundspeed?", options: ["18L / 252 knots", "15R / 310 knots", "17L / 228 knots", "17R / 287 knots"], correct: 2 },
  { id: 20, question: "You plan to take off from Khamis Mushayt, Saudi Arabia, elevation 6500 ft. The ambient temperature is +25°C. What is your Density Altitude?", options: ["3500 ft", "6500 ft", "9500 ft", "12500 ft"], correct: 2 },
  { id: 21, question: "You are flying at 400 kts TAS, Indicated temperature -50°C. What is your COAT?", options: ["-67°C", "-50°C", "-33°C", "-17°C"], correct: 0 },
  { id: 22, question: "You are flying at FL330 at Mach No 0.9M. Ambient temperature is ISA +15°. What is your TAS?", options: ["595 knots", "540 knots", "505 knots", "600 knots"], correct: 2 },
  { id: 23, question: "You plan to land on R/W 14. The met forecast wind velocity is 110/30. Variation is 30°W. What crosswind do you expect?", options: ["15 kts", "0 kts", "26 kts", "30 kts"], correct: 1 },
  { id: 24, question: "Given: IAS 120 knots, FL 80, OAT +20°C. What is the TAS?", options: ["132 kt", "141 kt", "102 kt", "120 kt"], correct: 1 },
  { id: 25, question: "Given: TAS 200 kt, Track 110°(T), W/V 015/40. Calculate heading (°T) and groundspeed.", options: ["097° – 201 kt", "099° – 200 kt", "121° – 207 kt", "121° – 199 kt"], correct: 1 },
  { id: 26, question: "Given: True Hdg 145°, TAS 240 kt, True Track 150°, G/S 210 kt. Calculate the W/V.", options: ["360/35", "295/35", "180/35", "115/35"], correct: 3 },
  { id: 27, question: "Given: TAS 140 kt, Heading 005°(T), W/V 265/25. Calculate the drift and groundspeed.", options: ["11R – 140 kt", "10R – 146 kt", "9R – 140 kt", "11R – 142 kt"], correct: 1 },
  { id: 28, question: "An aircraft is maintaining a 5.2% gradient on a flat terrain. Its height at 7 nm from the runway is approximately?", options: ["3640 feet", "1890 feet", "2210 feet", "680 feet"], correct: 2 },
  { id: 29, question: "G/S = 240 knots, Distance to go = 500 nm. What is time to go?", options: ["20 minutes", "29 minutes", "2h 05m", "2h 12m"], correct: 2 },
  { id: 30, question: "Course 040°(T), TAS 120 kn, Wind speed = 30 knots. From which direction will the wind give the greatest drift?", options: ["215°(T)", "230°(T)", "235°(T)", "240°(T)"], correct: 3 },
  { id: 31, question: "X---30nm---V---20nm---Z. ATA X is 1420. ETA Y is 1447. ATA Y is 1450. What is new ETA Z?", options: ["1506", "1512", "1510", "1515"], correct: 2 },
  { id: 32, question: "Heading is 156°(T), TAS is 320 knots, W/V 130/45. What is your true track?", options: ["160°", "152°", "104°", "222°"], correct: 0 },
  { id: 33, question: "You are flying at a True Mach No of .72 in a SAT of -45°C. At 1000 hours you are 100 nm from the CPT DME and your ETA at CPT is 1012. ATC ask you to slow down to be at CPT at 1016. What should your new TMN be?", options: [".67", ".63", ".54", ".51"], correct: 3 },
  { id: 34, question: "Track = 090°(T), TAS = 460 knots, W/V = 360°(T)/100, Variation = 10°E, Deviation = -2. What is compass heading and groundspeed?", options: ["079° – 470 kt", "069° – 450 kt", "068° – 460 kt", "070° – 455 kt"], correct: 1 },
  { id: 35, question: "You leave A to fly to B, 475 nm away, at 1000 hours. Your ETA at B is 1130. At 1040, you are 190 nm from A. What groundspeed is required to arrive on time at B?", options: ["317 knots", "330 knots", "342 knots", "360 knots"], correct: 2 },
  { id: 36, question: "The wind velocity is 359/25. An aircraft is heading 180°(T) at a TAS of 198 knots. What is its track and groundspeed?", options: ["180° – 223 kt", "179° – 220 kt", "180° – 220 kt", "179° – 223 kt"], correct: 0 },
  { id: 37, question: "An aircraft is climbing at a constant CAS in ISA conditions. What will be the effect on TAS and Mach No?", options: ["TAS increases and Mach No decreases", "Both increase", "Both decrease", "TAS decreases and Mach No increases"], correct: 1 },
  { id: 38, question: "Convert 70 metres/sec into knots.", options: ["136 knots", "36 knots", "146 knots", "54 knots"], correct: 0 },
  { id: 39, question: "Airfield elevation is 1000 feet. The QNH is 988. Use 27 feet per hectopascal. What is pressure altitude?", options: ["675 feet", "325 feet", "1675 feet", "825 feet"], correct: 2 },
  { id: 40, question: "You are flying from A to B, planned track 245°(M), distance 225 nm. Your groundspeed is 180 knots. After 15 minutes flying, you fix your position as 3 nm left of planned track. Which statement is correct?", options: ["Your drift is 2P", "Your drift is 4P", "You should turn 5° right to go direct to B", "You should turn 8° right to go direct to B"], correct: 2 },
  { id: 41, question: "A pilot receives VOR DME signals: Radial = 180° ±1°, distance = 200 nm. What is the approximate maximum error?", options: ["±2 nm", "±3.5 nm", "±7 nm", "±1 nm"], correct: 1 },
  { id: 42, question: "You are flying a VFR route and have become uncertain of your position. Which is the best course of action?", options: ["Set heading towards a line feature – coastline, river or motorway", "Turn round and fly your flight plan tracks in reverse until you see something recognised", "Fly a series of ever-expanding circles", "Turn round and fly your flight plan in reverse back to base"], correct: 0 },
  { id: 43, question: "By what amount must you change your rate of descent given a 10 knot increase in headwind on a 3° glideslope?", options: ["50 feet per minute increase", "30 feet per minute increase", "50 feet per minute decrease", "30 feet per minute decrease"], correct: 2 },
  { id: 44, question: "You are on an ILS 3-degree glideslope which passes over the runway threshold at 50 feet. Your DME range is 25 nm from the threshold. What is your height above the runway threshold elevation?", options: ["8010 feet", "7450 feet", "6450 feet", "7550 feet"], correct: 3 },
  { id: 45, question: "An INS-equipped aircraft flies from 56N 020W (Waypoint 3) to 56N 030W (Waypoint 4). The initial INS desired track at Waypoint 3 is:", options: ["086°(T)", "082°(T)", "274°(T)", "278°(T)"], correct: 2 },
  { id: 46, question: "An aircraft starts at position 0410S 17822W and tracks true north for 2950 nm, then turns 90 degrees left, and maintains a rhumb line track for 314 kilometres. What is the final position?", options: ["5500N 17422W", "4500N 17422W", "5500N 17738E", "4500N 17738E"], correct: 3 },
  { id: 47, question: "On a chart, 49 nautical miles is represented by 7.0 centimetres. What is the scale?", options: ["1/700,000", "1/2,015,396", "1/1,296,400", "1/1,156,600"], correct: 2 },
  { id: 48, question: "On a particular Direct Mercator wall chart, the 180°W to 180°E parallel of latitude at 53°N is 133 cm long. What is the scale of the chart at 30°S?", options: ["1/3,000,000", "1/18,000,000", "1/21,000,000", "1/26,000,000"], correct: 3 },
  { id: 49, question: "Which of the following differences in latitude will give the biggest difference in the initial Great Circle track and the mean Great Circle track between 2 points separated by 10° change of longitude?", options: ["60N and 60S", "60N and 55N", "30S and 30N", "30S and 25S"], correct: 1 },
  { id: 50, question: "On a chart, meridians at 43N are shown every 10 degrees apart. This is shown on the chart by a distance of 14 cm. What is the scale?", options: ["1/2,000,000", "1/4,000,000", "1/5,000,000", "1/6,000,000"], correct: 3 },
  { id: 51, question: "A non-perspective chart:", options: ["Is produced directly from a light projection of a Reduced Earth", "Cannot be used for navigation", "Is produced by mathematically adjusting a light projection of the Reduced Earth", "Is used for a Polar Stereographic projection"], correct: 2 },
  { id: 52, question: "On a Mercator chart, a Rhumb Line appears as a:", options: ["Small circle concave to the nearer pole", "Curve convex to the nearer pole", "Complex curve", "Straight line"], correct: 3 },
  { id: 53, question: "Mercator charts use:", options: ["Cylindrical projection", "Conical projection", "Plane/azimuthal projection", "Complex projection"], correct: 0 },
  { id: 54, question: "How does scale change on a normal Mercator chart?", options: ["Expands as the secant² (1/co-latitude)", "Expands directly with the secant of the latitude", "Correct on the standard parallels, expands outside them, contracts within them", "Expands as the secant of the E/W great circle distance"], correct: 1 },
];

// Ch 25 – Transverse and Oblique Mercator Charts (Ch 24 in textbook)
const ch25Questions: MCQuestion[] = [
  { id: 1, question: "Convergence on a Transverse Mercator chart is correct at:", options: ["The datum meridian only", "The datum meridian and the Equator", "The Equator and the Poles", "The Parallel of Origin"], correct: 2 },
  { id: 2, question: "Where is scale correct on a Transverse Mercator chart?", options: ["Along the Great Circle of Tangency", "At the Poles and the Equator", "Along the Datum Meridian and at meridians at 90° to it", "At the Greenwich meridian"], correct: 0 },
  { id: 3, question: "What is the main use of a Transverse Mercator chart?", options: ["Flying a specified Great Circle route", "Flying an equatorial route", "Mapping countries with a large N/S extent but a lesser E/W extent", "Mapping countries with a large E/W extent but a lesser N/S extent"], correct: 2 },
  { id: 4, question: "What is the main use of an Oblique Mercator chart?", options: ["Flying a specified Great Circle route", "Flying an equatorial route", "Mapping countries with a large N/S extent but a lesser E/W extent", "Mapping countries with a large E/W extent but a lesser N/S extent"], correct: 0 },
];

// Ch 26 – Time (1) (Ch 25 in textbook)
const ch26Questions: MCQuestion[] = [
  { id: 1, question: "When does perihelion occur?", options: ["Early January", "Mid March", "Early July", "September 21"], correct: 0 },
  { id: 2, question: "When does aphelion occur?", options: ["Early January", "Mid March", "Early July", "September 21"], correct: 2 },
  { id: 3, question: "Viewed from the North Celestial Pole (above the North Pole), the Earth orbits the Sun:", options: ["Clockwise in a circular orbit", "Anti-clockwise in a circular orbit", "Clockwise in an elliptical orbit", "Anti-clockwise in an elliptical orbit"], correct: 3 },
  { id: 4, question: "When do 'equinoxes' occur?", options: ["December and June", "February and November", "March and September", "January and July"], correct: 2 },
  { id: 5, question: "When it is the Winter Solstice in the Southern Hemisphere, the Declination of the Sun is:", options: ["0°N/S", "23½°N", "66½°N", "23½°S"], correct: 1 },
  { id: 6, question: "In the situation given in the previous question, the sun will be overhead:", options: ["The Arctic Circle", "The Tropic of Capricorn", "The Equator", "The Tropic of Cancer"], correct: 3 },
  { id: 7, question: "What is the angle between the Equinoctial and the Ecliptic?", options: ["66½°", "23½°", "Varies between 23½°N and 23½°S", "Varies between 66½°N and 66½°S"], correct: 1 },
  { id: 8, question: "The Declination of a celestial body (the Sun) measured on the Celestial Sphere is analogous to what on the Earth?", options: ["Latitude", "Longitude", "Altitude of the body measured from the sensible horizon", "Co-latitude"], correct: 0 },
  { id: 9, question: "'The length of daylight/night depends upon the declination of the Sun and the latitude of the observer'. When is the rate of change of the length of daylight greatest?", options: ["February/November", "January/July", "At the Equinoxes", "At the Solstices"], correct: 2 },
  { id: 10, question: "A sidereal day is:", options: ["Longer than an apparent solar day", "Longer than a real solar day", "Shorter than an apparent solar day", "Equal to a real solar day"], correct: 2 },
  { id: 11, question: "The maximum difference between mean noon (1200LMT) and real/apparent noon occurs in:", options: ["January/July", "March/September", "November/February", "December/June"], correct: 2 },
  { id: 12, question: "The maximum difference between Mean Time and Apparent Time is:", options: ["21 minutes", "16 minutes", "30 minutes", "There is no difference"], correct: 1 },
  { id: 13, question: "What is the length of a Sidereal Year?", options: ["365 days", "366 days", "365 days 6 hrs", "365 days 5 hrs 48.75 minutes"], correct: 2 },
  { id: 14, question: "'Some years are not designated as leap years'. Which of the following years will be a leap year?", options: ["2001", "2100", "2300", "2400"], correct: 3 },
  { id: 15, question: "The Hour Angle (Greenwich Hour Angle) of a celestial body is analogous/equivalent on the Earth to:", options: ["Latitude", "Longitude", "Co-latitude", "UTC"], correct: 1 },
  { id: 16, question: "A star has a Greenwich Hour Angle (GHA) of 220°. Which meridian is the star transiting (crossing)?", options: ["040W", "040E", "140W", "140E"], correct: 3 },
];

// Ch 27 – Time (2) (Ch 26 in textbook)
const ch27Questions: MCQuestion[] = [
  { id: 1, question: "Without using the Air Almanac, convert 153°30' of arc of longitude into time.", options: ["10 hrs 24 mins", "10 hrs 22 mins", "10 hrs 14 mins", "10 hrs 8 mins"], correct: 2 },
  { id: 2, question: "The definition of Local Mean Time (LMT) is:", options: ["Time based upon the average movement of the Earth around the Sun", "When the Mean Sun is transiting your meridian, it is 1200hrs LMT", "When the Mean Sun is transiting your anti-meridian, it is 0000hrs LMT", "All of the above"], correct: 3 },
  { id: 3, question: "Local Mean Time (LMT) always changes by a day when crossing:", options: ["The Greenwich Meridian", "180°E/W", "The International Date Line", "The Equator"], correct: 1 },
  { id: 4, question: "Zone Time (ZT) is used:", options: ["By aircraft on trans-oceanic routes", "As legal time in all countries", "By ships at sea", "In polar regions"], correct: 2 },
  { id: 5, question: "A ship at longitude 83E observes sunrise at a Zone Time of 0500 ZT on Zone Date 15th May. What is the UTC?", options: ["2300 UTC 14th May", "1100 UTC 15th May", "2328 UTC 14th May", "1032 UTC 15th May"], correct: 0 },
  { id: 6, question: "On Mid-summer Day in the Southern Hemisphere, the sun will be overhead:", options: ["66½°S", "23½°N", "23½°S", "The Equator"], correct: 2 },
  { id: 7, question: "On Mid-winter Day in the Northern Hemisphere, the sun will be overhead:", options: ["66½°S", "23½°N", "23½°S", "The Equator"], correct: 2 },
];

// Ch 28 – Time (3) (Ch 27 in textbook)
const ch28Questions: MCQuestion[] = [
  { id: 1, question: "On June 21, what is the lowest northerly latitude (listed in the Air Almanac) at which the sun will be above the horizon for 24 hrs (all day)?", options: ["64N", "66N", "68N", "70N"], correct: 1 },
  { id: 2, question: "On December 21, what is the lowest northerly latitude (listed in the Air Almanac) at which the sun never rises (or sets)?", options: ["64N", "66N", "68N", "70N"], correct: 2 },
  { id: 3, question: "Civil Twilight is:", options: ["The period between sunset and the end of ECT", "The period between the start of MCT and sunrise", "Related to the position of the centre of the sun being 6° below the sensible horizon", "All of the above"], correct: 3 },
  { id: 4, question: "Nautical Twilight occurs when the sun is between ______ and ______ below the Sensible Horizon?", options: ["0°/6°", "6°/12°", "12°/18°", "18°/24°"], correct: 1 },
  { id: 5, question: "Between 60N and 60S, the minimum duration of Civil Twilight is:", options: ["21 minutes", "16 minutes", "14 minutes", "30 minutes"], correct: 0 },
  { id: 6, question: "Sunrise/Sunset Twilight Tables in the Air Almanac are listed for a sea level situation. An aircraft flying at FL350 would experience:", options: ["Sunrise later, sunset earlier, twilight longer", "Sunrise earlier, sunset later, twilight not changed", "Sunrise later, sunset earlier, twilight not changed", "Sunrise earlier, sunset later, twilight shorter"], correct: 3 },
];

// Ch 30 – Gridded Charts (Ch 29 in textbook)
const ch30Questions: MCQuestion[] = [
  { id: 1, question: "A Northern Lambert's conformal conic chart with a convergency factor of 0.75 is overprinted with a false grid (grid datum is the prime meridian). The grid track at 130E is 335°. What is the true track?", options: ["072.5°", "105.0°", "205.0°", "237.5°"], correct: 0 },
  { id: 2, question: "A Northern Lambert's conformal conic chart is overprinted with a false grid. The constant of the cone is 0.80. At 60°W the grid track is 090° and the true track is 010°. At which longitude is the false grid aligned?", options: ["160W", "140W", "020E", "040E"], correct: 3 },
  { id: 3, question: "A Northern Lambert's chart is overprinted with a false grid aligned with 25W longitude. The constant of the cone is 0.80. If the true track at 120W is 090°, what is the grid track?", options: ["014°", "166°", "185°", "055°"], correct: 1 },
  { id: 4, question: "A North polar stereographic chart is overprinted with a false grid aligned with the prime meridian. At position 80N 135E the grid track is 235°. What is the true track?", options: ["010°", "100°", "190°", "280°"], correct: 0 },
  { id: 5, question: "A South polar stereographic chart is overprinted with a false grid aligned with the prime meridian. At position 87S 123W the true track of an aircraft is 179°. What is the grid track?", options: ["056°", "123°", "237°", "302°"], correct: 0 },
  { id: 6, question: "A South polar stereographic chart is overprinted with a false grid aligned with the anti-meridian of the prime meridian. At 78S 101E with a grid track of 180° the true track will be:", options: ["079°", "101°", "259°", "281°"], correct: 2 },
  { id: 7, question: "A North polar stereographic chart is overprinted with a false grid. At 77N 37W the grid track is 175° and the true track is 093°. At which longitude is the false grid aligned?", options: ["045W", "045E", "082E", "119W"], correct: 1 },
  { id: 8, question: "Using the data in the diagram (Heading 045°T, 135°G), the false grid is aligned at which meridian and hemisphere?", options: ["180° E/W, Northern", "180° E/W, Southern", "000° E/W, Northern", "000° E/W, Southern"], correct: 3 },
  { id: 9, question: "Using a grid based on 20W, what will the magnetic heading be of an aircraft at position 50N 50E, given variation is 8°W and n = 0.75? The grid heading of the aircraft is 224°.", options: ["162.0°", "179.5°", "284.5°", "302.5°"], correct: 2 },
  { id: 10, question: "An aircraft at position 40N 10E has a magnetic heading of 150° and a grid heading of 170°. Variation is 10°W and n = 0.8. Where will the datum meridian be?", options: ["27°30'W", "20°00'W", "40°00'E", "47°30'E"], correct: 3 },
  { id: 11, question: "A Lambert's conformal conic chart is overprinted with a false grid. The constant of the cone is 0.60. At 40S 70W the grid track is 197° and the true track is 239°. At which longitude is the false grid aligned?", options: ["112W", "028W", "000E/W", "030E"], correct: 2 },
  { id: 12, question: "A Southern Lambert's conformal conic chart is overprinted with a false grid aligned with the 180W meridian. The constant of the cone is 0.843. If the true track at 145°E is 333° what will the grid track be?", options: ["002.5°", "029.5°", "303.5°", "360°"], correct: 2 },
  { id: 13, question: "A North Polar Stereographic chart with grid aligned to Greenwich meridian. An aircraft flies from the geographic north pole 480 nm along 110°E, then follows a grid track of 154° for 300 nm. The aircraft's final position will be:", options: ["78°45'N 087°E", "80°00'N 080°E", "79°15'N 074°E", "70°15'N 080°E"], correct: 1 },
];

// Export topics with titles matching SubjectCards subChapters
export const oxfordGenNavCh16Topic: Topic = { id: "oxford-gn-ch16", title: "Ch 16 – Scale", questions: ch16Questions };
export const oxfordGenNavCh18Topic: Topic = { id: "oxford-gn-ch18", title: "Ch 18 – Mercator Charts - Properties", questions: ch18Questions };
export const oxfordGenNavCh19Topic: Topic = { id: "oxford-gn-ch19", title: "Ch 19 – Mercator Charts - Scale", questions: ch19Questions };
export const oxfordGenNavCh20Topic: Topic = { id: "oxford-gn-ch20", title: "Ch 20 – Mercator Charts - Plotting", questions: ch20Questions };
export const oxfordGenNavCh22Topic: Topic = { id: "oxford-gn-ch22", title: "Ch 22 – Lambert's Conformal Chart - 2", questions: ch22Questions };
export const oxfordGenNavCh23Topic: Topic = { id: "oxford-gn-ch23", title: "Ch 23 – Mid Course Test", questions: ch23Questions };
export const oxfordGenNavCh25Topic: Topic = { id: "oxford-gn-ch25", title: "Ch 25 – Transverse and Oblique Mercator Charts", questions: ch25Questions };
export const oxfordGenNavCh26Topic: Topic = { id: "oxford-gn-ch26", title: "Ch 26 – Time (1)", questions: ch26Questions };
export const oxfordGenNavCh27Topic: Topic = { id: "oxford-gn-ch27", title: "Ch 27 – Time (2)", questions: ch27Questions };
export const oxfordGenNavCh28Topic: Topic = { id: "oxford-gn-ch28", title: "Ch 28 – Time (3)", questions: ch28Questions };
// Ch 29 – Critical Point (CP) and Point of No Return (PNR)
const ch29Questions: MCQuestion[] = [
  { id: 1, question: "What is the Critical Point (CP)?", options: ["The farthest point aircraft can fly", "The point where fuel runs out", "The point where time to return equals time to continue", "The midpoint of a flight"], correct: 2 },
  { id: 2, question: "CP is also known as:", options: ["Radius of Action", "Equal Time Point", "Maximum Range Point", "Return Point"], correct: 1 },
  { id: 3, question: "In still air, the Critical Point is located:", options: ["At the departure airport", "At the destination airport", "Midway between departure and destination", "Beyond the destination"], correct: 2 },
  { id: 4, question: "The Critical Point is independent of:", options: ["Distance", "Ground speed", "Fuel endurance", "Wind"], correct: 2 },
  { id: 5, question: "With a headwind, the CP moves:", options: ["Toward the destination", "Toward the departure point", "Remains unchanged", "Randomly"], correct: 0 },
  { id: 6, question: "With a tailwind, the CP moves:", options: ["Toward the destination", "Toward the departure point", "Remains fixed", "Outside the route"], correct: 1 },
  { id: 7, question: "Increasing TAS while wind remains constant moves the CP:", options: ["Toward the midpoint (still air condition)", "Toward the destination", "Toward the departure point", "Beyond destination"], correct: 0 },
  { id: 8, question: "The Point of No Return (PNR) is defined as:", options: ["The point where aircraft cannot continue", "The point furthest from departure from which aircraft can safely return", "The midpoint of the flight", "The destination"], correct: 1 },
  { id: 9, question: "PNR is also called:", options: ["Critical Point", "Equal Time Point", "Point of Safe Return", "Radius of Action"], correct: 2 },
  { id: 10, question: "In PNR calculations, the distance to PNR equals:", options: ["Distance remaining to destination", "Distance flown × 2", "Distance out equals distance back", "Total route distance"], correct: 2 },
  { id: 11, question: "In still air conditions, the maximum PNR distance occurs:", options: ["With headwind", "With tailwind", "With crosswind", "In still air"], correct: 3 },
  { id: 12, question: "Increasing headwind component will:", options: ["Increase PNR distance", "Decrease PNR distance", "Not affect PNR", "Move PNR beyond destination"], correct: 1 },
  { id: 13, question: "Decreasing wind component will:", options: ["Reduce PNR distance", "Increase PNR distance", "Have no effect", "Stop the aircraft"], correct: 1 },
  { id: 14, question: "Radius of Action is defined as:", options: ["Maximum distance aircraft can fly without returning", "Distance aircraft can fly out, perform a task, and return safely", "Distance between two airports", "Half the flight distance"], correct: 1 },
  { id: 15, question: "For Radius of Action calculations, safe endurance becomes:", options: ["Fuel endurance × 2", "Safe endurance + patrol time", "Safe endurance – patrol time", "Safe endurance ÷ 2"], correct: 2 },
];

export const oxfordGenNavCh29Topic: Topic = { id: "oxford-gn-ch29", title: "Ch 29 – Critical Point (CP) and Point of No Return (PNR)", questions: ch29Questions };
export const oxfordGenNavCh30Topic: Topic = { id: "oxford-gn-ch30", title: "Ch 30 – Gridded Charts", questions: ch30Questions };

export const oxfordGenNavCh16to29Topics: Topic[] = [
  oxfordGenNavCh16Topic,
  oxfordGenNavCh18Topic,
  oxfordGenNavCh19Topic,
  oxfordGenNavCh20Topic,
  oxfordGenNavCh22Topic,
  oxfordGenNavCh23Topic,
  oxfordGenNavCh25Topic,
  oxfordGenNavCh26Topic,
  oxfordGenNavCh27Topic,
  oxfordGenNavCh28Topic,
  oxfordGenNavCh29Topic,
  oxfordGenNavCh30Topic,
];
