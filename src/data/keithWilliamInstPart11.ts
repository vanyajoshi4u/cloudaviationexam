import { type MCQuestion, type Topic } from "./icJoshiQuestions";

// FLIGHT DIRECTOR (20 Questions)
const flightDirectorQuestions: MCQuestion[] = [
  { id: 1, question: "Flight Director modes are displayed on the?", options: ["EFIS Primary Flight Display", "EFIS Navigation Display", "EICAS or ECAM", "FD controller panel"], correct: 0 },
  { id: 2, question: "A Flight Director system comprises?\n1. A computer\n2. An auto-throttle\n3. Command bars\n4. Mode controller", options: ["1, 3, 4", "1, 2, 3", "1, 2, 3, 4", "3, 4 only"], correct: 0 },
  { id: 3, question: "The aim of the flight director is to?", options: ["Provide information to the pilot allowing him to follow a desired flight path optimally", "Control the aircraft automatically", "Replace the autopilot", "Display engine information"], correct: 0 },
  { id: 4, question: "The Flight Director bars are?", options: ["Always visible in flight when FD is engaged", "Sometimes visible in auto-throttle mode", "Visible only during approach", "Visible only when autopilot is engaged"], correct: 0 },
  { id: 5, question: "The flight director command bars indicate the optimum path to intercept and track a selected radial?", options: ["Permitting reaching a selected radial over a minimum distance", "Using a constant heading to the radial", "By flying directly to the VOR", "By following the aircraft heading"], correct: 0 },
  { id: 6, question: "The flight director indicates?", options: ["The maneuvers to execute to achieve or maintain a flight situation", "Repeats the ADI and HSI information", "Engine parameters", "Weather information"], correct: 0 },
  { id: 7, question: "The command bars indicate that you must fly towards them - 'Fly to the bars'. If the pitch bar is above centre and the roll bar is to the left?", options: ["Increase pitch attitude and bank to the left", "Decrease pitch attitude and bank to the right", "Increase pitch attitude and bank to the right", "Decrease pitch attitude and bank to the left"], correct: 0 },
  { id: 8, question: "What commands are being indicated by the FD when the pitch bar is below and roll bar is to the right?", options: ["Go down and right", "Go up and left", "Go down and left", "Go up and right"], correct: 0 },
  { id: 9, question: "If the FD pitch bar is below centre and roll bar is to the left?", options: ["Go down and left", "Go up and right", "Go down and right", "Go up and left"], correct: 0 },
  { id: 10, question: "If the FD pitch bar is above centre and roll bar is to the right?", options: ["Go up and right", "Go up and left", "Go down and right", "Go down and left"], correct: 0 },
  { id: 11, question: "On which instrument are the FD bars normally displayed?", options: ["EFIS ND", "EFIS PFD (ADI)", "EICAS or ECAM", "PPI"], correct: 1 },
  { id: 12, question: "What will the flight director do if heading is changed to 350 when current heading is 180?", options: ["The roll bar will move to the right indicating a right turn", "The roll bar will move to the left indicating a left turn", "The bars will not move", "The pitch bar will move up"], correct: 0 },
  { id: 13, question: "Having programmed the flight director, the aircraft should?", options: ["Follow the command bars to achieve the desired flight path", "Be flown on raw data", "Ignore the FD indications", "Switch to autopilot"], correct: 0 },
  { id: 14, question: "If heading is selected to the right, the FD roll bar will?", options: ["Move right then centralise as selected heading is reached", "Move left", "Move down", "Remain central"], correct: 0 },
  { id: 15, question: "Where are the flight director modes displayed?", options: ["EFIS ND", "EFIS PFD (FMA section)", "EICAS/ECAM", "FD controller"], correct: 1 },
  { id: 16, question: "The FD system provides?", options: ["Command guidance to the pilot on the PFD", "Automatic control of the aircraft", "Engine monitoring capability", "Navigation display data"], correct: 0 },
  { id: 17, question: "The basic ECAM system has?", options: ["Right screen shows system diagrams, left screen shows engine/warning data", "Both screens show identical information", "Only one screen", "Three screens"], correct: 0 },
  { id: 18, question: "The localiser capture indication on the FMA shows?", options: ["The localiser system has been armed", "The localiser beam has been captured", "The localiser has been armed and is ready for capture", "The ILS approach is complete"], correct: 1 },
  { id: 19, question: "When the auto-throttle holds IAS/Mach in the speed mode and the autopilot holds attitude in climb mode, the system is operating in?", options: ["LVL CHG (Level Change) mode", "VNAV mode", "FLCH (Flight Level Change) mode", "Speed/Attitude climb mode"], correct: 0 },
  { id: 20, question: "What happens at 50 ft AGL during an autoland?", options: ["The glideslope signal is disconnected and flare mode activates", "The autopilot disconnects", "The auto-throttle increases thrust", "The flight director bars remove"], correct: 0 },
];

