import { MCQuestion, Topic } from "./icJoshiQuestions";

// Ch 1 – Direction, Latitude and Longitude
const ch1Questions: MCQuestion[] = [
  { id: 1, question: "What is the approximate compression of the Earth?", options: ["3%", "0.03%", "0.3%", "1/3000"], correct: 2 },
  { id: 2, question: "A Graticule is the name given to:", options: ["A series of lines drawn on a chart", "A series of Latitude and Longitude lines drawn on a chart or map", "A selection of small circles as you get nearer to either pole"], correct: 1 },
  { id: 3, question: "A great circle has its North vertex at 70N 130E. What is the position of its South vertex?", options: ["70S 130E", "70S 050W", "70S 050E", "20S 130E"], correct: 1 },
  { id: 4, question: "Given that the compression value of the Earth is 1/297 and that the semi-major axis of the Earth, measured at the axis of the Equator is 6378.4 km, what is the semi-major axis of the Earth measured at the axis of the Poles?", options: ["6399.9 km", "6356.9 km", "6378.4 km", "6367.0 km"], correct: 1 },
];

// Ch 2 – Great Circles, Rhumb Lines and Directions on the Earth
const ch2Questions: MCQuestion[] = [
  { id: 1, question: "Any Meridian Line is a:", options: ["Rhumb Line only", "Semi Great Circle only", "Rhumb Line and a semi Great Circle"], correct: 2 },
  { id: 2, question: "A Rhumb Line cuts all meridians at the same angle. This gives:", options: ["The shortest distance between two points", "A line which could never be a great circle track", "A line of constant direction"], correct: 2 },
  { id: 3, question: "What is the Change of Latitude from 52°15'N to 39°35'N?", options: ["12°40'N", "12°40'S", "91°50'N", "12°40' (decrease)"], correct: 1 },
  { id: 4, question: "What is the Change of Latitude from 49°35'N to 60°20'S?", options: ["10°45'S", "109°55'S", "89°55'S", "109°55'N"], correct: 1 },
  { id: 5, question: "What is the Change of Longitude from 075°40'W to 125°35'W?", options: ["49°55'E", "49°55'W", "201°15'W", "49°55'"], correct: 1 },
  { id: 6, question: "What is the shortest distance between 52°06'N 002°32'E and 53°36'N 002°32'E (same meridian)?", options: ["60 nm", "90 nm", "120 nm", "180 nm"], correct: 1 },
  { id: 7, question: "An aircraft is to fly from 72°00'N 002°30'E to 72°00'N 177°30'W on the shortest route. What is the initial True track direction?", options: ["090°(T)", "360°(T)", "270°(T)", "180°(T)"], correct: 1 },
  { id: 8, question: "You are at 54°20'N 002°30'W. Given ch.lat 16°20'N and ch.long 020°30'W, what is the position of B?", options: ["70°40'N 023°00'W", "38°00'N 018°00'W", "70°40'N 018°00'E", "54°20'N 023°00'W"], correct: 0 },
  { id: 9, question: "In the Northern Hemisphere, the Rhumb Line between two points lies:", options: ["Nearer the pole than the Great Circle", "Nearer the Equator than the Great Circle", "Exactly on the Great Circle", "Sometimes above, sometimes below the Great Circle"], correct: 1 },
];

