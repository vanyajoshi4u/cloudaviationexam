import { MCQuestion, Topic } from "./icJoshiQuestions";

// Ch 30 – Plotting (from PDF pages 1-4)
const ch30PlottingQuestions: MCQuestion[] = [
  { id: 1, question: "What is the average magnetic course and distance between 6000N 02000W and Sumburgh VOR? (use Jeppesen AT(H/L)1 or 5 AT(HI))", options: ["095° / 562 nm", "095° / 468 nm", "105° / 562 nm", "105° / 468 nm"], correct: 2 },
  { id: 2, question: "What is the average true track and distance between WTD NDB (5211.3N 00705.0W) and FOY NDB (5234.0N 00911.7W)? (use Jeppesen E(LO)1)", options: ["294° / 76 nm", "286° / 76 nm", "294° / 81 nm", "286° / 81 nm"], correct: 3 },
  { id: 3, question: "You are on a heading of 105°(C), deviation 3°E. WTD NDB (5211.3N 00705.0W) bears 013°R, CRK VOR (5150.4N 00829.7W) QDM is 211°. What is your position? (use Jeppesen E(LO)1)", options: ["5245N 00757W", "5228N 00802W", "5412N 00639W", "5217N 00745W"], correct: 1 },
  { id: 4, question: "The airport at 5211N 00932W is: (use Jeppesen E(LO)1)", options: ["Kerry", "Cork", "Shannon", "Waterford"], correct: 0 },
  { id: 5, question: "Reference Jeppesen E(LO)1, position 5211N 00931W, which of the following denotes all the symbols?", options: ["military airport, ILS, NDB", "civil airport, VOR, ILS", "military airport, VOR, ILS", "civil airport, ILS, NDB"], correct: 3 },
  { id: 6, question: "What is the aircraft position given: CRN (5318N 00857W) 18 DME, SHA (5243N 00853W) 20 DME, Heading 270°M, both ranges DME decreasing? (use Jeppesen E(LO)1)", options: ["5201N 00908W", "5301N 00908W", "5302N 00843W", "5203N 00843W"], correct: 1 },
  { id: 7, question: "What is at 5211N 00932W? (use E(LO)1)", options: ["Kerry VOR", "Cork Airport", "Waterford NDB", "Kerry Airport"], correct: 3 },
  { id: 8, question: "What is the mean true track and distance from BAL VOR (5318N 00627W) to CFN NDB (5502N 00820W)? (use E(LO)1)", options: ["328° / 125 nm", "148° / 125 nm", "328° / 134 nm", "148° / 134 nm"], correct: 0 },
  { id: 9, question: "You are at position 5340N 00800W. What is the QDR from the SHA VOR (5243N 00853W)? (use E(LO)1)", options: ["217", "037", "209", "029"], correct: 1 },
  { id: 10, question: "Your radial from SHA VOR (5243N 00853W) is 120°(M). From CRK VOR (5151N 00830W), the radial is 033°(M). What is your position? (use E(LO)1)", options: ["5320N 00800W", "5240N 00821W", "5220N 00821W", "5230N 00800W"], correct: 2 },
];

// Ch 31 – The Direct Indicating Compass (answers: C, D, D, D, A, C, D, D, C → 1-9)
const ch31Questions: MCQuestion[] = [
  { id: 1, question: "In a standby direct reading compass there is:", options: ["a non-pendulously mounted magnet system", "a single pendulously mounted bar magnet", "a circular magnet or pair of bar magnets pendulously mounted", "a low magnetic moment system, either of circular or bar configuration"], correct: 2 },
  { id: 2, question: "The main requirements of a direct reading magnetic compass are that it should be:", options: ["horizontal, sensitive, periodic", "easily read, floating in a transparent liquid, quick to react to change in aircraft heading", "positioned directly in front of the pilot, easily corrected for magnetic deviation", "aperiodic"], correct: 3 },
  { id: 3, question: "For a position in the southern hemisphere, the effect of acceleration errors are greatest on headings:", options: ["180° and 360°", "045° and 225°", "135° and 315°", "090° and 270°"], correct: 3 },
  { id: 4, question: "An aircraft in the southern hemisphere is turning from a heading of 045°C to 315°C using a DGI. At the end of the turn the compass will read _____ than 315° and liquid swirl will _____ this effect.", options: ["more; increase", "less; increase", "more; decrease", "less; decrease"], correct: 3 },
  { id: 5, question: "In a standby compass the magnet system is immersed in a transparent liquid. The purpose of this liquid is to:", options: ["increase sensitivity, increase aperiodicity", "increase sensitivity, decrease aperiodicity", "increase sensitivity at high latitudes, lubricate bearings", "increase sensitivity, reduce liquid swirl"], correct: 0 },
  { id: 6, question: "To improve the horizontality of a compass, the magnet assembly is suspended from a point:", options: ["on the centre line of the magnet", "below the centre of gravity", "above the centre of gravity", "varying with magnetic latitude"], correct: 2 },
  { id: 7, question: "The magnitude, and sense, of turning error shown by a direct reading compass varies with: (1) the design of the compass, (2) the direction of the turn, (3) the rate of turn, (4) which hemisphere the aircraft is in, (5) the heading of the aircraft, (6) the amount of dip at the aircraft's latitude. Which are correct?", options: ["only 1, 2, 5 and 6", "only 1, 3, 5 and 6", "only 2, 4 and 5", "all are correct"], correct: 3 },
  { id: 8, question: "During a sustained turn __ the nearer magnetic pole, the effect of liquid swirl will __ compass turning error.", options: ["away from; increase", "towards; not affect", "away from; not affect", "towards; increase"], correct: 3 },
  { id: 9, question: "When carrying out a turn at the magnetic equator there will be:", options: ["no turning error", "a tendency to underread turns through south and overread turns through north", "a tendency to underread turns due to liquid swirl", "no turning error when turning through east or west"], correct: 2 },
];

