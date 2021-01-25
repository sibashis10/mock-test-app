import { Deserializable } from "./deserializable.model";

export class Clazz implements Deserializable {
  id: number;
  classCode: string;
  className: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
