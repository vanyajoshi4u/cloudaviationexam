import { type Topic } from "./icJoshiQuestions";

// Oxford Radio Navigation — Ch 6: VHF Direction Finder (VDF)
export const oxfordRadNavCh6Topic: Topic = {
  id: "oxford-radnav-ch6",
  title: "Ch 6 – VHF Direction Finder (VDF)",
  questions: [
    {
      id: 1,
      question: "An aircraft has to communicate with a VHF station at a range of 300 NM, if the ground station is situated 2500 ft AMSL which of the following is the lowest altitude at which contact is likely to be made?",
      options: ["190 ft", "1 378 ft", "36 100 ft", "84 100 ft"],
      correct: 2,
    },
    {
      id: 2,
      question: "Class 'B' VHF DF bearings are accurate to within:",
      options: ["± 1°", "± 5°", "± 2°", "± 10°"],
      correct: 1,
    },
    {
      id: 3,
      question: "A VDF QDM given without an accuracy classification may be assumed to be accurate to within:",
      options: ["2 degrees", "5 degrees", "7.5 degrees", "10 degrees"],
      correct: 1,
    },
    {
      id: 4,
      question: "An aircraft at altitude 9000 ft wishes to communicate with a VHF/DF station that is situated at 400 ft AMSL. What is the maximum range at which contact is likely to be made?",
      options: ["115 NM", "400 NM", "143 NM", "63.5 NM"],
      correct: 2,
    },
    {
      id: 5,
      question: "An aircraft is passed a true bearing from a VDF station of 353°. If variation is 8°E and the bearing is classified as 'B' then the:",
      options: [
        "QDM is 345° ± 5°",
        "QDR is 345° ± 2°",
        "QTE is 353° ± 5°",
        "QUJ is 353° ± 2°",
      ],
      correct: 2,
    },
    {
      id: 6,
      question: "An aircraft at 19000 ft wishes to communicate with a VDF station at 1400 ft AMSL. What is the maximum range at which contact is likely?",
      options: ["175 NM", "400.0 NM", "62.5 NM", "219 NM"],
      correct: 3,
    },
  ],
};