// ENGINES & TEMPERATURE (50 Questions)
const enginesQuestions: MCQuestion[] = [
  { id: 1, question: "The temperature measured by the CHT (Cylinder Head Temperature) probe is?", options: ["Temperature within the hottest cylinder depending on its position", "Temperature of the exhaust manifold", "Temperature of the intake air", "Average temperature of all cylinders"], correct: 0 },
  { id: 2, question: "The signal supplied by a transmitter fitted with a 3-phase AC generator, connected to an RPM indicator?", options: ["Is a DC voltage varying with RPM", "Is an AC voltage varying with RPM", "Is a constant frequency signal", "Is a pulse signal"], correct: 1 },
  { id: 3, question: "The Engine Pressure Ratio (EPR) is computed by?", options: ["Two pressure sensors measuring inlet and outlet pressures", "Two accelerometers", "Two high and low frequency filters", "A frequency converter"], correct: 0 },
  { id: 4, question: "A synchroscope is used on aircraft to?", options: ["Reduce the vibration of each engine", "Achieve optimum control of on-board voltages", "Set several engines to the same speed", "Measure engine temperature"], correct: 2 },
  { id: 5, question: "A thermocouple type thermometer consists of?", options: ["A single-wire metal winding", "Two metal conductors of dissimilar type connected at two points", "A Wheatstone bridge connected to a voltage indicator", "A resistance temperature device"], correct: 1 },
  { id: 6, question: "The yellow sector of the temperature gauge corresponds to?", options: ["A frequent operating range", "A forbidden operating range", "An exceptional operating range (caution)", "A normal operating range"], correct: 2 },
  { id: 7, question: "In order to measure the cylinder head temperature, the CHT gauge utilises?", options: ["A thermocouple consisting of two dissimilar metals", "A Wheatstone bridge circuit", "A ratiometer circuit", "A Bourdon tube"], correct: 0 },
  { id: 8, question: "A thermocouple type temperature gauge gives accurate values provided that the temperature of the?", options: ["Cold junction is maintained constant", "Hot junction is maintained constant", "Cold junction is maintained at 15°C", "Hot junction is maintained at 15°C"], correct: 0 },
  { id: 9, question: "The main advantage of a ratiometer-type temperature indicator is that it?", options: ["Is simple and requires no calibration", "Is very accurate and unaffected by supply voltage variations", "Is cheap to manufacture", "Has a fast response time"], correct: 1 },
  { id: 10, question: "The measurement of the turbine temperature or of the EGT is carried out at the?", options: ["Combustion chamber outlet", "Combustion chamber intake", "High pressure compressor intake", "High pressure turbine outlet"], correct: 3 },
  { id: 11, question: "The operating principle of the 'induction' type tachometer is to measure the?", options: ["Electromotive force produced by a dynamo or alternator", "Magnetic field strength", "Magnetic field produced by a dynamo or alternator", "Rotation speed of an asynchronous motor energized by an alternator"], correct: 3 },
  { id: 12, question: "The sensors used to measure the exhaust temperature of aircraft equipped with turbojets are?", options: ["Thermocouples", "Resistance temperature devices", "Thermistors", "Bi-metallic strips"], correct: 0 },
  { id: 13, question: "Full Authority Digital Engine Control (FADEC) has the following functions:\n1. Fuel flow regulation during decelerations and accelerations\n2. Automatic starting sequence\n3. Transmission of engine data to pilot's instruments\n4. Thrust management\n5. Protection of operating limits\nThe combination of correct statements is?", options: ["1, 3, 4, 5", "1, 2, 3, 4, 5", "2, 4, 5", "1, 3, 5"], correct: 1 },
  { id: 14, question: "The two main sources of information used to calculate turbojet thrust are?", options: ["Fan rotation speed (N1) or EPR", "Fan rotation speed (N1) or total pressure at LP turbine outlet", "HP turbine rotation speed or EPR", "Fan rotation speed (N1) or total pressure at HP compressor outlet"], correct: 0 },
  { id: 15, question: "What type of sensor is typically used to measure lubricating oil temperature in a turbojet engine?", options: ["Resistive probe", "Capacitive probe", "Thermocouple probe", "Bi-metal strip"], correct: 0 },
  { id: 16, question: "What type of sensors are used in an EPR gauge?", options: ["Bourdon tubes", "Bellows", "Differential capsules", "Aneroid capsules"], correct: 2 },
  { id: 17, question: "Jet engine exhaust gas temperature is measured using?", options: ["A thermocouple", "A thermistor", "A resistance probe", "A capacitive probe"], correct: 0 },
  { id: 18, question: "A temperature gauging system employing thermocouples can be graduated to indicate temperature by?", options: ["By keeping the cold junction at a known constant temperature", "By protecting the hot junction from high temperatures", "By using a single junction", "By varying the supply voltage"], correct: 0 },
  { id: 19, question: "What is a bellows used to measure?", options: ["Low pressures", "High pressures", "Low temperatures", "Density"], correct: 0 },
  { id: 20, question: "Vibration meters measure?", options: ["Accelerations", "Frequency in Hz", "Amplitude", "Period in seconds"], correct: 2 },
  { id: 21, question: "EPR is calculated by?", options: ["Dividing turbine outlet pressure by compressor inlet pressure", "Dividing compressor inlet pressure by HP turbine outlet pressure", "Subtracting LP compressor inlet pressure from turbine outlet pressure", "Adding inlet and outlet pressures"], correct: 0 },
  { id: 22, question: "A vibration meter indicates?", options: ["Frequency", "Pitch", "Period", "Relative amplitude"], correct: 3 },
  { id: 23, question: "What is EPR in a turbofan engine?", options: ["The ratio of turbine outlet pressure to compressor inlet pressure", "The ratio of HP turbine outlet pressure to HP compressor inlet pressure", "The ratio of fan outlet pressure to fan inlet pressure", "The ratio of combustion chamber pressure to inlet pressure"], correct: 0 },
  { id: 24, question: "If the EPR gauge compressor inlet air tapping becomes blocked?", options: ["The gauge will over-read during the take-off run", "The gauge will over-read in all conditions of flight", "The gauge will read zero", "The gauge will under-read"], correct: 1 },
  { id: 25, question: "Torque on a turbo-prop engine is indicated in?", options: ["Newton metres", "Percentage", "PSI", "All of the above depending on aircraft type"], correct: 3 },
  { id: 26, question: "Total air temperature is?", options: ["SAT plus kinetic heating effect", "SAT only", "Dynamic heating effect only", "OAT minus recovery factor"], correct: 0 },
  { id: 27, question: "The formula for TAT is?", options: ["TAT = SAT(1 + 0.2KM²)", "TAT = SAT(1 + 0.2KM)", "TAT = SAT/(1 - 0.2M)", "TAT = SAT(-KM²)"], correct: 0 },
  { id: 28, question: "The advantages of a thermocouple gauging system are?\n1. Self powered\n2. No moving parts in sensors\n3. Low voltages\n4. Simple and reliable", options: ["1, 2, 3", "1, 2, 3, 4", "1, 3 only", "2, 4 only"], correct: 1 },
  { id: 29, question: "What does a fuel flow meter measure?", options: ["The mass flow of fuel", "The volume flow of fuel", "The density of fuel", "The pressure of fuel"], correct: 0 },
  { id: 30, question: "A direct reading magnetic compass will be affected by?", options: ["Soft iron and hard iron", "Aluminium", "Plastic", "Carbon fibre"], correct: 0 },
];

