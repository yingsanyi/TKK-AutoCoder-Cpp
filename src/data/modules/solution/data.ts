import { SolutionData } from './types';
import { solutions_part1 } from './parts/part_1';
import { solutions_part2 } from './parts/part_2';
import { solutions_part3 } from './parts/part_3';
import { solutions_part4 } from './parts/part_4';
import { solutions_part5 } from './parts/part_5';
import { solutions_part6 } from './parts/part_6';
import { solutions_part7 } from './parts/part_7';
import { solutions_part8 } from './parts/part_8';
import { solutions_part9 } from './parts/part_9';
import { solutions_part10 } from './parts/part_10';
import { solutions_part11 } from './parts/part_11';

export type { SolutionData };

export const solutions: Record<string, SolutionData> = {
  ...solutions_part1,
  ...solutions_part2,
  ...solutions_part3,
  ...solutions_part4,
  ...solutions_part5,
  ...solutions_part6,
  ...solutions_part7,
  ...solutions_part8,
  ...solutions_part9,
  ...solutions_part10,
  ...solutions_part11,
};
