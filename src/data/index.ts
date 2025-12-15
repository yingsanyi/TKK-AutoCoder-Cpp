import { Section } from '../types';
import { introSections } from './modules/intro';
import { basicsSections } from './modules/basics';
import { selectionLoopsSections } from './modules/selection_loops';
import { arraysSections } from './modules/arrays';
import { stringsSections } from './modules/strings';
import { pointersSections } from './modules/pointers';
import { stlSections } from './modules/stl';
import { examinationSections } from './modules/examination';
import { examinationTwoSections } from './modules/examination_2';
import { examinationThreeSections } from './modules/examination_3';
import { examinationFourSections } from './modules/examination_4';
import { examinationFiveSections } from './modules/examination_5';
import { onlineHighPassSections } from './modules/online_high_pass';

export const sections: Section[] = [
  ...introSections,
  ...basicsSections,
  ...selectionLoopsSections,
  ...arraysSections,
  ...stringsSections,
  ...pointersSections,
  ...stlSections,
  ...examinationSections,
  ...examinationTwoSections,
  ...examinationThreeSections,
  ...examinationFourSections,
  ...examinationFiveSections,
  ...onlineHighPassSections
];