// Ch 3 – Earth Magnetism
const ch3Questions: MCQuestion[] = [
  { id: 1, question: "The sensitivity of a direct reading magnetic compass is:", options: ["Inversely proportional to the horizontal component of the earth's magnetic field", "Proportional to the horizontal component of the earth's magnetic field", "Inversely proportional to the vertical component of the earth's magnetic field", "Inversely proportional to the vertical and horizontal components"], correct: 1 },
  { id: 2, question: "What is the definition of magnetic variation?", options: ["The angle between the direction indicated by a compass and Magnetic North", "The angle between True North and Compass North", "The angle between Magnetic North and True North", "The angle between Magnetic Heading and Magnetic North"], correct: 2 },
  { id: 3, question: "At the magnetic equator:", options: ["Dip is zero", "Variation is zero", "Deviation is zero", "The isogonal is an agonic line"], correct: 0 },
  { id: 4, question: "Which of these is a correct statement about the Earth's magnetic field?", options: ["It acts as though there is a large blue magnetic pole in Northern Canada", "The angle of dip is the angle between the vertical and the total magnetic force", "It may be temporary, transient, or permanent", "It has no effect on aircraft deviation"], correct: 0 },
  { id: 5, question: "Where is a compass most effective?", options: ["About midway between the earth's magnetic poles", "In the region of the magnetic South pole", "In the region of the magnetic North pole", "On the geographic equator"], correct: 0 },
  { id: 6, question: "The value of variation:", options: ["Is zero at the magnetic equator", "Has a maximum value of 180°", "Has a maximum value of 45° E or 45° W", "Cannot exceed 90°"], correct: 1 },
  { id: 7, question: "The agonic line:", options: ["Is midway between the magnetic North and South poles", "Follows the geographic equator", "Is the shorter distance between the respective True and Magnetic poles", "Follows separate paths out of the North polar regions, one through Western Europe and the other through the USA"], correct: 3 },
  { id: 8, question: "The angle between True North and Magnetic North is known as:", options: ["Deviation", "Variation", "Alignment error", "Dip"], correct: 1 },
  { id: 9, question: "The value of magnetic variation on a chart changes with time. This is due to:", options: ["Movement of the magnetic poles, causing an increase", "Increase in the magnetic field, causing an increase", "Reduction in the magnetic field, causing a decrease", "Movement of the magnetic poles, which can cause either an increase or a decrease"], correct: 3 },
  { id: 10, question: "Isogonal lines converge:", options: ["At the North Magnetic Pole", "At the North and South Magnetic and Geographical Poles", "At the North and South Magnetic Poles", "At the Magnetic equator"], correct: 1 },
  { id: 11, question: "What is the maximum possible value of Dip Angle?", options: ["66°", "180°", "90°", "45°"], correct: 2 },
  { id: 12, question: "What is the dip angle at the South Magnetic Pole?", options: ["0°", "90°", "180°", "64°"], correct: 1 },
  { id: 13, question: "What is a line of equal magnetic variation?", options: ["An isocline", "An isogonal", "An isogriv", "An isovar"], correct: 1 },
  { id: 14, question: "If variation is West, then:", options: ["True North is West of Magnetic North", "Compass North is West of Magnetic North", "True North is East of Magnetic North", "Magnetic North is West of Compass North"], correct: 2 },
];

// Ch 10 – The 1 in 60 Rule
const ch10Questions: MCQuestion[] = [
  { id: 1, question: "You are flying from A to B. Your position is 60 nm from A and 7 nm left of the required track. What is your track error angle?", options: ["5°L", "7°L", "12°L", "3.5°L"], correct: 1 },
  { id: 2, question: "You are flying from C to D. Your position is 120 nm from C and 8 nm right of the required track. What is your track error angle?", options: ["8°R", "4°R", "6°R", "2°R"], correct: 1 },
  { id: 3, question: "You are flying from E to F. Your position is 90 nm from E and 6 nm right of the required track. What is your track error angle?", options: ["6°R", "3°R", "4°R", "2°R"], correct: 2 },
  { id: 4, question: "You are flying from G to H. Your position is 30 nm from G and 4 nm left of the required track. What is your track error angle?", options: ["4°L", "12°L", "8°L", "6°L"], correct: 2 },
  { id: 5, question: "You are flying from J to K on a required track of 045°T. Your position is 80 nm from J and 4 nm left of track. What is your track made good?", options: ["045°T", "042°T", "048°T", "040°T"], correct: 1 },
  { id: 6, question: "You are flying from L to M on a required track of 220°T. Your position is 45 nm from L and 3 nm right of track. What is your track made good?", options: ["220°T", "216°T", "224°T", "228°T"], correct: 2 },
  { id: 7, question: "You are flying from N to P on a required track of 315°T. Your position is 40 nm from N and 6 nm left of track. What is your track made good?", options: ["315°T", "324°T", "306°T", "309°T"], correct: 2 },
  { id: 8, question: "A surveyor places himself 660 metres from a mast and measures an elevation angle of 4°. What is the height of the mast?", options: ["26 metres", "44 metres", "66 metres", "11 metres"], correct: 1 },
  { id: 9, question: "You are on an instrument approach with a 3.00° glide slope. What height should you be at exactly 2 nm from the touchdown point? (1 nm = 6000 ft)", options: ["360 feet", "600 feet", "400 feet", "720 feet"], correct: 1 },
  { id: 10, question: "You are on a 2.5° glide slope, correctly on slope, passing 1000 feet QFE. What is your range from the touchdown point? (1 nm = 6000 ft)", options: ["2 nm", "6 nm", "4 nm", "3 nm"], correct: 2 },
  { id: 11, question: "You are flying from Q to R on a required track of 125°T. Your position is 40 nm from R and 2 nm left of track. What track must you fly to arrive overhead R?", options: ["125°T", "128°T", "122°T", "131°T"], correct: 1 },
  { id: 12, question: "You are flying from S to T on a required track of 272°T. Your position is 50 nm from T and 5 nm right of track. What track must you fly to arrive overhead T?", options: ["272°T", "278°T", "266°T", "260°T"], correct: 2 },
];

