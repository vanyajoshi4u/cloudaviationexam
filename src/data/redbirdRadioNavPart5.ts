import { type Topic } from "./icJoshiQuestions";

// Redbird Radio Navigation — Airborne Weather Radar (AWR)
export const redbirdAwrTopic: Topic = {
  id: "redbird-radnav-awr",
  title: "Airborne Weather Radar (AWR)",
  questions: [
    {
      id: 1,
      question: "Airborne weather radar systems use a wavelength of approximately 3 cm in order to:",
      options: [
        "Detect the larger water droplets",
        "Detect the smaller cloud formations as well as large",
        "Obtain optimum use of the Cosecant squared beam",
        "Minimize ground clutter",
      ],
      correct: 0,
    },
    {
      id: 2,
      question: "The ISO-ECHO facility of an airborne weather radar is provided in order to:",
      options: [
        "Detect areas of possible severe turbulence in cloud",
        "Give an indication of cloud tops",
        "Inhibit unwanted ground returns",
        "Extend the mapping range",
      ],
      correct: 0,
    },
    {
      id: 3,
      question: "In the MAPPING MODE the airborne weather radar utilises a:",
      options: [
        "Fan shaped beam effective up to a maximum of 50 NM to 60 NM range",
        "Fan shaped beam effective up to a range of 150 NM",
        "Pencil beam to a maximum range of 60 NM",
        "Pencil beam effective from zero to 150 NM",
      ],
      correct: 3,
    },
    {
      id: 4,
      question: "Which of the following cloud types is most readily detected by airborne weather radar when using the 'weather beam'?",
      options: ["Cirrocumulus", "Stratus", "Cumulus", "Altostratus"],
      correct: 2,
    },
    {
      id: 5,
      question: "In which mode of operation does the aircraft weather radar use a cosecant² radiation pattern?",
      options: ["CONTOUR", "MAPPING", "WEATHER", "MANUAL"],
      correct: 1,
    },
    {
      id: 6,
      question: "In an Airborne Weather Radar that has a colour CRT, the areas of greatest turbulence are indicated on the screen by:",
      options: [
        "Blank iso-echo areas where there is no colour",
        "Large areas of flashing red colour",
        "Iso-echo areas which are coloured black",
        "Colour zones being closest together",
      ],
      correct: 0,
    },
    {
      id: 7,
      question: "Which of the following is a complete list of airborne weather radar antenna stabilisation axes?",
      options: [
        "Roll, pitch and yaw",
        "Roll and pitch",
        "Pitch and yaw",
        "Roll and yaw",
      ],
      correct: 1,
    },
    {
      id: 8,
      question: "In an Airborne Weather Radar with a colour CRT, increasing severity of rain and turbulence is generally shown by a change of colour from:",
      options: [
        "Yellow to amber to blue",
        "Green to red to black",
        "Yellow to orange to red",
        "Green to yellow to red",
      ],
      correct: 3,
    },
    {
      id: 9,
      question: "A frequency of 10 GHz is considered the optimum for use in airborne weather radar because:",
      options: [
        "The larger water droplets will give good echoes and the antenna can be kept relatively small",
        "Greater detail can be obtained at the more distant ranges of the smaller water droplets",
        "Static interference is minimised",
        "Less power output is required in the mapping mode",
      ],
      correct: 0,
    },
    {
      id: 10,
      question: "In general, the operation of airborne weather radar equipment on the ground is:",
      options: [
        "Permitted anywhere",
        "Totally prohibited",
        "Only permitted with certain precautions, to safeguard personnel and protect equipment",
        "Unrestrictedly permitted in aerodrome maintenance areas",
      ],
      correct: 2,
    },
    {
      id: 11,
      question: "The pencil shaped beam of an airborne weather radar is used in ___ mode for the determination of ground features:",
      options: [
        "The mapping mode",
        "Beyond 100 NM because insufficient antenna tilt angle is available",
        "Beyond 150 NM because the wider beam gives better definition",
        "When approaching coast-lines in polar regions",
      ],
      correct: 0,
    },
    {
      id: 12,
      question: "The operating frequency of airborne weather radar is:",
      options: ["9375 GHz", "9375 kHz", "9375 Hz", "9375 MHz"],
      correct: 3,
    },
    {
      id: 13,
      question: "A weather radar, set to the 100 NM scale, shows a squall at 50 NM. By changing the scale to 50 NM, the return on the radar screen should:",
      options: [
        "Increase in area and move to the top of the screen",
        "Increase in area and appear nearer to the bottom of the screen",
        "Decrease in area but not change in position on the screen",
        "Decrease in area and move to the top of the screen",
      ],
      correct: 0,
    },
    {
      id: 14,
      question: "In weather radar, the use of a cosecant² beam in 'Mapping' mode enables:",
      options: [
        "Better target definition in contrasting terrain",
        "A greater radar range to be achieved",
        "Scanning of a large ground zone producing echoes whose signals are practically independent of distance",
        "Higher definition echoes to be produced giving a clearer picture",
      ],
      correct: 2,
    },
    {
      id: 15,
      question: "In Airborne Weather Radar (AWR), the main factors which determine whether a cloud will be detected are:",
      options: [
        "Range from cloud, wavelength/frequency used",
        "Size of the water drops, diameter of radar scanner",
        "Rotational speed of radar scanner, range from cloud",
        "Size of the water drops, wavelength/frequency used",
      ],
      correct: 3,
    },
    {
      id: 16,
      question: "In order to ascertain whether a cloud return on an AWR is at or above the height of the aircraft, the tilt control should be set to (assume beam width 5°):",
      options: ["2.5° up", "0°", "2.5° down", "5° up"],
      correct: 0,
    },
    {
      id: 17,
      question: "The advantage of the use of slotted antennas in modern weather radar technology is to:",
      options: [
        "Simultaneously transmit weather and mapping beams",
        "Virtually eliminate lateral lobes and concentrate more energy in the main beam",
        "Have a wide beam and better target detection",
        "Eliminate the need for azimuth slaving",
      ],
      correct: 1,
    },
    {
      id: 18,
      question: "Which of the following lists phenomena that CANNOT be detected by weather radar?",
      options: [
        "Snow, clear air turbulence",
        "Dry hail, clear air turbulence",
        "Clear air turbulence, turbulence in cloud with precipitation",
        "Snow, turbulence in clouds with precipitation",
      ],
      correct: 1,
    },
    {
      id: 19,
      question: "Which of the following equipment uses primary radar principles?",
      options: [
        "Secondary Surveillance Radar (SSR)",
        "Distance Measuring Equipment (DME)",
        "Global Positioning System (GPS)",
        "Airborne Weather Radar (AWR)",
      ],
      correct: 3,
    },
    {
      id: 20,
      question: "An aircraft AWR picks up a CB cell 75 NM ahead. If the antenna has 4° beam width and is tilted up so the CB echo disappears at tilt angle 3.15°, and the aircraft desires to fly over the top of the CB by 2000 feet margin, how many feet should it climb?",
      options: ["8740 ft", "6740 ft", "40740 ft", "10740 ft"],
      correct: 0,
    },
    {
      id: 21,
      question: "A ground feature appears 30° to the left of the centre line of the CRT of an airborne weather radar. If the heading of the aircraft is 355°(M) and the magnetic variation is 15° East, the true bearing of the aircraft from the feature is:",
      options: ["220°", "310°", "130°", "160°"],
      correct: 3,
    },
  ],
};