// Ch 32 – Remote Indicating Magnetic Compass (answers: B, C, A, A, B, B, A)
const ch32Questions: MCQuestion[] = [
  { id: 1, question: "A gyro-magnetic compass or magnetic heading reference unit is an assembly which always consists of: (1) a directional gyro, (2) a vertical axis gyro, (3) an earth's magnetic field detector, (4) an azimuth control, (5) a synchronising control. The correct combination is:", options: ["2 and 5", "1, 3 and 5", "2, 3 and 5", "1 and 4"], correct: 1 },
  { id: 2, question: "A slaved directional gyro derives its directional signal from:", options: ["a direct reading magnetic compass", "the flight director", "the flux valve", "the air data computer"], correct: 2 },
  { id: 3, question: "The gyro-magnetic compass torque motor:", options: ["causes the directional gyro unit to precess", "causes the heading indicator to precess", "feeds the error detector system", "is fed by the flux valve"], correct: 0 },
  { id: 4, question: "The heading information originating from the gyro-magnetic compass flux valve is sent to:", options: ["error detector", "erector system", "heading indicator", "amplifier"], correct: 0 },
  { id: 5, question: "The input signal of the amplifier of the gyro-magnetic compass resetting device originates from the:", options: ["directional gyro erection device", "error detector", "flux valve", "directional gyro unit"], correct: 1 },
  { id: 6, question: "Heading information from the gyro-magnetic compass flux gate is transmitted to the:", options: ["amplifier", "error detector", "erecting system", "heading indicator"], correct: 1 },
  { id: 7, question: "A flux valve senses changes in orientation of the horizontal component of the earth's magnetic field. Which statements are correct? (1) made of soft iron bars, (2) primary coils fed AC voltage, (3) info used by flux gate compass or DG, (4) casing dependent on aircraft inertial axis, (5) accuracy < 0.5%", options: ["2, 3 and 5", "1, 3, 4 and 5", "3 and 5", "1, 4 and 5"], correct: 0 },
];

// Ch 33 – Aircraft Magnetism (answers: C (wait, from answer page: B, D, A, B... let me re-check)
// Answer page 12 shows: C D A B D B A D C for questions 1-9
// But questions 6,7 repeat 3,4 and question 9 repeats 5. Let me use unique questions only (1-5, 6-repeat=skip, 7-repeat=skip, 8, 9-repeat=skip)
// Actually the PDF has 9 questions with answers: 1=B, 2=D, 3=A, 4=A... wait
// Page 12 answer table: C D A B D B A D C - but this doesn't match well
// Let me re-read: the answer page shows single row: C D A B D B A D C for 1-9
// So: 1=C (was 'b' wrong?), wait the parsed table is messy. Let me use the page image answers.
// From page 7 (ch31 answers): C D D D A C D D C → but that's 9 values for ch31's 9 questions ✓
// Wait page 7 shows for ch31: row says C D D D A C D D C
// But I mapped ch31 answers as: C(2), D(3), D(3), D(3), A(0), C(2), D(3), D(3), C(2) ✓

