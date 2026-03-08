import { MCQuestion } from "@/data/icJoshiQuestions";

interface Topic {
  id: string;
  title: string;
  questions: MCQuestion[];
}

export const da42Questions: MCQuestion[] = [
  { id: 1, question: "Vs1 on PFD's red arc meaning:", options: ["Below 1 bar", "Above 6.5 bar", "Both (Below 1 bar and Above 6.5 bar)"], correct: 2 },
  { id: 2, question: "FADEC stands for:", options: ["Full authority digital engine control", "Fully automated digital engine controller", "Full authority dynamic engine control", "Fully adjustable digital engine computer"], correct: 0 },
  { id: 3, question: "What is the wing span of DA 42?", options: ["40 ft", "42 ft", "44 ft", "46 ft"], correct: 2 },
  { id: 4, question: "Wing dihedral angle of DA 42 is:", options: ["3 deg", "5 deg", "7 deg", "4 deg"], correct: 1 },
  { id: 5, question: "Leading edge sweep of DA 42 is:", options: ["0 deg", "1 deg", "2 deg", "3 deg"], correct: 1 },
  { id: 6, question: "Angle of incidence of DA 42 is:", options: ["-1.1 deg", "-1.5 deg", "0 deg", "-2.0 deg"], correct: 0 },
  { id: 7, question: "Red radial on the airspeed indicator indicates:", options: ["Minimum control speed", "Vne", "Both (Minimum control speed and Vne)"], correct: 2 },
  { id: 8, question: "RPM limitations of DA 42 engine:", options: ["2300 (Max 30 seconds)", "2500 (Max 20 seconds)", "2700 (Max 15 seconds)", "2400 (Max 25 seconds)"], correct: 1 },
  { id: 9, question: "L/R oil pressure annunciator is displayed on PFD's red arc meaning:", options: ["Below 1 bar", "Above 6.5 bar", "Both (Below 1 bar and Above 6.5 bar)"], correct: 2 },
  { id: 10, question: "Oil temperature range of DA 42 is:", options: ["-30 to +140 deg Cel", "-32 to +140 deg Cel", "-40 to +75 deg Cel"], correct: 0 },
  { id: 11, question: "Propeller pitch angle at feathered position is:", options: ["75 deg (±1 deg)", "78 deg (±1 deg)", "81 deg (±1 deg)", "85 deg (±1 deg)"], correct: 2 },
  { id: 12, question: "Maximum zero fuel mass of DA 42 is:", options: ["1550 kgs", "1600 kgs", "1650 kgs", "1700 kgs"], correct: 2 },
  { id: 13, question: "C.G limitation of DA 42 is:", options: ["2.25 m, 2.39 m aft of datum plane", "2.35 m, 2.49 m aft of datum plane", "2.45 m, 2.59 m aft of datum plane", "2.30 m, 2.44 m aft of datum plane"], correct: 1 },
  { id: 14, question: "Extended G load at Va for DA 42 is:", options: ["2.8 G", "3.4 G", "3.8 G", "4.2 G"], correct: 2 },
  { id: 15, question: "Which of the following leads to L/R oil pressure warnings?", options: ["Exceeding the maximum powerplant load factors", "Exceeding maximum structural load factors"], correct: 0 },
  { id: 16, question: "Operating altitude of DA 42 is:", options: ["16000 ft", "17500 ft", "17000 ft", "Both 16000 ft and 17000 ft"], correct: 3 },
  { id: 17, question: "Total useable fuel in each tank of DA 42 is:", options: ["25 USG", "26 USG", "28 USG"], correct: 0 },
  { id: 18, question: "In case of AHRS failure, what will be the display on PFD?", options: ["Red X over AHRS", "Removal of sky and ground presentation", "Yellow 'AHRS failure' shown on PFD, replace with a yellow 'HDG' and compass rose digits will be removed", "All of the above"], correct: 3 },
  { id: 19, question: "To avoid propeller over speeds shortly after unfeathering and restarting, we should maintain airspeed:", options: ["Below 80 knots", "Below 110 knots", "Below 120 knots"], correct: 2 },
  { id: 20, question: "In case of single engine failure in flight, at airspeeds below Vmca:", options: ["Increase thrust to regain directional control", "Establish 3 deg to 5 deg bank; approx. half ball towards good engine", "Both of them"], correct: 1 },
  { id: 21, question: "Landing approach speed of DA 42 is:", options: ["82 knots", "76 knots", "85 knots"], correct: 0 },
  { id: 22, question: "Tyre pressure for nose wheel / Main wheels of DA 42 is:", options: ["87 psi and 68 psi", "68 psi and 87 psi", "95 psi and 70 psi"], correct: 0 },
  { id: 23, question: "Starter motor should not be operated for more than:", options: ["20 seconds", "10 seconds", "15 seconds", "30 seconds"], correct: 1 },
  { id: 24, question: "Full form of AHRS is:", options: ["Attitude and heading reference system", "Altitude and heading reference system", "Altitude and horizontal reference system", "None of the above"], correct: 0 },
  { id: 25, question: "If oil pressure is not within green range, what should be the action?", options: ["Nothing, it is normal and continue the flight", "Wait for 3 seconds, check whether it's in range", "As in (b) increase power and wait for 20 seconds"], correct: 2 },
  { id: 26, question: "Registering time of oil pressure is:", options: ["5–20 seconds", "10–20 seconds", "10–30 seconds", "None of the above"], correct: 0 },
  { id: 27, question: "If L/R ECU A/B FAIL do not illuminate and extinguish during the test sequence:", options: ["There is malfunction in ECU", "It is normal and there is no malfunction in ECU, carryout the flight", "As in (a) terminate the flight"], correct: 2 },
  { id: 28, question: "The redundancy of ECU is only given when:", options: ["Only set to ECU A", "Only set to AUTO", "Both A and B", "Only set to ECU B"], correct: 1 },
  { id: 29, question: "If oil temperature reaches yellow range during climb:", options: ["Flight should be continued with airspeed increased by 10 knots and power reduce by 10%", "Flight should be continued with airspeed decreased by 10 knots and power increased by 10%", "Flight should be continued with airspeed increased by 20 knots and power reduced by 20%"], correct: 0 },
  { id: 30, question: "Recommended cruise power setting of DA 42 is:", options: ["70%", "80%", "90%", "60%"], correct: 0 },
  { id: 31, question: "\"CHECK GEAR\" caution message is displayed when:", options: ["Flaps are in LDG position", "One Power lever is less than approx. 20%", "Both Power lever is less than approx. 10%", "Both (a) and (b)"], correct: 3 },
  { id: 32, question: "What is the change in landing distance on a downhill slope?", options: ["2% slope – 10% decrease", "2% slope – 10% increase", "1% slope – 10% decrease", "1% slope – 10% increase"], correct: 1 },
  { id: 33, question: "Propeller speed reducing gear ratio is:", options: ["1:1.69", "1:1.79", "1:2", "1:0.5"], correct: 0 },
  { id: 34, question: "Each wing has how many aluminum chambers?", options: ["One", "Two", "Three", "Four"], correct: 2 },
  { id: 35, question: "A red '55' on black background indicates:", options: ["Temperature is more than 55 deg Cel, and the structural temperature limit is exceeded", "Temperature is less than 55 deg Cel", "Oil pressure is above 55 psi", "Engine RPM is above 5500"], correct: 0 },
  { id: 36, question: "Extended –ve g-loads can cause:", options: ["Propeller control problems", "Engine surging", "All of the above"], correct: 2 },
  { id: 37, question: "The battery backup for AHRS and Flood lights is of:", options: ["30 min", "60 min", "90 min", "120 min"], correct: 2 },
  { id: 38, question: "ECU battery back up time is:", options: ["15 min", "30 min", "45 min", "60 min"], correct: 1 },
  { id: 39, question: "What is the maximum speed limitation for Auto pilot in DA 42?", options: ["165 kts", "175 kts", "185 kts", "195 kts"], correct: 2 },
  { id: 40, question: "In case of single engine failure:", options: ["Do not use auto-pilot", "Can use auto-pilot", "Auto-pilot maintains directional control", "Both (b) and (c) are correct"], correct: 0 },
  { id: 41, question: "RPM drop while conducting ECU test in DA-42 is:", options: ["900 RPM", "500 RPM", "150 RPM", "None of the above, as it has air compressing cycle"], correct: 3 },
  { id: 42, question: "Height lost while feathering in flight is:", options: ["300 ft", "500 ft", "700 ft", "1000 ft"], correct: 1 },
  { id: 43, question: "Engine warm up time of DA 42 is:", options: ["1 min @ 1200 RPM", "2 min @ 1400 RPM", "3 min @ 1500 RPM", "2 min @ 1200 RPM"], correct: 1 },
  { id: 44, question: "Maximum elevator pull back angle, when power lever is approx. or less than 20% with LDG flap setting is:", options: ["13 deg", "13.5 deg", "15 deg", "15.5 deg"], correct: 0 },
  { id: 45, question: "Maximum take-off weight of DA-42 is:", options: ["1785 kgs", "1700 kgs", "1685 kgs", "1950 kgs"], correct: 0 },
  { id: 46, question: "The recorder records audio of last:", options: ["1.5 min", "2 min", "2.5 min", "3 min"], correct: 2 },
  { id: 47, question: "The displayed RPM is:", options: ["Engine RPM", "Propeller RPM", "Governor RPM", "Camshaft RPM"], correct: 1 },
  { id: 48, question: "For how long should ECU TEST button be pressed to reset the caution message?", options: ["More than 2 seconds", "More than 5 seconds", "More than 3 seconds", "More than 1 second"], correct: 0 },
  { id: 49, question: "Restarting altitude in DA-42 is:", options: ["6000 ft", "8000 ft", "10000 ft", "12000 ft"], correct: 1 },
  { id: 50, question: "There is an annunciation on PFD, red warning, 'L/R OIL TEMP HIGH' (RED RANGE) indicates:", options: ["Below -30 deg celsius", "Above 140 deg celsius", "Both a and b"], correct: 2 },
];

export const da42Topic: Topic = {
  id: "da-42",
  title: "DA 42 (Thielert)",
  questions: da42Questions,
};
