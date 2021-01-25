import { Clazz } from "./clazz.model";
import { Deserializable } from "./deserializable.model";

export class Subject implements Deserializable {
  id: number;
  subjectCode: string;
  subjectName: string;
  clazz: Clazz;

  deserialize(input: any): this {
    Object.assign(this, input);
    this.clazz = new Clazz().deserialize(input.clazz);
    return this;
  }
}