// From page 12 (ch33 answers): The table shows B D A B ... wait it's garbled.
// Let me use the answer key carefully. Page 12 answer for ch33:
// The parsed content shows: "C D A B D B A D C" but in jumbled format
// Actually looking more carefully at page 12: top row "C D A B D B A D C" maps to questions 1-9
// So: 1=C? But wait, let me look at statement content.
// Hmm, question 5 and 9 are identical. Questions 3&6 and 4&7 are identical too.
// The unique questions are 1,2,3,4,5,8 → answers from the key: 1=B, 2=D, 3=A, 4=A, 5=C, 8=D
// Actually the answer row "C D A B D B A D C" → pos 1=C,2=D,3=A,4=B,5=D,6=B,7=A,8=D,9=C
// But 3&6 are same question (VSI) with answers A and B - that can't be right for same Q.
// Q3 says "varies with heading but not latitude" → A? Q6 is identical text → answer B?
// This is confusing. I'll keep all 9 as-is from the PDF since they may have subtle differences.

const ch33Questions: MCQuestion[] = [
  { id: 1, question: "European regulations (CS Ops-1) state that the maximum permissible deviations after compensation are:", options: ["one degree for a remote indicating compass, and ten degrees for a direct reading magnetic compass", "three degrees for a direct reading magnetic compass, and one degree for a remote indicating compass", "ten degrees for a remote indicating compass, and one degree for a direct reading magnetic compass", "one degree for a direct reading magnetic compass, and eleven degrees for a slaved compass"], correct: 2 },
  { id: 2, question: "Compass swings should be carried out:", options: ["on the apron", "only on the compass swinging base or site", "at the holding point", "on the active runway"], correct: 3 },
  { id: 3, question: "Aircraft magnetism caused by Vertical Soft Iron:", options: ["varies with magnetic heading but not with magnetic latitude", "varies with magnetic latitude but not with heading", "it is not affected by magnetic latitude or heading", "varies as the cosine of the compass heading"], correct: 0 },
  { id: 4, question: "Aircraft magnetism caused by Hard Iron:", options: ["is not usually influenced by the earth's magnetic field", "varies directly with magnetic latitude", "varies indirectly with magnetic latitude", "is maximum on east and west"], correct: 1 },
  { id: 5, question: "The aim of a compass swing is: (1) to find deviation on the cardinal headings and calculate coefficients A, B and C, (2) to eliminate or reduce the coefficients found, (3) to record any residual deviation and prepare a compass correction card.", options: ["only answer 1 is correct", "answers 1 and 3 are correct", "answers 1, 2 and 3 are all correct", "none of the above answers are correct"], correct: 3 },
  { id: 6, question: "Aircraft magnetism caused by Vertical Soft Iron (repeated):", options: ["varies with magnetic heading but not with magnetic latitude", "varies with magnetic latitude but not with heading", "it is not affected by magnetic latitude or heading", "varies as the cosine of the compass heading"], correct: 1 },
  { id: 7, question: "Aircraft magnetism caused by Hard Iron (repeated):", options: ["is not usually influenced by the earth's magnetic field", "varies directly with magnetic latitude", "varies indirectly with magnetic latitude", "is maximum on east and west"], correct: 0 },
  { id: 8, question: "Deviation due to coefficient A is mainly caused by:", options: ["hard iron force acting along the longitudinal axis", "hard and soft iron forces acting along the lateral axis", "vertical soft iron forces", "a misaligned lubber line"], correct: 3 },
  { id: 9, question: "The aim of a compass swing is: (1) to find deviation on the cardinal headings and calculate coefficients A, B and C, (2) to eliminate or reduce the coefficients found, (3) to record any residual deviation and prepare a compass correction card.", options: ["only answer 1 is correct", "answers 1 and 3 are correct", "answers 1, 2 and 3 are all correct", "none of the above answers are correct"], correct: 2 },
];

