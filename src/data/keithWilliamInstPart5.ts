import { type MCQuestion, type Topic } from "./icJoshiQuestions";

// AIRSPEEDS (24 Questions)
const airspeedQuestions: MCQuestion[] = [
  { id: 1, question: "Considering the maximum operational Mach number (MMO) and the maximum operational speed (VMO), the captain of a pressurised aircraft begins his descent from a high flight level. In order to meet his scheduled time of arrival, he decides to use the maximum ground speed at any time of the descent. He will be limited?", options: ["By the MMO", "By the VMO in still air", "Initially by the MMO, then by the VMO below a certain flight level", "Initially by the VMO, then by the MMO below a certain flight level"], correct: 2 },
  { id: 2, question: "In a standard atmosphere and at the sea level, the calibrated airspeed (CAS) is?", options: ["Lower than the true airspeed (TAS)", "Equal to the true airspeed (TAS)", "Independent of the true airspeed (TAS)", "Higher than the true airspeed (TAS)"], correct: 1 },
  { id: 3, question: "With a constant weight, irrespective of the airfield altitude, an aircraft always takes off at the same?", options: ["Calibrated airspeed", "Ground speed", "True airspeed", "Equivalent airspeed"], correct: 0 },
  { id: 4, question: "The calibrated airspeed (CAS) is obtained by applying to the indicated airspeed (IAS)?", options: ["A compressibility and density correction", "An instrument and position/pressure error correction", "An antenna and compressibility correction", "An instrument and density correction"], correct: 1 },
  { id: 5, question: "The velocity maximum operating (VMO) is a speed expressed in?", options: ["True airspeed (TAS)", "Computed airspeed (COAS)", "Calibrated airspeed (CAS)", "Equivalent airspeed (EAS)"], correct: 2 },
  { id: 6, question: "The limits of the white scale of an airspeed indicator are?", options: ["VSI for the lower limit and VFE for the upper limit", "VSO for the lower limit and VLE for the upper limit", "VSI for the lower limit and VNO for the upper limit", "VSO for the lower limit and VFE for the upper limit"], correct: 3 },
  { id: 7, question: "The limits of the green scale of an airspeed indicator are?", options: ["VSI for the lower limit and VNE for the upper limit", "VSI for the lower limit and VLO for the upper limit", "VSI for the lower limit and VNO for the upper limit", "VSO for the lower limit and the upper limit"], correct: 2 },
  { id: 8, question: "The limits of the yellow scale of an airspeed indicator are?", options: ["VLO for the lower limit and VNE for the upper limit", "VLE for the lower limit and VNE for the upper limit", "VFE for the lower limit and VNE for the upper limit", "VNO for the lower limit and VNE for the upper limit"], correct: 3 },
  { id: 9, question: "During a straight and uniform climb, the pilot maintains a constant calibrated airspeed (CAS)?", options: ["The Mach number increases and the true airspeed (TAS) increases", "The Mach number increases and the true airspeed (TAS) is constant", "The Mach number is constant and the true airspeed (TAS) decreases", "The Mach number decreases and the true airspeed (TAS) decreases"], correct: 0 },
  { id: 10, question: "VLE is the maximum?", options: ["Speed authorised in flight", "Flight speed with landing gear down", "Speed at which the landing gear can be extended or retracted", "Speed with flaps extended in a given position"], correct: 1 },
  { id: 11, question: "VLO is the maximum speed?", options: ["Speed at which the landing gear can be operated", "Flight speed with landing gear can be extended or retracted", "Speed with flaps extended in landing position", "Cruising speed not to be exceeded except in still air with caution"], correct: 0 },
  { id: 12, question: "VNE is the maximum speed?", options: ["At which the flight controls can be fully deflected", "With flaps extended in landing position", "Which must never be exceeded", "Not to be exceeded except in still air and with caution"], correct: 2 },
  { id: 13, question: "VNO is the maximum speed?", options: ["Speed not to be exceeded except in still air and with caution", "Flight speed with landing gear down", "Speed with flaps extended in a given position", "Not to be exceeded except in still air with caution"], correct: 0 },
  { id: 14, question: "For a constant Calibrated Airspeed (CAS) and a level flight, a fall in ambient temperature will result in a?", options: ["Lower True Airspeed (TAS) due to a decrease in air density", "Lower True Airspeed (TAS) due to an increase in air density", "Higher True Airspeed (TAS) due to a decrease in air density", "Higher True Airspeed (TAS) due to an increase in air density"], correct: 1 },
  { id: 15, question: "When climbing at a constant Mach number below the tropopause, in ISA conditions, the Calibrated Airspeed (CAS) will?", options: ["Decrease", "Increase at a linear rate", "Remain constant", "Increase at an exponential rate"], correct: 0 },
  { id: 16, question: "If the outside temperature at 35 000 feet is -40°C, the local speed of sound is?", options: ["686 kt", "596 kt", "247 kt", "307 kt"], correct: 1 },
  { id: 17, question: "When descending through an isothermal layer at a constant Calibrated Airspeed (CAS), the True Airspeed (TAS) will?", options: ["Decrease", "Increase at a linear rate", "Remain constant", "Increase at an exponential rate"], correct: 0 },
  { id: 18, question: "In a steady climb with the auto-throttle maintaining a constant calibrated airspeed. If the total temperature remains constant, the Mach number?", options: ["Decreases", "Remains constant", "Decreases if the static temperature is lower than the standard temperature", "Increases"], correct: 3 },
  { id: 19, question: "The airspeed indicator of a twin-engined aircraft comprises different sectors and color marks. The blue line corresponds to the?", options: ["Maximum speed in operations, or VMO", "Optimum climbing speed with one engine inoperative, or Vy", "Speed not to be exceeded, or VNE", "Minimum control speed, or VMC"], correct: 1 },
  { id: 20, question: "The airspeed indicator of an aircraft is provided with a moving red and white hatched pointer. This pointer indicates the?", options: ["Speed indicated on the auto-throttle control box, versus temperature", "Speed indicated on the auto-throttle control box versus altitude", "Maximum speed in VMO operation versus altitude", "Maximum speed in VMO operation, versus temperature"], correct: 2 },
  { id: 21, question: "VFE is the maximum speed?", options: ["At which the flaps can be operated", "Speed indicated in take-off position", "At which the flaps are extended in a given position", "With flaps extended in landing position"], correct: 2 },
  { id: 22, question: "An airplane is in steady descent. The auto-throttle maintains a constant Mach number. If the total temperature remains constant, the calibrated airspeed?", options: ["Remains constant", "Decreases if the static temperature is lower than the standard temperature, increases if above", "Increases", "Decreases"], correct: 2 },
  { id: 23, question: "An aeroplane is in steady descent below the tropopause in the ISA. The auto-throttle maintains a constant calibrated airspeed. If the total temperature remains constant, the Mach number?", options: ["Increases if the static temperature is lower than the standard temperature, decreases if higher", "Decreases", "Increases", "Remains constant"], correct: 1 },
  { id: 24, question: "An aeroplane is in a steady climb. The auto-throttle maintains a constant Mach number. If the total temperature remains constant, the Mach number?", options: ["Decreases", "Remains constant", "Decreases if the static temperature is lower than the standard temperature", "Increases"], correct: 1 },
];