// Oxford Radio Navigation — Ch 7: NDB and ADF
export const oxfordRadNavCh7Topic: Topic = {
  id: "oxford-radnav-ch7",
  title: "Ch 7 – NDB and ADF",
  questions: [
    {
      id: 1,
      question: "The phenomenon of coastal refraction which affects the accuracy of ADF bearings:",
      options: [
        "Is most marked at night",
        "Can be minimized by using beacons situated well inland",
        "Can be minimized by taking bearings where the signal crosses the coastline at right angles",
        "Is most marked one hour before to one hour after sunrise and sunset",
      ],
      correct: 2,
    },
    {
      id: 2,
      question: "An aircraft is intending to track from NDB 'A' to NDB 'B' on a track of 050°(T), heading 060°(T). If the RBI shows the relative bearing of 'A' to be 180° and the relative bearing of 'B' to be 330° then the aircraft is:",
      options: [
        "Port of track and nearer 'A'",
        "Port of track and nearer 'B'",
        "Starboard of track and nearer 'A'",
        "Starboard of track and nearer 'B'",
      ],
      correct: 3,
    },
    {
      id: 3,
      question: "ADF quadrantal error is caused by:",
      options: [
        "Static build up on the airframe and St. Elmo's Fire",
        "The aircraft's major electrical axis, the fuselage, reflecting and re-radiating the incoming NDB transmissions",
        "Station interference and/or night effect",
        "NDB signals speeding up and bending as they cross from a land to water propagation path",
      ],
      correct: 1,
    },
    {
      id: 4,
      question: "The overall accuracy of ADF bearings by day within the promulgated range (DOC) is:",
      options: ["± 3°", "± 5°", "± 6°", "± 10°"],
      correct: 1,
    },
    {
      id: 5,
      question: "In order to Tune, Identify and Monitor N0NA1A NDB emissions the BFO should be used as follows:\n\nTune / Identify / Monitor",
      options: [
        "On / On / Off",
        "On / On / On",
        "On / Off / Off",
        "Off / Off / Off",
      ],
      correct: 1,
    },
    {
      id: 6,
      question: "The magnitude of the error in position lines derived from ADF bearings that are affected by coastal refraction may be reduced by:",
      options: [
        "Selecting beacons situated well inland",
        "Only using beacons within the designated operational coverage",
        "Choosing N0NA2A beacons",
        "Choosing beacons on or near the coast",
      ],
      correct: 3,
    },
    {
      id: 7,
      question: "An aircraft is tracking away from an NDB on a track of 023°(T). If the drift is 8° port and variation 10° west, which of the RMIs shows the correct indications?",
      options: ["Diagram (a)", "Diagram (b)", "Diagram (c)", "Diagram (d)"],
      correct: 3,
    },
    {
      id: 8,
      question: "The BFO facility on ADF equipment should be used as follows when an NDB having N0NA1A type emission is to be used:",
      options: [
        "BFO on for tuning and identification but may be turned off for monitoring",
        "BFO on for tuning but can be turned off for monitoring and identification purpose",
        "BFO off during tuning, identification and monitoring because this type of emission is not modulated",
        "BFO should be switched on for tuning, ident and monitoring",
      ],
      correct: 3,
    },
    {
      id: 9,
      question: "The protection ratio of 3:1 that is provided within the promulgated range/designated operational coverage of an NDB by day cannot be guaranteed at night because of:",
      options: [
        "Long range sky wave interference from other transmitters",
        "Sky wave signals from the NDB to which you are tuned",
        "The increased skip distance that occurs at night",
        "The possibility of sporadic E returns occurring at night",
      ],
      correct: 0,
    },
    {
      id: 10,
      question: "An aircraft has an RMI with two needles. Assume that:\ni) The aircraft is outbound from NDB Y on a track of 126°(M) drift is 14° Port\nii) A position report is required when crossing a QDR of 022 from NDB Z\n\nWhich of the diagrams represents the RMI at the time of crossing the reporting point?",
      options: ["Diagram (a)", "Diagram (b)", "Diagram (c)", "Diagram (d)"],
      correct: 0,
    },
    {
      id: 11,
      question: "Each NDB has a range promulgated in the COMM section of the AIP. Within this range interference from other NDBs should not cause bearing errors in excess of:",
      options: [
        "Day ± 5°",
        "Night ± 10°",
        "Day ± 6°",
        "Night ± 5°",
      ],
      correct: 0,
    },
    {
      id: 12,
      question: "The range promulgated in the AIP and flight guides for all NDBs in the UK is the range:",
      options: [
        "Within which a protection ratio of 3:1 is guaranteed by day and night",
        "Up to which bearings can be obtained on 95% of occasions",
        "Within which bearings obtained by day should be accurate to within 5°",
        "Within which protection from sky wave protection is guaranteed",
      ],
      correct: 2,
    },
    {
      id: 13,
      question: "In order to resolve the 180° directional ambiguity of a directional LOOP aerial its polar diagram is combined with that of a SENSE aerial to produce a ............... whose single null ensures the ADF needle moves the shortest distance to indicate the correct ...............",
      options: [
        "At the aircraft, cardioid, radial",
        "At the transmitter, limacon, bearing",
        "At the aircraft, limacon, bearing",
        "At the aircraft, cardioid, bearing",
      ],
      correct: 3,
    },
    {
      id: 14,
      question: "The protection ratio afforded to NDBs in the UK within the promulgated range (DOC) applies:",
      options: [
        "By day only",
        "By night only",
        "Both day and night",
        "At dawn and dusk",
      ],
      correct: 0,
    },
    {
      id: 15,
      question: "The phenomena of coastal refraction affecting ADF bearings is caused by the signal ............... when it reaches the coastline and bending ............... the normal to the coast:",
      options: [
        "Accelerating, towards",
        "Decelerating, towards",
        "Accelerating, away from",
        "Decelerating, away from",
      ],
      correct: 2,
    },
    {
      id: 16,
      question: "In an ADF system, night effect is most pronounced:",
      options: [
        "During long winter nights",
        "When the aircraft is at low altitude",
        "When the aircraft is at high altitude",
        "At dusk and dawn",
      ],
      correct: 3,
    },
    {
      id: 17,
      question: "When the induced signals from the loop and the sense antenna are combined in an ADF receiver, the resultant polar diagram is:",
      options: ["A limacon", "A cardioid", "Figure of eight shaped", "Circular"],
      correct: 1,
    },
    {
      id: 18,
      question: "When flying over the sea and using an inland NDB to fix position with a series of position lines, the plotted position in relation to the aircraft's actual position will be:",
      options: [
        "Further from the coast",
        "Closer to the coast",
        "Co-incident",
        "Inaccurate due to the transmitted wave front decelerating",
      ],
      correct: 1,
    },
    {
      id: 19,
      question: "An aircraft on a heading of 235°(M) shows an RMI reading of 090° with respect to an NDB. Any quadrantal error which is affecting the accuracy of this bearing is likely to be:",
      options: [
        "A maximum value",
        "A very small value",
        "Zero, since quadrantal error affects only the RBI",
        "Zero, since quadrantal error affects only the VOR",
      ],
      correct: 0,
    },
    {
      id: 20,
      question: "The principal propagation path employed in an NDB/ADF system is:",
      options: ["Sky wave", "Surface wave", "Direct wave", "Ducted wave"],
      correct: 1,
    },
    {
      id: 21,
      question: "The ADF of an aircraft on a heading of 189°(T) will experience the greatest effect due to quadrantal error if the NDB bears:",
      options: ["234°(T)", "279°(T)", "225°(T)", "145°(T)"],
      correct: 0,
    },
  ],
};
