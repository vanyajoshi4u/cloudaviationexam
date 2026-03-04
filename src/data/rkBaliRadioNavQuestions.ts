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

// Chapter 3: Track and Drift Questions
// PDF Q1-12 eliminated (calculation questions). PDF Q13→Q1, ..., Q16→Q4. Total: 4 MCQs.
const trackAndDriftQuestions: MCQuestion[] = [
  { id: 1, question: "Compass heading 270°, Deviation 2°W, Variation 30°E, Relative bearing 316°. What is the QDR?", options: ["224°", "044°", "046°"], correct: 1 },
  { id: 2, question: "The inbound track to NDB is 075° (T), Variation 10° W, drift 7° Right. The relative bearing to maintained on the radio compass to reach NDB is:", options: ["183 Relative", "353 Relative", "007 Relative"], correct: 2 },
  { id: 3, question: "An aircraft is \"homing\" to a radio beacon whilst maintaining a relative bearing of zero. If the magnetic heading decreases, the aircraft is experiencing:", options: ["No drift", "Right drift", "A wind from the right"], correct: 1 },
  { id: 4, question: "An aircraft flying at 9000 feet towards a station will be able to receive VHF R/T transmissions from a ground station located at 1600 AMSL at a distance of ___ NMs.", options: ["168", "148", "128"], correct: 0 },
];

