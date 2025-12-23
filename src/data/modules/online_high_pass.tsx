import React from 'react';
import { Section } from '../../types';
import { OnlineHighPassList } from '../../components/Lesson/OnlineHighPassList';
import { onlineHighPassProblems } from './online_high_pass_data';

export const onlineHighPassSections: Section[] = [
  {
    id: 'online-high-pass-list',
    category: '历年线上赛',
    title: '历年线上赛高通过率题目',
    type: 'lesson',
    content: (
      <OnlineHighPassList problems={onlineHighPassProblems} />
    )
  }
];
