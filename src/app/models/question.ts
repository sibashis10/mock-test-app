import { NumberSymbol } from '@angular/common';
export class Question {
  id: number;
  chapterId: number;
  questionImagePath: string;
  rightAnswer: string;
  multipleChoice: boolean;
  marks: number;
  negativeMark: number;
  noOfOption: number;
}
