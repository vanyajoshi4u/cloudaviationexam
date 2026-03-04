export interface MCQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

export interface QuizTopic {
  id: string;
  title: string;
  questions: MCQuestion[];
}

// Chapter 1: Basic Radio Theory
// PDF Q1-2 eliminated (calculation questions). PDF Q3→Q1, ..., Q31→Q29. Total: 29 MCQs.
const basicRadioTheoryQuestions: MCQuestion[] = [
  { id: 1, question: "In an amplitude modulated signal, the amplitude of the carrier wave will:", options: ["Remain constant, and the frequency will vary according to the amplitude of the modulating signal", "Vary according to the amplitude of the modulating signal", "Vary according to the frequency of the modulating signal"], correct: 1 },
  { id: 2, question: "To establish and maintain effective HF communications the frequency used at a given range:", options: ["Should remain constant", "Should only be varied by season, decreased in summer and increased in winter", "Should be decreased at night"], correct: 2 },
  { id: 3, question: "For a given set of ionosphere conditions, as the frequency of an HF signal is increased:", options: ["The size of the dead space increases due solely to the decreasing minimum skip distance", "The size of the dead space increases due solely to the increasing minimum skip distance", "The size of the dead space decreases because the surface wave coverage decreases, and the minimum skip distance decreases"], correct: 1 },
  { id: 4, question: "Around a radiating transmitter aerial there is:", options: ["A magnetic field", "An electrical field", "An electrical and magnetic field"], correct: 2 },
  { id: 5, question: "The rate of attenuation of a radio wave which occurs when the wave travels close to the Earth's surface:", options: ["Decreases as the frequency of the wave increases, and is greater over the land than the sea", "Increases as the frequency of the wave increases, and is greater over the sea than the land", "Decreases as the frequency of the wave increases, and is greater over the sea than the land"], correct: 1 },
  { id: 6, question: "The frequency which corresponds to a wavelength of 12 mm is:", options: ["25 MHz", "2.5 MHz", "25 GHz"], correct: 2 },
  { id: 7, question: "For a given HF frequency skip distance will normally:", options: ["Be greater by day than by night", "Be greater by night than by day", "Be less by night than by day"], correct: 1 },
  { id: 8, question: "The rate of refraction of a radio wave which occurs within the ionosphere:", options: ["Decreases as the frequency of the radio wave increases", "Increases as the frequency of the radio wave increases", "Is greater at night"], correct: 1 },
  { id: 9, question: "The frequency corresponding to a wavelength of 3.5 cm is:", options: ["857 MHz", "85.7 MHz", "8.57 GHz"], correct: 2 },
  { id: 10, question: "In sky wave propagation the distance between the end of the surface wave and the first returning sky wave is called the:", options: ["Maximum usable range", "Dead space", "Skip distance"], correct: 1 },
  { id: 11, question: "A frequency of 295 KHz would be described as:", options: ["LF", "Short wave", "MF"], correct: 0 },
  { id: 12, question: "As a radio signal increases in frequency, ionospheric refraction ... and atmospheric attenuation...:", options: ["Decreases; decreases", "Increases; decreases", "Increases; increases"], correct: 1 },
  { id: 13, question: "Sky waves are not likely to occur by day or night in which of the following frequency bands:", options: ["VHF", "HF", "MF"], correct: 0 },
  { id: 14, question: "The maximum theoretical range at which an aircraft at FL80 can obtain bearings from a ground VDF facility sited 325 FT above MSL is:", options: ["114 NM", "107 NM", "134 NM"], correct: 2 },
  { id: 15, question: "What is the minimum level that an aircraft, at a range of 113 NM, must fly in order to contact the tower on R/T for a VDF bearing from an airport sited 169 FT above MSL?", options: ["FL60", "FL50", "FL80"], correct: 0 },
  { id: 16, question: "What is the first returning sky wave called?", options: ["The critical ray", "The sky ray", "The space wave"], correct: 0 },
  { id: 17, question: "What is the metric distance of an NDB wavelength?", options: ["Decimetric", "Centimetric", "Metric or Kilometric"], correct: 2 },
  { id: 18, question: "Which radio frequency employs the refraction properties of the ionosphere?", options: ["EHF", "HF", "VHF"], correct: 1 },
  { id: 19, question: "VOR wavelength is?", options: ["2.46 Cm", "24.6 Cm", "2.46m"], correct: 2 },
  { id: 20, question: "VOR wavelength is:", options: ["Millimetric", "Centimetric", "Metric"], correct: 2 },
  { id: 21, question: "When is fading in the medium frequency band most likely to occur:", options: ["During the day with ground and sky waves", "During rainy days", "During rainy nights"], correct: 1 },
  { id: 22, question: "What is the wavelength and waveband of a radio aid that uses a frequency of 19 cm:", options: ["15.79 Hz, ELF", "15.79 KHz, VLF", "1.579 GHz, UHF"], correct: 2 },
  { id: 23, question: "The wavelength of a 121.95 MHz signal is?", options: ["24.6 Cm", "2.46 m", "2.46 km"], correct: 1 },
  { id: 24, question: "What is skip distance?", options: ["The distance between a receiver and the first and second fundamentals", "The distance between the transmitter and the first returning sky wave", "The distance between the first fundamental returning to the ground, and the receiver"], correct: 1 },
  { id: 25, question: "Weather radar is?", options: ["Centimetric", "Metric", "Kilometric"], correct: 0 },
  { id: 26, question: "The wavelength of VHF radio signal is?", options: ["Millimetric", "Centimetric", "Metric"], correct: 2 },
  { id: 27, question: "The wavelength of ILS localizer is:", options: ["Millimetric", "Centimetric", "Metric"], correct: 2 },
  { id: 28, question: "Atmospheric ducting close to the earth, is most likely?", options: ["In an inversion with constant humidity at all altitudes", "In an inversion with humidity decreasing with increasing altitude", "Over land"], correct: 1 },
  { id: 29, question: "Frequency of a wave length of 3.5 cms is:", options: ["8.57 KHz", "8.57 MHz", "8.57 GHz"], correct: 2 },
];