// Ch 11 – Navigation Using the 1 in 60 Rule
const ch11Questions: MCQuestion[] = [
  { id: 1, question: "If an aircraft is 3° off required track at a range of 120 nm, how far in nautical miles is the aircraft off required track?", options: ["3 nm", "6 nm", "9 nm", "12 nm"], correct: 1 },
  { id: 2, question: "If an aircraft is 2 miles off required track at a range of 40 nm, what is the angle off track (track error)?", options: ["2°", "3°", "5°", "4°"], correct: 1 },
  { id: 3, question: "An aircraft leaves A to fly to B (95 nm). After 35 nm, the pinpoint is 7 nm right of track. What is the track error?", options: ["7°R", "12°R", "5°R", "14°R"], correct: 1 },
  { id: 4, question: "In Q3, what alteration of heading is required to fly direct to B? (TE=12°, CA=7°)", options: ["12° left", "7° left", "19° left", "5° left"], correct: 2 },
  { id: 5, question: "Aircraft flying Oxford to Cambridge (track 074°M, 70 nm, heading 065°M). After 30 nm, pinpoint is 4 nm left of track. What is the track error?", options: ["4°L", "6°L", "8°L", "10°L"], correct: 2 },
  { id: 6, question: "In Q5, what is the Track Made Good from Oxford?", options: ["074°M", "065°M", "066°M", "070°M"], correct: 2 },
  { id: 7, question: "In Q5, what was the expected (planned) drift?", options: ["9°P (Starboard)", "9°S (Port)", "4°P", "0°"], correct: 0 },
  { id: 8, question: "In Q5, what alteration of heading should be made to fly direct to Cambridge? (TE=8°, CA=6°)", options: ["8° right", "6° right", "14° right", "2° right"], correct: 2 },
  { id: 9, question: "Aircraft flying Norwich to Oxford (track 250°M, 96 nm, heading 260°M, GS 180 kt). At 1012 (12 min after departure), aircraft is 3 nm right of track. What is the track error?", options: ["3°R", "5°R", "8°R", "10°R"], correct: 1 },
  { id: 10, question: "In Q9, what was the planned drift?", options: ["10°S (Port)", "10°P (Starboard)", "5°P", "0°"], correct: 1 },
  { id: 11, question: "In Q9, what heading is required to fly directly to Oxford? (TE=5°, CA=3°)", options: ["255°M", "252°M", "258°M", "248°M"], correct: 1 },
  { id: 12, question: "In Q9, what alteration of heading should be made to regain track at 1024 hrs? (2 × TE)", options: ["5° left", "10° left", "8° left", "15° left"], correct: 1 },
];

// Ch 12 – Other Applications of the 1 in 60 Rule
const ch12Questions: MCQuestion[] = [
  { id: 1, question: "An aircraft flying due South. At 1000 hrs, point P bears 267°(T). At 1006 hrs, point P bears 275°(T). GS is 120 kts. Estimate the range from point P.", options: ["60 nm", "90 nm", "120 nm", "45 nm"], correct: 1 },
  { id: 2, question: "You are approaching Innsbruck on a glide slope of 3.5°. What height (QFE) should you be at 2 miles range?", options: ["420 ft", "700 ft", "600 ft", "350 ft"], correct: 1 },
  { id: 3, question: "You are approaching Rota, Spain on runway 28 (glide slope 2.6°). At what height should you be at 4 miles range?", options: ["780 ft", "1040 ft", "520 ft", "640 ft"], correct: 1 },
  { id: 4, question: "You are approaching Paris CDG on a 3° glide slope. At what height (QFE) should you be at 2 nm range?", options: ["360 ft", "600 ft", "720 ft", "500 ft"], correct: 1 },
  { id: 5, question: "What ROD is required to maintain a 3.5° glide slope at a ground speed of 120 kts?", options: ["420 ft/min", "700 ft/min", "600 ft/min", "840 ft/min"], correct: 1 },
  { id: 6, question: "On approach to London Heathrow (3° glide slope), you reduce speed from 150 kts to 120 kts. What change should you make to your ROD?", options: ["Increase by 150 ft/min", "Decrease by 150 ft/min", "Decrease by 100 ft/min", "No change needed"], correct: 1 },
  { id: 7, question: "You are flying into Gioia Del Colle on a 2.5° glide slope at 220 kts TAS with 10 kts headwind. What ROD is needed?", options: ["700 ft/min", "875 ft/min", "525 ft/min", "750 ft/min"], correct: 1 },
  { id: 8, question: "Your RMI reads 141°M/DME 90 nm. Airway centreline QDM is 137°M. Are you left or right of centreline, and how far off?", options: ["Right, 6 nm", "Left, 6 nm", "Right, 4 nm", "Left, 4 nm"], correct: 1 },
];

