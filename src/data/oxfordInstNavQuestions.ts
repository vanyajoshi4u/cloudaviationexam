import { type Topic } from "./icJoshiQuestions";
import { oxfordInstCh2Questions, oxfordInstCh3Questions } from "./oxfordInstNavCh2to3";
import { oxfordInstCh10Questions, oxfordInstCh11Questions, oxfordInstCh12Questions } from "./oxfordInstNavCh10to12";
import { oxfordInstCh22Questions } from "./oxfordInstNavCh22";
import { oxfordInstCh32P1Questions, oxfordInstCh32P2Questions } from "./oxfordInstNavCh32";
import { oxfordInstCh40Questions } from "./oxfordInstNavCh40";

export const oxfordInstCh2Topic: Topic = {
  id: "oxford-inst-ch2",
  title: "Ch 2 – Pressure Heads",
  questions: oxfordInstCh2Questions,
};

export const oxfordInstCh3Topic: Topic = {
  id: "oxford-inst-ch3",
  title: "Ch 3 – Air Temperature Measurement",
  questions: oxfordInstCh3Questions,
};

export const oxfordInstCh10Topic: Topic = {
  id: "oxford-inst-ch10",
  title: "Ch 10 – Gyroscopes",
  questions: oxfordInstCh10Questions,
};

export const oxfordInstCh11Topic: Topic = {
  id: "oxford-inst-ch11",
  title: "Ch 11 – Directional Gyro Indicator (DGI)",
  questions: oxfordInstCh11Questions,
};

export const oxfordInstCh12Topic: Topic = {
  id: "oxford-inst-ch12",
  title: "Ch 12 – Artificial Horizon",
  questions: oxfordInstCh12Questions,
};

export const oxfordInstCh22Topic: Topic = {
  id: "oxford-inst-ch22",
  title: "Ch 22 – EFIS",
  questions: oxfordInstCh22Questions,
};

export const oxfordInstCh32P1Topic: Topic = {
  id: "oxford-inst-ch32-p1",
  title: "Ch 32 – AFCS Revision Paper 1",
  questions: oxfordInstCh32P1Questions,
};

export const oxfordInstCh32P2Topic: Topic = {
  id: "oxford-inst-ch32-p2",
  title: "Ch 32 – AFCS Revision Paper 2",
  questions: oxfordInstCh32P2Questions,
};

export const oxfordInstCh40Topic: Topic = {
  id: "oxford-inst-ch40",
  title: "Ch 40 – EICAS & ECAM",
  questions: oxfordInstCh40Questions,
};

export const oxfordInstNavTopics: Topic[] = [
  oxfordInstCh2Topic,
  oxfordInstCh3Topic,
  oxfordInstCh10Topic,
  oxfordInstCh11Topic,
  oxfordInstCh12Topic,
  oxfordInstCh22Topic,
  oxfordInstCh32P1Topic,
  oxfordInstCh32P2Topic,
  oxfordInstCh40Topic,
];