// MACH METERS (40 Questions)
const machQuestions: MCQuestion[] = [
  { id: 1, question: "How will mach meter indication respond if an aircraft is flying at FL70 when it experiences a reduction in OAT?", options: ["No change", "Increase", "Decrease", "Increase or decrease depending on TAT"], correct: 0 },
  { id: 2, question: "What is the LSS at 30000 ft if ambient temperature is -40°C?", options: ["579 Kts", "660 Kts", "584 Kts", "594 Kts"], correct: 0 },
  { id: 3, question: "Which of the following best defines Mach number?", options: ["The ratio of TAS:LSS", "The ratio of LSS:TAS", "The ratio of CAS:LSS", "The ratio of ambient density to that at msl in the ISA"], correct: 0 },
  { id: 4, question: "A mach meter comprises of?", options: ["A combination of ASI and altimeter", "A combination of VSI and altimeter", "An ASI with a modified scale", "An altimeter with its scale marked in mach numbers"], correct: 0 },
  { id: 5, question: "What is the LSS at 40000 ft in the ISA?", options: ["542 Kts", "660 Kts", "573 Kts", "550 Kts"], correct: 0 },
  { id: 6, question: "How will mach meter indication vary in a constant CAS climb?", options: ["Increase", "Decrease", "Increase then remain constant", "Increase or decrease depending on airspeed"], correct: 0 },
  { id: 7, question: "What is the LSS at msl ISA?", options: ["600 Kts", "550 Kts", "750 Kts", "661 Kts"], correct: 3 },
  { id: 8, question: "Mach meter indications?", options: ["Vary with airspeed and temperature", "Vary only with airspeed", "Vary only with temperature", "Vary with density and altitude"], correct: 0 },
  { id: 9, question: "How will mach meter indication respond if an aircraft passes through a cold front when flying at constant CAS and altitude?", options: ["Increase", "Decrease", "Remain constant", "Increase or decrease depending on altitude"], correct: 0 },
  { id: 10, question: "How will the mach meter respond in a constant CAS climb if the static source becomes blocked?", options: ["Increase", "Decrease", "Remain constant", "Increase or decrease depending on airspeed"], correct: 2 },
  { id: 11, question: "How will the mach meter respond in a constant TAS climb if the static source becomes blocked?", options: ["Increase", "Decrease", "Remain constant", "Increase or decrease depending on airspeed"], correct: 2 },
  { id: 12, question: "How will the mach meter respond in a constant mach number climb if the static source becomes blocked?", options: ["Increase", "Decrease", "Remain constant", "Increase or decrease depending on airspeed"], correct: 2 },
  { id: 13, question: "The indications on a mach meter are independent of?", options: ["Dynamic pressure", "Ambient temperature", "Static pressure", "Total pressure"], correct: 1 },
  { id: 14, question: "What happens to mach meter indication in a constant RAS climb?", options: ["Increases", "Decreases", "Increases then remains constant", "Increases unless in an inversion or isothermal layer"], correct: 0 },
  { id: 15, question: "What would happen if the static pipe became detached from the back of a mach meter in a pressurised aircraft at high altitude?", options: ["Under read", "Over read", "No effect", "Under read or over read depending on temperature"], correct: 0 },
  { id: 16, question: "If an aircraft climbs at constant TAS from FL 200 to FL 400 the mach meter indication will?", options: ["Increase", "Decrease", "Increase then remain constant", "Decrease then remain constant"], correct: 2 },
  { id: 17, question: "A mach meter is made up of?", options: ["An altimeter with a density capsule", "An ASI with an altitude capsule", "A VSI with a modified scale", "An ASI with a modified scale"], correct: 1 },
  { id: 18, question: "VMO is calculated based on?", options: ["TAS", "RAS", "CAS", "EAS"], correct: 2 },
  { id: 19, question: "Mach number is the ratio of?", options: ["IAS:TAS", "CAS:LSS", "TAS:LSS", "RAS:TAS"], correct: 2 },
  { id: 20, question: "If the static source becomes blocked when flying at constant CAS and altitude, the mach meter will?", options: ["Over indicate", "Under indicate", "Not indicate", "Freeze"], correct: 3 },
  { id: 21, question: "If temperature decreases when flying at constant TAS from FL 200 to FL 400 the mach meter indication will .....?", options: ["Increase, decrease, not change, increase", "Decrease, decrease, not change, increase", "Not change, increase", "Not change, decrease"], correct: 0 },
  { id: 22, question: "Mach meter indications?", options: ["Are temperature related", "Increase with temperature", "Decrease with temperature", "Are independent of temperature"], correct: 3 },
  { id: 23, question: "The speed of sound at ISA msl is?", options: ["550 Kts", "560 Kts", "660 Kts", "670 kts"], correct: 2 },
  { id: 24, question: "If ambient temperature is -10°C, what is the mach number when TAS is 594 Kts?", options: ["0.5M", "0.75M", "0.94M", "1.5M"], correct: 2 },
  { id: 25, question: "The speed of sound at 25000 ft ISA is?", options: ["600 Kts", "602 Kts", "604 Kts", "606 Kts"], correct: 2 },
  { id: 26, question: "What is true mach number at 25000 ft ISA if the TAS is 500 Kts?", options: ["0.75M", "0.83M", "0.90M", "0.93M"], correct: 1 },
  { id: 27, question: "A mach meter indicates mach number based on the ratio of?", options: ["Static pressure to pitot pressure", "Pitot pressure to static pressure", "Dynamic pressure to static pressure", "Static pressure to dynamic pressure"], correct: 2 },
  { id: 28, question: "How will CAS respond if temperature increases by 5 degrees C when flying at a constant indicated mach number at FL290?", options: ["Increases", "Decreases", "Remains approximately constant", "Depends on conditions relative to ISA"], correct: 2 },
  { id: 29, question: "What happens to TAT when an aircraft descends at constant indicated mach number?", options: ["Increases", "Decreases", "Remain constant", "Remains constant then increases"], correct: 0 },
  { id: 30, question: "What is actually measured by a mach meter?", options: ["Pilot pressure", "The ratio of (pitot pressure - static pressure) : static pressure", "The ratio of static pressure to dynamic pressure", "The ratio of (static pressure + pitot pressure) : pitot pressure"], correct: 1 },
  { id: 31, question: "When descending at constant CAS, the TAT and mach meter indications should?", options: ["Increase, increase", "Increase, decrease", "Increase then remain constant", "Remain constant"], correct: 1 },
  { id: 32, question: "Mach meter indications are derived from?", options: ["(PT − PS)/PT", "(PS − PT)/PS", "(PT − PS)/PS", "(PS − PT)/PT"], correct: 2 },
  { id: 33, question: "If temperature increases by 5 degrees C during a constant indicated mach number ascent, what will happen to CAS?", options: ["Increase by 5 Kts", "Increase by 10 Kts", "Remain constant", "Increase or decrease depending on whether conditions are above or below ISA"], correct: 2 },
  { id: 34, question: "A mach meter compares?", options: ["(PT − PD) to PT", "(PS − PT) to PS", "(PT − PS) to PS", "(PS − PT) to PT"], correct: 2 },
  { id: 35, question: "What does mach number represent?", options: ["The CAS of an aircraft as a fraction of the local speed of sound", "The local speed of sound as a fraction of the CAS of an aircraft", "The TAS of an aircraft as a fraction of the local speed of sound", "The local speed of sound as a fraction of the TAS of an aircraft"], correct: 2 },
  { id: 36, question: "What is the local speed of sound at sea level if the ambient temperature is 20°C?", options: ["661 Kts", "666 Kts", "677 Kts", "680 Kts"], correct: 1 },
  { id: 37, question: "If ambient temperature increases by 10 degrees, for an aircraft flying at constant TAS, the indicated mach number will ..... and the true mach number will .....?", options: ["Increase, decrease", "Decrease, decrease", "Not change, increase", "Not change, decrease"], correct: 3 },
  { id: 38, question: "When climbing at constant CAS, if temperature remains constant the indicated mach number will?", options: ["Remain constant", "Increase", "Decrease", "Increase exponentially"], correct: 0 },
  { id: 39, question: "When descending at constant CAS, if temperature remains constant the mach number will?", options: ["Remain constant", "Increase", "Decrease", "Increase exponentially"], correct: 0 },
  { id: 40, question: "What should the mach meter indicate when flying at 500 kts TAS at FL 250, if the ambient temperature is -30°C?", options: ["0.52M", "0.62M", "0.72M", "0.82M"], correct: 3 },
];