// Ch 13 – Topographical Maps and Map Reading
const ch13Questions: MCQuestion[] = [
  { id: 1, question: "You are flying VFR and have become uncertain of your position. Which is the best course of action?", options: ["Set heading towards a line feature – coastline, river or motorway", "Turn round and fly your flight plan tracks in reverse until you see something recognised", "Fly a series of ever-expanding circles till you find your next check point", "Turn round and fly your flight plan in reverse back to base"], correct: 0 },
  { id: 2, question: "What is the symbol for an unlighted obstacle?", options: ["Symbol 9", "Symbol 10", "Symbol 12", "Symbol 15"], correct: 3 },
  { id: 3, question: "Using the Jeppesen E(LO)1, position 5211N 00931W, which denotes all the symbols?", options: ["Civil airport, VOR, ILS", "Military airport, ILS, NDB", "Military airport, VOR, ILS", "Civil airport, ILS, NDB"], correct: 3 },
  { id: 4, question: "Using the Jeppesen E(LO)1 chart, what are the symbols at Galway Carnmore (5318.1N 00856.5W)?", options: ["VOR, NDB, DME, compulsory reporting point", "Civil airport, NDB, DME, non-compulsory reporting point", "Civil airport, VOR, DME, non-compulsory reporting point", "VOR, NDB, DME, non-compulsory reporting point"], correct: 1 },
  { id: 5, question: "Which is the symbol for an exceptionally high (over 1000 feet AGL) lighted obstruction?", options: ["Symbol 6", "Symbol 9", "Symbol 10", "Symbol 15"], correct: 2 },
  { id: 6, question: "What symbol is used to show a VORTAC on a map/chart?", options: ["Symbol 5", "Symbol 7", "Symbol 13", "Symbol 14"], correct: 3 },
  { id: 7, question: "Which is the symbol for a VOR?", options: ["Symbol 5", "Symbol 7", "Symbol 13", "Symbol 14"], correct: 2 },
  { id: 8, question: "What does symbol 3 represent?", options: ["Lit obstacle", "Lighthouse", "VRP", "Aeronautical ground light"], correct: 3 },
];

