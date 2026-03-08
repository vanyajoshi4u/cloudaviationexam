import { MCQuestion, Topic } from "@/data/icJoshiQuestions";

const cessna172RQuestions: MCQuestion[] = [
  // Q1-Q12 (Page 1-2)
  { id: 1, question: "Ignition operation is controlled by:", options: ["R, L & Both", "R, L, Both & Start", "R, L & Start", "L, Both & Start"], correct: 1 },
  { id: 2, question: "Which of the following provides best fuel economy?", options: ["Operation at peak EGT", "Operation at 50°F, rich of peak EGT", "Operation at 50°C, rich of peak EGT", "Operation at 25°C, rich of peak EGT"], correct: 0 },
  { id: 3, question: "Oil pressure gauge markings:", options: ["Redline for minimum permissible ideal pressure", "Green arc between 50–90 psi", "Redline for maximum permissible ideal pressure", "All are correct"], correct: 3 },
  { id: 4, question: "Examination of fuel in the system for contamination:", options: ["Before first flight every day", "After each refueling", "As in (A) & (B)", "None, need not examine"], correct: 2 },
  { id: 5, question: "Weak intermittent firing with black smoke is caused by:", options: ["Spark plug fouling", "Magneto malfunction", "Starter malfunction", "Overpriming"], correct: 3 },
  { id: 6, question: "There was obvious power loss when ignition switch was momentarily turned from BOTH to LEFT. The cause is:", options: ["Right magneto problem", "Left magneto problem", "Both", "Carburetor icing"], correct: 1 },
  { id: 7, question: "To apply parking brakes:", options: ["Set brake with rudder pedal", "As in (A) & pull handle aft", "As in (B) & rotate 90° down", "All wrong"], correct: 2 },
  { id: 8, question: "The VSI depicts:", options: ["Rate of climbing ft/min", "Rate of descending ft/min", "Both of (A) & (B) are wrong", "Rate of climb or descend in ft/min"], correct: 3 },
  { id: 9, question: "The engine vacuum system provides:", options: ["Pressure to operate altitude indicator & airspeed indicator", "Pressure to operate airspeed indicator & altimeter", "Suction necessary to operate direction indicator & altitude indicator", "Suction necessary to operate direction indicator & airspeed indicator"], correct: 2 },
  { id: 10, question: "The center area of instrument panel contains:", options: ["Static pressure alternate source valve", "Auxiliary fuel pump switch", "Suction gauge", "All of the above"], correct: 0 },
  { id: 11, question: "In attitude indicator, which is NOT marked on each side of central marking?", options: ["20 deg", "30 deg", "40 deg", "60 deg"], correct: 2 },
  { id: 12, question: "In long flight, the maximum deviation in compass for precession error is:", options: ["20 deg", "25 deg", "30 deg", "40 deg"], correct: 2 },

  // Q13-Q18 (Page 3)
  { id: 13, question: "For maximum cabin heat:", options: ["Cabin air knob pushed in", "Cabin heat knob pushed out", "As in (A) & cabin heat knob is pulled out", "As in (B) & cabin air knob is pulled out"], correct: 3 },
  { id: 14, question: "Stall warning is activated:", options: ["5 to 10 knots above stalling speed during takeoff", "5 to 10 knots above stalling speed during takeoff only", "5 to 10 knots above stalling speed in all conditions", "5 to 10 knots above stalling speed in landing only"], correct: 2 },
  { id: 15, question: "ELT annunciator does not activate due to:", options: ["Low fuel flow", "Low pressure", "Low vacuum", "Low voltage"], correct: 0 },
  { id: 16, question: "Oil pressure should register in cold weather within:", options: ["30 secs", "60 secs", "20 secs", "None of the above"], correct: 1 },
  { id: 17, question: "In the event of alternate static door being open:", options: ["ASI will give error of 4 knots", "ASI will give error of 7 knots", "Altimeter will give error of (+/-) 30 inches in closed window condition", "As in (A) & (B)"], correct: 1 },
  { id: 18, question: "Propeller ground clearance:", options: ["12 inches", "1 foot", "11 inches", "11.25 inches"], correct: 3 },

  // Q19-Q24 (Page 4)
  { id: 19, question: "Minimum turning radius of aircraft:", options: ["25 ft 5 inches", "26 ft 5 inches", "27 ft 5 inches", "28 ft 5 inches"], correct: 2 },
  { id: 20, question: "Abrupt use of control is prohibited beyond:", options: ["90 knots", "99 knots", "113 knots", "None of the above"], correct: 1 },
  { id: 21, question: "Yellow arc of ASI:", options: ["44–129 knots", "129–163 knots", "163 knots", "33–85 knots"], correct: 1 },
  { id: 22, question: "Minimum oil pressure of aircraft:", options: ["20 psi", "20 inches", "30 psi", "None of the above"], correct: 0 },
  { id: 23, question: "Alternator should be switched off in event of a meter reading:", options: ["Less than 31.5 Volts", "32 Volts", "More than 30 Volts", "More than 31.5 Volts"], correct: 3 },
  { id: 24, question: "Compass rupture to 25° may occur in event of alternator:", options: ["Switched on", "Switched off", "No charging", "None of the above"], correct: 1 },

  // Q25-Q31 (Pages 5-6 — reconstructed from garbled text)
  { id: 25, question: "DG (or compass) has to be aligned regularly on long flight for:", options: ["Precession", "Deviation", "Variation", "Inclination"], correct: 0 },
  { id: 26, question: "Maximum window open speed:", options: ["160 knots", "140 knots", "113 knots", "163 knots"], correct: 3 },
  { id: 27, question: "Maximum oil pressure:", options: ["Not given", "50 psi", "115 psi", "160 psi"], correct: 2 },
  { id: 28, question: "Unusable fuel quantity in each tank:", options: ["21.5 US gallons", "1.5 US gallons", "53 US gallons", "None of the above"], correct: 1 },
  { id: 29, question: "Maximum ramp weight is:", options: ["2107 lbs", "2450 lbs", "2457 lbs", "2100 lbs"], correct: 2 },
  { id: 30, question: "Maximum slip duration with one tank:", options: ["60 secs", "30 secs", "50 secs", "None of the above"], correct: 1 },
  { id: 31, question: "Colour of 100LL (Low Lead) fuel:", options: ["Blue", "Green", "Yellow", "Orange"], correct: 0 },

  // Q32-Q37 (Page 6)
  { id: 32, question: "Minimum oil quantity for extended flights is:", options: ["7 quarts", "9 quarts", "None of the above", "5 quarts"], correct: 3 },
  { id: 33, question: "Concentration in fuel of DiEGME (Diethyl Glycol Monomethyl Ether):", options: ["1%", "0.25%", "0.1% only", "0.10% to 0.15%"], correct: 3 },
  { id: 34, question: "Concentration in fuel of isopropyl alcohol:", options: ["1%", "2%", "0.10%", "0.10% to 0.15%"], correct: 0 },
  { id: 35, question: "Which oil is to be used after 50 hours of engine running or when oil consumption has stabilized?", options: ["SAE-J-1966 aviation grade straight mineral oil", "MIL-L-22851", "SAE J1899 aviation grade ashless dispersant oil", "As in (B) & (C)"], correct: 3 },
  { id: 36, question: "Maximum deflection of nosewheel by use of rudder pedal on ground is:", options: ["10° to either side", "10° to left side only", "10° to right side only", "30° to either side"], correct: 0 },
  { id: 37, question: "Mechanical stops on flaps are at:", options: ["10°", "20°", "30°", "10°, 20° and 30°"], correct: 3 },

  // Q38-Q43 (Pages 7-8 — reconstructed)
  { id: 38, question: "Best glide speed of aircraft:", options: ["79 knots", "59 knots", "68 knots", "All of the above are correct"], correct: 0 },
  { id: 39, question: "Flap operating speed range:", options: ["79 knots", "59 knots", "68 knots", "All are correct"], correct: 2 },
  { id: 40, question: "Engine cooling system uses:", options: ["Hydraulic", "Oil system only", "Air & oil system", "All are correct"], correct: 1 },
  { id: 41, question: "Flooded engine start procedure:", options: ["Turn off auxiliary fuel pump & place mixture in idle cut off", "Open half throttle & crank engine, when engine fires", "Advance mixture to full rich & retard throttle properly", "All are correct"], correct: 3 },
  { id: 42, question: "Temperature lapse rate:", options: ["5 deg/1000 ft", "2 deg/1000 m", "2 deg/1000 ft", "5 deg/1000 m"], correct: 2 },
  { id: 43, question: "Starter duty cycle:", options: ["10 secs ON", "10 secs OFF", "20 secs ON", "As in (A) & (C)"], correct: 3 },

  // Q44-Q49 (Page 8 — reconstructed)
  { id: 44, question: "Enroute climb speeds 5 to 10 knots above best rate of climb for:", options: ["Poor visibility, performance & cooling", "Best visibility", "As in (B) & best performance", "As in (C) & best cooling"], correct: 3 },
  { id: 45, question: "Until 50 hours have been accumulated, engine should be run at:", options: ["60% power on cruise", "100% power on cruise", "80% power on cruise", "Do not use power"], correct: 2 },
  { id: 46, question: "An open alternate air door will result in:", options: ["Approx. 10% loss of power at half throttle", "Approx. 10% loss of power at full throttle", "No power loss", "Approx. 10% increase of power at full throttle"], correct: 1 },
  { id: 47, question: "Carburetor icing is indicated by:", options: ["Loss of RPM in fixed pitch propeller", "Increase of RPM in fixed pitch propeller", "Loss of manifold pressure in constant speed propeller", "As in (A) & (C)"], correct: 3 },
  { id: 48, question: "Nose gear strut air pressure:", options: ["40 psi", "20 psi", "45 psi", "25 psi"], correct: 2 },
  { id: 49, question: "OAT/Voltmeter gauge select switch may be used by pressing elect button for:", options: ["3 secs to start", "5 secs to start", "10 secs to start", "None of the above"], correct: 1 },

  // Q50-Q55 (Page 9)
  { id: 50, question: "If the PTT button of microphone is kept pressed more than 33 seconds continuously, the transmission is:", options: ["Automatically terminated", "Switched Off", "Switched ON", "None of the above"], correct: 0 },
  { id: 51, question: "In Voltmeter/OAT/CLOCK, pushing upper control button will change the display on window to:", options: ["S-T-A-R-T", "E-N-D", "E-F-C-E", "F-E-C-F"], correct: 2 },
  { id: 52, question: "Maximum fuel capacity of each tank:", options: ["56 US gallons", "3 US gallons", "28 US gallons", "1.5 US gallons"], correct: 0 },
  { id: 53, question: "Spark plug fault causes:", options: ["Loss of RPM", "Loss of Fuel", "Increase in RPM", "None of the above"], correct: 0 },
  { id: 54, question: "Magneto malfunction causes:", options: ["Loss of RPM", "Loss of fuel", "Misfiring", "All of the above"], correct: 2 },
  { id: 55, question: "Brake fluid specification of aircraft:", options: ["MIL-L-6082", "MIL-L-2285", "MIL-H-5606", "MIL-L-H-5686"], correct: 2 },

  // Q56-Q61 (Page 10)
  { id: 56, question: "Tyre pressure of nosewheel tyre:", options: ["45 psi", "34 psi", "28 psi", "30 psi"], correct: 3 },
  { id: 57, question: "Tyre pressure of mainwheel tyre:", options: ["45 psi", "34 psi", "28 psi", "30 psi"], correct: 2 },
  { id: 58, question: "Nosewheel strut extension length:", options: ["2 inches", "3 inches", "1 inch", "5 inches"], correct: 0 },
  { id: 59, question: "Propeller diameter:", options: ["69 inches", "75 inches", "67 inches", "73 inches"], correct: 1 },
  { id: 60, question: "Engine model number:", options: ["IO-360-L2A", "IO-280-L2A", "IO-360-N2C", "Not given"], correct: 0 },
  { id: 61, question: "Standard empty weight of aircraft:", options: ["1369 lbs", "1639 lbs", "2100 lbs", "1600 lbs"], correct: 1 },

  // Q62-Q67 (Page 11)
  { id: 62, question: "Baggage compartment allowance:", options: ["Baggage compartment has allowance of 120 lbs", "Baggage compartment has allowance of 50 lbs", "Total baggage compartment allowance is 120 lbs", "All are correct"], correct: 3 },
  { id: 63, question: "Maximum useful load of aircraft:", options: ["818 lbs", "808 lbs", "900 lbs", "160 lbs"], correct: 0 },
  { id: 64, question: "Wing loading of aircraft:", options: ["14.1 kg/sq. ft", "15.3 lbs/Hp", "14.1 lbs/sq. ft", "14.1 lbs/m"], correct: 2 },
  { id: 65, question: "Power loading of aircraft:", options: ["15.3 kg/Hp", "15.3 lbs/m", "14.1 lbs/sq. ft", "15.3 lbs/Hp"], correct: 3 },
  { id: 66, question: "Wing area of aircraft:", options: ["169 sq. ft", "174 sq. inches", "174 sq. ft", "None of the above"], correct: 2 },
  { id: 67, question: "Wingspan of aircraft:", options: ["36 ft 1 inch", "35 ft 10 inches", "33 ft", "38 ft"], correct: 2 },

  // Q68-Q73 (Page 12)
  { id: 68, question: "Elevator span:", options: ["11 ft 2 inches", "11 ft 4 inches", "36 ft 1 inch", "65 inches"], correct: 1 },
  { id: 69, question: "Wheelbase length of aircraft:", options: ["65 inches", "75 inches", "74 inches", "None of the above"], correct: 0 },
  { id: 70, question: "Horsepower rating & engine RPM:", options: ["108 BHP at 2800 RPM", "160 BHP at 2400 RPM", "108 BHP at 2450 RPM", "160 BHP at 2100 RPM"], correct: 1 },
  { id: 71, question: "Propeller model number of aircraft:", options: ["IO-360-L2A", "IC235/LFA7570", "IC235/DSA7570", "IC360/LFA7570"], correct: 1 },
  { id: 72, question: "Stall speed (airspeed when aircraft stalls):", options: ["Flaps Up 60 KIAS, Flaps Down 65 KIAS", "Flaps Up 70 KIAS, Flaps Down 65 KIAS", "Flaps Up 65 KIAS, Flaps Down 60 KIAS", "Flaps Up or Down 65 KIAS"], correct: 2 },
  { id: 73, question: "Landing with a flat main tyre, flaps will be:", options: ["10 deg", "20 deg", "As required", "30 deg"], correct: 3 },

  // Q74-Q79 (Page 13)
  { id: 74, question: "Landing with a flat nose tyre, flaps will be:", options: ["30 degrees", "As required", "10 degrees", "Not required"], correct: 1 },
  { id: 75, question: "Engine failed during takeoff roll — the first action will be:", options: ["Brakes apply", "Wing flaps retract", "Ignition switch off", "Throttle idle"], correct: 3 },
  { id: 76, question: "If fire occurs during start on ground, the throttle & mixture will be:", options: ["Throttle half open, mixture idle cut off", "Throttle full open, mixture idle cut off", "Throttle close, mixture rich", "Throttle full open, mixture rich"], correct: 1 },
  { id: 77, question: "Descending through clouds, to minimize compass errors due to changing bank angle:", options: ["Choose a heading shown in compass", "Choose an easterly heading", "Choose a westerly heading", "As in (B) & (C)"], correct: 3 },
  { id: 78, question: "The magneto check should be made at:", options: ["Before startup", "1800 RPM", "2000 RPM", "1700 RPM"], correct: 0 },
  { id: 79, question: "The aircraft is equipped with:", options: ["A 28 volt, direct current electrical system", "A 28 volt, indirect current electrical system", "A 34 volt, direct current electrical system", "None of the above"], correct: 0 },

  // Q80-Q85 (Page 14)
  { id: 80, question: "The electrical system of aircraft is powered by:", options: ["A belt-driven 60 amp alternator & 34 volt battery", "A 20 amp alternator & (+/-) 30 volt battery", "A 34 volt, direct current electrical system", "None of the above"], correct: 2 },
  { id: 81, question: "The desired vacuum range of aircraft is:", options: ["4 to 5 mm of mercury", "4 to 5 inches of mercury", "4.5 to 5.5 mm of mercury", "4.5 to 5.5 inches of mercury"], correct: 3 },
  { id: 82, question: "The communication receiver/transmitter receives & transmits signals:", options: ["Between 110.35 & 136.975 MHz with 35 KHz spacing", "Between 118.00 & 136.975 MHz with 25 KHz spacing", "Does not receive & transmit signals", "None of the above"], correct: 1 },
  { id: 83, question: "The navigation receiver receives VOR & Localizer signals:", options: ["Between 108.00 & 117.95 MHz in 50 KHz steps", "Between 118.00 & 136.975 MHz in 25 KHz steps", "Between 108.00 & 136.975 MHz in 50 KHz steps", "None of the above"], correct: 0 },
  { id: 84, question: "Aircraft clock model:", options: ["The Levis model simple clock", "The Davtron model 803 digital clock", "The Levis model 803 digital clock", "The Davtron model simple clock"], correct: 1 },
  { id: 85, question: "The clock of aircraft combines the features of:", options: ["A Clock", "Outside air temperature gauge", "Voltmeter", "All of the above"], correct: 3 },

  // Q86-Q91 (Page 15)
  { id: 86, question: "Take-off speed for normal climb:", options: ["60–65 KIAS", "65–75 KIAS", "70–80 KIAS", "75–80 KIAS"], correct: 2 },
  { id: 87, question: "Enroute climb at sea level airspeed:", options: ["75–85 KIAS with flaps up", "75–85 KIAS with flaps down", "70–80 KIAS with flaps up", "70–80 KIAS with flaps down"], correct: 0 },
  { id: 88, question: "Engine manufacturer of aircraft:", options: ["Avco Lycoming", "Textron Lycoming", "McCauley", "None"], correct: 1 },
  { id: 89, question: "Engine type of aircraft:", options: ["Four cylinder engine", "Fuel injection", "Air cooled", "All are correct"], correct: 3 },
  { id: 90, question: "MIL-L-6082 or SAE J1966 Aviation Grade Straight Mineral Oil is used:", options: ["To replenish the supply during first 25 hrs", "To replenish the supply during first 75 hrs", "Use until total of first 50 hrs", "As in (A) & (C) are correct"], correct: 3 },
  { id: 91, question: "At sea level, best rate of climb speed is:", options: ["70 KIAS", "79 KIAS", "71 KIAS", "65 KIAS"], correct: 1 },

  // Q92-Q97 (Page 16)
  { id: 92, question: "Best angle of climb speed:", options: ["70 KIAS", "79 KIAS", "71 KIAS", "65 KIAS"], correct: 2 },
  { id: 93, question: "Landing approach speed:", options: ["Normal approach speed at 65–75 KIAS", "Normal approach speed at 60–70 KIAS", "Short field approach speed of 62 KIAS with flaps 30 deg", "All are correct"], correct: 2 },
  { id: 94, question: "Maximum oil temperature:", options: ["118 °C", "245 °F", "As in (A) & (B)", "100 °F"], correct: 2 },
  { id: 95, question: "Maximum flap extended speed:", options: ["110 KIAS for 10° flaps", "85 KIAS for 10° to 30° flaps", "123 KIAS for 0° to 30° flaps", "As in (A) & (B)"], correct: 3 },
  { id: 96, question: "VNE of aircraft:", options: ["160 KCAS or 163 KIAS", "126 KCAS or 129 KIAS", "108 KCAS or 110 KIAS", "140 KCAS or 145 KIAS"], correct: 0 },
  { id: 97, question: "Maximum structural cruising speed:", options: ["160 KCAS or 163 KIAS", "126 KCAS or 129 KIAS", "108 KCAS or 110 KIAS", "140 KCAS or 145 KIAS"], correct: 1 },

  // Q98-Q100 (Page 17)
  { id: 98, question: "Which of the following statements is incorrect?", options: ["No aerobatic manoeuvre approved", "Aerial acrobatic manoeuvre approved", "DAY–NIGHT–VFR–IFR approved", "Flight in icing conditions prohibited"], correct: 3 },
  { id: 99, question: "While ditching:", options: ["Transmit MAYDAY on 121.5 MHz giving location & intention & SQUAWK 7700", "Transmit HELLO on 121.5 MHz giving location & intention on SQUAWK 7700", "Transmit MAYDAY on 98.3 MHz giving location & intention & SQUAWK 7200", "None of the above"], correct: 0 },
  { id: 100, question: "The two radios contain:", options: ["A 760 channel VHF communication receiver", "A 200 channel VHF navigation receiver", "A 350 channel VHF navigation receiver", "As in (A) & (B)"], correct: 3 },
];

export const cessna172RTopic: Topic = {
  id: "cessna-172r",
  title: "Cessna 172R",
  questions: cessna172RQuestions,
};
