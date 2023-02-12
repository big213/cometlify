import { Collection } from "../../services";
import { generateBaseRootResolvers } from "../../core/helpers/rootResolver";
import { GiraffeqlInputFieldType, GiraffeqlRootResolverType } from "giraffeql";

export default {
  ...generateBaseRootResolvers({
    service: Collection,
    methods: ["get", "getMultiple", "delete", "create", "update"],
    restMethods: ["get", "getMultiple"],
  }),

  deployCollection: new GiraffeqlRootResolverType({
    name: "deployCollection",
    restOptions: {
      method: "post",
      route: "/deployCollection",
    },
    type: Collection.typeDefLookup,
    allowNull: false,
    args: new GiraffeqlInputFieldType({
      required: true,
      type: Collection.inputTypeDefLookup,
    }),
    resolver: (inputs) => Collection.deployCollection(inputs),
  }),
};
