import { Section } from '../types';
import { arraysSections } from './modules/arrays';
import { stringsSections } from './modules/strings';
import { pointersSections } from './modules/pointers';
import { stlSections } from './modules/stl';
import { examinationSections } from './modules/examination';
import { examinationTwoSections } from './modules/examination_2';
import { examinationThreeSections } from './modules/examination_3';
import { examinationFourSections } from './modules/examination_4';
import { examinationFiveSections } from './modules/examination_5';

export const sections: Section[] = [
  ...arraysSections,
  ...stringsSections,
  ...pointersSections,
  ...stlSections,
  ...examinationSections,
  ...examinationTwoSections,
  ...examinationThreeSections,
  ...examinationFourSections,
  ...examinationFiveSections
];
