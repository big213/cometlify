import { GiraffeqlScalarType } from "giraffeql";

function validate(value: unknown) {
  if (typeof value !== "string") throw true;

  if (!value.match(/^[A-Z]{2,5}$/)) throw true;

  return value;
}

export const collectionSymbol = new GiraffeqlScalarType({
  name: "collectionSymbol",
  types: ["string"],
  description: "Collection Symbol Field",
  parseValue: validate,
  serialize: validate,
});
