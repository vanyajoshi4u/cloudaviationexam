import { Topic } from "./icJoshiQuestions";
import { redbirdInstPressureQuestions } from "./redbirdInstPressure";
import { redbirdInstGyroQuestions } from "./redbirdInstGyro";
import { redbirdInstMagneticQuestions } from "./redbirdInstMagnetic";

export const redbirdInstPressureTopic: Topic = {
  id: "redbird-inst-pressure",
  title: "Pressure Instruments",
  questions: redbirdInstPressureQuestions,
};

export const redbirdInstGyroTopic: Topic = {
  id: "redbird-inst-gyro",
  title: "Gyro Instruments",
  questions: redbirdInstGyroQuestions,
};

export const redbirdInstMagneticTopic: Topic = {
  id: "redbird-inst-magnetic",
  title: "Magnetic Instruments",
  questions: redbirdInstMagneticQuestions,
};

export const redbirdInstTopics: Topic[] = [
  redbirdInstPressureTopic,
  redbirdInstGyroTopic,
  redbirdInstMagneticTopic,
];