// Ch 14 – Convergency and Conversion Angle
const ch14Questions: MCQuestion[] = [
  { id: 1, question: "The convergency of meridians through M and N (southern hemisphere) is 12°. The rhumb line track from M to N is 249°(T). What is the great circle track from M to N?", options: ["255°(T)", "243°(T)", "261°(T)", "237°(T)"], correct: 1 },
  { id: 2, question: "The convergency of meridians through M and N (southern hemisphere) is 12°. The rhumb line track from M to N is 249°(T). What is the great circle track from N to M?", options: ["069°(T)", "075°(T)", "063°(T)", "081°(T)"], correct: 1 },
  { id: 3, question: "The great circle bearing of B (30°00'S) from A (30°00'S 165°00'E) is 100°(T). What is the great circle track from B to A?", options: ["280°(T)", "260°(T)", "270°(T)", "250°(T)"], correct: 1 },
  { id: 4, question: "The great circle bearing of B (30°00'S) from A (30°00'S 165°00'E) is 100°(T). What is the longitude of B?", options: ["145°W", "155°W", "165°W", "175°W"], correct: 1 },
  { id: 5, question: "The rhumb line from D (30°00'N 179°00'W) to C is 090°(T). The great circle initial track from C to D is 287°(T). What is the great circle track from D to C?", options: ["083°(T)", "073°(T)", "063°(T)", "093°(T)"], correct: 1 },
  { id: 6, question: "The great circle track from A to B measures 227°(T) at A and 225°(T) at B. What is the convergency and in which hemisphere?", options: ["2°, Northern Hemisphere", "2°, Southern Hemisphere", "4°, Northern Hemisphere", "4°, Southern Hemisphere"], correct: 0 },
  { id: 7, question: "In what latitude is the convergency between two meridians equal to twice their convergency in latitude 20°N?", options: ["40°N", "43°N", "45°N", "50°N"], correct: 1 },
  { id: 8, question: "A and B are in the same hemisphere. The initial GC track from B to A is 268°(T) and from A to B is 092°(T). In which hemisphere are A and B?", options: ["Northern Hemisphere", "Southern Hemisphere", "Either hemisphere", "Cannot be determined"], correct: 1 },
  { id: 9, question: "C and D are in the same hemisphere. The initial GC track from C to D is 063°(T) and the rhumb line track from D to C is 240°(T). What is the approximate initial GC track from D to C?", options: ["243°(T)", "237°(T)", "240°(T)", "246°(T)"], correct: 1 },
  { id: 10, question: "Position X 64°00'S 11°50'W, Position Y 64°00'S 05°10'W. What is the convergency between the meridians of X and Y?", options: ["4°", "6°", "8°", "10°"], correct: 1 },
  { id: 11, question: "Position X 64°00'S 11°50'W, Position Y 64°00'S 05°10'W. What is the approximate initial great circle track from Y to X?", options: ["273°(T)", "267°(T)", "270°(T)", "264°(T)"], correct: 1 },
  { id: 12, question: "Position X 64°00'S 11°50'W, Position Y 64°00'S 05°10'W. What is the rhumb line track from X to Y?", options: ["270°(T)", "090°(T)", "087°(T)", "093°(T)"], correct: 1 },
  { id: 13, question: "Calculate the convergency between A (55°30'N 04°35'W) and B (64°00'N 22°37'W). If the rhumb line track from A to B is 313°(T), what is the approximate initial GC track from B to A?", options: ["117°(T)", "125°(T)", "133°(T)", "141°(T)"], correct: 1 },
  { id: 14, question: "The initial GC track from B to A is 245°(T) and the rhumb line track from A to B is 060°(T). Mean latitude is 53°, longitude of B is 02°15'E. What is the longitude of A?", options: ["005°15'W", "010°15'W", "015°15'W", "007°30'W"], correct: 1 },
  { id: 15, question: "A and B are in the southern hemisphere, convergency is 8°. Initial GC track from A to B is 094°(T). B is at 23°00'S 20°00'W. What is the position of A?", options: ["23°00'S 030°30'W", "23°00'S 040°30'W", "23°00'S 028°00'W", "23°00'S 035°00'W"], correct: 1 },
];

