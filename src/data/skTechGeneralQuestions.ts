interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Topic {
  id: string;
  title: string;
  questions: Question[];
}

const skTechQuestions: Question[] = [
  {
    id: 1,
    question: "In subsonic flight, which is correct for VMD?",
    options: [
      "Parasite drag greater than induced drag",
      "CL and CD are minimum",
      "Parasite and induced drag are equal",
      "Induced drag is greater than parasite drag"
    ],
    correctAnswer: 2
  },
  {
    id: 2,
    question: "Induced drag can be reduced by:",
    options: [
      "Increased taper ratio",
      "Decreased aspect ratio",
      "Use of a wing tip with a thinner airfoil section",
      "Increased aspect ratio"
    ],
    correctAnswer: 3
  },
  {
    id: 3,
    question: "The advantage of turbulent boundary layer vs. laminar boundary layer is:",
    options: [
      "Decreases energy",
      "Thinner",
      "Increased skin friction",
      "Less tendency to separate"
    ],
    correctAnswer: 3
  },
  {
    id: 4,
    question: "The effect of winglets is:",
    options: [
      "Elliptical pressure distribution increases",
      "Reduction in induced drag",
      "Decrease in stall speed",
      "Longitudinal static stability increase"
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "Which of the following is the correct example of differential aileron deflection to initiate a left turn?",
    options: [
      "Left aileron up 5 degrees, right aileron down 2 degrees",
      "Right aileron up 5 degrees, left aileron down 2 degrees",
      "Left aileron up 2 degrees, right aileron down 5 degrees",
      "Right aileron up 2 degrees, left aileron down 5 degrees"
    ],
    correctAnswer: 0
  },
  {
    id: 6,
    question: "Which of the following is required so the flight crew can determine the effects of compressibility?",
    options: ["IAS", "TAS", "Mach number", "EAS"],
    correctAnswer: 2
  },
  {
    id: 7,
    question: "What effect on stall speed does decreasing sweep angle have?",
    options: [
      "Increased anhedral increases stall speed",
      "Fitting a T-tail will reduce stall speed",
      "Increasing sweepback decreases stall speed",
      "Decreasing sweep angle decreases stall speed"
    ],
    correctAnswer: 3
  },
  {
    id: 8,
    question: "What is motion about the longitudinal axis called?",
    options: ["Pitching", "Rolling", "Yawing", "Phugoid"],
    correctAnswer: 1
  },
  {
    id: 9,
    question: "Which of the following configurations is best suited to flight in dusty conditions?",
    options: [
      "Flaps up",
      "Flaps in landing configuration",
      "Flaps and landing gear down",
      "Flaps up and landing gear down"
    ],
    correctAnswer: 0
  },
  {
    id: 10,
    question: "The angle between the relative airflow and plane of rotation is:",
    options: ["Pitch angle", "Angle of advance", "Helix angle", "Any of the above"],
    correctAnswer: 2
  },
  {
    id: 11,
    question: "While feathering a propeller:",
    options: [
      "Root hub is at neutral and tips are at positive AOA",
      "Root hub is at negative and tips are at neutral AOA",
      "None of the above"
    ],
    correctAnswer: 2
  },
  {
    id: 12,
    question: "What influence does the G loading (one forward) have on the stall?",
    options: [
      "Vs increases, stall angle remains constant",
      "Vs increases, stall angle increases",
      "Vs decreases, stall angle remains constant"
    ],
    correctAnswer: 0
  },
  {
    id: 13,
    question: "Landing configuration is usually:",
    options: [
      "Slats and flaps fully deployed",
      "Slats only deployed",
      "Flaps only deployed"
    ],
    correctAnswer: 0
  },
  {
    id: 14,
    question: "Raising slats too soon after take-off might:",
    options: [
      "Increase stalling angle",
      "Cause stalling",
      "Prevent flutter",
      "Increase rate of climb"
    ],
    correctAnswer: 1
  },
  {
    id: 15,
    question: "The difference between IAS and TAS will:",
    options: [
      "Increase with decreasing temperature",
      "Increase with increasing density",
      "Remain constant at all times",
      "Decrease with decreasing altitude"
    ],
    correctAnswer: 0
  },
  {
    id: 16,
    question: "What is an assisted flying control system?",
    options: [
      "Balance tabs",
      "Mass balance",
      "Variable Incidence tailplane",
      "Horn balance"
    ],
    correctAnswer: 0
  },
  {
    id: 17,
    question: "Which is not a 'busy' condition?",
    options: [
      "Low aspect ratio straight wing with flaps down",
      "High aspect ratio straight wing with flaps down",
      "Low aspect ratio swept wing flaps up",
      "High aspect ratio swept wing with flaps up"
    ],
    correctAnswer: 3
  },
  {
    id: 18,
    question: "C of G on the aft limit will:",
    options: [
      "Increase stalling speed but leave stalling angle unchanged",
      "Decrease stalling speed but leave stalling angle unchanged",
      "Increase stalling angle but leave stalling speed unchanged",
      "Leave both stalling angle and stalling speed unchanged"
    ],
    correctAnswer: 1
  },
  {
    id: 19,
    question: "At the stall:",
    options: [
      "Tips of swept back wings stall first, moving C of P inwards and forwards",
      "Roots of swept back wings stall first, moving C of P outwards and rearwards",
      "Straight wing tips stall first, moving C of P inwards and forwards",
      "Straight wing roots stall first, moving C of P aft"
    ],
    correctAnswer: 0
  },
  {
    id: 20,
    question: "Take-off from an airfield with a low density altitude will result in:",
    options: [
      "A longer take-off run",
      "A higher than standard IAS before lift off",
      "A higher TAS for the same lift off IAS",
      "A shorter take off run because of the lower TAS required for the same IAS"
    ],
    correctAnswer: 3
  },
  {
    id: 21,
    question: "The sum of Form drag, Skin friction drag and Interference drag is:",
    options: ["Total drag", "Induced drag", "Profile drag"],
    correctAnswer: 2
  },
  {
    id: 22,
    question: "The phenomenon of flutter is described as:",
    options: [
      "Rapid oscillatory motion involving only rotation of the control surfaces",
      "Rapid movement of the airframe caused by vibration from the engines",
      "Reversal of the ailerons caused by wing torsional flexibility"
    ],
    correctAnswer: 0
  },
  {
    id: 23,
    question: "Controls are mass balanced in order to:",
    options: [
      "Eliminate control flutter",
      "Assist in moving the controls",
      "Provide equal control forces on all three controls"
    ],
    correctAnswer: 0
  },
  {
    id: 24,
    question: "If an aircraft weight is reduced by 15%, VA will:",
    options: [
      "Not change",
      "Increase by 15%",
      "Increase by 7.5%",
      "Decrease by 7.5%"
    ],
    correctAnswer: 3
  },
  {
    id: 25,
    question: "VLO is defined as:",
    options: [
      "Maximum landing gear operating speed",
      "Maximum landing gear extended speed",
      "Maximum leading edge flaps extended speed",
      "Maximum flap speed"
    ],
    correctAnswer: 0
  },
  {
    id: 26,
    question: "Torsional flutter is a condition during which the control surface oscillates about:",
    options: [
      "Its hinge line",
      "The wing chord line",
      "The aircraft longitudinal axis",
      "None of the above"
    ],
    correctAnswer: 0
  },
  {
    id: 27,
    question: "After an aircraft has been exposed to severe weather:",
    options: [
      "Snow should be removed but smooth ice may be left",
      "All snow and ice should be removed",
      "Loose snow may be left but ice must be removed",
      "Providing the contamination is not too thick, it may be left in place"
    ],
    correctAnswer: 1
  },
  {
    id: 28,
    question: "Icing conditions may be encountered in the atmosphere when:",
    options: [
      "Relative humidity is low and temperature rises",
      "Pressure is high and humidity falls",
      "Relative humidity is high and temperature is low",
      "Relative pressure is high and temperature is high"
    ],
    correctAnswer: 2
  },
  {
    id: 29,
    question: "Flap deployed in turbulence causes:",
    options: [
      "Reduction in stalling speed and increase in load",
      "Increasing stalling speed and decreasing load",
      "Decreasing stalling angle"
    ],
    correctAnswer: 0
  },
  {
    id: 30,
    question: "Weight increases, what happens to take off run?",
    options: [
      "Same power setting in same speed",
      "More power needed and decreased speed",
      "Increased roll with same power in lift off and more airspeed"
    ],
    correctAnswer: 2
  },
  {
    id: 31,
    question: "In modern light aircraft, the tendency to nose down when power is reduced is due to:",
    options: [
      "Thrust line below drag line",
      "CG ahead of CP",
      "CP ahead of CG",
      "Thrust line above drag line"
    ],
    correctAnswer: 3
  },
  {
    id: 32,
    question: "Aircraft manoeuvrability at high altitude decreases because:",
    options: [
      "Stability decreases",
      "TAS increases",
      "Buffet margins converge",
      "Buffet margins diverge"
    ],
    correctAnswer: 2
  },
  {
    id: 33,
    question: "Aircraft are least affected by turbulence with:",
    options: [
      "Dihedral wings",
      "Anhedral wings",
      "Swept wings",
      "Straight wings"
    ],
    correctAnswer: 2
  },
  {
    id: 34,
    question: "Climbing at constant IAS might cause:",
    options: [
      "MMo to be exceeded",
      "VMo to be exceeded",
      "Low speed stall",
      "TAS to reduce"
    ],
    correctAnswer: 0
  },
  {
    id: 35,
    question: "Increasing CL affects load factor how?",
    options: [
      "Decreases",
      "Does not affect",
      "Increases",
      "Increases or decreases depending on weight"
    ],
    correctAnswer: 2
  },
  {
    id: 36,
    question: "The slowest speed at which the control surfaces can overcome the turning tendency caused by asymmetrical thrust is called:",
    options: ["VMC", "VSO", "V2", "V1"],
    correctAnswer: 0
  },
  {
    id: 37,
    question: "Deep stall is most probable with:",
    options: [
      "Ventral fin",
      "Canards",
      "High tailplane",
      "Swept back wings"
    ],
    correctAnswer: 2
  },
  {
    id: 38,
    question: "When rolling at a steady rate:",
    options: [
      "Up going wing experiences an increase in effective angle of attack",
      "Rate of roll depends only on aileron deflection",
      "Down going wing experiences an increase in effective angle of attack"
    ],
    correctAnswer: 2
  },
  {
    id: 39,
    question: "VA is:",
    options: [
      "Minimum speed at which maximum nose up control is permitted",
      "Maximum speed at which full nose up control input is permitted",
      "Minimum control speed",
      "Maximum control speed"
    ],
    correctAnswer: 1
  },
  {
    id: 40,
    question: "At VA, the aircraft will:",
    options: [
      "Suffer permanent damage",
      "Not be damaged by control inputs - the aircraft will stall before exceeding limit load",
      "Not be controllable by control inputs"
    ],
    correctAnswer: 1
  },
  {
    id: 41,
    question: "Which would improve ride quality in turbulence?",
    options: [
      "Increased aspect ratio",
      "Increased camber",
      "Increased wing area",
      "Increased sweep back"
    ],
    correctAnswer: 3
  },
  {
    id: 42,
    question: "The relationship between Vx and Vy is:",
    options: [
      "Vx is always less than Vy",
      "Vx is always greater than Vy",
      "Vx is always less than or equal to Vy",
      "Vx can never equal Vy"
    ],
    correctAnswer: 2
  },
  {
    id: 43,
    question: "Effective Pitch of the propeller is:",
    options: [
      "Distance it actually travels forward in one revolution",
      "Distance it should have traveled forward in standard atmosphere",
      "None of the above",
      "Distance travelled forward at angle of attack"
    ],
    correctAnswer: 0
  },
  {
    id: 44,
    question: "Stall angle depends on:",
    options: [
      "Velocity of airflow over wings",
      "Remains same regardless of weight",
      "Depends on airspeed",
      "All are incorrect"
    ],
    correctAnswer: 1
  },
  {
    id: 45,
    question: "Leaving the ground effect:",
    options: [
      "Induced drag will increase and AoA is increased to maintain lift",
      "Induced drag decreases and AoA is increased to maintain lift",
      "Induced drag will increase and thrust is increased to maintain lift"
    ],
    correctAnswer: 0
  },
  {
    id: 46,
    question: "The weight of the engine per brake horsepower is termed as:",
    options: ["Gross weight", "Empty weight", "Specific weight", "Critical weight"],
    correctAnswer: 2
  },
  {
    id: 47,
    question: "Aspect ratio of the wing is defined as the ratio of the:",
    options: [
      "Wingspan to the wing root",
      "Square of the chord to the wingspan",
      "Wing span to the average chord",
      "Square of the wing area to the span"
    ],
    correctAnswer: 2
  },
  {
    id: 48,
    question: "What changes to aircraft control must be made to maintain altitude while the airspeed is being decreased?",
    options: [
      "Increase the angle of attack to compensate for the decreasing dynamic pressure",
      "Maintain a constant angle of attack until the desired airspeed is reached, then increase the angle of attack",
      "Increase angle of attack to produce more lift than weight",
      "Decrease the angle of attack to compensate for the decrease in drag"
    ],
    correctAnswer: 0
  },
  {
    id: 49,
    question: "When large transport airplanes' ailerons are deflected, which secondary flight control may assist?",
    options: [
      "The speed brakes",
      "The leading edge flaps",
      "The slats",
      "The flight spoilers"
    ],
    correctAnswer: 3
  },
  {
    id: 50,
    question: "For take-off the constant speed propeller is normally selected in:",
    options: [
      "High RPM",
      "Low RPM",
      "Low Pitch and high RPM",
      "High Pitch and low RPM"
    ],
    correctAnswer: 2
  },
  {
    id: 51,
    question: "Tip stall happens in which wing?",
    options: [
      "Rectangular wing",
      "Straight wing",
      "Laminar wing",
      "Swept wing"
    ],
    correctAnswer: 3
  },
  {
    id: 52,
    question: "Which of the following contribute to lateral stability?",
    options: [
      "Anhedral, sweptback, high wing, high fin",
      "Dihedral, sweptback, low wing, high fin",
      "Anhedral, aspect ratio, high wing, vertical fin",
      "Dihedral, sweptback, high wing, high fin"
    ],
    correctAnswer: 3
  },
  {
    id: 53,
    question: "A high wing position on an aircraft gives:",
    options: [
      "More lateral stability than a low wing",
      "Less lateral stability than a low wing",
      "Same lateral stability as a low wing"
    ],
    correctAnswer: 0
  },
  {
    id: 54,
    question: "Increasing the size of the fin will:",
    options: [
      "Increase lateral stability",
      "Not affect lateral stability",
      "Increase directional stability"
    ],
    correctAnswer: 2
  },
  {
    id: 55,
    question: "Moving the center of gravity aft will:",
    options: [
      "Increase longitudinal stability",
      "Reduce longitudinal stability",
      "Have no effect on longitudinal stability"
    ],
    correctAnswer: 1
  },
  {
    id: 56,
    question: "After an aerodynamic disturbance, an aircraft continues to oscillate at a constant amplitude. It is:",
    options: [
      "Longitudinally neutrally stable",
      "Laterally unstable",
      "Longitudinally unstable"
    ],
    correctAnswer: 0
  },
  {
    id: 57,
    question: "If the cross-sectional area of an airflow is mechanically reduced:",
    options: [
      "Mass flow constant, velocity increases",
      "Mass flow constant, pressure increases",
      "Mass flow varies, pressure constant",
      "Mass flow varies, velocity increases"
    ],
    correctAnswer: 0
  },
  {
    id: 58,
    question: "Droop ailerons:",
    options: [
      "Increase camber",
      "Increase camber and delay the separation of airflow",
      "Increase attitude for landing"
    ],
    correctAnswer: 1
  },
  {
    id: 59,
    question: "Sweepback of the wing will:",
    options: [
      "Not affect lateral stability",
      "Decrease lateral stability",
      "Increase lateral stability"
    ],
    correctAnswer: 2
  },
  {
    id: 60,
    question: "How will a headwind and a tailwind respectively affect best range glide speed?",
    options: [
      "Decrease / Increase",
      "Decrease / Decrease",
      "Increase / Decrease",
      "Increase / Increase"
    ],
    correctAnswer: 2
  },
  {
    id: 61,
    question: "To avoid the wingtip vortices of a departing jet aeroplane during takeoff, the pilot should:",
    options: [
      "Lift off at a point well past the jet aeroplane's flightpath",
      "Remain below and downwind of the jet aeroplane's flightpath"
    ],
    correctAnswer: 0
  },
  {
    id: 62,
    question: "Propeller efficiency is:",
    options: ["THP/BHP", "THP/FHP", "BHP/BHP", "BHP/THP"],
    correctAnswer: 0
  },
  {
    id: 63,
    question: "On a highly tapered wing without twist, the stall will commence:",
    options: [
      "On the root of the wing",
      "Anywhere on the wing",
      "On the tips of the wing"
    ],
    correctAnswer: 2
  },
  {
    id: 64,
    question: "In a steady climb:",
    options: [
      "Lift is less than weight and thrust is less than drag",
      "Lift is less than drag and weight is less than thrust",
      "Weight is less than lift and drag is more than thrust",
      "Weight is more than lift and drag is less than thrust"
    ],
    correctAnswer: 3
  },
  {
    id: 65,
    question: "In what direction does lift act in a steady climb?",
    options: [
      "Upwards",
      "Vertically",
      "At right angles to the flight path",
      "None of the above"
    ],
    correctAnswer: 2
  },
  {
    id: 66,
    question: "Increasing aircraft weight affects glide speed and rate of descent how?",
    options: [
      "Increases, Decreases",
      "Increases, Increases",
      "Decreases, Decreases",
      "Decreases, Increases"
    ],
    correctAnswer: 1
  },
  {
    id: 67,
    question: "A rate one 360 degree turn takes how long to complete?",
    options: ["1 minute", "2 minutes", "3 minutes", "4 minutes"],
    correctAnswer: 1
  },
  {
    id: 68,
    question: "In a constant TAS climb in the troposphere:",
    options: [
      "IAS increases",
      "IAS decreases",
      "IAS increases then remains constant",
      "IAS decreases then remains constant"
    ],
    correctAnswer: 1
  },
  {
    id: 69,
    question: "In reverse thrust:",
    options: [
      "Angle of attack is greatest at the blade tips",
      "Angle of attack is greatest at the blade roots",
      "Angle of attack is greatest at the 70% radius point",
      "Angle of attack is zero"
    ],
    correctAnswer: 1
  },
  {
    id: 70,
    question: "Propeller torque:",
    options: [
      "Always opposes engine torque",
      "Never opposes engine torque",
      "Never assists engine torque",
      "Assists engine torque in windmilling flight"
    ],
    correctAnswer: 0
  },
  {
    id: 71,
    question: "If the flaps are operated beyond the allowed speed:",
    options: [
      "Flaps operation will be disabled",
      "Aeroplane will be disabled",
      "Aeroplane will bank to the left",
      "Airframe structure will be overstressed"
    ],
    correctAnswer: 3
  },
  {
    id: 72,
    question: "Frise type of ailerons are used to:",
    options: [
      "Increase drag",
      "Reduce adverse aileron yaw",
      "Reduce vortex drag"
    ],
    correctAnswer: 1
  },
  {
    id: 73,
    question: "The purpose of trimming devices in an aeroplane is to:",
    options: [
      "Alter the altitude of the aeroplane",
      "To reduce steady pressure on the control column",
      "To change position of CG"
    ],
    correctAnswer: 1
  },
  {
    id: 74,
    question: "The glide angle is the same regardless of weight because:",
    options: [
      "L/D ratio is independent of weight",
      "Lift and drag reduces proportionally",
      "Lift and drag will increase proportionally"
    ],
    correctAnswer: 0
  },
  {
    id: 75,
    question: "Established center of lift is usually called:",
    options: [
      "Center of pressure",
      "Center of gravity",
      "Coefficient of lift"
    ],
    correctAnswer: 0
  },
  {
    id: 76,
    question: "To maintain altitude during a turn, the angle of attack must be increased to compensate for the decrease in the:",
    options: [
      "Airplane drag",
      "Wing loading",
      "Horizontal component of lift",
      "Vertical component of lift"
    ],
    correctAnswer: 3
  },
  {
    id: 77,
    question: "On a wing the force of lift acts perpendicular to and the force of drag acts parallel to the:",
    options: [
      "Chord line",
      "Longitudinal axis",
      "Flight path",
      "Lateral axis"
    ],
    correctAnswer: 2
  },
  {
    id: 78,
    question: "Turbulent air can cause an increase in stalling speed when there is:",
    options: [
      "A decrease in angle of attack",
      "A sudden decrease in load factor",
      "An abrupt increase in true airspeed",
      "An abrupt change in relative wind"
    ],
    correctAnswer: 3
  },
  {
    id: 79,
    question: "If an airplane is loaded to the rear of its CG range it will tend to be:",
    options: [
      "Unstable about its lateral axis",
      "Sluggish in aileron control",
      "Unstable about its longitudinal axis",
      "Sluggish in rudder control"
    ],
    correctAnswer: 0
  },
  {
    id: 80,
    question: "Indicated stall speed is affected by:",
    options: [
      "Angle of attack, weight and air density",
      "Weight, load factor and power",
      "Weight, density altitude, power and turbulence",
      "Load factor, angle of attack and power"
    ],
    correctAnswer: 1
  },
  {
    id: 81,
    question: "What is load factor?",
    options: [
      "1/Bank Angle",
      "Weight / Lift",
      "Lift / Weight",
      "Weight / Wing area"
    ],
    correctAnswer: 2
  },
  {
    id: 82,
    question: "What percentage increase in lift is required to maintain altitude while in a 45 degree bank turn?",
    options: ["18%", "41%", "50%", "10%"],
    correctAnswer: 1
  },
  {
    id: 83,
    question: "What is the standard stall recovery for a light aircraft?",
    options: [
      "Pitch down, stick neutral roll, correct for bank with rudder",
      "Pitch down, stick neutral roll, correct for bank with aileron",
      "Pitch down, stick neutral, wait for neutral tendency",
      "Pitch down, stick neutral roll, do not correct for bank"
    ],
    correctAnswer: 0
  },
  {
    id: 84,
    question: "The standard mass for a flight crew member is:",
    options: [
      "75 kg including hand baggage",
      "85 kg excluding hand baggage",
      "85 kg including hand baggage",
      "75 kg excluding hand baggage"
    ],
    correctAnswer: 2
  },
  {
    id: 85,
    question: "Which is true about flaps and stall speed?",
    options: [
      "Using a constant flap setting and varying the bank has no effect on stall speed",
      "The addition of flaps decreases the stall speed",
      "The addition of flaps increases the stall speed"
    ],
    correctAnswer: 1
  },
  {
    id: 86,
    question: "What effects does uphill slope have on takeoff performance?",
    options: [
      "Increases take off distance",
      "Increases take off speed",
      "Decreases take off distance",
      "Decreases take off speed"
    ],
    correctAnswer: 0
  },
  {
    id: 87,
    question: "In a constant speed propeller, the forces which tend to change the pitch from coarse to fine is called:",
    options: ["ATM", "CSU", "Brake mechanism", "CTM"],
    correctAnswer: 3
  },
  {
    id: 88,
    question: "The advance per revolution at zero thrust is:",
    options: [
      "Geometric pitch",
      "Effective pitch",
      "Experimental mean pitch"
    ],
    correctAnswer: 0
  },
  {
    id: 89,
    question: "In a symmetrical aerofoil:",
    options: [
      "Mean camber line is a straight line joining leading edge",
      "Mean camber line and chord line are same",
      "Camber and chord line are same",
      "Both a and c"
    ],
    correctAnswer: 1
  },
  {
    id: 90,
    question: "In a constant level turn the aircraft is:",
    options: [
      "In equilibrium",
      "Speed remains same as it is not accelerating",
      "Accelerating and speed increases"
    ],
    correctAnswer: 0
  },
  {
    id: 91,
    question: "When air changes from laminar to turbulent:",
    options: [
      "Skin friction drag increases",
      "Skin friction drag decreases"
    ],
    correctAnswer: 0
  },
  {
    id: 92,
    question: "The purpose of CG movement envelope is to:",
    options: [
      "Ensure that aircraft is within weight and balance limit",
      "To by-pass computation of CG",
      "Give an acceptable range of index number for any aircraft weight from max to min"
    ],
    correctAnswer: 0
  },
  {
    id: 93,
    question: "If static pressure line is disconnected inside a pressurized cabin during cruising flight:",
    options: [
      "Altimeter and ASI will both read low",
      "The altimeter and ASI will both read high",
      "Altimeter will read low and ASI will read high",
      "None of the above"
    ],
    correctAnswer: 0
  },
  {
    id: 94,
    question: "Which channel of an autopilot detects changes in the pitch attitude of an aircraft?",
    options: ["Elevator", "Ailerons", "Rudder"],
    correctAnswer: 0
  },
  {
    id: 95,
    question: "The entire horizontal surface of the empennage that can adjust as a complete unit for controlling pitch attitude is referred to as:",
    options: [
      "Stab tail",
      "Flying tail",
      "Stabilator/stabilizer",
      "All the above"
    ],
    correctAnswer: 3
  },
  {
    id: 96,
    question: "A wing has an aspect ratio of 12 and an area of 108 sq ft. The span is:",
    options: ["36 ft", "9 ft", "8.46 ft", "42 ft"],
    correctAnswer: 0
  },
  {
    id: 97,
    question: "In case CG moves ahead from its forward location, the aircraft will stall at:",
    options: [
      "Higher speed",
      "Lower speed",
      "Same speed",
      "CG does not affect stalling speed"
    ],
    correctAnswer: 0
  },
  {
    id: 98,
    question: "The purpose of wing slats is to:",
    options: [
      "Decrease stalling speed",
      "Increase stalling speed",
      "Increase drag",
      "Decrease induced drag"
    ],
    correctAnswer: 0
  },
  {
    id: 99,
    question: "Extending the flaps causes:",
    options: [
      "Small decrease in lift",
      "A small increase in lift and greater proportion of drag increases (L/D decreases)",
      "L/D ratio increases"
    ],
    correctAnswer: 1
  },
  {
    id: 100,
    question: "The following are secondary control surfaces:",
    options: [
      "Ailerons, elevators, rudder, flaps, slats, trim tabs",
      "Flaps, slats, rudder, trim tabs, spoilers",
      "Flaps, slats, trim tabs",
      "None of the above"
    ],
    correctAnswer: 2
  },
  {
    id: 101,
    question: "If AoA increases, lift, drag and L/D ratio:",
    options: [
      "Increases, decreases, decreases",
      "Increases, increases, increases",
      "Increases, increases, decreases",
      "None of the above"
    ],
    correctAnswer: 2
  },
  {
    id: 102,
    question: "A stick shaker is activated:",
    options: [
      "At stall",
      "When both sensors indicate stall",
      "At a predetermined speed above the stall",
      "All the above"
    ],
    correctAnswer: 2
  },
  {
    id: 103,
    question: "When flaps are lowered the curvature/camber is increased:",
    options: [
      "Well aft of wing",
      "Well forward of the wing",
      "Centre of the wing",
      "None"
    ],
    correctAnswer: 0
  },
  {
    id: 104,
    question: "If speed is doubled, the lift produced at the higher speed will be:",
    options: [
      "The same as at the lower speed",
      "Two times greater",
      "Three times greater",
      "Four times greater"
    ],
    correctAnswer: 3
  },
  {
    id: 105,
    question: "When the pilot moves the control stick forward, the elevator moves and the aircraft nose goes:",
    options: ["Down, down", "Up, down", "Up, up", "Down, up"],
    correctAnswer: 1
  },
  {
    id: 106,
    question: "What causes wake turbulence?",
    options: [
      "Wing tip vortices are carried away by the ambient wind",
      "Wing tip vortices have a circular and downward motion",
      "All of the above"
    ],
    correctAnswer: 2
  },
  {
    id: 107,
    question: "L/D ratio of an aircraft:",
    options: [
      "Is the ratio of lift and drag",
      "Is used for aircraft performance",
      "Both a and b are correct",
      "None"
    ],
    correctAnswer: 2
  },
  {
    id: 108,
    question: "Horizontal stabilizer is provided so as to:",
    options: [
      "Provide longitudinal stability",
      "Provide directional stability",
      "Provide lateral stability"
    ],
    correctAnswer: 0
  },
  {
    id: 109,
    question: "The reason a light general aviation aircraft tends to nose down during power reduction is that the:",
    options: [
      "Center of gravity shifts forward",
      "Force of drag acts horizontally and above the thrust line",
      "Thrust line is above the drag line",
      "CG moves aft"
    ],
    correctAnswer: 1
  },
  {
    id: 110,
    question: "The term L/D ratio:",
    options: [
      "Can be used to describe the aerodynamic efficiency of the wing",
      "Will vary as the AOA changes",
      "All of the above are correct"
    ],
    correctAnswer: 2
  },
  {
    id: 111,
    question: "In a level flight at constant airspeed:",
    options: [
      "The thrust exceeds the drag",
      "The lift exceeds the weight",
      "The lift equals weight of the airplane",
      "The thrust exceeds the gravity"
    ],
    correctAnswer: 2
  },
  {
    id: 112,
    question: "The effect(s) of slat is/are:",
    options: [
      "The separation is delayed and pressure envelope over upper surface is flattened out",
      "The stall is delayed and will occur at higher AOA",
      "CL max is increased",
      "a, b, and c are applicable"
    ],
    correctAnswer: 3
  },
  {
    id: 113,
    question: "What happens when trailing edge flaps are lowered?",
    options: [
      "The coefficient of lift and drag will increase",
      "The L/D ratio is reduced",
      "The stalling AOA is reduced and CP will move rearward",
      "All of the above are applicable"
    ],
    correctAnswer: 3
  },
  {
    id: 114,
    question: "While performing a turn, wing loading will:",
    options: [
      "Increase",
      "Remain same",
      "Decrease",
      "Have no effect on the wing loading"
    ],
    correctAnswer: 0
  },
  {
    id: 115,
    question: "Horizontal stability of an aircraft is improved by:",
    options: [
      "Suspending the CG below pivot point",
      "By a line level of pivot point",
      "By filling the liquid in the DRC",
      "None of the above"
    ],
    correctAnswer: 0
  },
  {
    id: 116,
    question: "If the nosewheel gear retracts, the CG will:",
    options: [
      "Move rearward",
      "Move forward",
      "Not change",
      "Can't be said"
    ],
    correctAnswer: 0
  },
  {
    id: 117,
    question: "If aft CG limit is exceeded in the aircraft, the most common effect is:",
    options: [
      "Increase in stalling speed",
      "Decrease in longitudinal stability and greater performance in take-off",
      "Feel very easy in pitch movement",
      "Only 'c' is correct"
    ],
    correctAnswer: 1
  },
  {
    id: 118,
    question: "The 3 main axes of an aircraft are:",
    options: [
      "Lateral, vertical, horizontal",
      "Lateral, horizontal, longitudinal",
      "Lateral, longitudinal, vertical",
      "None of the above"
    ],
    correctAnswer: 2
  },
  {
    id: 119,
    question: "Deep cambered aerofoil provides:",
    options: [
      "High lift in thick wing",
      "Low lift in thick wing",
      "High lift in thin wing",
      "None"
    ],
    correctAnswer: 0
  },
  {
    id: 120,
    question: "If CG is aft then:",
    options: [
      "Stall & spin becomes easy but recovery is difficult",
      "Stall & spin becomes difficult but recovery is easy",
      "Stall is not possible",
      "None of the above"
    ],
    correctAnswer: 0
  },
  {
    id: 121,
    question: "The main lifting device of an aircraft is:",
    options: [
      "Both the wings",
      "All the flaps",
      "The propeller",
      "All of the above"
    ],
    correctAnswer: 0
  },
  {
    id: 122,
    question: "In straight and level flight, the flight path & relative airflow will be:",
    options: [
      "Perpendicular and opposite in direction",
      "Parallel and opposite in direction",
      "Vertically upward in direction",
      "Cannot be said"
    ],
    correctAnswer: 1
  },
  {
    id: 123,
    question: "For a wing with higher aspect ratio:",
    options: [
      "Lift will increase, induced drag will increase",
      "Lift will decrease, induced drag will increase",
      "Lift will decrease, induced drag will decrease",
      "Lift will increase, induced drag will decrease"
    ],
    correctAnswer: 3
  },
  {
    id: 124,
    question: "As the air becomes less dense, lift reduces because:",
    options: [
      "The thin air will exert less pressure on the aerofoil",
      "The thin air will exert more pressure on the aerofoil",
      "Density will not affect lift at all",
      "None of them are correct"
    ],
    correctAnswer: 0
  },
  {
    id: 125,
    question: "Dutch roll is counteracted with:",
    options: [
      "Yaw damper system",
      "Combination of pitching and yawing movement",
      "Combination of bank and pitching movement",
      "Both b and c are true"
    ],
    correctAnswer: 0
  },
  {
    id: 126,
    question: "Bernoulli's Principle states that:",
    options: [
      "Dynamic + static pressure = constant",
      "Pitot pressure + static pressure = constant",
      "Pitot pressure + dynamic pressure = constant",
      "None of the above"
    ],
    correctAnswer: 0
  },
  {
    id: 127,
    question: "Lift transducers are fitted at:",
    options: [
      "Trailing edge of flaps",
      "Leading edge of wings",
      "Leading edge of elevator"
    ],
    correctAnswer: 1
  },
  {
    id: 128,
    question: "L/D is independent of:",
    options: [
      "Angle of attack",
      "Weight",
      "Boundary layer",
      "All the above"
    ],
    correctAnswer: 1
  },
  {
    id: 129,
    question: "When flying straight and level, the upper side of the wing will have pressure _____ than the lower side:",
    options: ["Higher", "Lower", "Same"],
    correctAnswer: 1
  },
  {
    id: 130,
    question: "A CG envelope:",
    options: [
      "Is drawn on a graph and included in the aircraft flight manual for all weights",
      "Is prepared to show CG limits for all weights up to the minimum AUW",
      "Gives any combination of weight and CG location that is within approved loading conditions",
      "All the above"
    ],
    correctAnswer: 3
  },
  {
    id: 131,
    question: "Decreasing pressure is accomplished in supersonic flow:",
    options: [
      "By expansion wave",
      "By compression wave",
      "None"
    ],
    correctAnswer: 0
  },
  {
    id: 132,
    question: "Shallow turns are less than:",
    options: ["20°", "25°", "30°"],
    correctAnswer: 0
  },
  {
    id: 133,
    question: "Cross feed valve in an aircraft is used to adjust _____ balance:",
    options: ["Longitudinal fuel", "Directional", "Lateral"],
    correctAnswer: 2
  },
  {
    id: 134,
    question: "If CG is too aft, the aircraft would be:",
    options: [
      "Less longitudinally stable",
      "Less laterally stable",
      "More longitudinally stable",
      "Both '1' and '2'"
    ],
    correctAnswer: 0
  },
  {
    id: 135,
    question: "When an aircraft is in straight and level flight:",
    options: [
      "Static pressure is more on upper surface and dynamic pressure is less at lower surface",
      "Static pressure is less on upper surface and more at lower surface",
      "Dynamic pressure is less on upper surface and more at lower surface",
      "Static pressure is less on upper surface and dynamic pressure is more at lower surface"
    ],
    correctAnswer: 1
  },
  {
    id: 136,
    question: "Balance tabs are provided in a control surface to:",
    options: [
      "Assist pilot to move control surface",
      "Provide aerodynamic balance",
      "To avoid over balance"
    ],
    correctAnswer: 0
  },
  {
    id: 137,
    question: "During take-off, blade angle is kept at:",
    options: [
      "High pitch and high RPM",
      "Low pitch and high RPM",
      "High pitch and low RPM"
    ],
    correctAnswer: 1
  },
  {
    id: 138,
    question: "If CG is ahead of its forward limit, this would lead to:",
    options: [
      "Less stall speed and high stability",
      "More stall speed and high stability",
      "More stall speed and less stability"
    ],
    correctAnswer: 1
  },
  {
    id: 139,
    question: "When flaps are lowered, the curvature change is:",
    options: [
      "Well aft of wing",
      "Well forward of the wing",
      "Centre of the wing",
      "None"
    ],
    correctAnswer: 0
  },
  {
    id: 140,
    question: "Mark the correct statement:",
    options: [
      "During climb the lift is more than the weight",
      "Induced drag is greatest at low speed and high angle of attack",
      "Both are correct"
    ],
    correctAnswer: 1
  },
  {
    id: 141,
    question: "Streamlining of shapes reduces:",
    options: [
      "Form drag",
      "Skin friction",
      "Induced drag",
      "None"
    ],
    correctAnswer: 0
  },
  {
    id: 142,
    question: "If a flat plate is placed at zero angle of attack to the relative airflow, what type of drag will it have?",
    options: [
      "Form drag",
      "Skin friction drag",
      "Parasite drag",
      "Induced drag"
    ],
    correctAnswer: 1
  },
  {
    id: 143,
    question: "Which of the following reduces induced drag at the wing tips?",
    options: [
      "Aerofoil with winglet",
      "Aerofoil with wingtip tank",
      "Wing fences",
      "Both 1 and 2 but not 3"
    ],
    correctAnswer: 3
  },
  {
    id: 144,
    question: "As the weight increases, if the angle of attack & CL are kept constant and you gain altitude, lift:",
    options: [
      "Decreases",
      "Increases",
      "Remains constant",
      "Increases initially"
    ],
    correctAnswer: 0
  },
  {
    id: 145,
    question: "Stalling speed of an aircraft during a turn will:",
    options: [
      "Decrease",
      "Increase",
      "Remain the same",
      "Decrease four times"
    ],
    correctAnswer: 1
  },
  {
    id: 146,
    question: "Differential ailerons are used to:",
    options: [
      "Prevent up floating of aircraft during flight",
      "To correct adverse yaw",
      "To get proper feel in control",
      "Compensate for aileron drag"
    ],
    correctAnswer: 1
  },
  {
    id: 147,
    question: "Flap extension increase in CL depends on:",
    options: [
      "Flap chord & Span",
      "Deflection of flaps",
      "Increase in flap area",
      "All above are correct"
    ],
    correctAnswer: 3
  },
  {
    id: 148,
    question: "The total load imposed on the airplane in flight is known as:",
    options: [
      "Load factor",
      "Power loading",
      "Aspect ratio",
      "Yield load"
    ],
    correctAnswer: 0
  },
  {
    id: 149,
    question: "For a given angle of bank the load factor in a coordinated constant altitude turn:",
    options: [
      "Is constant",
      "Is directly related to the airplane's gross weight",
      "Increases at a very slow rate beyond 45° of bank",
      "Varies with the rate of turn"
    ],
    correctAnswer: 0
  },
  {
    id: 150,
    question: "The angle of attack of a wing directly controls:",
    options: [
      "Amount of airflow above and below the wing",
      "Point at which the CG is located",
      "Distribution of positive and negative pressure acting on the wing",
      "Angle of incidence of the wing"
    ],
    correctAnswer: 2
  },
  {
    id: 151,
    question: "The angle of attack at which a wing stalls remains constant regardless of:",
    options: [
      "Weight, dynamic pressure, bank angle or pitch attitude",
      "Dynamic pressure but varies with weight, bank angle and pitch attitude",
      "Weight and pitch attitude but varies with dynamic pressure and bank angle"
    ],
    correctAnswer: 0
  },
  {
    id: 152,
    question: "Control surface with counterweights (mass balancing) is provided to:",
    options: [
      "Hold the surface streamlined when on ground",
      "Make control surface tab unnecessary",
      "Make installation of the control easier",
      "Reduce the possibility of control surface flutter"
    ],
    correctAnswer: 3
  },
  {
    id: 153,
    question: "An airplane center of lift is usually located aft of its CG:",
    options: [
      "So that the aircraft will have a tail heavy tendency",
      "So that the aircraft will have a nose heavy tendency",
      "Since it is impossible to predict the exact location of either",
      "To improve longitudinal stability"
    ],
    correctAnswer: 1
  },
  {
    id: 154,
    question: "Name the four flight fundamentals involved in maneuvering an aircraft:",
    options: [
      "Aircraft power, pitch, bank and trim",
      "Straight and level flight, turns, climbs and descents",
      "Take off, slow flight, fast flight and stalls",
      "Starting, taxiing, takeoff and landing"
    ],
    correctAnswer: 1
  },
  {
    id: 155,
    question: "Tip stall is due to:",
    options: [
      "Less taper ratio",
      "Higher taper ratio",
      "Medium taper ratio",
      "Zero taper ratio"
    ],
    correctAnswer: 1
  },
  {
    id: 156,
    question: "Zero lift angle of attack on asymmetrical airfoil is:",
    options: [
      "Negative",
      "Positive",
      "Zero",
      "None"
    ],
    correctAnswer: 0
  },
  {
    id: 157,
    question: "Frise Aileron is used to minimize:",
    options: [
      "Adverse yaw",
      "Giving stability",
      "Lateral stability"
    ],
    correctAnswer: 0
  },
  {
    id: 158,
    question: "Mark the incorrect statement with regard to taxiing:",
    options: [
      "During strong wind elevator should be kept neutral",
      "During strong tailwind elevator should be kept down",
      "During cross wind aileron facing the windward side should be slightly down",
      "None"
    ],
    correctAnswer: 0
  },
  {
    id: 159,
    question: "A symmetrical aerofoil:",
    options: [
      "Gives lift when there is no angle of attack",
      "Gives no lift when there is no angle of attack",
      "When angle of attack is at zero degree there is definite lift",
      "Both 1 & 3 are correct"
    ],
    correctAnswer: 1
  },
  {
    id: 160,
    question: "An airplane is making its take-off run. It is:",
    options: [
      "In equilibrium",
      "Accelerating according to Newton's third law",
      "Not in equilibrium",
      "About to crash"
    ],
    correctAnswer: 2
  },
  {
    id: 161,
    question: "For a cambered airfoil the center of pressure (CP):",
    options: [
      "Moves to rear of the wing at low angle of attack",
      "Moves backward as angle of attack increases",
      "Moves forward as angle of attack increases",
      "1 & 3 are correct"
    ],
    correctAnswer: 3
  },
  {
    id: 162,
    question: "Aileron snatching occurs at:",
    options: [
      "More on swept wing",
      "More on straight wing",
      "At high critical speed",
      "1 & 3"
    ],
    correctAnswer: 3
  },
  {
    id: 163,
    question: "Ideal take-off conditions require density to be more at:",
    options: [
      "Hill stations when it is snowing",
      "Plains on dry day",
      "Hill stations when it is raining",
      "Plains in humid conditions"
    ],
    correctAnswer: 1
  },
  {
    id: 164,
    question: "When your accelerometer reads '1' g it means:",
    options: [
      "Straight level flight",
      "When the aircraft is on the ground",
      "Both 1 & 2 are correct",
      "When aircraft is inverted straight & level flight"
    ],
    correctAnswer: 2
  },
  {
    id: 165,
    question: "The purpose of wick dischargers on the flying controls is:",
    options: [
      "To avoid static electricity",
      "To avoid flutter of the controls",
      "To avoid radio interference",
      "All correct"
    ],
    correctAnswer: 2
  },
  {
    id: 166,
    question: "Increase of flap will have:",
    options: [
      "Max L/D ratio",
      "Less L/D ratio & more CL & excessively more CD",
      "Higher stalling angle",
      "Low stalling angle"
    ],
    correctAnswer: 1
  },
  {
    id: 167,
    question: "With a constant speed propeller in level flight, to reduce power the correct procedure is:",
    options: [
      "Reduce MAP then RPM",
      "Increase MAP reduce RPM",
      "Reduce RPM then MAP",
      "Reduce MAP, increase RPM"
    ],
    correctAnswer: 0
  },
  {
    id: 168,
    question: "Pitch ratio of a propeller is the:",
    options: [
      "Ratio of the pitch to the diameter",
      "Ratio of the pitch to the length",
      "Ratio of the pitch to the blade angle",
      "Ratio of the pitch to the Helix angle"
    ],
    correctAnswer: 0
  },
  {
    id: 169,
    question: "Distance traveled by the propeller during one revolution is known as:",
    options: [
      "Effective pitch",
      "Geometric pitch",
      "Practical pitch",
      "Experimental pitch"
    ],
    correctAnswer: 0
  },
  {
    id: 170,
    question: "Blade angle on a propeller blade:",
    options: [
      "Increases from hub to tip",
      "Decreases from hub to tip",
      "Remains the same from hub to tip",
      "All are correct"
    ],
    correctAnswer: 1
  },
  {
    id: 171,
    question: "Load on the propeller blade from the middle section:",
    options: [
      "Increases towards the tip",
      "Decreases towards the tip",
      "Remains the same",
      "None"
    ],
    correctAnswer: 0
  },
  {
    id: 172,
    question: "In a fixed pitch prop when the airspeed decreases, RPM of the prop:",
    options: [
      "Increases",
      "Decreases",
      "Remains the same",
      "None"
    ],
    correctAnswer: 0
  },
  {
    id: 173,
    question: "Which force on the propeller will have more stress during operation?",
    options: [
      "Aerodynamic Twisting Force (ATF)",
      "Centrifugal force",
      "Propeller torque",
      "Thrust"
    ],
    correctAnswer: 1
  },
  {
    id: 174,
    question: "The term feathering means the blade angle is set to approximately:",
    options: ["0°", "180°", "360°", "90°"],
    correctAnswer: 3
  },
  {
    id: 175,
    question: "What governs the RPM in Turbo Prop Engine?",
    options: [
      "Governor",
      "Flyweight",
      "Flyweight force and Speeder Spring force",
      "All correct"
    ],
    correctAnswer: 3
  },
  {
    id: 176,
    question: "Mark the correct statement with regard to Static RPM:",
    options: [
      "Increases with increase in temperature",
      "Decreases with increase in temperature",
      "No effect with temperature",
      "All are wrong"
    ],
    correctAnswer: 1
  },
  {
    id: 177,
    question: "Which force is more critical during high speed on a propeller?",
    options: [
      "Centrifugal",
      "Thrust",
      "Torsion or twisting",
      "All above"
    ],
    correctAnswer: 0
  },
  {
    id: 178,
    question: "A fixed pitch propeller, for take-off, the blade angle is set to:",
    options: [
      "Fine pitch",
      "Coarse pitch",
      "Optimum pitch"
    ],
    correctAnswer: 0
  },
  {
    id: 179,
    question: "When aircraft is stationary:",
    options: [
      "Blade angle is equal to AOA",
      "Blade angle is less than AOA",
      "Blade angle is more than AOA"
    ],
    correctAnswer: 0
  },
  {
    id: 180,
    question: "In a fixed pitch prop, when MAP is increased, RPM:",
    options: [
      "Reduces",
      "Increases",
      "Remains same"
    ],
    correctAnswer: 1
  },
  {
    id: 181,
    question: "Contra rotating propellers fitted to an aircraft:",
    options: [
      "Does not have torque and gyroscopic effect",
      "Has maximum torque and gyroscopic effect",
      "Has less torque and gyroscopic effect"
    ],
    correctAnswer: 0
  },
  {
    id: 182,
    question: "Prop efficiency reduces at higher RPM due to:",
    options: [
      "Density effect",
      "High rotational speed",
      "Compressibility effect"
    ],
    correctAnswer: 2
  },
  {
    id: 183,
    question: "In constant speed propeller, the RPM is maintained constant by:",
    options: [
      "Prop governor",
      "CSU",
      "Synchronous unit"
    ],
    correctAnswer: 0
  },
  {
    id: 184,
    question: "Prop synchronization is done to:",
    options: [
      "Increase prop efficiency",
      "Adjust RPM and reduce vibration",
      "Adjust RPM and reduce stress on prop in multi-engine aircraft"
    ],
    correctAnswer: 1
  },
  {
    id: 185,
    question: "How does a plain flap increase lift?",
    options: [
      "Increases camber",
      "Increases angle of attack",
      "Changes position of CP",
      "Decreases the Aspect Ratio"
    ],
    correctAnswer: 0
  },
  {
    id: 186,
    question: "Which aircraft design would be most prone to super stall?",
    options: [
      "'T' tail",
      "Swept forward wing",
      "Swept back wing",
      "Pod mounted engines beneath the wing"
    ],
    correctAnswer: 0
  },
  {
    id: 187,
    question: "Which combination of characteristics would make an aircraft susceptible to deep stall?",
    options: [
      "Swept wing and wing mounted engines",
      "Swept wing and T tail",
      "Straight wing and wing mounted engines",
      "Straight wing and T tail"
    ],
    correctAnswer: 1
  },
  {
    id: 188,
    question: "What does a stick pusher do?",
    options: [
      "Activate at a certain angle of attack and pull the control column backwards",
      "Activate at a certain angle of attack and push the stick forward",
      "Activate at a certain IAS and vibrate the stick",
      "Activate at a certain IAS and push the stick forward"
    ],
    correctAnswer: 1
  },
  {
    id: 189,
    question: "Too much lateral static stability is undesirable because:",
    options: [
      "Too much aileron needed in a cross-wind landing",
      "Too much rudder needed in a cross-wind landing",
      "Constant aileron in cruise in a cross-wind"
    ],
    correctAnswer: 0
  },
  {
    id: 190,
    question: "Which of the following creates lift?",
    options: [
      "A slightly cambered aerofoil",
      "An aerofoil in a high speed flow",
      "Air accelerated upwards",
      "Air accelerated downwards"
    ],
    correctAnswer: 3
  },
  {
    id: 191,
    question: "Which of the following is the greatest factor causing lift?",
    options: [
      "Suction above the wing",
      "Increased pressure below wing",
      "Increased airflow velocity below the wing",
      "Decreased airflow velocity above the wing"
    ],
    correctAnswer: 0
  },
  {
    id: 192,
    question: "The primary force which changes the propeller angle during operation is:",
    options: [
      "Spring tension",
      "Centrifugal force",
      "Oil pressure"
    ],
    correctAnswer: 2
  },
  {
    id: 193,
    question: "After switching off the engine, propeller is kept at:",
    options: [
      "Coarse pitch for facilitating subsequent starts",
      "Fine pitch for facilitating subsequent starts",
      "Coarse pitch to avoid oil drain out",
      "Fine pitch to avoid oil drain out"
    ],
    correctAnswer: 1
  },
  {
    id: 194,
    question: "Best rate of climb speed (Vy) corresponds to:",
    options: [
      "High speed - high altitude",
      "High speed - low altitude",
      "Low speed - low altitude",
      "Low speed - high altitude"
    ],
    correctAnswer: 0
  },
  {
    id: 195,
    question: "Wing loading is the:",
    options: [
      "Ratio of lift to the gross weight",
      "Ratio of net weight of aircraft to the wing area",
      "The ratio of gross weight to the wing area",
      "Ratio of wing area to the gross weight"
    ],
    correctAnswer: 2
  },
  {
    id: 196,
    question: "When a supersonic flow passes through a converging duct:",
    options: [
      "Pressure decreases, volume increases",
      "Pressure increases, volume decreases",
      "Pressure decreases, volume decreases",
      "Pressure increases, volume no change"
    ],
    correctAnswer: 1
  },
  {
    id: 197,
    question: "The dihedral increases stability about the:",
    options: [
      "Lateral axis of the aircraft",
      "Longitudinal axis of the aircraft",
      "Normal axis of the aircraft",
      "Fore & aft axis of the aircraft"
    ],
    correctAnswer: 1
  },
  {
    id: 198,
    question: "In constant speed propellers, the synchronizing is done to:",
    options: [
      "Adjust RPM",
      "Adjust RPM & reduce engine vibrations",
      "Reduce propeller beat cabin noise",
      "Equalize the RPM of both engines for better rotation"
    ],
    correctAnswer: 1
  },
  {
    id: 199,
    question: "As the weight of the aircraft is increased:",
    options: [
      "The stalling speed increases",
      "The stalling angle decreases",
      "The stalling speed decreases",
      "The stalling angle increases"
    ],
    correctAnswer: 0
  },
  {
    id: 200,
    question: "An all-moving tail in an aircraft is known as:",
    options: [
      "Stabilator",
      "Flying tail",
      "V-tab tail",
      "All are correct"
    ],
    correctAnswer: 3
  },
  {
    id: 201,
    question: "The stick shaker is activated at:",
    options: [
      "Preset speed above the stalling speed",
      "Preset speed below the stalling speed",
      "At the point of stall",
      "After the stall"
    ],
    correctAnswer: 0
  },
  {
    id: 202,
    question: "With the increase in altitude if humidity increases:",
    options: [
      "Power output of the engine will decrease",
      "Power output of the engine will increase",
      "The RPM will increase",
      "The power output of the engine will not change"
    ],
    correctAnswer: 0
  },
  {
    id: 203,
    question: "Bernoulli theorem states that:",
    options: [
      "Static pressure + Dynamic pressure = Total pressure",
      "Static pressure = dynamic pressure",
      "Static pressure > dynamic pressure",
      "None is correct"
    ],
    correctAnswer: 0
  },
  {
    id: 204,
    question: "The elevators of a conventional aeroplane provide rotation about the:",
    options: [
      "Longitudinal axis",
      "Lateral axis",
      "Directional axis",
      "Vertical axis"
    ],
    correctAnswer: 1
  },
  {
    id: 205,
    question: "The pilot notices a pitch error in the autopilot. He should suspect malfunction of the:",
    options: [
      "Rudder channel",
      "Elevator channel",
      "Aileron channel"
    ],
    correctAnswer: 1
  },
  {
    id: 206,
    question: "The atmospheric pressure exerted on the human body is:",
    options: [
      "14.7 Lbs",
      "14.7 Lbs/inch square",
      "14.7 Kg/inch square",
      "21.4 Lbs/inch square"
    ],
    correctAnswer: 1
  },
  {
    id: 207,
    question: "Mass balance is provided to control:",
    options: [
      "Control flutter",
      "Adverse yaw",
      "Aerodynamic balance"
    ],
    correctAnswer: 0
  },
  {
    id: 208,
    question: "When the stick pusher becomes effective:",
    options: [
      "Before stall",
      "After stall",
      "At the time of stall"
    ],
    correctAnswer: 0
  },
  {
    id: 209,
    question: "In a differential aileron system:",
    options: [
      "Upward aileron movement is greater than downward aileron movement",
      "Upward aileron movement is less than downward aileron movement",
      "Both upward & downward movement are the same"
    ],
    correctAnswer: 0
  },
  {
    id: 210,
    question: "In some aircraft, washout is given to the wings towards the wing tip to:",
    options: [
      "Prevent tip stall",
      "Prevent stall",
      "Prevent root stall"
    ],
    correctAnswer: 0
  },
  {
    id: 211,
    question: "Up to the point of stall the center of pressure:",
    options: [
      "Moves forward",
      "Moves forward & then back",
      "Moves rearwards",
      "Does not move at all"
    ],
    correctAnswer: 0
  },
  {
    id: 212,
    question: "The slats & slots cause:",
    options: [
      "An increase in the lift",
      "A decrease in the drag",
      "An increase in the stalling angle and an increase in lift",
      "An increase in the lift-drag ratio"
    ],
    correctAnswer: 2
  },
  {
    id: 213,
    question: "An aircraft suddenly gets into a headwind condition:",
    options: [
      "Its angle of climb is affected",
      "Its rate of climb is affected",
      "The angle of climb & rate of climb are not affected"
    ],
    correctAnswer: 0
  },
  {
    id: 214,
    question: "The advantage of a reversing propeller is:",
    options: [
      "It reduces landing roll",
      "Reduces wear & tear of brakes & tires",
      "Permits ground maneuvering in a limited space",
      "All are correct"
    ],
    correctAnswer: 3
  },
  {
    id: 215,
    question: "During a level turn if the airspeed is increased:",
    options: [
      "Rate of turn will increase",
      "Radius of turn will decrease",
      "Radius of turn will increase",
      "Rate & radius of turn will not be affected"
    ],
    correctAnswer: 2
  },
  {
    id: 216,
    question: "In a constant speed propeller in case of carburetor icing, the first indication is:",
    options: [
      "Drop in RPM",
      "Drop in MAP",
      "Drop in engine temperatures",
      "Stoppage of engine"
    ],
    correctAnswer: 1
  },
  {
    id: 217,
    question: "A part of the control surface which is projected ahead of the hinge line helps in:",
    options: [
      "Preventing control flutter",
      "Providing aerodynamic balance",
      "Moving control surface with ease",
      "Both b & c are correct"
    ],
    correctAnswer: 3
  },
  {
    id: 218,
    question: "The effect of wing tip vortices on an aircraft is to:",
    options: [
      "Increase induced drag",
      "Decrease the effective angle of attack & increase induced drag",
      "Increase the effective angle of attack & increase induced drag",
      "Have no effect on the angle of attack"
    ],
    correctAnswer: 1
  },
  {
    id: 219,
    question: "The lift produced by an aircraft depends upon:",
    options: [
      "Speed",
      "Velocity",
      "Square of speed",
      "Square of velocity"
    ],
    correctAnswer: 2
  },
  {
    id: 220,
    question: "Geometric pitch is:",
    options: [
      "Advance of propeller in one revolution at zero thrust",
      "Advance of propeller in one revolution at zero angle of attack",
      "Practical advance of propeller in one revolution",
      "None of the above"
    ],
    correctAnswer: 1
  },
  {
    id: 221,
    question: "A high aspect ratio wing generates:",
    options: [
      "Low lift and high induced drag",
      "High lift and low induced drag",
      "Low lift and high profile drag",
      "High lift and low profile drag"
    ],
    correctAnswer: 1
  },
  {
    id: 222,
    question: "Ratio of distance flown to height lost is 20:1 is called:",
    options: [
      "Cruise ratio",
      "Glide ratio",
      "Endurance ratio",
      "None of the above"
    ],
    correctAnswer: 1
  },
  {
    id: 223,
    question: "Which of the following statements is true about stalling speed?",
    options: [
      "Stalling speed is a fixed speed",
      "An aircraft stalls only at low speeds",
      "Stalling speed is not a fixed value"
    ],
    correctAnswer: 2
  },
  {
    id: 224,
    question: "Spin recovery is easiest when:",
    options: [
      "It is loaded at full forward CG",
      "It is loaded at full rearward CG",
      "Position of CG does not affect spin recovery",
      "None"
    ],
    correctAnswer: 0
  },
  {
    id: 225,
    question: "In an aircraft fitted with servo tabs, the pilot moves the control stick forward to lower the nose:",
    options: [
      "The elevator will move down",
      "The servo tab will move up",
      "The elevator will move up",
      "The servo tab will move down"
    ],
    correctAnswer: 2
  },
  {
    id: 226,
    question: "The best L/D speed corresponds to:",
    options: [
      "Max range speed",
      "Max angle of climb",
      "Max glide range",
      "Both a & c are correct"
    ],
    correctAnswer: 3
  },
  {
    id: 227,
    question: "CG of a body can be found out by dividing:",
    options: [
      "AUW by total moments",
      "Total moments by AUW",
      "Gross weight by total moments",
      "Total moments by gross weight"
    ],
    correctAnswer: 3
  },
  {
    id: 228,
    question: "When CG is at fully forward position:",
    options: [
      "An additional download on the tail plane has to be balanced by additional lift produced by the wings",
      "Additional upload on the tail plane has to be balanced by additional lift produced by the wings",
      "There is no change in wing loading"
    ],
    correctAnswer: 0
  },
  {
    id: 229,
    question: "The dynamic pressure is given by the formula:",
    options: [
      "½ρV²",
      "ρV²",
      "ρV",
      "2ρV²"
    ],
    correctAnswer: 0
  },
  {
    id: 230,
    question: "Dynamic pressure is created when:",
    options: [
      "Air in motion is accelerated",
      "Air in motion is brought to rest",
      "Air in motion is flowing at constant velocity"
    ],
    correctAnswer: 1
  },
  {
    id: 231,
    question: "The pressure change in ISA at about 5000 feet is approximately:",
    options: [
      "1 hPa = 40 feet",
      "1 hPa = 30 feet",
      "1 hPa = 46 feet",
      "1 hPa = 1013.2 feet"
    ],
    correctAnswer: 1
  },
  {
    id: 232,
    question: "Aerodynamic balance is achieved by:",
    options: [
      "Mass balance",
      "Horn balance",
      "Weight balance",
      "Lift, drag balance"
    ],
    correctAnswer: 1
  },
  {
    id: 233,
    question: "Wing loading is given by:",
    options: [
      "AUW / Wing span",
      "Wing area / AUW",
      "AUW / Wing area"
    ],
    correctAnswer: 2
  },
  {
    id: 234,
    question: "The downwash of the wing affects:",
    options: [
      "Mean angle of attack of the tail plane",
      "Relative angle of attack of the tail plane",
      "Both"
    ],
    correctAnswer: 0
  },
  {
    id: 235,
    question: "An aircraft is said to be in a state of stall when:",
    options: [
      "Lift is less than weight & cannot support the weight",
      "Lift is zero",
      "The laminar airflow separates from upper surface of the wings",
      "The laminar airflow separates from lower surface of the wings"
    ],
    correctAnswer: 2
  },
  {
    id: 236,
    question: "The adverse yaw correction is provided by:",
    options: [
      "Aileron droop",
      "Frise aileron",
      "Differential ailerons",
      "Both b & c"
    ],
    correctAnswer: 3
  },
  {
    id: 237,
    question: "When the CG is in the most rearward position, the longitudinal stability:",
    options: [
      "Increases",
      "Decreases",
      "Remains the same"
    ],
    correctAnswer: 1
  },
  {
    id: 238,
    question: "Propeller chord:",
    options: [
      "Decreases toward the tip",
      "Increases toward tip",
      "Remains constant"
    ],
    correctAnswer: 0
  },
  {
    id: 239,
    question: "In an autorotation the down going wing has:",
    options: [
      "Same angle of attack as the up going wing",
      "Greater angle of attack than the up going wing",
      "Lesser angle of attack than the up going wing",
      "Is more affected by the angle of incidence"
    ],
    correctAnswer: 1
  },
  {
    id: 240,
    question: "An aircraft which has all forces in equilibrium is:",
    options: [
      "At rest",
      "Accelerating",
      "At constant speed",
      "At constant velocity"
    ],
    correctAnswer: 3
  },
  {
    id: 241,
    question: "What physical factors are involved in the aspect ratio of aircraft wings?",
    options: [
      "Thickness & chord",
      "Span & chord",
      "Dihedral & angle of attack",
      "Sweepback & lateral axis"
    ],
    correctAnswer: 1
  },
  {
    id: 242,
    question: "Flaps increase the effective lift of the wing by:",
    options: [
      "Reducing the center of pressure",
      "Reducing the profile drag",
      "Increasing the camber",
      "Increasing the angle of attack"
    ],
    correctAnswer: 2
  },
  {
    id: 243,
    question: "Balance tabs are fitted to:",
    options: [
      "Assist the pilot to move the controls",
      "Assist the pilot to balance the aircraft",
      "Assist the pilot to move the trim tabs"
    ],
    correctAnswer: 0
  },
  {
    id: 244,
    question: "Which is an effect of ice, snow, or frost formation on an aeroplane?",
    options: [
      "Increased angle of attack for stalls",
      "Increased stall speed",
      "Increased pitch down tendencies",
      "Decreased speed for stalling"
    ],
    correctAnswer: 1
  },
  {
    id: 245,
    question: "Frost covering the upper surface of an aircraft wing will usually cause:",
    options: [
      "The aircraft to stall at an angle of attack that is lower than normal",
      "No problems to pilots",
      "Drag factors so large that sufficient speed cannot be obtained for take-off",
      "The aircraft to stall at an angle of attack that is higher than normal"
    ],
    correctAnswer: 0
  },
  {
    id: 246,
    question: "If an aircraft is flown at its design maneuvering speed VA:",
    options: [
      "It is not possible to exceed the limit load",
      "It can exceed limit load with full control deflection",
      "The aircraft can reach VNE"
    ],
    correctAnswer: 0
  },
  {
    id: 247,
    question: "The speed VNE is:",
    options: [
      "The airspeed which must not be exceeded except in a dive",
      "The maximum airspeed at which an aircraft may be flown",
      "The maximum speed above which flaps should not be extended"
    ],
    correctAnswer: 1
  },
  {
    id: 248,
    question: "Maximum structural cruising speed VNO is the maximum speed at which an aeroplane:",
    options: [
      "Can be operated during normal operations",
      "Can be operated during abrupt maneuvers",
      "Can be operated during flight in smooth air",
      "Can be operated during flight in rough air"
    ],
    correctAnswer: 0
  },
  {
    id: 249,
    question: "The blade angle of a propeller is:",
    options: [
      "Sum of angle of attack and helix angle",
      "Sum of helix angle and pitch",
      "Sum of angle of attack and slip angle",
      "None of the above"
    ],
    correctAnswer: 0
  },
  {
    id: 250,
    question: "The cambered section of a propeller is called:",
    options: [
      "Blade face",
      "Blade back",
      "Blade front",
      "None"
    ],
    correctAnswer: 1
  },
  {
    id: 251,
    question: "In straight and level flight, with increase in speed, induced drag:",
    options: [
      "Increases",
      "Decreases",
      "Does not change",
      "Decreases to VMD and then increases"
    ],
    correctAnswer: 1
  },
  {
    id: 252,
    question: "A thin lenticular aerofoil is called:",
    options: [
      "Straight flow aerofoil",
      "Laminar aerofoil",
      "Turbulent aerofoil",
      "Full flow aerofoil"
    ],
    correctAnswer: 1
  },
  {
    id: 253,
    question: "In a level turn to reduce the radius of turn & increase rate of turn:",
    options: [
      "Increase bank angle & decrease airspeed",
      "Increase bank angle & increase airspeed",
      "Decrease bank angle & increase airspeed",
      "Decrease bank angle & decrease airspeed"
    ],
    correctAnswer: 0
  },
  {
    id: 254,
    question: "When a pilot moves the stick forward:",
    options: [
      "Elevator moves down",
      "Elevator moves down & air pressure increases below the elevator",
      "Elevator moves up",
      "Elevator moves up & the nose pitches down"
    ],
    correctAnswer: 3
  },
  {
    id: 255,
    question: "TAS & EAS relationship is:",
    options: [
      "TAS = EAS / √σ",
      "EAS = TAS / √σ",
      "TAS = EAS × √σ"
    ],
    correctAnswer: 0
  },
  {
    id: 256,
    question: "If the CG of an aircraft is aft of CG limit:",
    options: [
      "The aircraft will be less stable along lateral axis",
      "Aircraft will be more stable along longitudinal axis",
      "Aircraft will be less stable along longitudinal axis",
      "Aircraft will be more stable along lateral axis"
    ],
    correctAnswer: 2
  },
  {
    id: 257,
    question: "When the angle of attack is increased:",
    options: [
      "The lift increases",
      "The drag increases",
      "The L/D ratio first increases then decreases",
      "None is correct"
    ],
    correctAnswer: 2
  },
  {
    id: 258,
    question: "Elevators are used to:",
    options: [
      "Decrease stability about lateral axis",
      "Increase stability about lateral axis",
      "Control pitch about the lateral axis"
    ],
    correctAnswer: 2
  },
  {
    id: 259,
    question: "The landing run of an aircraft increases with:",
    options: [
      "Low temperatures",
      "Low air density",
      "Runway down slope",
      "All of the above"
    ],
    correctAnswer: 2
  },
  {
    id: 260,
    question: "Angle of attack transducers are fitted at:",
    options: [
      "Leading edge of wing",
      "Trailing edge of wing",
      "Sides of wing",
      "Below the wing"
    ],
    correctAnswer: 0
  }
];

export const skTechGeneralTopic: Topic = {
  id: "sk-tech-general-qb",
  title: "Question Bank-2",
  questions: skTechQuestions,
};

export default skTechQuestions;
