import { type MCQuestion, type Topic } from "./icJoshiQuestions";

// ATTITUDE INDICATORS (15 Questions)
const attitudeQuestions: MCQuestion[] = [
  { id: 1, question: "An AI has?", options: ["One degree of freedom and a lateral spin axis", "Two degrees of freedom and a vertical spin axis", "One degree of freedom and a vertical spin axis", "Two degrees of freedom and a horizontal spin axis"], correct: 1 },
  { id: 2, question: "An artificial horizon has?", options: ["Two degrees of freedom and a vertical spin axis", "Two degrees of freedom and a longitudinal spin axis", "Two degrees of freedom and a lateral spin axis", "One degree of freedom and a vertical spin axis"], correct: 0 },
  { id: 3, question: "How many degrees of freedom and what is the spin axis of an attitude indicator?", options: ["Two degrees of freedom and a vertical spin axis", "One degree of freedom and a horizontal spin axis", "Two degrees of freedom and a horizontal spin axis", "One degree of freedom and a vertical spin axis"], correct: 0 },
  { id: 4, question: "How will a basic AI respond if an aircraft performs a 270 degree turn at constant bank angle and ROT?", options: ["Too much nose-up and bank too low", "Nose down and bank correct", "Nose level and bank correct", "Correct bank and pitch"], correct: 0 },
  { id: 5, question: "What will an AI respond if an aircraft performs a 180° turn at constant AOB?", options: ["Nose up and bank correct", "Nose level and bank correct", "Correct bank and pitch", "Nose level and bank too low"], correct: 2 },
  { id: 6, question: "An attitude indicator is indicated on the?", options: ["EICAS/ECAM primary display", "EFIS ND", "EFIS PFD", "All of the above"], correct: 2 },
  { id: 7, question: "When turning through 180° at constant AOB and pitch attitude, what will a classic artificial horizon indicate?", options: ["Too much nose up and too little bank angle", "Too little nose up and too much bank angle", "Correct pitch and bank", "Too much nose up and correct bank"], correct: 2 },
  { id: 8, question: "When turning through 270° at constant AOB and pitch attitude, what will a classic artificial horizon indicate?", options: ["Too much nose up and too little bank angle", "Too little nose up and too little bank angle", "Correct pitch and bank", "Too much nose up and too much bank angle"], correct: 0 },
  { id: 9, question: "A standby attitude indicator has?", options: ["Independent power supply and integral gyro", "Remote (external) gyro", "Used only in emergencies", "Connected to the main gyro system"], correct: 0 },
  { id: 10, question: "The attitude indicator erection system?", options: ["Compensates for transport error", "Is not fitted to modern AI", "Compensates for earth rate", "Corrects for acceleration errors"], correct: 0 },
  { id: 11, question: "The gravity erecting unit in an artificial horizon is used to?", options: ["Prevent tilting of the gyro", "Is not fitted to modern AI", "Compensate for earth rate errors", "Erect the gyro to local vertical"], correct: 3 },
  { id: 12, question: "What does an artificial horizon indicate after a rapid acceleration?", options: ["Correct attitude and bank", "Nose up and correct bank", "Nose down and bank to the left", "Wings level and nose up"], correct: 1 },
  { id: 13, question: "Which of the following properties are possessed by a standby artificial horizon?\n1. Independent power supply\n2. Integral gyro\n3. Remote (external) gyro\n4. A least one per pilot in JAR-25 aircraft", options: ["1, 2", "1, 2, 4", "1, 3, 4", "2, 3, 4"], correct: 1 },
  { id: 14, question: "When turning through 270° at a constant rate of turn and AOB, the indications on the classic artificial horizon will be?", options: ["Bank left nose up", "Bank right nose up", "Wings level nose up", "Correct attitude"], correct: 0 },
  { id: 15, question: "What will a classic artificial horizon indicate when turning through 90 degrees at constant attitude and bank angle?", options: ["Correct attitude and bank angle", "Too much bank and too much nose up attitude", "Too little bank and too much nose up attitude", "The pitch bank and roll much some up attitude"], correct: 0 },
];

