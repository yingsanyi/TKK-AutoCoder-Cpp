import { Section } from '../../types/index';
import { stlIntroSection } from './stl_parts/part_1_intro';
import { stlFundamentalsSection } from './stl_parts/part_2_fundamentals';
import { stlArraySections } from './stl_parts/part_3_array';
import { stlListSections } from './stl_parts/part_4_list';
import { stlAlgorithmNonModifyingSection } from './stl_parts/part_5_algorithm_non_modifying';
import { stlAlgorithmModifyingSection } from './stl_parts/part_6_algorithm_modifying';
import { stlAlgorithmSortingSection } from './stl_parts/part_7_algorithm_sorting';
import { stlBasicExercises } from './stl_exercises';

export const stlSections: Section[] = [
    stlIntroSection,
    stlFundamentalsSection,
    ...stlArraySections,
    ...stlListSections,
    stlAlgorithmNonModifyingSection,
    stlAlgorithmModifyingSection,
    stlAlgorithmSortingSection,
    ...stlBasicExercises
];
