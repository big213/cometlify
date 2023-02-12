import { User, Collection } from "../../services";
import { GiraffeqlObjectType, ObjectTypeDefinition } from "giraffeql";
import {
  generateIdField,
  generateTimestampFields,
  generateCreatedByField,
  generateStringField,
  generateTextField,
  generateTypenameField,
  processTypeDef,
  generateDecimalField,
  generateIntegerField,
  generateBooleanField,
} from "../../core/helpers/typeDef";
import { Scalars } from "../..";

export default new GiraffeqlObjectType(
  <ObjectTypeDefinition>processTypeDef({
    name: Collection.typename,
    description: "Collection type",
    fields: {
      ...generateIdField(Collection),
      ...generateTypenameField(Collection),
      name: generateStringField({ allowNull: false }),
      avatar: generateStringField({ allowNull: true }),
      description: generateTextField({
        allowNull: true,
      }),
      symbol: generateStringField({
        allowNull: false,
        type: Scalars.collectionSymbol,
      }),
      isNumbered: generateBooleanField({
        allowNull: false,
        defaultValue: true,
      }),
      price: generateDecimalField({ allowNull: true }),
      maxSupply: generateIntegerField({
        allowNull: true,
      }),
      collectionId: generateStringField({
        allowNull: true,
      }),
      isDeployed: generateBooleanField({
        allowNull: false,
        defaultValue: false,
      }),
      ...generateTimestampFields(),
      ...generateCreatedByField(User),
    },
  })
);
