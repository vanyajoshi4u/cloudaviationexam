import { MCQuestion, Topic } from "./icJoshiQuestions";

const redbirdAirRegQuestionsData: MCQuestion[] = [
  // Q1
  { id: 1, question: "MEHT stands for:", options: ["Minimum Eye Height (Over Threshold)", "Maximum Elevation Height Tolerance", "Minimum Engine Height Threshold", "Maximum Eye Height (Over Terrain)"], correct: 0 },
  // Q2
  { id: 2, question: "What time is used by all flights?", options: ["UTC", "IST", "Local Time", "EST"], correct: 0 },
  // Q3
  { id: 3, question: "UTC stands for:", options: ["Universal Time Clock", "Coordinated Universal Time", "Unified Time Code", "Universal Terrestrial Coordination"], correct: 1 },
  // Q4
  { id: 4, question: "Aircraft shall not be flown in a prohibited area as specified in:", options: ["Schedule I of Aircraft Rules 1937", "Schedule II of Aircraft Rules 1934", "Annex 14 of ICAO", "Section 5 of Aircraft Act 1934"], correct: 0 },
  // Q5
  { id: 5, question: "What is CAT (Clear Air Turbulence)?", options: ["Sudden severe turbulence occurring in cloudless regions that causes violent buffeting of aircraft", "Turbulence caused by cumulus clouds", "Turbulence near the ground during landing", "Mild turbulence associated with frontal systems"], correct: 0 },
  // Q6
  { id: 6, question: "NOTAM valid for more than 2 hours belongs to:", options: ["Series A", "Series B", "Series C", "Series D"], correct: 0 },
  // Q7
  { id: 7, question: "Montreal Convention was signed in:", options: ["1944", "1971", "1963", "1999"], correct: 1 },
  // Q8
  { id: 8, question: "Communication Failure (RCF) in IMC — the pilot should:", options: ["Proceed in accordance with the Flight Plan", "Return to the departure aerodrome", "Land at the nearest aerodrome", "Orbit and wait for instructions"], correct: 0 },
  // Q9
  { id: 9, question: "A RED flare gun from ATC means:", options: ["Notwithstanding any previous instructions, do not land for the time being", "Cleared to land", "Return to starting point on the aerodrome", "Give way to other aircraft and continue circling"], correct: 0 },
  // Q10
  { id: 10, question: "Barotrauma is:", options: ["Pain due to difference in pressure between middle & ambient ear (blocked eustachian tube)", "Pain caused by high altitude radiation", "Oxygen deprivation at high altitudes", "Skin irritation due to low humidity"], correct: 0 },
  // Q11
  { id: 11, question: "Lateral separation using VOR requires both aircraft established on radials diverging by at least:", options: ["15 degrees and at least one aircraft 15 NM from facility", "10 degrees and at least one aircraft 10 NM from facility", "20 degrees and at least one aircraft 20 NM from facility", "30 degrees and at least one aircraft 30 NM from facility"], correct: 0 },
  // Q13
  { id: 12, question: "Composition of air — Nitrogen percentage is approximately:", options: ["78%", "21%", "0.93%", "68%"], correct: 0 },
  // Q14
  { id: 13, question: "If an aircraft is flying over the territory of another state, which rules should be followed?", options: ["Rules of the state of registration", "Rules of the overflown state", "ICAO standard rules only", "Rules of the state of the operator"], correct: 0 },
  // Q15
  { id: 14, question: "The adverse effects of G-forces can be delayed by:", options: ["Tensing the thigh and stomach muscles and easing off backward pressure on the column", "Increasing speed of the aircraft", "Reducing cabin pressure", "Breathing pure oxygen"], correct: 0 },
  // Q16
  { id: 15, question: "The Eustachian Tube:", options: ["Allows pressure in the middle ear to equalize across the ear drum with outside ambient pressure", "Connects the inner ear to the brain", "Controls balance during turbulence", "Filters sounds at high altitude"], correct: 0 },
  // Q17
  { id: 16, question: "Spatial disorientation is:", options: ["When unable to determine position or motion", "When instruments fail", "When visibility is reduced to 1 km", "When flying above FL410"], correct: 0 },
  // Q18
  { id: 17, question: "Which apparatus helps maintain spatial orientation?", options: ["Vestibular apparatus", "Respiratory system", "Cardiovascular system", "Digestive system"], correct: 0 },
  // Q19
  { id: 18, question: "Prisoner on board should be carried as per the Aircraft Rules:", options: ["24B", "67A", "15C", "40D"], correct: 0 },
  // Q20
  { id: 19, question: "Carrying a prisoner on board needs permission of:", options: ["DGCA", "Airport Authority", "Ministry of Defence", "State Police"], correct: 0 },
  // Q22
  { id: 20, question: "What does NOTAM(R) mean?", options: ["NOTAM Replace", "NOTAM Revised", "NOTAM Recalled", "NOTAM Restricted"], correct: 0 },
  // Q23
  { id: 21, question: "If the holder of a licence suffers from an illness preventing duties, they must inform the authority if it lasts more than:", options: ["15 days", "7 days", "30 days", "21 days"], correct: 0 },
  // Q24
  { id: 22, question: "A pilot can perform a maximum of how many flying hours in a day?", options: ["10 hours", "8 hours", "12 hours", "6 hours"], correct: 0 },
  // Q25
  { id: 23, question: "A pilot can perform a maximum number of landings in a day:", options: ["6", "4", "8", "10"], correct: 0 },
  // Q26
  { id: 24, question: "Smoking in the aircraft is permitted by:", options: ["The Certificate of Airworthiness", "The pilot's discretion", "DGCA approval only", "It is always prohibited"], correct: 0 },
  // Q27
  { id: 25, question: "Time Of Useful Consciousness (TUC) is:", options: ["The length of time during which an individual can act with both mental and physical efficiency, measured from the moment of losing oxygen supply", "The time a pilot can fly without instruments", "The maximum duration of a flight at high altitude", "The time required for cabin pressurization"], correct: 0 },
  // Q28
  { id: 26, question: "The SSR code for Radio Communication Failure (RCF) is:", options: ["7600", "7500", "7700", "7000"], correct: 0 },
  // Q29
  { id: 27, question: "Validity of Instrument Rating (IR) is:", options: ["1 year", "2 years", "6 months", "5 years"], correct: 0 },
  // Q30
  { id: 28, question: "Readability scale 3 defines:", options: ["Readable with difficulty", "Unreadable", "Readable now and then", "Perfectly readable"], correct: 0 },
  // Q31
  { id: 29, question: "Chop is a type of turbulence that causes:", options: ["Rapid and somewhat rhythmic bumpiness", "Sudden large changes in altitude", "Complete loss of control", "Gradual smooth oscillations"], correct: 0 },
  // Q32
  { id: 30, question: "In the stress level hierarchy (decreasing order), what comes first?", options: ["Death of spouse", "Divorce", "Loss of job", "Marriage"], correct: 0 },
  // Q33
  { id: 31, question: "Stress symptoms include:", options: ["Flushed skin, dilated pupil, high breathing rate, perspiration", "Low heart rate, constricted pupils", "Pale skin, reduced perspiration", "Drowsiness and slow reflexes"], correct: 0 },
  // Q34
  { id: 32, question: "VOR accuracy is:", options: ["+/- 5 degrees", "+/- 2 degrees", "+/- 10 degrees", "+/- 1 degree"], correct: 0 },
  // Q35
  { id: 33, question: "RVR is a measure of:", options: ["Atmospheric transparency, intensity of runway lights and background illumination", "Cloud base height", "Wind speed and direction", "Temperature and dew point"], correct: 0 },
  // Q36
  { id: 34, question: "Jeppesen charts are based on which projection?", options: ["Lambert Conformal Conic Projection", "Mercator Projection", "Polar Stereographic Projection", "Transverse Mercator Projection"], correct: 0 },
  // Q37
  { id: 35, question: "The Second Freedom of the Air is:", options: ["Right to land for technical reasons (non-traffic purposes)", "Right to fly over another country", "Right to carry passengers between two foreign countries", "Right to pick up passengers in a foreign country"], correct: 0 },
  // Q38
  { id: 36, question: "Annexure 14 of ICAO deals with:", options: ["Aerodrome", "Search and Rescue", "Personnel Licensing", "Rules of the Air"], correct: 0 },
  // Q39
  { id: 37, question: "The Aircraft Act was enacted in:", options: ["1934", "1937", "1944", "1929"], correct: 0 },
  // Q40
  { id: 38, question: "The Aircraft Rules were framed in:", options: ["1937", "1934", "1944", "1929"], correct: 0 },
  // Q41
  { id: 39, question: "Rule No. 67A of Aircraft Rules, 1937 deals with:", options: ["Logbook of flight crew personnel and logging of flight time", "Airworthiness certificates", "Search and rescue operations", "Prohibited airspace"], correct: 0 },
  // Q42
  { id: 40, question: "When the pilot suffers from hypothermia (loss of cabin heating):", options: ["His oxygen need will be increased as long as he stays conscious", "His oxygen need will not be affected", "His oxygen need will be raised and his tolerance to hypoxia will be increased", "He will not need any oxygen"], correct: 0 },
  // Q43
  { id: 41, question: "Spatial disorientation will be most likely to occur during flight:", options: ["If the brain receives conflicting information and the pilot does not believe the instruments", "When flying in and out of clouds with good instrument cross check", "When flying in light rain below the ceiling", "During VFR flight in clear conditions"], correct: 0 },
  // Q44
  { id: 42, question: "NOTAM Series A is valid for:", options: ["More than 2 hours", "30 minutes to 2 hours", "Less than 30 minutes", "24 hours only"], correct: 0 },
  // Q45
  { id: 43, question: "In the standard atmosphere, FL150 is equivalent to:", options: ["4550 metres", "15000 metres", "455 metres", "1500 metres"], correct: 0 },
  // Q46
  { id: 44, question: "EDTO stands for:", options: ["Extended Diversion Time Operations", "Extended Distance Terminal Operations", "Emergency Diversion Terminal Operations", "Extended Duration Take-Off Operations"], correct: 0 },
  // Q47
  { id: 45, question: "ETOPS stands for:", options: ["Extended-range Twin Engine Operations Performance Standard", "Extended Take-Off Performance Standard", "Emergency Twin Operations Procedure Standard", "Extended Terminal Operations Performance System"], correct: 0 },
  // Q48
  { id: 46, question: "AWR (Airborne Weather Radar) minimum range to be used in air is:", options: ["30-80 NM", "10-20 NM", "100-150 NM", "5-10 NM"], correct: 0 },
  // Q49
  { id: 47, question: "Normal blood pressure of a human is:", options: ["120/80 mmHg", "140/80 mmHg", "100/80 mmHg", "160/90 mmHg"], correct: 0 },
  // Q50
  { id: 48, question: "Validity of PPL licence is:", options: ["10 years", "5 years", "2 years", "Lifetime"], correct: 0 },
  // Q51
  { id: 49, question: "In India, 'W' airways are earmarked for:", options: ["Wide area navigation routes", "Domestic routes", "High altitude routes", "Military routes"], correct: 0 },
  // Q52
  { id: 50, question: "At holding point, ATC transmits 'Cleared for immediate take off'. What does it mean?", options: ["Taxi immediately to runway and commence rolling take off", "Take off immediately after completing all mandatory power checks", "Take off within 30 seconds of receiving the clearance", "Hold position and wait for further instructions"], correct: 0 },
  // Q53
  { id: 51, question: "Letter 'W' in ATS route designators indicates:", options: ["Domestic routes", "International routes", "Regional routes", "None of the above"], correct: 0 },
  // Q54
  { id: 52, question: "The letter 'C' displayed vertically in black against a yellow background indicates the location of:", options: ["Air Traffic Services Reporting Office", "Control tower", "Fire station", "Customs office"], correct: 0 },
  // Q55
  { id: 53, question: "Anti-collision light is:", options: ["A red light visible 30 degrees above and below the horizon of the aircraft visible in all directions", "Red in colour affixed on top of the control tower", "The navigation lights of any aircraft", "A white strobe light on the wing tips"], correct: 0 },
  // Q56
  { id: 54, question: "PANS-OPS stands for:", options: ["Procedures for Air Navigation Services – Aircraft Operations", "Procedures for Air Navigation Services – Air Traffic Management", "Procedures for Air Navigation Services – Air Operations", "Procedures for Aerodrome Navigation Standards – Operations"], correct: 0 },
  // Q57
  { id: 55, question: "The reduced visibility up to which a helicopter is permitted to operate at a speed that gives adequate opportunity to observe traffic and obstacles is:", options: ["800 m", "1500 m", "1000 m", "500 m"], correct: 0 },
  // Q58
  { id: 56, question: "PANS-ATM stands for:", options: ["Procedures for Air Navigation Services – Air Traffic Management", "Procedures for Air Navigation Services – Airport Traffic Management", "Procedures for Air Navigation Services – Aeronautical Traffic Management", "Procedures for Aerodrome Navigation Standards – ATM"], correct: 0 },
  // Q59
  { id: 57, question: "CAVOK conditions include:", options: ["Visibility more than 10 km, no cloud below 1500 m, no CB, no precipitation, no thunderstorm", "Visibility more than 5 km, no cloud below 1000 m", "Visibility more than 8 km, no precipitation", "Visibility more than 10 km only"], correct: 0 },
  // Q60
  { id: 58, question: "A Position Report includes:", options: ["Aircraft identification, position, time, flight level/altitude, next position and time over", "Aircraft identification and speed only", "Only position and altitude", "Fuel endurance and ETA only"], correct: 0 },
  // Q61
  { id: 59, question: "The correct way of transmitting the number 3500 when including an altitude is:", options: ["Three Thousand Five Hundred", "Thirty Five Hundred", "Three Five Zero Zero", "Three Five Hundred"], correct: 0 },
  // Q62
  { id: 60, question: "R/T calls for distress messages, distress calls and distress traffic use the word:", options: ["MAYDAY", "PAN PAN", "SECURITE", "SOS"], correct: 0 },
  // Q63
  { id: 61, question: "The urgency message prefix is:", options: ["PAN PAN (repeated three times)", "MAYDAY (repeated three times)", "SECURITE (repeated three times)", "HELP (repeated three times)"], correct: 0 },
  // Q64
  { id: 62, question: "Q-Code QDM means:", options: ["Magnetic bearing TO the station", "Magnetic bearing FROM the station", "True bearing TO the station", "True bearing FROM the station"], correct: 0 },
  // Q65
  { id: 63, question: "Q-Code QDR means:", options: ["Magnetic bearing FROM the station", "Magnetic bearing TO the station", "True bearing TO the station", "True bearing FROM the station"], correct: 0 },
  // Q66
  { id: 64, question: "Q-Code QUJ means:", options: ["True bearing TO the station", "True bearing FROM the station", "Magnetic bearing TO the station", "Magnetic bearing FROM the station"], correct: 0 },
  // Q67
  { id: 65, question: "Q-Code QTE means:", options: ["True bearing FROM the station", "True bearing TO the station", "Magnetic bearing FROM the station", "Magnetic bearing TO the station"], correct: 0 },
  // Q68
  { id: 66, question: "The condition caused by nitrogen bubbles under the skin during decompression is called:", options: ["Creeps", "Bends", "Chokes", "Staggers"], correct: 0 },
  // Q69
  { id: 67, question: "The types of AIPs are:", options: ["GEN, ENR, AD", "GEN, AD, MET", "ENR, AD, COM", "GEN, ENR, MET"], correct: 0 },
  // Q70
  { id: 68, question: "Call out by pilot monitoring on approach 'Three Greens' indicates:", options: ["Landing gears down and locked", "Three engines running", "Three green lights on the runway", "Three fuel tanks full"], correct: 0 },
  // Q71
  { id: 69, question: "Where is temporary information amended?", options: ["AIP", "NOTAM", "AIC", "Flight Plan"], correct: 0 },
  // Q72
  { id: 70, question: "When QNH is set to QNE, this occurs at:", options: ["Transition altitude during climb and transition level during descent", "Sea level only", "Ground level at the aerodrome", "Cruise altitude only"], correct: 0 },
  // Q73
  { id: 71, question: "DER stands for:", options: ["Departure End of Runway", "Distance End Reference", "Designated Elevation Range", "Departure Elevation Reference"], correct: 0 },
  // Q74
  { id: 72, question: "Which licence can be issued if exams passed are 10th standard?", options: ["PPL", "CPL", "ATPL", "None"], correct: 0 },
  // Q75
  { id: 73, question: "The standard lapse rate is:", options: ["2°C per 1000 ft", "1°C per 1000 ft", "3°C per 1000 ft", "1.5°C per 1000 ft"], correct: 0 },
  // Q76
  { id: 74, question: "RVSM is applicable between:", options: ["FL290 – FL410", "FL100 – FL290", "FL410 – FL510", "FL200 – FL350"], correct: 0 },
  // Q77
  { id: 75, question: "Procedure design gradient is:", options: ["3.3%", "5.2%", "2.5%", "4.0%"], correct: 0 },
  // Q78
  { id: 76, question: "ATIS broadcasts contain:", options: ["Current weather information, active runways, available approaches, and important NOTAMs", "Only runway in use", "Only QNH and wind", "Only NOTAMs"], correct: 0 },
  // Q79
  { id: 77, question: "VFR flights are not permitted above:", options: ["FL150", "FL200", "FL100", "FL250"], correct: 0 },
  // Q80
  { id: 78, question: "Hyperventilation / Over Breathing is:", options: ["Lung ventilation in excess of the body's needs (lack of CO₂)", "Lack of oxygen at high altitude", "Excess nitrogen in the blood", "Breathing at a normal rate"], correct: 0 },
  // Q81
  { id: 79, question: "Which way to treat hyperventilation?", options: ["Slowing the rate of breathing or breathing into a paper bag", "Increasing the rate of breathing", "Administering pure oxygen", "Descending immediately"], correct: 0 },
  // Q82
  { id: 80, question: "Which symptom is the most dangerous in hypoxia?", options: ["Impaired judgment of a pilot", "Headache", "Dizziness", "Fatigue"], correct: 0 },
  // Q83
  { id: 81, question: "Hypoxia is:", options: ["Lack of oxygen (symptoms include cyanosis — blue lips and nails)", "Excess of oxygen in the blood", "Low blood pressure at altitude", "Pain in the ears during descent"], correct: 0 },
  // Q84
  { id: 82, question: "Item No. 7 in a Flight Plan is:", options: ["Aircraft Identification", "Flight Rules", "Cruising Speed", "Departure Aerodrome"], correct: 0 },
  // Q85
  { id: 83, question: "Item No. 8 in a Flight Plan is:", options: ["Flight Rules", "Aircraft Identification", "Route", "Cruising Speed"], correct: 0 },
  // Q86
  { id: 84, question: "Cabotage refers to:", options: ["Domestic air services", "International air transport", "Military flights", "Charter operations"], correct: 0 },
  // Q87
  { id: 85, question: "What causes the pressure difference in the ear?", options: ["Eustachian tube is blocked", "Low level of oxygen in the body", "Barotrauma is blocked", "Inner ear infection"], correct: 0 },
  // Q88
  { id: 86, question: "If the central government is constructing a runway, what should they consider first?", options: ["Adequate terrain clearance from the runway", "Friction of the runway", "Adequate terrain clearance from the threshold", "Length of the runway"], correct: 0 },
  // Q89
  { id: 87, question: "When central government is making a runway, how much distance should it maintain?", options: ["10 km from the runway", "5 km from the runway", "15 km from the runway", "20 km from the runway"], correct: 0 },
  // Q90
  { id: 88, question: "When is the separation of 1 minute given after immediate take off?", options: ["When aircraft diverge by at least 45 degrees", "When aircraft diverge by at least 30 degrees", "When aircraft continue straight", "When aircraft maintain same heading"], correct: 0 },
  // Q91
  { id: 89, question: "Item No. 15 in a Flight Plan — cruising speed for knots is prefixed with:", options: ["N0 (e.g. N0450)", "K0", "M0", "S0"], correct: 0 },
  // Q92
  { id: 90, question: "Transition level is defined as:", options: ["The lowest flight level available for use above the transition altitude", "The highest altitude below the transition altitude", "The altitude where QNH is set", "The flight level used only in cruise"], correct: 0 },
  // Q93
  { id: 91, question: "A white dumbbell displayed at an aerodrome indicates:", options: ["Aircraft required to land, take off and taxi on runways and taxiways only", "Landing is prohibited", "Glider operations in progress", "Right-hand traffic pattern in effect"], correct: 0 },
  // Q94
  { id: 92, question: "AOC/AOP stands for:", options: ["Air Operator's Certificate / Permit", "Aircraft Operation Certificate / Permit", "Aviation Operations Clearance / Permit", "Air Operations Command / Protocol"], correct: 0 },
  // Q95
  { id: 93, question: "Minimum height for VFR flight in populated areas or towns is:", options: ["1000 ft above the highest obstacle", "500 ft above the highest obstacle", "2000 ft above the highest obstacle", "1500 ft above the highest obstacle"], correct: 0 },
  // Q96
  { id: 94, question: "You are on an aircraft and ATC is signalling you with flashes of runway and taxi lights. This means:", options: ["Vacate the runway", "Stop taxi and return to your position", "Return to the apron", "Cleared to cross"], correct: 0 },
  // Q97
  { id: 95, question: "Euphoria can cause:", options: ["Both impaired judgement and proneness to human error", "Impaired judgement only", "Proneness to human error only", "Improved decision making"], correct: 0 },
  // Q98
  { id: 96, question: "Hypothermia occurs when:", options: ["Your body loses heat faster than it can produce heat, causing dangerously low body temperature", "You are exposed to high temperatures", "Blood pressure increases rapidly", "Oxygen levels are too high"], correct: 0 },
  // Q99
  { id: 97, question: "Jet streams are:", options: ["Narrow currents of winds in the upper troposphere", "Wide bands of calm air", "Surface-level winds near the equator", "Winds in the lower stratosphere only"], correct: 0 },
  // Q100
  { id: 98, question: "A normal blood pressure level is:", options: ["120/80 mmHg", "140/90 mmHg", "100/60 mmHg", "160/100 mmHg"], correct: 0 },
  // Q101
  { id: 99, question: "On the apron/manoeuvring area, preference will be given to:", options: ["Vehicle towing aircraft", "Emergency vehicles only", "Taxiing aircraft", "Service vehicles"], correct: 0 },
  // Q102
  { id: 100, question: "Critical threshold altitude is approximately:", options: ["22,000 ft", "10,000 ft", "18,000 ft", "25,000 ft"], correct: 0 },
  // Q103
  { id: 101, question: "Minimum age to become an instructor is:", options: ["21 years", "18 years", "19 years", "25 years"], correct: 0 },
  // Q104
  { id: 102, question: "A flight condition where there are slight changes in altitude/attitude is:", options: ["Light turbulence", "Light chop", "Moderate turbulence", "Severe turbulence"], correct: 0 },
  // Q105
  { id: 103, question: "In severe turbulence, a pilot should try to maintain:", options: ["Attitude (not speed or altitude)", "Speed", "Altitude", "Both speed and altitude"], correct: 0 },
  // Q106
  { id: 104, question: "Photography is restricted at:", options: ["Military aerodrome", "Terminal buildings", "Civil aerodromes", "All aerodromes"], correct: 0 },
  // Q107
  { id: 105, question: "A recent report from an aircraft giving a position and/or met report is called:", options: ["Air report", "Met report", "Position report", "All of the above"], correct: 0 },
  // Q108
  { id: 106, question: "The third section of an Air Report includes:", options: ["Spot wind, air temperature, icing, turbulence", "Air temperature, icing, turbulence only", "Spot wind, icing, cloud above", "ETA destination"], correct: 0 },
  // Q109
  { id: 107, question: "The Air Report contains the following meteorological information:", options: ["Air temperature, turbulence, upper winds & aircraft icing", "Air temperature, turbulence, surface wind & aircraft icing", "Turbulence, upper winds & surface temperature", "All of the above"], correct: 0 },
  // Q110
  { id: 108, question: "Repetitive Flight Plans (RPLs) shall be used for flights operated on:", options: ["At least 10 occasions or every day over a period of at least 10 consecutive days", "At least 20 days consecutively", "At least 20 occasions", "At least 10 consecutive occasions or every day over 20 consecutive days"], correct: 0 },
  // Q111
  { id: 109, question: "How can a pilot increase his tolerance to +Gz?", options: ["Tightening of muscles, ducking the head and performing pressure breathing", "Tighten shoulder harness", "Take an upright seat position", "Relax the muscles, duck the head and lean upper body forward"], correct: 0 },
  // Q112
  { id: 110, question: "The Demolition of Buildings and Trees Act came into effect in:", options: ["1994", "1934", "1937", "1954"], correct: 0 },
  // Q113
  { id: 111, question: "OCH for precision approach is defined as:", options: ["The lowest height above the elevation of the relevant runway threshold at which a missed approach must be initiated", "The highest altitude above the aerodrome", "The minimum altitude during cruise", "The height at which flaps must be extended"], correct: 0 },
  // Q114
  { id: 112, question: "In a straight departure, the initial departure track is within how many degrees of runway centreline alignment?", options: ["15 degrees", "10 degrees", "20 degrees", "30 degrees"], correct: 0 },
  // Q115
  { id: 113, question: "When the visual manoeuvring (circling) area has been established, OCA/H is determined:", options: ["For each category of aircraft, and it may be different for each one of them", "For only category A and B aircraft", "For category C, D and E only", "Only for jet aircraft"], correct: 0 },
  // Q116
  { id: 114, question: "What should be added between the country code and registration mark of an aircraft?", options: ["Hyphen (-)", "Space", "Dot (.)", "Slash (/)"], correct: 0 },
  // Q117
  { id: 115, question: "RNAV is abbreviated as:", options: ["Area Navigation", "Radio Navigation", "Regional Navigation", "Route Navigation"], correct: 0 },
  // Q118
  { id: 116, question: "MEL stands for:", options: ["Minimum Equipment List", "Maximum Engine Limit", "Minimum Elevation Level", "Mandatory Equipment List"], correct: 0 },
  // Q119
  { id: 117, question: "Maximum age to fly as pilot is:", options: ["65 years", "60 years", "70 years", "55 years"], correct: 0 },
  // Q120
  { id: 118, question: "How many categories of Instrument Approach Procedures are there?", options: ["3 (Precision approach, Approach with vertical guidance, Non-precision approach)", "2 (Precision and Non-precision)", "4 types", "1 type only"], correct: 0 },
  // Q121
  { id: 119, question: "Discretion fuel is used as per the discretion of:", options: ["PIC (Pilot In Command)", "ATC", "Airline dispatcher", "Co-pilot"], correct: 0 },
  // Q122
  { id: 120, question: "RPAS stands for:", options: ["Remotely Piloted Aircraft System", "Remote Pilot Aerial System", "Radio Piloted Aircraft Standard", "Remotely Positioned Aerial System"], correct: 0 },
  // Q123
  { id: 121, question: "FSTD stands for:", options: ["Flight Simulation Training Devices", "Flight Safety Training Department", "Full Scale Testing Device", "Flight Simulator Technical Division"], correct: 0 },
  // Q124
  { id: 122, question: "President of ICAO is elected every:", options: ["3 years", "1 year", "10 years", "5 years"], correct: 0 },
  // Q125
  { id: 123, question: "An aircraft is considered to be maintaining its assigned level as long as SSR Mode C shows it is within:", options: ["+/- 300 ft of the assigned level", "+/- 200 ft of the assigned level", "+/- 500 ft of the assigned level", "+/- 100 ft of the assigned level"], correct: 0 },
  // Q126
  { id: 124, question: "When Mach number technique is applied, minimum longitudinal separation between turbojet aircraft on the same track is:", options: ["10 minutes", "5 minutes", "15 minutes", "20 minutes"], correct: 0 },
  // Q127
  { id: 125, question: "Gathering of evidence after an accident is meant only to:", options: ["Know the real cause of the accident", "Know who was responsible for the accident", "Take penal actions and help judges in civil court proceedings", "Assign blame to the pilot"], correct: 0 },
  // Q128
  { id: 126, question: "Physiological effects at altitude take place because of:", options: ["Pressure decreases with altitude", "Linear acceleration", "Pressure increases with altitude", "Increased oxygen at altitude"], correct: 0 },
  // Q129
  { id: 127, question: "When landing after a heavy aircraft, the best technique to avoid wake turbulence on final is:", options: ["Remain above the glide path of the preceding aircraft all the way till over the threshold", "Remain below the glide path separated by 1000 ft", "Fly offset from centre line and below the glide path", "Increase approach speed by 20 knots"], correct: 0 },
  // Q130
  { id: 128, question: "When visual manoeuvring (circling area) is established around an aerodrome, the obstacle clearance is determined:", options: ["For each category of aircraft and it may be different for each category", "For category A and B aircraft only", "For category C, D and E only", "Same for all categories"], correct: 0 },
  // Q131
  { id: 129, question: "With regard to flight time limitations, 'Flight time' means:", options: ["The total time from when an aircraft first moves under its own power for take-off until it comes to rest after flight", "The time between take-off and landing", "The time between starting to move and coming to a stop plus one and a half hours", "Block-to-block time minus taxi time"], correct: 0 },
  // Q132
  { id: 130, question: "Medium to good friction coefficient is:", options: ["0.39 to 0.36", "0.50 to 0.45", "0.25 to 0.20", "0.60 to 0.55"], correct: 0 },
  // Q133
  { id: 131, question: "Estimated surface friction needs to be informed for:", options: ["Each third of a runway as seen from pilot's point of view, if needed", "The entire runway as one value", "Only the touchdown zone", "Only the first half of the runway"], correct: 0 },
  // Q135
  { id: 132, question: "Petroleum bulk is petroleum in a receptacle which exceeds:", options: ["1000 litres", "900 litres", "1500 litres", "500 litres"], correct: 0 },
  // Q136
  { id: 133, question: "On the Readability Scale, what does scale 1 indicate?", options: ["Unreadable", "Readable now and then", "Readable but with difficulty", "Readable"], correct: 0 },
];

export const redbirdAirRegTopic: Topic = {
  id: "redbird-air-reg",
  title: "Redbird Question Bank",
  questions: redbirdAirRegQuestionsData,
};