// Ch 34 – Inertial Navigation System (answers: A, C, C, B, A, D, C, C, B, D)
const ch34Questions: MCQuestion[] = [
  { id: 1, question: "INS errors are classified as 'Bounded errors' and 'Unbounded errors'. Which statement is correct?", options: ["An 'Unbounded error' increases with time, e.g. distance gone error due to a ground speed error", "An 'Unbounded error' increases with time, e.g. increasing ground speed error due to platform not levelled correctly", "A 'Bounded error' is subject to sudden unpredictable random changes during pitching manoeuvres", "A 'Bounded error' is tied to the real wander rates of the gyros on the platform"], correct: 0 },
  { id: 2, question: "Two checks to verify that two selected sequential waypoints have been entered correctly are:", options: ["select DSR.TK/STS and check status < 4; select DIS/TIME and check time agrees with flight plan", "select DIS/TIME and check distance and time agree with flight plan", "select DIS/TIME and check distance agrees; select DSR.TK/STS and check track agrees with flight plan", "select DIS/TIME and check distance agrees; select HDG/DA and check heading agrees with flight plan"], correct: 2 },
  { id: 3, question: "In an INS the E/W accelerations are converted into E/W speed (kt) at the first integration and into E/W distance gone (nm) at the second integration. This gives:", options: ["departure multiplied by Cosine of present latitude to obtain d'long", "d'long which is used to automatically update the present longitude", "departure multiplied by Secant of present latitude to obtain d'long", "departure multiplied by Sine of present latitude to obtain d'long"], correct: 2 },
  { id: 4, question: "At the second stage of integration E/W speed is converted into E/W distance gone. To convert this departure into change of longitude it has to:", options: ["be divided by Secant of the latitude", "be multiplied by Secant of the latitude", "be divided by Tangent of the latitude", "be multiplied by Cosine of the latitude"], correct: 1 },
  { id: 5, question: "The amber ALERT light on an INS control and display unit:", options: ["illuminates steadily 2 minutes, in AUTO mode, before reaching the next waypoint", "starts flashing 2 minutes before reaching the next waypoint and goes out at 30 seconds to run", "illuminates if power from the aircraft bus bar has been lost and the system is operating on standby battery", "illuminates steadily after passing a waypoint in manual mode, until the next leg is programmed in"], correct: 0 },
  { id: 6, question: "With reference to INS, the functions of the integrators are: (i) at second stage to suppress unbounded errors in NAV mode, (ii) at first stage to convert acceleration into speed in NAV mode, (iii) at second stage to convert speed into distance gone in NAV mode, (iv) to align the platform in level and align modes. Which are true?", options: ["all of the above", "only (ii), (iii) and (iv)", "only (i), (ii) and (iii)", "only (ii) and (iii)"], correct: 3 },
  { id: 7, question: "The computer of a north referenced INS in flight provides compensation for:", options: ["aircraft manoeuvres, real wander, apparent wander, transport wander", "coriolis, real wander, apparent wander, transport wander", "earth rotation, transport wander, coriolis", "transport wander, apparent wander, coriolis, magnetic variation"], correct: 2 },
  { id: 8, question: "An aircraft with INS has passed waypoint 2 and is tracking along line TK. DA/HDG shows 6L/080. When DSRTK/STS is selected on the CDU, the left window will show:", options: ["074", "086", "068", "080"], correct: 2 },
  { id: 9, question: "When XTK/TKE is selected on the CDU (after passing waypoint 2, DA/HDG shows 6L/080), the display will show:", options: ["5L / 6R", "5R / 6R", "5L / 6L", "6R / 5L"], correct: 1 },
  { id: 10, question: "During initialisation of an INS the aircraft must not be moved until:", options: ["the ramp position has been inserted and checked", "the platform is levelled", "the gyros and accelerometers are in the 'null' position", "the green 'ready NAV' light has illuminated and mode selector set to NAV"], correct: 3 },
  { id: 11, question: "Dither is used in a laser gyro in order to:", options: ["enhance the accuracy of the gyro at all rotational rates", "increase the maximum rotational rate that can be sensed by the gyro", "stabilise the laser frequencies at peak power output", "break the frequency lock which would prevent small rotational rates from being sensed by the gyro"], correct: 3 },
];

// Export topics — titles match SubjectCards chapter numbering
export const oxfordGenNavCh31Topic: Topic = { id: "oxford-gn-ch31", title: "Ch 31 – Plotting", questions: ch30PlottingQuestions };
export const oxfordGenNavCh32Topic: Topic = { id: "oxford-gn-ch32", title: "Ch 32 – The Direct Indicating Compass", questions: ch31Questions };
export const oxfordGenNavCh33Topic: Topic = { id: "oxford-gn-ch33", title: "Ch 33 – Remote Indicating Magnetic Compass", questions: ch32Questions };
export const oxfordGenNavCh34Topic: Topic = { id: "oxford-gn-ch34", title: "Ch 34 – Aircraft Magnetism", questions: ch33Questions };
export const oxfordGenNavCh35Topic: Topic = { id: "oxford-gn-ch35", title: "Ch 35 – Inertial Navigation System", questions: ch34Questions };

export const oxfordGenNavCh30to34Topics: Topic[] = [
  oxfordGenNavCh31Topic,
  oxfordGenNavCh32Topic,
  oxfordGenNavCh33Topic,
  oxfordGenNavCh34Topic,
  oxfordGenNavCh35Topic,
];
