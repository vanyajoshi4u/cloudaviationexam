import { type Topic, type MCQuestion } from "./icJoshiQuestions";

const techPaper1Questions: MCQuestion[] = [
  {
    id: 1,
    question: "Using counter-rotation propellers has the effect of:",
    options: [
      "Cancelling out the gyroscopic and torque effect",
      "Cancelling out the gyroscopic effect and increasing the torque",
      "Increasing the gyroscopic effect and the torque",
    ],
    correct: 0,
  },
  {
    id: 2,
    question: "With an increase in temperature, the service ceiling would:",
    options: ["Increase", "Decrease", "Remain unaffected"],
    correct: 1,
  },
  {
    id: 3,
    question: "In the choke tube area of the fuel nozzle, an area of:",
    options: [
      "High pressure is found",
      "Low pressure is found",
      "There is no difference in pressure",
    ],
    correct: 1,
  },
  {
    id: 4,
    question: "As air density decreases, density altitude will:",
    options: ["Increase", "Decrease", "Remain unaffected"],
    correct: 0,
  },
  {
    id: 5,
    question: "If the atmospheric pressure and temperature remain the same, how would an increase in humidity affect take-off performance?",
    options: [
      "Shorter take-off distance, the air is less dense",
      "Longer take-off distance, the air is dense",
      "Longer take-off distance, the air is less dense",
    ],
    correct: 2,
  },
  {
    id: 6,
    question: "Which airspeed would a pilot be unable to identify by the colour coding of an ASI?",
    options: [
      "The maximum landing gear extended speed",
      "The maximum flap operating speed",
      "The never exceed speed",
    ],
    correct: 0,
  },
  {
    id: 7,
    question: "If the landing gear on an aircraft moves forward during retraction the:",
    options: [
      "Total moments will decrease",
      "Total moments will remain the same",
      "Total moments will increase",
    ],
    correct: 2,
  },
  {
    id: 8,
    question: "The tendency of an aircraft to develop forces which restore it to its original condition, when disturbed from a condition of steady flight, is known as:",
    options: ["Controllability", "Manoeuvrability", "Stability"],
    correct: 2,
  },
  {
    id: 9,
    question: "When carburettor heating is used, it:",
    options: [
      "Enriches the mixture",
      "Leans the mixture",
      "Puts more air into the mixture",
    ],
    correct: 0,
  },
  {
    id: 10,
    question: "Differential ailerons are installed to:",
    options: [
      "Improve lateral stability",
      "Prevent spiral instability",
      "Reduce adverse aileron yaw",
    ],
    correct: 2,
  },
  {
    id: 11,
    question: "The 'blow-out' process on turbine engines is:",
    options: [
      "To get rid of excess fuel after an aborted start",
      "When the turbine section explodes after overspeeding",
      "Timing the run-down to check for structural failure",
    ],
    correct: 0,
  },
  {
    id: 12,
    question: "Why is the angle of attack increased during a turn?",
    options: [
      "To compensate for increased aeroplane drag",
      "To compensate for the reduced horizontal lift component",
      "To compensate for the reduced vertical lift component",
    ],
    correct: 2,
  },
  {
    id: 13,
    question: "Where does a magneto get its current from?",
    options: ["Battery", "E.M.F. (generators)", "Magnets"],
    correct: 2,
  },
  {
    id: 14,
    question: "Aircraft A has a span of 50 ft and a chord of 5 ft. Aircraft B has a span of 80 ft and a chord of 10 ft. Aircraft C has a span of 48 ft and a chord of 4 ft. Which aircraft has the highest aspect ratio and which has the lowest?",
    options: ["A & B", "B & C", "C & B"],
    correct: 2,
  },
  {
    id: 15,
    question: "Referring to: Aircraft A (span 50 ft, chord 5 ft), Aircraft B (span 80 ft, chord 10 ft), Aircraft C (span 48 ft, chord 4 ft). Which of the aircraft has the highest stalling angle?",
    options: ["A", "B", "C"],
    correct: 1,
  },
  {
    id: 16,
    question: "A tail-dragger aircraft with a propeller turning clockwise as viewed from the cockpit tends to turn the aircraft:",
    options: [
      "Left around the vertical axis and left around the longitudinal axis",
      "Right around the vertical axis and left around the longitudinal axis",
      "Left around the vertical axis and right around the longitudinal axis",
    ],
    correct: 0,
  },
  {
    id: 17,
    question: "At sea level, the Manifold gauge will read:",
    options: ["29.92 inches Hg", "1013.25 hPa", "Static pressure"],
    correct: 0,
  },
  {
    id: 18,
    question: "The correct way to increase power on piston prop is:",
    options: [
      "Throttle, RPM, Mixture",
      "RPM, Mixture, Throttle",
      "Mixture, RPM, Throttle",
    ],
    correct: 2,
  },
  {
    id: 19,
    question: "When the weight of the aircraft is increased the stalling speed will:",
    options: ["Increase", "Decrease", "Remain the same"],
    correct: 0,
  },
  {
    id: 20,
    question: "What power supply is used to supply an aircraft instrument that operates on alternating current?",
    options: [
      "An alternator that is mechanically driven by the engine",
      "An inverter",
      "A transformer",
    ],
    correct: 1,
  },
  {
    id: 21,
    question: "A crankshaft with counter balance can be damaged by:",
    options: [
      "Carburettor icing",
      "Closing and opening the throttle in rapid succession",
      "Operating the engine with too rich a mixture",
    ],
    correct: 1,
  },
  {
    id: 22,
    question: "When flying for endurance, an aircraft must be flown at:",
    options: [
      "Minimum power speed",
      "Full throttle height",
      "Minimum drag speed",
    ],
    correct: 0,
  },
  {
    id: 23,
    question: "What is the reason for the twist in the propeller?",
    options: [
      "To keep the propeller flying at the most efficient angle at all sections",
      "To cancel out the effect of the high speed near the tips",
      "Design requirement to keep the centrifugal twist axis in the centre",
    ],
    correct: 0,
  },
  {
    id: 24,
    question: "In relation to a generator, an alternator will:",
    options: [
      "Provide less electrical power",
      "Provide more power at lower RPM",
      "Weigh more and be bigger",
    ],
    correct: 1,
  },
  {
    id: 25,
    question: "An aircraft magneto depends on the following to generate electrical power:",
    options: ["The battery", "The generator", "Magnets"],
    correct: 2,
  },
  {
    id: 26,
    question: "An oleo leg relies on the following for its operation:",
    options: [
      "Torque link and shimmy damper",
      "Rubber blocks or bungees",
      "Oil and air",
    ],
    correct: 2,
  },
  {
    id: 27,
    question: "Absorption of water into aviation fuel is more likely:",
    options: [
      "With cold fuel",
      "In hot fuel",
      "The temperature of the fuel has no effect",
    ],
    correct: 1,
  },
  {
    id: 28,
    question: "To eliminate the risk of fire when refuelling:",
    options: [
      "You should use plastic containers",
      "Bond the aircraft to the fuel nozzle",
      "Have an earth lead between ground, fuel truck, fuel nozzle and the aircraft",
    ],
    correct: 2,
  },
  {
    id: 29,
    question: "Operation of the mixture control to the lean position controls:",
    options: [
      "The amount of fuel entering the inlet manifold is reduced",
      "The amount of air entering the inlet manifold is increased",
      "The amount of air entering the inlet manifold is reduced",
    ],
    correct: 0,
  },
  {
    id: 30,
    question: "A breakage or disconnection of the magneto earth wire will have the effect of:",
    options: [
      "Stopping the engine",
      "Causing the engine to run roughly",
      "Make it impossible to stop the engine by switching off ignition",
    ],
    correct: 2,
  },
  {
    id: 31,
    question: "An ignition system in which the spark can be lethal is used on:",
    options: [
      "Piston engines and turbine engines",
      "Turbine engines only",
      "Piston engines only",
    ],
    correct: 1,
  },
];

export const dgcaPreviousTechPaper1: Topic = {
  id: "dgca-prev-tech-paper-1",
  title: "Technical General Paper 1",
  questions: techPaper1Questions,
};

export const dgcaPreviousTechTopics: Topic[] = [dgcaPreviousTechPaper1];
