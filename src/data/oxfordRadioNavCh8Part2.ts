import { type Topic } from "./icJoshiQuestions";

// Oxford Radio Navigation — Ch 8: VOR (Part 2: Q18-33)
export const oxfordRadNavCh8Questions18to33: Topic["questions"] = [
  {
    id: 18,
    question: "The type of emission radiated by a VOR beacon is:",
    options: [
      "A double channel VHF carrier with one channel being amplitude modulated and the second channel being frequency modulated",
      "A single channel VHF carrier wave amplitude modulated at 30 Hz with a sub carrier being frequency modulated at 30 Hz",
      "A VHF carrier wave with a 90 Hz frequency modulation and a 150 Hz amplitude modulation",
      "A VHF pulse modulated emission with a pulse repetition frequency of 30 pps",
    ],
    correct: 1,
  },
  {
    id: 19,
    question: "An aircraft wishes to track towards a VOR along the 274 radial. If variation is 10°W what should be set on the OBS?",
    options: ["274", "264", "094", "084"],
    correct: 2,
  },
  {
    id: 20,
    question: "An aircraft is tracking away from a VOR on a heading of 287°(M) with 14° starboard drift. If the variation is 6°W what is the phase difference between the reference and variable phase components of the VOR transmission?",
    options: ["121°", "295°", "301°", "315°"],
    correct: 2,
  },
  {
    id: 21,
    question: "What is the theoretical maximum range that a pilot would obtain from a VOR situated 900 ft above mean sea level in an aircraft flying at 18000 ft?",
    options: ["168 NM", "188 NM", "205 NM", "250 NM"],
    correct: 2,
  },
  {
    id: 22,
    question: "An aircraft is attempting to home to a VOR beacon. The pilot has set 329 on the OBS of the deviation indicator. If the aircraft is situated on the 152 radial then the deviation indicator will show:",
    options: [
      "One and a half dots fly right",
      "One and a half dots fly left",
      "Three dots fly right",
      "Three dots fly left",
    ],
    correct: 0,
  },
  {
    id: 23,
    question: "A VOR receiver in an aircraft measures the phase difference from a DVOR as 220°. Which radial is the aircraft on?",
    options: ["140", "040", "320", "220"],
    correct: 3,
  },
  {
    id: 24,
    question: "The RMI indicates the aircraft magnetic heading. To convert the RMI bearings of NDBs and VORs to true bearings, the correct combination for the application of magnetic variation is:\n\n           NDB              VOR",
    options: [
      "Beacon position, Aircraft position",
      "Beacon position, Beacon position",
      "Aircraft position, Beacon position",
      "Aircraft position, Aircraft position",
    ],
    correct: 2,
  },
  {
    id: 25,
    question: "Both the VOR and the ADF in an aircraft are correctly tuned and identified. The indications from both are shown on the RMI illustrated. Use the information to answer the following: The information given on the RMI indicates:\n\n(Refer to diagram: RMI with VOR and NDB needles)",
    options: [
      "That the aircraft is heading 033°(M), is on the 310° radial from the VOR, and bears 050°(M) from the NDB",
      "That the aircraft is heading 330°(M), is on the 310° radial from the VOR, and bears 050° from the NDB",
      "That the aircraft is heading 330°(M), is on the 130° radial from the VOR, and bears 050°(M) from the NDB",
      "That the aircraft is heading 330°(M), is on the 130° radial from the VOR, and bears 230°(M) from the NDB",
    ],
    correct: 3,
  },
  {
    id: 26,
    question: "The VOR in an aircraft is correctly tuned and set to define the centre line of an airway within UK airspace which you intend to fly. The indication received on the VOR/ILS deviation indicator is shown to the right. At the same time the DME gave a range of 90 NM from the facility. At the time of the observation, the aircraft's radial and distance from the airway centre line were:\n\n(Refer to diagram: VOR/ILS deviation indicator)",
    options: [
      "062 radial, 9 NM",
      "074 radial, 6 NM",
      "242 radial, 6 NM",
      "254 radial, 9 NM",
    ],
    correct: 0,
  },
  {
    id: 27,
    question: "The normal maximum error which might be expected with a VOR bearing obtained within the DOC is:",
    options: [
      "Plus or minus 1°",
      "Plus or minus 2°",
      "Plus or minus 5°",
      "Plus or minus 10°",
    ],
    correct: 2,
  },
  {
    id: 28,
    question: "An aircraft is tracking away from VOR 'A' on the 310° radial with 8° starboard drift; NDB 'X' is north of 'A'. Which diagram below illustrates the RMI when the aircraft is on its present track with a QDR from 'X' of 270°?\n\n(Refer to diagram: four RMI options a, b, c, d)",
    options: ["Diagram (a)", "Diagram (b)", "Diagram (c)", "Diagram (d)"],
    correct: 0,
  },
  {
    id: 29,
    question: "The VOR indications on an RMI whose deviation is not zero:",
    options: [
      "Are magnetic",
      "Are compass",
      "Are relative",
      "Must have deviation applied before being used",
    ],
    correct: 0,
  },
  {
    id: 30,
    question: "An aircraft bears 175°(M) from a VOR. If the aircraft OBS is set to 002 and its heading is 359°(M) which diagram below represents the aircraft VOR/ILS deviation indicator? (assume 1 dot = 2°)\n\n(Refer to diagram: four VOR/ILS indicator options a, b, c, d)",
    options: ["Diagram (a)", "Diagram (b)", "Diagram (c)", "Diagram (d)"],
    correct: 0,
  },
  {
    id: 31,
    question: "Using Annex A.\nAn aircraft is flying on the 170 radial with a heading of 315°(M). The course on the HSI is set to 180°. Which HSI shows the correct indications?\n\n(Refer to Annex A diagram: four HSI options A, B, C, D)",
    options: ["A", "B", "C", "D"],
    correct: 2,
  },
  {
    id: 32,
    question: "Using Annex B.\nAn aircraft is flying on the 050 radial with a heading of 250°(M). The course on the HSI is set to 060°. Which HSI shows the correct indications?\n\n(Refer to Annex B diagram: four HSI options A, B, C, D)",
    options: ["A", "B", "C", "D"],
    correct: 1,
  },
  {
    id: 33,
    question: "Using Annex C.\nAn aircraft is flying on the 245 radial with a heading of 250°(M). The course on the HSI is set to 060°. Which HSI shows the correct indications?\n\n(Refer to Annex C diagram: four HSI options A, B, C, D)",
    options: ["A", "B", "C", "D"],
    correct: 0,
  },
];