// Ch 15 – Departure
const ch15Questions: MCQuestion[] = [
  { id: 1, question: "A flight along the parallel of latitude from A (48°00'N 04°00'W) to B (48°00'N 02°27'E). What is the distance?", options: ["259 nm", "387 nm", "300 nm", "210 nm"], correct: 0 },
  { id: 2, question: "An aircraft flies 1000 nm along a rhumb line track of 090°(T) from C (36°00'N 174°45'E) to D. What is the longitude of D?", options: ["174°39'W", "164°39'W", "154°39'W", "175°21'E"], correct: 1 },
  { id: 3, question: "Starting from E (50°N): E to F 000°(T) 300nm, F to G 090°(T) 300nm, G to H 180°(T) 300nm. What is the rhumb line bearing and distance of H from E?", options: ["090°(T) at 336 nm", "090°(T) at 300 nm", "080°(T) at 350 nm", "095°(T) at 320 nm"], correct: 0 },
  { id: 4, question: "What is the track and distance along the parallel of 80°S from 176°15'W to 179°45'E?", options: ["090°(T), 41.7 nm", "270°(T), 41.7 nm", "090°(T), 240 nm", "270°(T), 240 nm"], correct: 1 },
  { id: 5, question: "In which latitude is a difference in longitude of 44°10' the equivalent of a departure of 2295 nm?", options: ["20°N or S", "30°N or S", "45°N or S", "60°N or S"], correct: 1 },
  { id: 6, question: "Aircraft leaves J (36°00'S 130°14'E) at 0946 GMT, track 270°, FL100, temp 0°C, M0.81, 35kt tailwind. Position at 1004 GMT?", options: ["36°00'S 126°48'E", "36°00'S 128°00'E", "36°00'S 133°40'E", "36°00'S 124°30'E"], correct: 0 },
  { id: 7, question: "In which latitude is the departure in nm between two points equal to their difference in longitude in minutes?", options: ["At the Equator", "At 30°N/S", "At 45°N/S", "At 60°N/S"], correct: 0 },
  { id: 8, question: "In which latitude is the departure in nm equal to half the difference in longitude in minutes?", options: ["At the Equator", "At 30°N/S", "At 45°N/S", "At 60°N/S"], correct: 3 },
  { id: 9, question: "Aircraft Q (GS 301kt) flies along 46°N through 10° longitude. Aircraft R (GS 364kt) flies between the same meridians in the same time. What is the latitude of R's track?", options: ["25°N/S", "33°N/S", "40°N/S", "28°N/S"], correct: 1 },
  { id: 10, question: "An aircraft starts at 0410S 17822W, heads true north for 2950 nm, then turns 90° left and maintains a rhumb line track for 314 km. What is its final position?", options: ["5500N 17422W", "4500N 17738E", "5500N 17738E", "4500N 17422W"], correct: 1 },
  { id: 11, question: "An aircraft at 2700N 17000W travels 3000 km on 180°(T), then 3000 km on 090°(T), then 3000 km on 000°(T), then 3000 km on 270°(T). What is its final position?", options: ["2700N 17000W", "0000N/S 17000W", "2700N 17318W", "2700N 14300W"], correct: 2 },
  { id: 12, question: "An aircraft departs 0400N 17000W and flies 600 nm South, 600 nm East, 600 nm North, 600 nm West. What is its final position?", options: ["0400N 17000W", "0600S 17000W", "0400N 169°58.1'W", "0400N 170°01.8'W"], correct: 2 },
  { id: 13, question: "An aircraft flying eastwards along 60°N at GS 240 kt. At what GS must another aircraft fly along the Equator to complete one circuit in the same time?", options: ["600 knots", "240 knots", "480 knots", "120 knots"], correct: 2 },
  { id: 14, question: "Your position is 5833N 17400W. You fly exactly 6 nm eastwards. What is your new position?", options: ["5833N 17411.5W", "5833N 17355W", "5833N 17340W", "5833N 17348.5W"], correct: 3 },
];

// Topics
export const oxfordGenNavCh1Topic: Topic = { id: "oxford-gn-ch1", title: "Ch 1 – Direction, Latitude and Longitude", questions: ch1Questions };
export const oxfordGenNavCh2Topic: Topic = { id: "oxford-gn-ch2", title: "Ch 2 – Great Circles, Rhumb Lines and Directions on the Earth", questions: ch2Questions };
export const oxfordGenNavCh3Topic: Topic = { id: "oxford-gn-ch3", title: "Ch 3 – Earth Magnetism", questions: ch3Questions };
export const oxfordGenNavCh10Topic: Topic = { id: "oxford-gn-ch10", title: "Ch 10 – The 1 in 60 Rule", questions: ch10Questions };
export const oxfordGenNavCh11Topic: Topic = { id: "oxford-gn-ch11", title: "Ch 11 – Navigation Using the 1 in 60 Rule", questions: ch11Questions };
export const oxfordGenNavCh12Topic: Topic = { id: "oxford-gn-ch12", title: "Ch 12 – Other Applications of the 1 in 60 Rule", questions: ch12Questions };
export const oxfordGenNavCh13Topic: Topic = { id: "oxford-gn-ch13", title: "Ch 13 – Topographical Maps and Map Reading", questions: ch13Questions };
export const oxfordGenNavCh14Topic: Topic = { id: "oxford-gn-ch14", title: "Ch 14 – Convergency and Conversion Angle", questions: ch14Questions };
export const oxfordGenNavCh15Topic: Topic = { id: "oxford-gn-ch15", title: "Ch 15 – Departure", questions: ch15Questions };

export const oxfordGenNavTopics: Topic[] = [
  oxfordGenNavCh1Topic,
  oxfordGenNavCh2Topic,
  oxfordGenNavCh3Topic,
  oxfordGenNavCh10Topic,
  oxfordGenNavCh11Topic,
  oxfordGenNavCh12Topic,
  oxfordGenNavCh13Topic,
  oxfordGenNavCh14Topic,
  oxfordGenNavCh15Topic,
];
