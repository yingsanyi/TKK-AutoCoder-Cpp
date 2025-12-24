export interface SolutionData {
  id: string;
  title: string;
  content: string;
  answers?: {
    label: string;
    content: string;
  }[];
}