// TURN AND SLIP INDICATORS (36 Questions)
const turnSlipQuestions: MCQuestion[] = [
  { id: 1, question: "A turn indicator used in conjunction with an attitude indicator can show?", options: ["Turn direction and rate of turn", "Turn direction only", "Rate of turn only", "Bank angle only"], correct: 0 },
  { id: 2, question: "ROT indications are?", options: ["Proportional to TAS", "Proportional to CAS", "Proportional to mass", "Proportional to EAS"], correct: 0 },
  { id: 3, question: "A turn indicator has a gyroscope with?", options: ["A vertical spin axis and one degree of freedom", "A horizontal spin axis and two degrees of freedom", "A horizontal spin axis and one degree of freedom", "A vertical spin axis and two degrees of freedom"], correct: 2 },
  { id: 4, question: "The ball in a serviceable slip indicator is held in position by?", options: ["Gravity, does not always indicate correct slip", "Acceleration, does not always indicate correct slip", "Gravity, always indicates correct slip", "Acceleration, always indicates correct slip"], correct: 0 },
  { id: 5, question: "The rate of turn in a coordinated turn is affected by?", options: ["AOB and airspeed", "Airspeed only", "Weight only", "Altitude only"], correct: 0 },
  { id: 6, question: "When both the needle and ball of a turn and slip indicator are displaced to the right, the aircraft is?", options: ["Turning right with too much TAS", "Turning right with insufficient TAS", "Turning left with too much TAS", "Turning right with not enough bank"], correct: 3 },
  { id: 7, question: "When the needle is right and ball displaced left, in a turn and slip indicator, the aircraft is?", options: ["Turning right with insufficient bank", "Turning left with insufficient TAS", "Turning right with too much bank", "Turning left with too much bank"], correct: 2 },
  { id: 8, question: "A turn indicator indicates ...... in a slightly banked turn?", options: ["Angular velocity about the vertical axis", "Angular acceleration about the vertical axis", "Angular velocity about the lateral axis", "Yaw displacement"], correct: 0 },
  { id: 9, question: "A rate 1 turn at 120 kts requires?", options: ["10° AOB", "17° AOB", "40° AOB", "22° AOB"], correct: 1 },
  { id: 10, question: "The correct turn and slip indication for straight and level flight is?", options: ["Both needle and ball central", "Both needle and ball right", "Needle right and ball left", "Needle left and ball right"], correct: 0 },
  { id: 11, question: "When both the needle and ball of a turn and slip indicator are displaced to the right, the aircraft is?", options: ["Turning right with too much bank", "Turning right with not enough bank", "Turning left with too much bank", "Turning left with not enough bank"], correct: 1 },
  { id: 12, question: "When a left engine fails in climbing flight, the turn and slip will show?", options: ["Needle and ball right", "Needle left and ball right", "Needle right and ball left", "Needle and ball left"], correct: 1 },
  { id: 13, question: "What will the turn and slip indicator show in a right turn when taxiing?", options: ["Needle right and ball right", "Needle left and ball right", "Needle right and ball left", "Needle left and ball left"], correct: 0 },
  { id: 14, question: "When turning at constant bank angle, the rate of turn is?", options: ["Determined by weight and TAS", "Determined by weight only", "Determined by TAS only", "Determined by AOB only"], correct: 2 },
  { id: 15, question: "A turn indicator in conjunction with a slip indicator indicates?", options: ["TAS in a turn", "Angular velocity about the vertical axis of the aircraft", "Angular velocity about the true vertical axis", "AOB"], correct: 1 },
  { id: 16, question: "What will the turn slip indicate for a banked turn?", options: ["Yaw rate", "Roll rate", "Pitch rate", "Angular velocity about the vertical axis"], correct: 3 },
  { id: 17, question: "What corrective actions are required if the ball is out to the right in a left turn?", options: ["More right rudder", "More left rudder", "More right bank", "More left bank"], correct: 1 },
  { id: 18, question: "The gyro in a turn indicator must have?", options: ["One gimbal and one degree of freedom", "Two gimbals and one degree of freedom", "Two gimbals and two degrees of freedom", "Three gimbals and two degrees of freedom"], correct: 0 },
  { id: 19, question: "If the turn indicator needle is out to the right and the ball is out to the left, the aircraft is?", options: ["In a right turn with too much bank", "In a left turn with too little bank", "In a right turn with too little bank", "In a left turn with too much bank"], correct: 0 },
  { id: 20, question: "For a coordinated rate 1 right turn at 250 Kts TAS, the correct AOB is approximately?", options: ["32 degrees", "23 degrees", "16 degrees", "15 degrees"], correct: 1 },
  { id: 21, question: "What angle of bank is required to conduct a balanced rate 1 turn in an aircraft at 125 kt TAS at a mass of 55000 Kg?", options: ["15.5 degrees", "17.5 degrees", "19.5 degrees", "21.5 degrees"], correct: 1 },
  { id: 22, question: "ROT indications depend on?\n1. Airspeed\n2. AOB\n3. Weight\n4. Altitude", options: ["1, 2", "1, 2, 3", "1, 2, 3, 4", "1, 2, 4"], correct: 0 },
  { id: 23, question: "For a coordinated 300 Kts TAS rate 1 right turn, the AOB should be?", options: ["17 degrees", "27 degrees", "37 degrees", "47 degrees"], correct: 1 },
  { id: 24, question: "For a coordinated rate 1 left turn at an AOB of 27 degrees, the TAS should be?", options: ["200 Kts", "250 Kts", "300 Kts", "350 Kts"], correct: 2 },
  { id: 25, question: "The QFU is on a turn indicator must have ...... gimbal and ...... degrees of freedom?", options: ["One, one", "Two, one", "Two, two", "Three, two"], correct: 0 },
  { id: 26, question: "In a right turn, the needle is out to the right and the ball is out to the left. The corrective action is?", options: ["A left turn with too much bank", "A right turn with too much bank", "A left turn with too little bank", "A right turn with too little bank"], correct: 1 },
  { id: 27, question: "What does it indicate if both the needle and ball of a needle-and-ball indicator are on the right?", options: ["Turning right with too much bank", "Turning right with too little bank", "Turning left with too much bank", "Turning left with not enough bank"], correct: 1 },
  { id: 28, question: "When in flight the needle of a turn and slip indicator is to the left and the ball is out to the right, the aircraft is?", options: ["Turning left with too much bank", "Turning left with not enough bank", "Turning right with too much bank", "Turning right with not enough bank"], correct: 0 },
  { id: 29, question: "What are the essential properties of a turn indicator?\n1. Two degrees of freedom\n2. One degree of freedom\n3. Horizontal spin axis\n4. Longitudinal spin axis", options: ["1, 3", "2, 3", "1, 4", "2, 4"], correct: 1 },
  { id: 30, question: "What angle of bank would give a rate 1 turn at 120 Kts?", options: ["10 degrees", "14 degrees", "18 degrees", "22 degrees"], correct: 2 },
  { id: 31, question: "What does a turn and slip indicator show in a right turn on the ground?", options: ["Right turn with too much bank", "Right turn with too little bank", "Needle right, ball right", "Needle left, ball right"], correct: 2 },
  { id: 32, question: "What should a turn and slip indicator show in a right turn in a banked turn, the aircraft is?", options: ["Needle left and ball left", "Needle left and ball right", "Needle right and ball right", "Needle right and ball left"], correct: 2 },
  { id: 33, question: "TAS in a turn, the turn indicator measures?", options: ["Angular velocity about the vertical axis", "Angular velocity about the lateral axis", "Bank angle", "Heading change rate"], correct: 0 },
  { id: 34, question: "What factors affect the turn indicator?", options: ["AOB, TAS", "TAS, weight", "AOB, weight", "AOB, altitude"], correct: 0 },
  { id: 35, question: "If the mass of the aircraft in question 34 above was decreased to 45000 Kg?", options: ["It would increase the required AOB", "It would decrease the required AOB", "It would not affect the required AOB", "It would double the required AOB"], correct: 2 },
  { id: 36, question: "If the turn and slip indicator shows needle left and ball left in a banked turn, the aircraft is ...... and the required corrective action is ......?", options: ["Skidding, push left pedal forward", "Skidding, push right pedal forward", "Slipping, push left pedal forward", "Slipping, push right pedal forward"], correct: 2 },
];

export const kwInstAttitudeTopic: Topic = {
  id: "kw-inst-attitude",
  title: "Attitude Indicators",
  questions: attitudeQuestions,
};

export const kwInstTurnSlipTopic: Topic = {
  id: "kw-inst-turnslip",
  title: "Turn & Slip Indicators",
  questions: turnSlipQuestions,
};