// Chapter 4: Very High Frequency Omni Direction Radio Range (VOR)
// PDF Q2,3 eliminated (calculation questions). PDF Q1→Q1, Q4→Q2, ..., Q35→Q33. Total: 33 MCQs.
const vorQuestions: MCQuestion[] = [
  { id: 1, question: "Which of the following would not trigger the warning flag on VOR indicators?", options: ["Site error becoming greater than 1°", "Standby station coming online", "Ground monitor failure"], correct: 0 },
  { id: 2, question: "What is the minimum level that an aircraft, at a range of 113NM, must fly in order to contact the tower on R/T for a VDF bearing from an airport sited 169ft above MSL?", options: ["FL80", "FL50", "FL60"], correct: 2 },
  { id: 3, question: "What is the approximate maximum theoretical range at which an aircraft at FL130 could receive information from a VDF facility which is sited 1024ft above MSL?", options: ["180NM", "120NM", "150NM"], correct: 0 },
  { id: 4, question: "The maximum theoretical range at which an aircraft at FL80 can obtain bearings from a ground VDF facility sited at 325ft above MSL is:", options: ["107NM", "114NM", "134NM"], correct: 2 },
  { id: 5, question: "A VOR receiver check can be made:", options: ["Any where on the ground", "At designated check point on airport surface", "Any where in the air/ground"], correct: 1 },
  { id: 6, question: "DVOR works on the principle of:", options: ["Measuring Doppler frequency shift between fixed and variable signal", "Measuring phase difference between fixed and variable signal", "Measuring time difference induced by Doppler frequency shift in single signal"], correct: 1 },
  { id: 7, question: "If an aircraft flies along a VOR radial it will follow a:", options: ["Constant magnetic track", "Great circle track", "Rhumb line track"], correct: 1 },
  { id: 8, question: "An omni-bearing selector (OBS) shows full deflection to the left when within range of a serviceable VOR. What angular deviation are you from the selected radial?", options: ["1.5° or more", "2.5° or more", "10° or more"], correct: 2 },
  { id: 9, question: "The two signals transmitted by a conventional VOR ground station are 90° out of phase on magnetic:", options: ["North", "West", "East"], correct: 2 },
  { id: 10, question: "The frequency range of a VOR receiver is:", options: ["108 to 135.95 MHz", "108 to 117.95 MHz", "118 to 135.95 MHz"], correct: 1 },
  { id: 11, question: "VOR station position N61°E025°, variation 13°E; Estimated position of an aircraft N59°E025°, variation 20°E. What VOR radial is the aircraft on?", options: ["167°", "347°", "160°"], correct: 0 },
  { id: 12, question: "Which of the following statements concerning the variable, or directional, signal of a conventional VOR is correct?", options: ["The receiver adds 30Hz to the variable signal before combining it with the reference signal", "The transmitter changes the frequency of the variable signal by 30Hz either side of the allocated frequency each time it rotates", "The rotation of the variable signal at a rate of 30 times per second gives it the characteristics of a 30Hz amplitude modulation"], correct: 2 },
  { id: 13, question: "In which frequency band do VOR transmitters operate?", options: ["SHF", "EHF", "VHF"], correct: 2 },
  { id: 14, question: "If the reference phase differs 30° with the variable phase the radial from the VOR station will be:", options: ["150°", "030°", "210°"], correct: 1 },
  { id: 15, question: "In order to plot a bearing from a VOR station, a pilot needs to know the magnetic variation:", options: ["At the half-way point between the aircraft and the station", "At the aircraft location", "At the VOR"], correct: 2 },
  { id: 16, question: "A VOR is sited at position A(45°00'N, 010°00'E). An aircraft is located at position B(44°00'N, 010°00'E). Assuming that the magnetic variation at A is 10°W and at B is 15°W, the aircraft is on VOR radial:", options: ["180°", "185°", "190°"], correct: 2 },
  { id: 17, question: "An aircraft flying on the true track 090° towards a VOR station located near the equator where the magnetic variation is 15°E. The variation at the aircraft position is 8°E. The aircraft is on VOR radial:", options: ["075°", "285°", "255°"], correct: 2 },
  { id: 18, question: "The principle used in VOR bearing measurement is:", options: ["Envelope matching", "Beat frequency discrimination", "Phase comparison"], correct: 2 },
  { id: 19, question: "Transmissions from VOR facilities may be adversely affected by:", options: ["Night effect", "Quadrantal error", "Uneven propagation over irregular ground surfaces"], correct: 2 },
  { id: 20, question: "If VOR bearing information is used beyond the published protection range, errors could be caused by:", options: ["Interference from other transmitters", "Noise from precipitation static exceeding signal strength of the transmitter", "Sky wave interference from distant transmitters on the same frequency"], correct: 0 },
  { id: 21, question: "An airway 10NM wide is to be defined by two VORs each having a resultant bearing accuracy of plus or minus 5.5°. In order to ensure accurate track guidance within the airway limits the maximum distance apart for the transmitter is approximately:", options: ["105NM", "210NM", "50NM"], correct: 0 },
  { id: 22, question: "The VOR system is limited to about 1° of accuracy. One degree at 200NM represents a width of:", options: ["2.5NM", "3.5NM", "2.0NM"], correct: 1 },
  { id: 23, question: "An aircraft is required to approach a VOR via the 104° radial. Which of the following settings should be made on the VOR/ILS deviation indicator?", options: ["284° with the FROM flag showing", "104° with the FROM flag showing", "284° with the TO flag showing"], correct: 2 },
  { id: 24, question: "An aircraft on a heading of 280°(M) is on a bearing of 090°(M) from a VOR. The bearing you should select on the OMNI bearing selector to centralise the VOR/ILS left/right deviation needle with a \"TO\" indication is:", options: ["100°", "270°", "090°"], correct: 1 },
  { id: 25, question: "An aircraft is required to approach a VOR station via the 244° radial. In order to obtain correct sense indications the deviation indicator should be set to:", options: ["244° with the TO flag showing", "244° with the FROM flag showing", "064° with the TO flag showing"], correct: 2 },
  { id: 26, question: "An aircraft is 100NM from a VOR facility. Assuming no error when using a deviation indicator where 1 dot = 2° deviation, how many dots deviation from the center line of the instrument will represent the limits of the airway boundary? (Assume that the airway is 10NM wide.)", options: ["6.0", "1.5", "3.0"], correct: 1 },
  { id: 27, question: "The TO/FROM indicator of a VOR:", options: ["Tells whether a track equal to the selected bearing will bring you to or away from the VOR", "Tells whether you are now flying towards or from the VOR", "Tells whether you should turn the aircraft towards or away from the CDI indication"], correct: 0 },
  { id: 28, question: "An aircraft is tracking inbound to a VOR beacon on the 105 radial. The setting the pilot should put on the OBS and the CDI indications are:", options: ["105, TO", "285, FROM", "285, TO"], correct: 2 },
  { id: 29, question: "The principle advantage of Doppler VOR is that:", options: ["A readout of range as well as bearing is obtained", "Transmitter frequency instability is minimised", "Site errors are considerably reduced"], correct: 2 },
  { id: 30, question: "When a maximum range and altitude is published for a VOR?", options: ["The terrain will cause bends and/or scalloping on the VOR signal and make it inaccurate outside standards in the airspace outside the published airspace", "The reception from this VOR is guaranteed free from harmful interference from other VORs when you are within this airspace", "The signal from the VOR will be too weak to provide information when you are outside this airspace"], correct: 1 },
  { id: 31, question: "An aircraft is over flying a VOR at 30,000 ft, at a groundspeed of 300 kt. The maximum time during which no usable signals will be received (in minutes and seconds) is:", options: ["1:40", "2.25", "0.50"], correct: 1 },
  { id: 32, question: "During maintenance, malfunction or testing the identification signal of a VOR transmitter is (i) by (ii) or (iii).", options: ["(i) suppressed; (ii) a modulated tone; (iii) suppression", "(i) suppressed; (ii) a continuous tone; (iii) removed", "(i) replaced; (ii) a continuous tone; (iii) morse letter S"], correct: 1 },
  { id: 33, question: "For an aircraft at 30,000 ft what is the maximum radius above a VOR where unreliable or no signals at all may be received at 45° above horizontal:", options: ["2 nm", "5 nm", "4 nm"], correct: 1 },
];