// Redbird Radio Navigation — ILS
export const redbirdIlsTopic: Topic = {
  id: "redbird-radnav-ils",
  title: "Instrument Landing System (ILS)",
  questions: [
    {
      id: 1,
      question: "The amplitude modulation and the colour of an outer marker (OM) is:",
      options: [
        "3000 Hz, blue",
        "400 Hz, blue",
        "1300 Hz, blue",
        "400 Hz, amber",
      ],
      correct: 1,
    },
    {
      id: 2,
      question: "A Category 1 Instrument Landing System (ILS) ground installation provides accurate guidance from coverage limit down to:",
      options: [
        "50 feet above ILS reference point",
        "Runway surface",
        "200 feet above the runway threshold",
        "200 feet above the inner marker",
      ],
      correct: 2,
    },
    {
      id: 3,
      question: "The reason why pre take-off holding areas are sometimes further from the active runway when ILS Category 2 and 3 landing procedures are in progress is:",
      options: [
        "Heavy precipitation may disturb guidance signals",
        "To increase distance from the runway during offset approach operations",
        "To increase air traffic separation in very reduced visibility conditions",
        "Aircraft manoeuvring near the runway may disturb guidance signals",
      ],
      correct: 3,
    },
    {
      id: 4,
      question: "An aircraft tracking to intercept the ILS localizer inbound, on the approach side, outside the published ILS coverage angle:",
      options: [
        "Will not normally receive signals",
        "Will receive signals without identification coding",
        "May receive false course indications",
        "Can expect signals to give correct indications",
      ],
      correct: 2,
    },
    {
      id: 5,
      question: "The MIDDLE MARKER of an ILS facility is identified visually by a series of:",
      options: [
        "Two dashes per second and a blue light flashing",
        "Dots and a white light flashing",
        "Alternate dots and dashes and an amber light flashing",
        "Dashes and an amber light flashing",
      ],
      correct: 2,
    },
    {
      id: 6,
      question: "The OUTER MARKER of an ILS facility operates at:",
      options: [
        "200 MHz and is modulated by alternate dot/dash in morse",
        "75 MHz and is modulated by morse at two dashes per second",
        "75 MHz and is modulated by alternate dot/dash in morse",
        "300 MHz and is modulated by morse at two dashes per second",
      ],
      correct: 1,
    },
    {
      id: 7,
      question: "What approximate rate of descent is required in order to maintain a 3° glidepath at a groundspeed of 120 kt?",
      options: ["550 ft/min", "800 ft/min", "950 ft/min", "600 ft/min"],
      correct: 3,
    },
    {
      id: 8,
      question: "ILS is subject to false glide paths resulting from:",
      options: [
        "Multiple lobes of radiation patterns in the vertical plane",
        "Spurious signals reflected by nearby obstacles",
        "Back-scattering of antennas",
        "Ground returns ahead of the antennas",
      ],
      correct: 0,
    },
    {
      id: 9,
      question: "What is the colour sequence when passing over an Outer, Middle and Inner Marker beacon?",
      options: [
        "Amber - white - green",
        "Blue - amber - white",
        "White - amber - blue",
        "Blue - green - white",
      ],
      correct: 1,
    },
    {
      id: 10,
      question: "An aircraft carrying out an ILS approach is receiving more 90 Hz than 150 Hz modulation from both the localiser and glidepath transmitters. The ILS indication will show:",
      options: [
        "Fly left and fly down",
        "Fly right and fly up",
        "Fly left and fly up",
        "Fly right and fly down",
      ],
      correct: 2,
    },
    {
      id: 11,
      question: "An aircraft carrying out a 3° glidepath ILS approach experiences a reduction in groundspeed from 150 kt at the outer marker to 120 kt over the threshold. The effect on the aircraft's rate of descent will be a decrease of approximately:",
      options: ["150 ft/min", "250 ft/min", "50 ft/min", "100 ft/min"],
      correct: 0,
    },
    {
      id: 12,
      question: "The principle of operation of an ILS localiser transmitter is based on two overlapping lobes that are transmitted on ___ frequencies and carry different ___:",
      options: [
        "The same; modulation frequencies",
        "Different; modulation frequencies",
        "Different; phases",
        "The same; amplitudes",
      ],
      correct: 0,
    },
    {
      id: 13,
      question: "In which frequency band does an ILS glide slope transmit?",
      options: ["VHF", "SHF", "UHF", "EHF"],
      correct: 2,
    },
    {
      id: 14,
      question: "Assuming a five dot display, what does each of the dots on either side of the ILS localizer cockpit display represent?",
      options: ["1.5 degrees", "2.5 degrees", "2.0 degrees", "0.5 degrees"],
      correct: 3,
    },
    {
      id: 15,
      question: "Outer marker transmits on 75 MHz and has an aural frequency of:",
      options: ["1300 Hz", "2000 Hz", "3000 Hz", "400 Hz"],
      correct: 3,
    },
    {
      id: 16,
      question: "Every 10 kt decrease in groundspeed, on a 3° ILS glidepath, will require an approximate:",
      options: [
        "Increase in the aircraft's rate of descent of 50 ft/min",
        "Decrease in the aircraft's rate of descent of 100 ft/min",
        "Decrease in the aircraft's rate of descent of 50 ft/min",
        "Increase in the aircraft's rate of descent of 100 ft/min",
      ],
      correct: 2,
    },
    {
      id: 17,
      question: "The rate of descent required to maintain a 3.25° glide slope at a groundspeed of 140 kt is approximately:",
      options: ["850 ft/min", "670 ft/min", "700 ft/min", "800 ft/min"],
      correct: 3,
    },
    {
      id: 18,
      question: "Which of the following is an ILS localiser frequency?",
      options: ["109.15 MHz", "108.25 MHz", "110.20 MHz", "112.10 MHz"],
      correct: 0,
    },
    {
      id: 19,
      question: "What approximate rate of descent is required in order to maintain a 3° glidepath at a groundspeed of 90 kt?",
      options: ["400 ft/min", "600 ft/min", "450 ft/min", "700 ft/min"],
      correct: 2,
    },
  ],
};