// Chapter 2: ADF / NDB
// No eliminations. Q1-Q30. Total: 30 MCQs.
const adfNdbQuestions: MCQuestion[] = [
  { id: 1, question: "Direction property error is known as?", options: ["180° ambiguity", "90° ambiguity", "Quadrantal error"], correct: 0 },
  { id: 2, question: "What is used to resolve 180° ambiguity?", options: ["Align radio compass to True North", "Sense Aerial", "Loop Aerial"], correct: 1 },
  { id: 3, question: "An A/C is flying on HDG of 315°, which of the following signal will cause maximum quadrantal error:", options: ["360°", "225°", "135°"], correct: 0 },
  { id: 4, question: "Variations of signal in NDB receivers due skywaves indicates the presence of:", options: ["Night effect", "Coastal refraction", "Mountain or terrain effect"], correct: 0 },
  { id: 5, question: "The BFO selector on an ADF receiver is used to:", options: ["Find the loop \"null\" position", "Stop loop rotation", "Hear the IDENT of some NDB stations radiating a continuous wave signal"], correct: 2 },
  { id: 6, question: "Which one of the following disturbances is most likely to cause the greatest inaccuracy in ADF bearings?", options: ["Quadrantal error", "Local thunderstorm activity", "Coastal effect"], correct: 1 },
  { id: 7, question: "Factors liable to affect most NDB/ADF system performance and reliability include:", options: ["Static interference- night effect- absence of failure warning system", "Static interference- station interference- latitude error", "Height error- station interference- mountain effect"], correct: 0 },
  { id: 8, question: "There are two NDBs, one 20NM inland, and the other 50NM inland from the coast. Assuming that the error caused by coastal refraction is the same for both propagations, the extent of the error in a position line plotted by an aircraft that is over water will be:", options: ["Greater from the beacon that is 20NM inland", "The same from both beacons when the aircraft is on a relative bearing of 180° and 360°", "Greater from the beacon that is 50NM inland"], correct: 2 },
  { id: 9, question: "What is the wavelength of an NDB transmitting on 373 kHz?", options: ["800m", "80m", "8000m"], correct: 0 },
  { id: 10, question: "An aircraft is \"homing\" to a radio beacon whilst maintaining a relative bearing of zero. If the magnetic heading decreases, the aircraft is experiencing:", options: ["Zero drift", "Right drift", "Left drift"], correct: 1 },
  { id: 11, question: "Errors caused by the effect of coastal refraction on bearings at lower altitudes are maximum when the NDB is:", options: ["Inland and the bearing crosses the coast at an acute angle", "Inland and the bearing crosses the coast at right angles", "Near the coast and the bearing crosses the coast at right angles"], correct: 0 },
  { id: 12, question: "Quadrantal errors associated with aircraft Automatic Direction Finding (ADF) equipment are caused by:", options: ["Skywave/ground wave contamination", "Signal bending by the aircraft metallic surfaces", "Signal bending caused by electrical interference from aircraft wiring"], correct: 1 },
  { id: 13, question: "\"Night Effect\" which causes loss of signal and fading, resulting in bearing errors from transmissions, is due to:", options: ["Interference from other transmissions and is maximum at dusk when east of the NDB", "Static activity increasing at night particularly in the lower frequency band", "Skywave distortion of the null position and is maximum at dawn and dusk"], correct: 2 },
  { id: 14, question: "Which of the following is likely to have the greatest effect on ADF accuracy?", options: ["Mutual interference between aircraft aerials", "Frequency drift at the ground station", "Interference from other NDBs, particularly at night"], correct: 2 },
  { id: 15, question: "An aircraft is maintaining track outbound from an NDB with a constant relative bearing of 184°. To return to the NDB the relative bearing to maintain is:", options: ["184°", "004°", "356°"], correct: 2 },
  { id: 16, question: "Consider the following statements on the NDB transmitter:", options: ["It is operating in the HF/VHF band", "It is very simple, being required to transmit only a carrier wave and identification", "In India, most NDBs operate in the frequency band 455 - 1750 kHz"], correct: 1 },
  { id: 17, question: "The purpose of the BFO switch on the ADF receiver is to:", options: ["Cut out the static noise", "Improve the strength of the received signal", "Make the signal audible"], correct: 2 },
  { id: 18, question: "When using NDBs night effect is most likely to be greatest at:", options: ["Dusk", "Dawn or dusk", "Dawn"], correct: 1 },
  { id: 19, question: "With regard to the following types of NDB which statements is correct?", options: ["Locators have 200 W power, 50 nm range and are NON A2A", "Locators have 5000 W power, 50 nm range and are NON A1A", "Locators have 15 W power, 10-25 nm range and are NON A2A"], correct: 2 },
  { id: 20, question: "The D layer of the ionosphere affects the accuracy of NDB bearings:", options: ["Never", "By day and night", "By night only"], correct: 2 },
  { id: 21, question: "An ADF uses a sense aerial to:", options: ["Transmit the beacon ident", "Determine the null position", "Resolve ambiguous bearings"], correct: 2 },
  { id: 22, question: "Which of the following equipments does not have a system to warn the pilot that it is inoperative:", options: ["ADF", "ILS", "VOR"], correct: 0 },
  { id: 23, question: "The BFO:", options: ["Is used to make the ident from an A1A NDB audible", "Is used to determine the signal strength of an NDB", "Creates the audio ident for an NDB"], correct: 0 },
  { id: 24, question: "An NDB signal crossing from land to sea will ... speed and bend ... the normal:", options: ["Decrease, away from", "Increase, towards", "Increase, away from"], correct: 2 },
  { id: 25, question: "Long range NDBs normally employ:", options: ["A3W", "A9E", "NON/A1A"], correct: 2 },
  { id: 26, question: "When using a NON A2A NDB the BFO should be:", options: ["Off for tuning and on for identification", "Off for tuning and off for identification", "On for tuning and off for identification"], correct: 2 },
  { id: 27, question: "What is the approved frequency band assigned to aeronautical ADFs?", options: ["190-1750 kHz", "190-1750 Hz", "190-1750 GHz"], correct: 0 },
  { id: 28, question: "The promulgated range for an NDB is applicable:", options: ["During daytime only", "Throughout 24 hours, but is most prone to error around dusk and dawn", "During night time only"], correct: 0 },
  { id: 29, question: "An aero plane is flying parallel to a coast. Which of the following NDBs will give the greatest coastal refraction LOP error?", options: ["NDB sited on the coast-RBI 300°", "NDB sited 30 nm inland-RBI 330°", "NDB sited on the coast-RBI 330°"], correct: 1 },
  { id: 30, question: "A radio beacon has an operational range of 10 NM. By what factor should the transmitter power be increased in order to achieve an operational range of 20 NM?", options: ["Eight", "Four", "Two"], correct: 1 },
];

export const rkBaliRadioNavTopics: QuizTopic[] = [
  { id: "rkbali-radnav-ch1", title: "Ch 1 – Basic Radio Theory", questions: basicRadioTheoryQuestions },
  { id: "rkbali-radnav-ch2", title: "Ch 2 – ADF / NDB", questions: adfNdbQuestions },
];