// Chapter 7: ILS (Instrument Landing System)
// No eliminations. Q1-Q57. Total: 57 MCQs.
const ilsQuestions: MCQuestion[] = [
  { id: 1, question: "In full ILS system which marker is optional?", options: ["Inner", "Middle", "Outer"], correct: 0 },
  { id: 2, question: "RVR is", options: ["Horizontal visibility along RWY centre line", "Slant visibility along RWY app. lights", "Horizontal visibility along RWY PAPI lights"], correct: 0 },
  { id: 3, question: "On an ILS ROD is function of", options: ["IAS", "EAS", "G/S"], correct: 2 },
  { id: 4, question: "When can an ILS back beam be received:", options: ["Never", "When flying in the area behind the localiser aerial", "When flying in the area forward the localiser aerial"], correct: 1 },
  { id: 5, question: "Where, in relation to the runway, is the ILS localiser transmitting aerial normally situated?", options: ["At the non-approach end about 150m to one side of the runway and 300m along the extended centerline", "On the non-approach end of the runway about 300m from the runway on the extended centerline", "At the approach end about 150m to one side of the runway and 300m from touchdown"], correct: 1 },
  { id: 6, question: "Every 10kt decrease in groundspeed, on a 3° ILS glide path, will require an approximate:", options: ["increase in the aircraft's rate of descent of 50ft/min", "increase in the aircraft's rate of descent of 100ft/min", "decrease in the aircraft's rate of descent of 50ft/min"], correct: 2 },
  { id: 7, question: "The principle of operation of an ILS Localiser transmitter is based on two overlapping lobes that are transmitted on (i)......frequencies and carry different (ii)......", options: ["(i) different (ii) modulation frequencies", "(i) different (ii) phases", "(i) the same (ii) modulation frequencies"], correct: 1 },
  { id: 8, question: "Instrument Landing Systems (ILS) Glide Paths provide azimuth coverage (i)......° each side of the localiser center line to a distance of (ii)......NM from the threshold.", options: ["(i) 35 (ii) 25", "(i) 8 (ii) 10", "(i) 25 (ii) 17"], correct: 1 },
  { id: 9, question: "The rate of descent required to maintain a 3.25° glide slope at a groundspeed of 140kt is approximately", options: ["850ft/min", "800ft/min", "670ft/min"], correct: 0 },
  { id: 10, question: "An aircraft carrying out a 3° glide path ILS approach experiences a reduction in Ground speed from 150kt at the outer marker to 120kt over the threshold. The effect of this change in groundspeed on the aircraft's rate of descent will be a decrease of approximately:", options: ["150ft/min", "50ft/min", "100ft/min"], correct: 0 },
  { id: 11, question: "Which of the following is an ILS localiser frequency?", options: ["109.15MHz", "112.10MHz", "110.20MHz"], correct: 0 },
  { id: 12, question: "ILS is subject to false glide paths resulting from:", options: ["ground returns ahead of the antennas", "back-scattering of antennas", "multiple lobes of radiation patterns in the vertical plane"], correct: 2 },
  { id: 13, question: "What is the colour sequence when passing over an Outer, Middle and Inner Marker beacon?", options: ["Blue - amber - white", "amber - white - green", "Blue - green - white"], correct: 0 },
  { id: 14, question: "What approximately rate of descent is required in order to maintain a 3° glide path at a groundspeed of 90kt?", options: ["700ft/min", "450ft/min", "400ft/min"], correct: 1 },
  { id: 15, question: "Assuming a five dot display, what does each of the dots on either side of the ILS localizer cockpit display represent:", options: ["0.5 degrees", "2.5 degrees", "2.0 degrees"], correct: 0 },
  { id: 16, question: "In which frequency band does an ILS glide slope transmit?", options: ["VHF", "EHF", "UHF"], correct: 2 },
  { id: 17, question: "The outer marker of an ILS with a 3° glide slope is located 4.6NM from the threshold. Assuming a glide slope height of 50ft above the threshold, the approximate height of an aircraft passing the outer marker is:", options: ["1350ft", "1300ft", "1450ft"], correct: 2 },
  { id: 18, question: "The OUTER MARKER of an Instrument Landing System (ILS) facility transmits on a frequency of:", options: ["75MHz and is modulated by morse at two dashes per second", "300MHz and is modulated by morse at two dashes per second", "200MHz and is modulated by alternate dot/dash in morse"], correct: 0 },
  { id: 19, question: "The MIDDLE MARKER of an Instrument Landing System (ILS) facility is identified audibly and visually by a series of:", options: ["dots and a white light flashing", "two dashes per second and a blue light flashing", "alternate dots and dashes and an amber light flashing"], correct: 2 },
  { id: 20, question: "An aircraft tracking to intercept the Instrument Landing System (ILS) localiser inbound on the approach side, outside the published ILS coverage angle:", options: ["may receive false course indications", "will not normally receive signals", "will receive signals without identification coding"], correct: 0 },
  { id: 21, question: "The amplitude modulation and the colour of an outer marker (OM) is:", options: ["400Hz, amber", "1300Hz, blue", "400Hz, blue"], correct: 2 },
  { id: 22, question: "A Category I Instrument Landing System (ILS) ground installation provides accurate guidance from coverage limit down to:", options: ["200ft above the runway threshold", "runway surface", "50ft above ILS reference point"], correct: 0 },
  { id: 23, question: "What is the approximate angular coverage of reliable navigation information for a 3°ILS glide path out to a distance of 10NM?", options: ["0.7° above and below the glide path and 2.5° each side of the localiser centerline", "1.35° above the horizontal to 5.25° above the horizontal and 8° each side of the localiser centerline", "3° above and below the glide path and 10° each side of the localiser centerline"], correct: 1 },
  { id: 24, question: "Inner marker transmits on 75MHz and has an aural frequency of:", options: ["2000Hz", "400Hz", "3000Hz"], correct: 2 },
  { id: 25, question: "On an ILS approach you receive more of the 90 Hz modulation than the 150 Hz modulation. The action you should take is:", options: ["Fly left and up.", "Fly right and up.", "fly right and down."], correct: 0 },
  { id: 26, question: "The inner marker of an ILS installation identifies itself with:", options: ["continuous dots with a white light.", "Dots and dashes with alternating an amber light.", "alternating dots and dashes with a white light."], correct: 1 },
  { id: 27, question: "The horizontal deviation on the expanded ILS display represented by one dot is approximately:", options: ["1°", "0.5°", "2°"], correct: 1 },
  { id: 28, question: "In an ILS system, the identification:", options: ["Is transmitted by the localizer and the glide path transmitters.", "Is transmitted in morse by the localizer transmitter with a tone of 1020 Hz.", "Is transmitted with a tone of 1450 Hz."], correct: 1 },
  { id: 29, question: "The glide-path signals must be received to a range of 10 nm over a sector:", options: ["8° wide centered on the localizer center line.", "10° wide centered on the localizer center line.", "8° each side of the localizer center line."], correct: 2 },
  { id: 30, question: "A typical ILS glide path frequency, in MHz, is:", options: ["329.30", "110.30", "75.00"], correct: 0 },
  { id: 31, question: "The rate of descent in feet per minute, appropriate to a 3.2° ILS glide path at an approach groundspeed of 110 kts is:", options: ["586 fpm", "666 fpm", "563 fpm"], correct: 0 },
  { id: 32, question: "For a 2.7 degree glide path on a Category 1 ILS the vertical coverage is:", options: ["1.22° - 4.73°", "1.35° - 5.25°", "2.05° - 5.55°"], correct: 0 },
  { id: 33, question: "The minimum angle at which a false glide path is likely to be encountered on a 3° glide path is:", options: ["6°", "5.35°", "1.75°"], correct: 1 },
  { id: 34, question: "At a distance of 20 NM from the localizer transmitter, the horizontal extent of the localizer coverage is:", options: ["+/- 10 NM wide.", "+/- 10° from the runway extended center line.", "+/- 2.5°."], correct: 2 },
  { id: 35, question: "The ILS glide path operates between:", options: ["108 to 112 MHz in the VHF band.", "329.3 to 335 MHz in the VHF band.", "329.3 to 335 MHz in the UHF band."], correct: 1 },
  { id: 36, question: "The upper limit of the vertical coverage of the localizer must be:", options: ["not less than 7° above the horizontal (drawn from the localizer).", "Not less than 300 m above the highest point on the approach.", "not less than 600 m above the horizontal."], correct: 0 },
  { id: 37, question: "Category II ILS provides accurate guidance to:", options: ["150 ft above the horizontal plane containing the threshold.", "125 ft above the horizontal plane containing the threshold.", "100 ft above the horizontal plane containing the threshold."], correct: 2 },
  { id: 38, question: "The visual indication of passing the outer marker is a ... light with a series of ... at 400 Hz:", options: ["blue; dots", "blue; dashes", "white; dashes"], correct: 1 },
  { id: 39, question: "The sensitive area of an ILS is the area aircraft may not enter when:", options: ["category II/III ILS operations are in progress.", "category I ILS operations are in progress.", "ILS operations are in progress."], correct: 0 },
  { id: 40, question: "The reason why pre take-off holding areas are sometimes further from the active runway when ILS Category II and III landing procedures are in progress than during good weather operations is:", options: ["To increase aircraft separation in very reduced visibility conditions", "aircraft maneuvering near the runway may disturb guidance signals", "to increase distance from the runway during offset approach operations"], correct: 1 },
  { id: 41, question: "A Cat III ILS glide path transmitter provides reliable guidance information down to:", options: ["a maximum height of 200 ft above the runway", "a maximum height of 50 ft above the runway", "the surface of the runway"], correct: 2 },
  { id: 42, question: "At what approximate distance from the threshold would an aircraft intercept the glide path if the aircraft height is 2500 feet, and the ILS glide path angle is 3°?", options: ["7.0 nm.", "7.8 nm.", "13.0 n.m."], correct: 1 },
  { id: 43, question: "Convert 70 meters/second into knots?", options: ["35 kts.", "55 kts.", "136 kts."], correct: 2 },
  { id: 44, question: "An aircraft flying down a 3° ILS glide slope is at 25 nm DME from the threshold. Using the 1 in 60 rule and approximating 1 nm to 6000 ft, calculate the aircraft height above the runway threshold, assuming that the ILS glide path crosses the threshold at height of 50 ft?", options: ["6450 ft.", "7455 ft.", "7550 ft."], correct: 0 },
  { id: 45, question: "If there is a 15 knot increase in headwind by what amount must the rate of descent be changed in order to maintain a 3° glide slope?", options: ["It must be decreased by 79 ft/min.", "It must be increased by 79 ft/min.", "It must be increased by 35 ft/min."], correct: 0 },
  { id: 46, question: "An aircraft at FL370 is required to commence descent when 100 NM from a DME facility and to cross the station at FL120. If the mean GS during the descent is 396 kt, the minimum rate of descent required is approximately:", options: ["1650 FT/MIN.", "2400 FT/MIN.", "1000 FT/MIN."], correct: 2 },
  { id: 47, question: "At 0422 an aircraft at FL370, GS 320kt, is on the direct track to VOR 'X' 185 NM distant. The aircraft is required to cross VOR 'X' at FL80. For a mean rate of descent of 1800 FT/MIN at a mean GS of 232 kt, the latest time at which to commence descent is:", options: ["0451.", "0454.", "0445."], correct: 1 },
  { id: 48, question: "Assuming zero wind, what distance is covered by an aircraft descending 15000 FT with a TAS of 320 kt and maintaining a rate of descent of 3000 FT/MIN?", options: ["16.0 NM.", "26.7 NM.", "19.2 NM."], correct: 2 },
  { id: 49, question: "What will be the rate of descent when flying down a 7% glide slope, at a groundspeed of 250 knots?", options: ["1575 ft/min.", "1737 ft/min.", "1773 ft/min."], correct: 0 },
  { id: 50, question: "Aircraft height 2500 FT, ILS GP angle 3°. At what approximate distance from THR can you expect to capture the GP?", options: ["8.3 NM.", "7.0 NM.", "13.1 NM."], correct: 1 },
  { id: 51, question: "Given: TAS = 197 Kt, True course = 240°, W/V = 180/30 kt. Descent is initiated at FL 220 and completed at FL 40. Distance to be covered during descent is 39 NM. What is the approximate rate of descent?", options: ["800 FT/MIN.", "950 FT/MIN.", "1400 FT/MIN."], correct: 0 },
  { id: 52, question: "An aircraft is on an ILS 3 degree glide slope, which passes over the runway threshold at a height of 50 feet. The DME range is 18 nm from the threshold. What is the height above the runway threshold elevation? (Use the 1 in 60 rule and the approximation 6080 feet = 1 nautical mile)", options: ["5522 feet.", "5110 feet.", "6550 feet."], correct: 2 },
  { id: 53, question: "If there is a 12 knot increase in headwind by what amount must the rate of descent be changed in order to maintain a 3° glide slope?", options: ["It must be increased by 35 ft/min.", "It must be decreased by 35 ft/min.", "It must be decreased by 61 ft/min."], correct: 2 },
  { id: 54, question: "850 FT/MIN equals?", options: ["5.2 m/sec.", "4.6 m/sec.", "4.3 m/sec."], correct: 2 },
  { id: 55, question: "At 0430 an aircraft is in level cruise flight at groundspeed of 350 knots, at FL370, 165 nm from a VOR. It is required to descend at a mean rate of 1800 feet/min, to be at FL 80 overhead the VOR. What is the latest time to commence descent, if the mean ground speed in the descent is to be 200 knots?", options: ["0456.", "0439.", "0449."], correct: 0 },
  { id: 56, question: "On a standard Glide Slope ILS DME reads 1.9 NM. Glide slope needle reads 2 dots below on a four dot indicator. Radio altimeter should read___feet.", options: ["675", "795", "855"], correct: 0 },
  { id: 57, question: "An aircraft at 25 NMs on 3 degree GP of ILS is required to be over threshold at 50 feet. What is his height?", options: ["7550'", "7600'", "7650'"], correct: 2 },
];

// Chapter 8: Radar
// Partial – more questions to follow. Total so far: 1 MCQ.
const radarQuestions: MCQuestion[] = [
  { id: 1, question: "The time between transmission and reception of a single pulse is 300 microseconds. Determine the range of the target.", options: ["45 nm", "90 nm", "45 kms."], correct: 2 },
];

export const rkBaliRadioNavTopics: QuizTopic[] = [
  { id: "rkbali-radnav-ch1", title: "Ch 1 – Basic Radio Theory", questions: basicRadioTheoryQuestions },
  { id: "rkbali-radnav-ch2", title: "Ch 2 – ADF / NDB", questions: adfNdbQuestions },
  { id: "rkbali-radnav-ch3", title: "Ch 3 – Track and Drift Questions", questions: trackAndDriftQuestions },
  { id: "rkbali-radnav-ch4", title: "Ch 4 – Very High Frequency Omni Direction Radio Range (VOR)", questions: vorQuestions },
  { id: "rkbali-radnav-ch7", title: "Ch 7 – ILS (Instrument Landing System)", questions: ilsQuestions },
  { id: "rkbali-radnav-ch8", title: "Ch 8 – Radar", questions: radarQuestions },
];