// WARNING & RECORDING (5 Questions)
const warningRecQuestions: MCQuestion[] = [
  { id: 1, question: "The FDR in a JAR certificated aircraft must be located in?", options: ["The front of the aircraft", "The rear of the aircraft", "The undercarriage bay", "The outer wings"], correct: 1 },
  { id: 2, question: "In an aircraft certificated under JAR since 1 April 1998, the CVR must record for?", options: ["30 minutes", "60 minutes", "2 hours", "72 hours"], correct: 2 },
  { id: 3, question: "In an aircraft certificated under JAR since 1998, the FDR must record for?", options: ["30 minutes", "50 minutes", "10 hours", "25 hours"], correct: 3 },
  { id: 4, question: "A basic stall warning system monitors?", options: ["Angle of Attack", "CAS", "Mach number", "Slat and flap position"], correct: 0 },
  { id: 5, question: "Between what heights does GPWS operate?", options: ["Zero and 500 ft", "Zero and 2500 ft", "50 ft and 500 ft", "50 ft and 2500 ft"], correct: 1 },
];

export const kwInstFlightDirectorTopic: Topic = {
  id: "kw-inst-flight-director",
  title: "Flight Director",
  questions: flightDirectorQuestions,
};

export const kwInstEnginesTopic: Topic = {
  id: "kw-inst-engines",
  title: "Engines & Temperature",
  questions: enginesQuestions,
};

export const kwInstWarningRecTopic: Topic = {
  id: "kw-inst-warning-rec",
  title: "Warning & Recording Systems",
  questions: warningRecQuestions,
};
