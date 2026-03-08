import { type Topic } from "./icJoshiQuestions";

// Oxford Radio Navigation — Ch 4: Antennae
export const oxfordRadNavCh4Topic: Topic = {
  id: "oxford-radnav-ch4",
  title: "Ch 4 – Antennae",
  questions: [
    {
      id: 1,
      question: "The ideal length for a Marconi aerial for a frequency of 406 MHz is:",
      options: ["36.9 cm", "35.1 cm", "17.5 cm", "18.5 cm"],
      correct: 2,
    },
    {
      id: 2,
      question: "A disadvantage of directivity is:",
      options: ["Reduced range", "Side lobes", "Phase distortion", "Ambiguity"],
      correct: 1,
    },
    {
      id: 3,
      question: "Which of the following is not an advantage of a slotted antenna (phased array)?",
      options: [
        "Reduced side lobes",
        "Improved resolution",
        "Reduced power",
        "Directivity",
      ],
      correct: 3,
    },
    {
      id: 4,
      question: "The ideal length of a half-wave dipole for a frequency of 75 MHz is:",
      options: ["1.9 m", "95 cm", "3.8 m", "47.5 cm"],
      correct: 0,
    },
  ],
};

// Oxford Radio Navigation — Ch 5: Doppler Radar Systems
export const oxfordRadNavCh5Topic: Topic = {
  id: "oxford-radnav-ch5",
  title: "Ch 5 – Doppler Radar Systems",
  questions: [
    {
      id: 1,
      question: "Doppler operates on the principle that ...... between a transmitter and receiver will cause the received frequency to ...... if the transmitter and receiver are moving ......",
      options: [
        "Apparent motion, decrease, together",
        "Relative motion, decrease, apart",
        "The distance, increase, at the same speed",
        "Relative motion, increase, apart",
      ],
      correct: 1,
    },
    {
      id: 2,
      question: "Due to 'Doppler' effect an apparent decrease in the transmitted frequency, which is proportional to the transmitter's velocity, will occur when:",
      options: [
        "The transmitter and receiver move towards each other",
        "The transmitter moves away from the receiver",
        "The transmitter moves towards the receiver",
        "Both transmitter and receiver move away from each other",
      ],
      correct: 1,
    },
    {
      id: 3,
      question: "The change in frequency measured in an aircraft from a radio transmission reflected from the ground is used to determine:",
      options: [
        "The drift and ground speed of the aircraft",
        "The aircraft's track and speed",
        "The across track wind component and heading",
        "Track error and ground speed",
      ],
      correct: 0,
    },
  ],
};
