import { type Topic } from "./icJoshiQuestions";

// Oxford Radio Navigation — Ch 10-11: MLS & Radar Principles (Revision Q78-98)
export const oxfordRadNavCh10to11Topic: Topic = {
  id: "oxford-radnav-ch10-11",
  title: "Ch 10 – MLS & Radar Principles",
  questions: [
    {
      id: 1,
      question: "The coverage of MLS is ............... either side of the centre line to a distance of ...............",
      options: ["40°, 40 NM", "40°, 20 NM", "20°, 20 NM", "20°, 40 NM"],
      correct: 1,
    },
    {
      id: 2,
      question: "Distance on MLS is measured by:",
      options: [
        "measuring the time taken for the primary radar pulse to travel from the MLS transmitter to the aircraft receiver",
        "measuring the time taken for the secondary radar pulse to travel from the MLS transmitter to the aircraft receiver",
        "phase comparison between the azimuth and elevation beams",
        "co-located DME",
      ],
      correct: 3,
    },
    {
      id: 3,
      question: "Which of the following is an advantage of MLS?",
      options: [
        "Can be used in inhospitable terrain",
        "Uses the same aircraft equipment as ILS",
        "Has a selective access ability",
        "Is not affected by heavy precipitation",
      ],
      correct: 0,
    },
    {
      id: 4,
      question: "The frequency band of MLS is:",
      options: ["UHF", "VHF", "SHF", "VLF"],
      correct: 2,
    },
    {
      id: 5,
      question: "Primary radar operates on the principle of:",
      options: ["transponder interrogation", "pulse technique", "phase comparison", "continuous wave emission"],
      correct: 1,
    },
    {
      id: 6,
      question: "The definition of a radar display will be best with:",
      options: [
        "narrow beamwidth and narrow pulsewidth",
        "narrow beamwidth and wide pulsewidth",
        "wide beamwidth and narrow pulsewidth",
        "wide beamwidth and wide pulsewidth",
      ],
      correct: 0,
    },
    {
      id: 7,
      question: "The main advantage of a continuous wave radar over a pulsed radar is:",
      options: [
        "more complex equipment but better resolution and accuracy",
        "removes the minimum range restriction",
        "smaller more compact equipment",
        "permits measurement of Doppler in addition to improved range and bearing",
      ],
      correct: 1,
    },
    {
      id: 8,
      question: "Which of the following systems use pulse technique?\n1. secondary surveillance radar\n2. airborne weather radar\n3. distance measuring equipment\n4. primary radar",
      options: ["all the above", "2 and 4 only", "2 only", "1 and 3 only"],
      correct: 0,
    },
    {
      id: 9,
      question: "To double the range of a primary radar, the power must be increased by a factor of:",
      options: ["2", "4", "8", "16"],
      correct: 3,
    },
    {
      id: 10,
      question: "In a primary pulsed radar the ability to discriminate in azimuth is a factor of:",
      options: ["pulse width", "beamwidth", "pulse recurrence rate", "rate of rotation"],
      correct: 1,
    },
    {
      id: 11,
      question: "The maximum range of a ground radar is limited by:",
      options: ["pulse width", "peak power", "average power", "pulse recurrence rate"],
      correct: 3,
    },
    {
      id: 12,
      question: "What does pulse recurrence rate refer to?",
      options: [
        "the number of cycles per second",
        "the number of pulses per second",
        "the ratio of pulse width to pulse repetition period",
        "the delay known as flyback or dead time",
      ],
      correct: 1,
    },
    {
      id: 13,
      question: "The maximum PRF required for a range of 50 NM is:",
      options: ["300 pulses per second (pps)", "600 pps", "1620 pps", "3280 pps"],
      correct: 2,
    },
    {
      id: 14,
      question: "The best radar for measuring very short ranges is:",
      options: [
        "a continuous wave primary radar",
        "a pulsed secondary radar",
        "a pulsed primary radar",
        "a continuous wave secondary radar",
      ],
      correct: 0,
    },
    {
      id: 15,
      question: "Which is the most suitable radar for measuring short ranges?",
      options: ["Millimetric pulse", "Continuous wave primary", "Centimetric pulse", "Continuous wave secondary"],
      correct: 1,
    },
    {
      id: 16,
      question: "The main advantage of a slotted scanner is:",
      options: [
        "reduces side lobes and directs more energy into the main beam",
        "removes the need for azimuth slaving",
        "side lobe suppression",
        "can produce simultaneous map and weather information",
      ],
      correct: 0,
    },
    {
      id: 17,
      question: "The maximum unambiguous (theoretical) range for a PRF of 1200 pps is:",
      options: ["134 NM", "180 NM", "67 NM", "360 NM"],
      correct: 2,
    },
    {
      id: 18,
      question: "The PRF of a radar is 450 pps. If the speed of light is 300,000 km/s, what is the maximum range of the radar?",
      options: ["150 km", "333 km", "666 km", "1326 km"],
      correct: 1,
    },
    {
      id: 19,
      question: "The best picture on a primary radar will be obtained using:",
      options: ["low frequency, narrow beam", "short wavelength, narrow beam", "high frequency, wide beam", "long wavelength, wide beam"],
      correct: 1,
    },
    {
      id: 20,
      question: "Which of the following is a primary radar system?",
      options: ["SSR", "DME", "GPS", "AWR"],
      correct: 3,
    },
    {
      id: 21,
      question: "On what principle does primary ATC radar work?",
      options: ["Pulse technique", "Pulse comparison", "Continuous wave", "Transponder interrogation"],
      correct: 0,
    },
  ],
};

