import { type Topic } from "./icJoshiQuestions";
import { oxfordRadNavCh8Questions1to17 } from "./oxfordRadioNavCh8Part1";
import { oxfordRadNavCh8Questions18to33 } from "./oxfordRadioNavCh8Part2";

export const oxfordRadNavCh8Topic: Topic = {
  id: "oxford-radnav-ch8",
  title: "Ch 8 – VOR",
  questions: [...oxfordRadNavCh8Questions1to17, ...oxfordRadNavCh8Questions18to33],
};
