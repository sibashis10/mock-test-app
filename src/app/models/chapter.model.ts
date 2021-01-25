import { Subject } from "./subject.model";
import { Deserializable } from "./deserializable.model";

export class Chapter implements Deserializable {
  id: number;
  name: string;
  subject: Subject;

  deserialize(input: any): this {
    Object.assign(this, input);
    this.subject = new Subject().deserialize(input.subject);
    return this;
  }
}