// GYROSCOPES (3 Questions - Partial, PDF truncated at 50 pages)
const gyroQuestions: MCQuestion[] = [
  { id: 1, question: "The building principle of a gyroscope, the best efficiency is obtained through the concentration of the mass?", options: ["Close to the axis and with a low rotation speed", "On the periphery and with a high rotation speed", "Close to the axis and with a high rotation speed", "On the periphery and with a low rotation speed"], correct: 1 },
  { id: 2, question: "A Standby horizon or emergency attitude indicator?", options: ["Only works if there is a complete electrical failure", "Contains its own separate gyro", "Is automatically connected to the primary vertical gyro if the alternator fails", "Is fully independent of external energy resources in an emergency situation"], correct: 1 },
  { id: 3, question: "The basis properties of a gyroscope are?\n1. The gyro's weight\n2. The rigidity in space\n3. The inertia\n4. The high RPM\n5. The precession", options: ["3, 4", "2, 5", "2, 3, 5", "1, 3, 5"], correct: 1 },
];

export const kwInstAirspeedsTopic: Topic = {
  id: "kw-inst-airspeeds",
  title: "Airspeeds",
  questions: airspeedQuestions,
};

export const kwInstMachTopic: Topic = {
  id: "kw-inst-mach",
  title: "Mach Meters",
  questions: machQuestions,
};

export const kwInstGyroTopic: Topic = {
  id: "kw-inst-gyro",
  title: "Gyroscopes (Partial)",
  questions: gyroQuestions,
};
