import { type Topic } from "./icJoshiQuestions";

// Oxford Radio Navigation — Ch 8: VOR (Part 1: Q1-17)
export const oxfordRadNavCh8Questions1to17: Topic["questions"] = [
  {
    id: 1,
    question: "Assuming the maximum likely error in VOR to be 5.5°, what is the maximum distance apart that beacons can be situated on the centre line of a UK airway in order that an aircraft can guarantee remaining within the airway boundary?",
    options: ["54.5 NM", "109 NM", "66 NM", "132 NM"],
    correct: 1,
  },
  {
    id: 2,
    question: "The Designated Operational Coverage quoted for VOR beacons in the COMM section of the AIP:",
    options: [
      "Is only applicable by day",
      "Guarantees a protection ratio of at least 3 to 1 by day and night",
      "Defines the airspace within which an aircraft is assured of protection from interference from other VORs on the same channel",
      "Is determined by the type of surface over which the signal will have to travel",
    ],
    correct: 2,
  },
  {
    id: 3,
    question: "An aircraft is tracking away from a VOR on the 050 radial with 10° starboard drift. An NDB lies to the east of the VOR. Which of the RMIs illustrated below shows the aircraft when it is obtaining a relative bearing of 100° from the NDB?\n\n(Refer to diagram: four RMI options a, b, c, d)",
    options: ["Diagram (a)", "Diagram (b)", "Diagram (c)", "Diagram (d)"],
    correct: 3,
  },
  {
    id: 4,
    question: "What is the theoretical maximum range that an aircraft at flight level 360 will obtain from a VOR beacon situated at 900 ft above mean sea level?",
    options: ["274 NM", "255 NM", "112 NM", "224 NM"],
    correct: 0,
  },
  {
    id: 5,
    question: "A conventional VOR:",
    options: [
      "Has an FM reference signal and an AM variable signal",
      "Has a 150 Hz reference signal and a 90 Hz variable signal",
      "Has an AM reference signal and a 150 Hz variable signal",
      "Has an AM reference signal and an FM variable signal",
    ],
    correct: 0,
  },
  {
    id: 6,
    question: "The OBS on a deviation indicator is set to 330° and gives a 3 dots fly right demand with FROM indicated. What is the QDM of the aircraft to the station?",
    options: ["144", "324", "336", "156"],
    correct: 3,
  },
  {
    id: 7,
    question: "An aircraft is homing towards a VOR which marks the centre line of an airway. The beacon is 100 NM distant. If the pilot had the airway QDM set on the OBS what deflection of the deviation indicator would be given if the aircraft was on the boundary of the airway? Assume that one dot equals 2 degrees.",
    options: ["3 dots", "2 dots", "2.5 dots", "1.5 dots"],
    correct: 2,
  },
  {
    id: 8,
    question: "What is the theoretical maximum range that an aircraft at flight level 420 will obtain from a VOR beacon situated at 400 ft above mean sea level?",
    options: ["225 NM", "256 NM", "281 NM", "257 NM"],
    correct: 0,
  },
  {
    id: 9,
    question: "Concerning conventional and Doppler VORs (DVOR), which of the following is correct?",
    options: [
      "There is no way of knowing from the instrumentation display which type is being used",
      "The DVOR will always have a 'D' in the ident",
      "The DVOR has a higher pitch ident than the standard VOR",
      "The conventional VOR has less site error",
    ],
    correct: 2,
  },
  {
    id: 10,
    question: "An aircraft is attempting to home to a VOR on the 064 radial. The CDI shows 4 dots fly right with a TO indication. At the same time the co-located DME shows a range of 45 NM. Where is the aircraft in relation to the required track?",
    options: [
      "6 NM right of track",
      "3 NM right of track",
      "6 NM left of track",
      "3 NM left of track",
    ],
    correct: 1,
  },
  {
    id: 11,
    question: "A VOR beacon ceases to transmit its normal identification which is substituted by 'TST'. This means that:",
    options: [
      "The beacon may be used providing that extreme caution is used",
      "The beacon is undergoing maintenance or calibration and should not be used",
      "This is a temporary short range transmission and will have approximately half its normal range",
      "The beacon is under test and pilots using it should report its accuracy to air traffic control",
    ],
    correct: 2,
  },
  {
    id: 12,
    question: "What is the approximate maximum range that an aircraft flying at 25000 ft would expect to obtain from a VOR beacon situated 900 ft above mean sea level?",
    options: ["220 NM", "100 NM", "235 NM", "198 NM"],
    correct: 2,
  },
  {
    id: 13,
    question: "An aircraft is on the airway boundary range 100 NM from a VOR marking the airway centre line. Assuming that each dot equates to 2° how many dots deviation will be shown on the deviation indicator?",
    options: ["3.0 dots", "2.5 dots", "2.0 dots", "1.5 dots"],
    correct: 3,
  },
  {
    id: 14,
    question: "An aircraft is required to intercept and home to a VOR along the 064 radial. The OBS should be set to:",
    options: [
      "064 to get correct needle sense and a TO indication",
      "244 to get correct needle sense and a TO indication",
      "064 to get correct needle sense and a FROM indication",
      "244 to get correct needle sense and a FROM indication",
    ],
    correct: 1,
  },
  {
    id: 15,
    question: "An aircraft is tracking away from a VOR on the 150 radial with 10° starboard drift. An NDB lies to the south of the VOR. Which of the RMIs illustrated below shows the aircraft when it is obtaining a relative bearing of 100° from the NDB?\n\n(Refer to diagram: four RMI options a, b, c, d)",
    options: ["Diagram (a)", "Diagram (b)", "Diagram (c)", "Diagram (d)"],
    correct: 0,
  },
  {
    id: 16,
    question: "Assuming the maximum likely error in VOR to be 5°, what is the maximum distance apart that beacons can be situated on the centre line of a UK airway in order that an aircraft can guarantee remaining within the airway boundary?",
    options: ["60 NM", "100 NM", "120 NM", "150 NM"],
    correct: 2,
  },
  {
    id: 17,
    question: "An aircraft, heading 150°, is 100 NM north of a VOR, the pilot intends to home to the VOR on the 030 radial. The pilot should set ..... on the OBS and on reaching the 030 radial should turn ..... onto a heading of ....., assuming zero wind.",
    options: [
      "210, left, 030",
      "030, right, 210",
      "210, right, 210",
      "150, left, 210",
    ],
    correct: 2,
  },
];
