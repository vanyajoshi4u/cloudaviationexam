import { type MCQuestion, type Topic } from "./icJoshiQuestions";

// RADIO ALTIMETERS (29 Questions)
const radioAltQuestions: MCQuestion[] = [
  { id: 1, question: "If the pressure feed line to a barometric altimeter becomes detached from the back of the instrument in flight the instrument will?", options: ["Read zero continuously", "Read cabin altitude", "Over read", "Under read"], correct: 1 },
  { id: 2, question: "During the approach, a crew reads on the radio altimeter the value of 650 ft. This is an indication of the true?", options: ["Height of the lowest wheels with regard to the ground at any time", "Height of the aircraft with regard to the ground at any time", "Height of the aircraft with regard to the runway", "Altitude of the aircraft"], correct: 1 },
  { id: 3, question: "For most radio altimeters, when a system error occurs during approach the?", options: ["Height indication is removed", "DH lamp flashes red and the audio signal sounds", "DH lamp flashes red", "Audio warning signal sounds"], correct: 0 },
  { id: 4, question: "A radio altimeter can be defined as a?", options: ["Ground radio aid used to measure the true height of the aircraft", "Ground radio aid used to measure the true altitude of the aircraft", "Self-contained on-board aid used to measure the true height of the aircraft", "Self-contained on-board aid used to measure the true altitude of the aircraft"], correct: 2 },
  { id: 5, question: "The data supplied by a radio altimeter?", options: ["Indicates the distance between the ground and the aircraft", "Concerns only the decision height", "Is used only by the radio altimeter indicator", "Is used by the automatic pilot in the altitude hold mode"], correct: 0 },
  { id: 6, question: "The low-altitude radio altimeters used in precision approaches:", options: ["Operate in the 1540-1660 MHz range", "Are of the pulsed type", "Are of the frequency modulation type", "Have an operating range of 0 to 5000 ft", "Have a precision of +/- 2 feet between 0 and 500 ft"], correct: 2 },
  { id: 7, question: "In low altitude radio altimeters, the reading is zero when main landing gear wheels are on the ground. For this, it is necessary to?", options: ["Change the display scale in short final, in order to have a precise readout", "Compensate residual altitude due to antennas height above the ground and coaxial cables length", "Account for signal processing time in the unit and apply a correction factor to the reading", "Place the antennas on the bottom of the aeroplane"], correct: 1 },
  { id: 8, question: "The operating frequency range of a low altitude radio altimeter is?", options: ["2700 MHz to 2900 MHz", "5 GHz", "4200 MHz to 4400 MHz", "5400 MHz or 9400 MHz"], correct: 2 },
  { id: 9, question: "Modern low altitude radio altimeters emit waves in the following frequency band?", options: ["HF (High Frequency)", "UHF (Ultra High Frequency)", "SHF (Super High Frequency)", "VLF (Very Low Frequency)"], correct: 2 },
  { id: 10, question: "The operation of the radio altimeter of a modern aircraft is based on?", options: ["Pulse modulation of the carrier wave", "A combination of frequency modulation and pulse modulation", "Frequency modulation of the carrier wave", "Amplitude modulation of the carrier wave"], correct: 2 },
  { id: 11, question: "In low altitude radio altimeters height measurement (above ground) is based upon?", options: ["A triangular amplitude modulation wave, for which modulation phase shift between transmitted and received waves after ground reflection is measured", "A frequency modulation wave, for which the frequency variation between the transmitted wave and the received wave after ground reflection is measured", "A pulse transmission, for which time between transmission and reception is measured on a circular scanning screen", "A wave transmission, for which the frequency shift by DOPPLER effect after ground reflection is measured"], correct: 1 },
  { id: 12, question: "The aircraft radio equipment which emits on a frequency of 4400 MHz is the?", options: ["Weather radar", "Primary radar", "Radio altimeter", "High altitude radio altimeter"], correct: 2 },
  { id: 13, question: "A radio altimeter is?", options: ["Aircraft based and indicates true altitude", "Aircraft based and indicates pressure altitude", "Aircraft based and indicates true height", "Ground based and employs microwaves"], correct: 2 },
  { id: 14, question: "Radio altimeters are based on the principle of?", options: ["Frequency modulation", "Pulse modulation", "Amplitude modulated carrier wave", "Continuous wave"], correct: 0 },
  { id: 15, question: "For the landing configuration a radio altimeter indicates?", options: ["Height of the aircraft above the ground", "Height of the flight deck above the ground", "Height of the main wheel above the ground", "Altitude"], correct: 0 },
  { id: 16, question: "Low altitude radio altimeters operate on the ......... waveband?", options: ["Metric", "Decimetric", "Centimetric", "Millimetric"], correct: 2 },
  { id: 17, question: "Low altitude altimeters use the ......... waveband?", options: ["HF", "VHF", "UHF", "SHF"], correct: 3 },
  { id: 18, question: "If there is a fault in the system the radalt display will?", options: ["Needle will disappear and an alarm flag will appear, possibly accompanied by an audio warning", "Freeze", "Turn red and activate visual and aural warnings", "Turn red and activate visual and aural warnings"], correct: 0 },
  { id: 19, question: "A radio altimeter measures?", options: ["True Altitude", "Pressure altitude", "Height above sea level", "Height above the ground or water over which the aircraft is flying"], correct: 3 },
  { id: 20, question: "A RADALT provides?", options: ["Radio altitude", "Pressure altitude", "Density altitude", "Height above terrain"], correct: 3 },
  { id: 21, question: "The failure of the radio altimeter would cause?", options: ["Loss of pressure altitude data", "Loss of density altitude data", "Loss of altitude data", "Loss of height data"], correct: 3 },
  { id: 22, question: "A radio altimeter has a maximum effective height because?", options: ["At greater heights the signal will be too weak", "At greater heights the signal will be undetectable", "At greater heights the signal will be absorbed by moisture in the air", "At greater heights signal from different modulation cycles will overlap"], correct: 3 },
  { id: 23, question: "Radio altimeters work on the principal of?", options: ["Frequency modulation", "Amplitude modulation", "Pulse modulation", "Pulse and amplitude modulation"], correct: 0 },
  { id: 24, question: "A RADALT employs ......... waveband?", options: ["HF", "VHF", "UHF", "SHF"], correct: 3 },
  { id: 25, question: "Radio altimeters employ?", options: ["FM", "AM", "Pulsed FM", "Pulse modulation"], correct: 0 },
  { id: 26, question: "A radio altimeter will indicate zero when the aircraft is on the ground because of?", options: ["Frequency modulation of the transmitted signal", "Allowance for the signal path through the aircraft", "Allowance for the height of the serials above the main wheels", "Beam width compensation", "Reduction in gain rate very close to the surface"], correct: 2 },
  { id: 27, question: "Radio altimeters are accurate only within the height range?", options: ["Zero to 50 ft", "Zero to 500 ft", "50 ft to 2700 ft", "Zero ft to 2500 ft"], correct: 3 },
  { id: 28, question: "The frequency range used by a low altitude radio altimeter is?", options: ["5 GHz", "115 GHz to 750 GHz", "1200 MHz to 1500 MHz", "4200 MHz to 4400 MHz"], correct: 3 },
  { id: 29, question: "A RADALT system is?", options: ["Ground based and measures true altitude", "Ground based and measures true height", "Aircraft based and measures true altitude", "Aircraft based and measures true height"], correct: 3 },
];

