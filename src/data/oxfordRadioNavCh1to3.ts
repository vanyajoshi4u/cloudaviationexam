import { type Topic } from "./icJoshiQuestions";

// Oxford Radio Navigation — Ch 1: Properties of Radio Waves
export const oxfordRadNavCh1Topic: Topic = {
  id: "oxford-radnav-ch1",
  title: "Ch 1 – Properties of Radio Waves",
  questions: [
    {
      id: 1,
      question: "A radio wave is:",
      options: [
        "An energy wave comprising an electrical field in the same plane as a magnetic field",
        "An electrical field alternating with a magnetic field",
        "An energy wave where there is an electrical field perpendicular to a magnetic field",
        "An energy field with an electrical component",
      ],
      correct: 2,
    },
    {
      id: 2,
      question: "The speed of radio waves is:",
      options: [
        "300 km per second",
        "300 million metres per second",
        "162 NM per second",
        "162 million NM per second",
      ],
      correct: 1,
    },
    {
      id: 3,
      question: "The plane of polarization of an electromagnetic wave is:",
      options: [
        "The plane of the magnetic field",
        "The plane of the electrical field",
        "The plane of the electrical or magnetic field dependent on the plane of the aerial",
        "None of the above",
      ],
      correct: 1,
    },
    {
      id: 4,
      question: "If the wavelength of a radio wave is 3.75 metres, the frequency is:",
      options: ["80 kHz", "8 MHz", "80 MHz", "800 kHz"],
      correct: 2,
    },
    {
      id: 5,
      question: "The wavelength corresponding to a frequency of 125 MHz is:",
      options: ["2.4 m", "24 m", "24 cm", "24 mm"],
      correct: 0,
    },
    {
      id: 6,
      question: "The frequency which corresponds to a wavelength of 6.98 cm is:",
      options: ["4298 GHz", "4.298 GHz", "429.8 GHz", "42.98 GHz"],
      correct: 1,
    },
    {
      id: 7,
      question: "The frequency band containing the frequency corresponding to 29.1 cm is:",
      options: ["HF", "VHF", "SHF", "UHF"],
      correct: 3,
    },
    {
      id: 8,
      question: "To carry out a phase comparison between two electromagnetic waves:",
      options: [
        "Both waves must have the same amplitude",
        "Both waves must have the same frequency",
        "Both waves must have the same amplitude and frequency",
        "Both waves must have the same phase",
      ],
      correct: 1,
    },
    {
      id: 9,
      question: "The phase of the reference wave is 110° as the phase of the variable wave is 315°. What is the phase difference?",
      options: ["205°", "025°", "155°", "335°"],
      correct: 2,
    },
    {
      id: 10,
      question: "Determine the approximate phase difference between the reference wave and the variable wave (the reference wave is the solid line and the variable wave is the dashed line):",
      options: ["045°", "135°", "225°", "315°"],
      correct: 2,
    },
    {
      id: 11,
      question: "The wavelength corresponding to a frequency of 15625 MHz is:",
      options: ["1.92 m", "19.2 m", "1.92 cm", "19.2 cm"],
      correct: 2,
    },
    {
      id: 12,
      question: "Which frequency band is a wavelength of 1200 m?",
      options: ["UHF", "LF", "HF", "MF"],
      correct: 1,
    },
  ],
};

// Oxford Radio Navigation — Ch 2: Radio Propagation Theory
export const oxfordRadNavCh2Topic: Topic = {
  id: "oxford-radnav-ch2",
  title: "Ch 2 – Radio Propagation Theory",
  questions: [
    {
      id: 1,
      question: "The process which causes the reduction in signal strength as range from a transmitter increases is known as:",
      options: ["Absorption", "Diffraction", "Attenuation", "Ionisation"],
      correct: 2,
    },
    {
      id: 2,
      question: "Which of the following will give the greatest surface wave range?",
      options: ["243 MHz", "500 kHz", "2182 kHz", "15 MHz"],
      correct: 1,
    },
    {
      id: 3,
      question: "It is intended to increase the range of a VHF transmitter from 50 NM to 100 NM. This will be achieved by increasing the power output by a factor of:",
      options: ["2", "8", "16", "4"],
      correct: 3,
    },
    {
      id: 4,
      question: "The maximum range an aircraft at 2500 ft can communicate with a VHF station at 196 ft is:",
      options: ["79 NM", "64 NM", "52 NM", "51 NM"],
      correct: 0,
    },
    {
      id: 5,
      question: "What is the minimum height for an aircraft at a range of 200 NM to be detected by a radar at 1700 ft AMSL?",
      options: ["25 500 ft", "15 000 ft", "40 000 ft", "57 500 ft"],
      correct: 1,
    },
    {
      id: 6,
      question: "Determine which of the following statements concerning atmospheric ionization are correct:\n1. The highest levels of ionization will be experienced in low latitudes\n2. Ionization levels increase linearly with increasing altitude\n3. The lowest levels of ionization occur about midnight\n4. The E-layer is higher by night than by day because the ionization levels are lower at night",
      options: [
        "Statements 1, 2 and 3 are correct",
        "Statements 1, 3 and 4 are correct",
        "Statements 2 and 4 are correct",
        "Statements 1 and 4 are correct",
      ],
      correct: 3,
    },
    {
      id: 7,
      question: "The average height of the E-layer is …… and the maximum range for sky wave will be ……",
      options: [
        "60 km, 1350 NM",
        "125 km, 2200 km",
        "225 km, 2200 km",
        "125 km, 1350 NM",
      ],
      correct: 3,
    },
    {
      id: 8,
      question: "Concerning HF communications, which of the following is correct?",
      options: [
        "The frequency required in low latitudes is less than the frequency required in high latitudes",
        "At night a higher frequency is required than by day",
        "The frequency required is dependent on time of day but not the season",
        "The frequency required for short ranges will be less than the frequency required for long ranges",
      ],
      correct: 3,
    },
  ],
};

// Oxford Radio Navigation — Ch 3: Modulation
export const oxfordRadNavCh3Topic: Topic = {
  id: "oxford-radnav-ch3",
  title: "Ch 3 – Modulation",
  questions: [
    {
      id: 1,
      question: "The bandwidth produced when a radio frequency (RF) of 4716 kHz is amplitude modulated with an audio frequency (AF) of 6 kHz is:",
      options: ["6 kHz", "3 kHz", "12 kHz", "9 kHz"],
      correct: 2,
    },
    {
      id: 2,
      question: "Which of the following statements concerning AM is correct?",
      options: [
        "The amplitude of the RF is modified by the frequency of the AF",
        "The amplitude of the RF is modified by the amplitude of the AF",
        "The frequency of the RF is modified by the frequency of the AF",
        "The frequency of the RF is modified by the amplitude of the AF",
      ],
      correct: 1,
    },
    {
      id: 3,
      question: "Which of the following is an advantage of single sideband (SSB) emissions?",
      options: [
        "More frequencies available",
        "Reduced power requirement",
        "Better signal/noise ratio",
        "All of the above",
      ],
      correct: 3,
    },
    {
      id: 4,
      question: "Which of the following statements concerning FM is correct?",
      options: [
        "The amplitude of the RF is modified by the frequency of the AF",
        "The amplitude of the RF is modified by the amplitude of the AF",
        "The frequency of the RF is modified by the frequency of the AF",
        "The frequency of the RF is modified by the amplitude of the AF",
      ],
      correct: 3,
    },
  ],
};