// Oxford Radio Navigation — Ch 12-13: Ground Radar & AWR (Revision Q99-116)
export const oxfordRadNavCh12to13Topic: Topic = {
  id: "oxford-radnav-ch12-13",
  title: "Ch 11 – Ground Radar & AWR",
  questions: [
    {
      id: 1,
      question: "The airborne weather radar (AWR) cannot detect:",
      options: ["snow", "moderate rain", "dry hail", "wet hail"],
      correct: 0,
    },
    {
      id: 2,
      question: "The frequency of AWR is:",
      options: ["9375 MHz", "937.5 MHz", "93.75 GHz", "9375 GHz"],
      correct: 0,
    },
    {
      id: 3,
      question: "The use of the AWR on the ground is:",
      options: [
        "not permitted",
        "permitted provided reduced power is used",
        "permitted provided special precautions are taken to safeguard personnel and equipment",
        "only permitted to assist movement in low visibility conditions",
      ],
      correct: 2,
    },
    {
      id: 4,
      question: "Which type of cloud does the AWR detect?",
      options: ["Cirrocumulus", "Altostratus", "Cumulus", "Stratus"],
      correct: 2,
    },
    {
      id: 5,
      question: "The AWR uses the cosecant squared beam in the ............... mode.",
      options: ["WEA", "CONT", "MAP", "MAN"],
      correct: 2,
    },
    {
      id: 6,
      question: "On the AWR display the most severe turbulence will be shown:",
      options: ["in flashing red", "by a black hole", "by a steep colour gradient", "alternating red and white"],
      correct: 2,
    },
    {
      id: 7,
      question: "On an AWR colour display, the sequence of colours indicating increasing water droplet size is:",
      options: ["blue, green, red", "green, yellow, red", "black, amber, red", "blue, amber, green"],
      correct: 1,
    },
    {
      id: 8,
      question: "In an AWR with a 5° beamwidth, how do you orientate the scanner to receive returns from clouds at or above your level?",
      options: ["0° tilt", "2.5° uptilt", "2.5° downtilt", "5° uptilt"],
      correct: 1,
    },
    {
      id: 9,
      question: "The ISO-ECHO circuit is incorporated in the AWR:",
      options: [
        "to allow ground mapping",
        "to alert pilots to the presence of cloud",
        "to display areas of turbulence in cloud",
        "to allow simultaneous mapping and cloud detection",
      ],
      correct: 2,
    },
    {
      id: 10,
      question: "The main factors which affect whether an AWR will detect a cloud are:",
      options: [
        "the size of the water droplets and the diameter of the antenna reflector",
        "the scanner rotation rate and the frequency/wavelength",
        "the size of the water droplets and the wavelength/frequency",
        "the size of the water droplets and the range of the cloud",
      ],
      correct: 3,
    },
    {
      id: 11,
      question: "In an AWR with a colour CRT, areas of greatest turbulence are indicated by:",
      options: [
        "iso-echo areas coloured black",
        "large areas of flashing red",
        "iso-echo areas with no colour",
        "most rapid change of colour",
      ],
      correct: 3,
    },
    {
      id: 12,
      question: "As a storm intensifies, the colour sequence on the AWR display will change:",
      options: ["black, yellow, amber", "green, yellow, red", "blue, green, orange", "green, yellow, amber"],
      correct: 1,
    },
    {
      id: 13,
      question: "The cosecant squared beam is used for mapping in the AWR because:",
      options: [
        "a greater range can be achieved",
        "a wider beam is produced in azimuth to give a greater coverage",
        "a larger area of ground is illuminated by the beam",
        "it allows cloud detection to be effected whilst mapping",
      ],
      correct: 2,
    },
    {
      id: 14,
      question: "The AWR can be used on the ground provided:\n1. the aircraft is clear of personnel, buildings and vehicles\n2. conical beam is selected\n3. maximum uptilt is selected\n4. the AWR must never be operated on the ground",
      options: ["4", "1 and 3", "1, 2 and 3", "2 and 3"],
      correct: 2,
    },
    {
      id: 15,
      question: "Doppler navigation systems use ............... to determine the aircraft ground speed and drift.",
      options: [
        "DVOR",
        "phase comparison of signals from ground stations",
        "frequency shift in signals reflected from the ground",
        "DME range measurement",
      ],
      correct: 2,
    },
    {
      id: 16,
      question: "Which axes is the AWR stabilized in?",
      options: ["Pitch, roll and yaw", "Roll and yaw", "Pitch and roll", "Pitch only"],
      correct: 2,
    },
    {
      id: 17,
      question: "With normal SSR mode C altitude coding the aircraft replies by sending back a train of up to 12 pulses contained between 2 framing pulses with:",
      options: ["4096 codes in 4 blocks", "2048 codes in 3 blocks", "4096 codes in 3 blocks", "2048 codes in 4 blocks"],
      correct: 0,
    },
    {
      id: 18,
      question: "Why is the effect of returns from storms not a problem with SSR?",
      options: [
        "The frequency is too high",
        "SSR does not use the echo principle",
        "The PRF is jittered",
        "By the use of MTI to remove stationary and slow moving returns",
      ],
      correct: 1,
    },
  ],
};