// VSI (14 Questions)
const vsiQuestions: MCQuestion[] = [
  { id: 1, question: "If the pilot pipe becomes partly blocked?", options: ["The VSI indication will be too low when climbing", "The VSI will be too low when descending", "The VSI will not be affected", "The VSI will be too low when climbing and too high when descending"], correct: 2 },
  { id: 2, question: "If the static pipe becomes partly blocked?", options: ["The VSI indication will be too high when descending", "The VSI indication will be too high when accelerating", "The VSI indication will be too low when climbing or descending", "The VSI indication will be unaffected"], correct: 2 },
  { id: 3, question: "VSI lag is reduced by?", options: ["Two dashpots responding to acceleration", "Two return springs", "Bi-metallic strips", "Electronic systems"], correct: 3 },
  { id: 4, question: "A VSI?", options: ["Produces an output proportional to ambient pressure", "Measures the difference between total pressure and static pressure", "Measures the difference between the pressure inside and outside a capsule", "Measures only dynamic pressure"], correct: 2 },
  { id: 5, question: "If the choke in the VSI becomes partly blocked?", options: ["The VSI indication will be too high when climbing", "The VSI indication will be too low when descending", "VSI needle moving stationary", "The VSI indicates only vertical speeds, not accelerations"], correct: 2 },
  { id: 6, question: "VSI indicates increasing ROD by?", options: ["VSI needle moving downwards", "VSI needle moving upwards", "VSI needle moving stationary", "The VSI indicates only vertical speeds, not accelerations"], correct: 0 },
  { id: 7, question: "As an aircraft moves close to the ground during a landing the VSI might?", options: ["Become inaccurate due to ground effect", "Become inaccurate due to turbulence", "Stick due to loss of pitot source", "Become inaccurate due to aircraft attitude changes"], correct: 0 },
  { id: 8, question: "The correct action to be taken when the static vent blocks on an unpressurised aircraft is to?", options: ["Break the VSI glass", "Use the standby static source", "Calculate ROC using mathematically", "Open a window to equalise pressures"], correct: 0 },
  { id: 9, question: "If the casing of a VSI in a pressurised aircraft develops a leak?", options: ["VSI indications will be too low when climbing or descending", "VSI indications will be too high when climbing and too low when descending", "VSI indications will be too low when climbing and too high when descending", "VSI indications will be too high when climbing or descending"], correct: 0 },
  { id: 10, question: "What should the VSI indicate when an aircraft on a 3 degree glideslope is flying at 100 Kts TAS?", options: ["224 fpm descent", "324 fpm descent", "424 fpm descent", "524 fpm descent"], correct: 1 },
  { id: 11, question: "If the static pipe becomes partly blocked?", options: ["The VSI indication will be too high when descending", "The VSI indication will be too high when accelerating at constant altitude", "The VSI indication will be too low at all times", "The VSI indication will be too low when descending"], correct: 3 },
  { id: 12, question: "If the pitot pipe becomes partly blocked?", options: ["The VSI will over read when climbing or descending", "The VSI will be unaffected", "The VSI will over under read at all times", "The VSI will read zero at all times"], correct: 1 },
  { id: 13, question: "The response rate of a VSI can be improved by fitting a?", options: ["Accelerometer system", "Choke system", "Bi-metallic compensator", "Return spring"], correct: 0 },
  { id: 14, question: "If the port static vent of a large aircraft is blocked, what will happen to the VSI indications when it is side slipping to the left in a descent?", options: ["Over indicate", "Under indicate", "Be unaffected", "Fluctuate"], correct: 0 },
];

export const kwInstRadioAltTopic: Topic = {
  id: "kw-inst-radio-alt",
  title: "Radio Altimeters",
  questions: radioAltQuestions,
};

export const kwInstVSITopic: Topic = {
  id: "kw-inst-vsi",
  title: "Vertical Speed Indicator (VSI)",
  questions: vsiQuestions,
};
