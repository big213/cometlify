import axios from "axios";
import FormData = require("form-data");
import { lookupSymbol } from "giraffeql";
import {
  AccessControlMap,
  ExternalQuery,
  ServiceFunctionInputs,
} from "../../../types";
import { permissionsCheck } from "../../core/helpers/permissions";
import { PaginatedService } from "../../core/services";
import { sendCometRequest } from "../../helpers/comet";
import { isUserLoggedIn } from "../../helpers/permissions";
import { User } from "../../services";

export class CollectionService extends PaginatedService {
  defaultTypename = "collection";

  defaultQuery: ExternalQuery = {
    id: lookupSymbol,
    name: lookupSymbol,
    avatar: lookupSymbol,
    description: lookupSymbol,
  };

  filterFieldsMap = {
    id: {},
    "createdBy.id": {},
  };

  sortFieldsMap = {
    id: {},
    createdAt: {},
    updatedAt: {},
  };

  searchFieldsMap = {
    name: {},
  };

  accessControl: AccessControlMap = {
    // temporary access control for demo purposes only
    get: () => true,
    getMultiple: () => true,
    create: ({ req }) => isUserLoggedIn(req),
    update: ({ req }) => isUserLoggedIn(req),
    delete: ({ req }) => isUserLoggedIn(req),
  };

  @permissionsCheck("deploy")
  async deployCollection({
    req,
    fieldPath,
    args,
    query,
    isAdmin = false,
  }: ServiceFunctionInputs) {
    // login is required

    // get the cometApiKey
    const record = await User.getFirstSqlRecord({
      select: ["cometApiKey"],
      where: {
        id: req.user!.id,
      },
    });

    // if no cometApiKey, throw err
    if (!record.cometApiKey) {
      throw new Error(`Missing cometApiKey on current user, please set it`);
    }

    // get the collection data
    const collection = await this.getFirstSqlRecord({
      select: [
        "id",
        "name",
        "avatar",
        "description",
        "symbol",
        "isNumbered",
        "price",
        "maxSupply",
        "collectionId",
        "isDeployed",
      ],
      where: args,
    });

    // if already deployed, throw err
    if (collection.isDeployed) {
      throw new Error(`Collection is already deployed`);
    }

    if (!collection.description) {
      throw new Error(`Description is required to deploy`);
    }

    // fetch the file data (required)
    if (!collection.avatar) {
      throw new Error(`Image is required to deploy`);
    }

    const { data } = await axios.get(collection.avatar, {
      responseType: "stream",
    });

    const filename = collection.avatar.split("/").pop();

    const formData = new FormData();
    formData.append("backgroundUpload", data, filename);
    formData.append("name", collection.name);
    formData.append("symbol", collection.symbol);
    formData.append("description", collection.description);
    formData.append(
      "subtype",
      collection.isNumbered ? "numbered_pass" : "static_pass"
    );
    formData.append("pricingModel", collection.price ? "pay_once" : "free");
    if (collection.price) formData.append("price", collection.price);
    formData.append("infiniteSupply", collection.maxSupply ? "false" : "true");
    if (collection.maxSupply)
      formData.append("maxSupply", `${collection.maxSupply}`);

    const cometResponse = await sendCometRequest({
      method: "post",
      path: "/collection",
      /*
      params: {
        backgroundUpload: data,
        name: collection.name,
        symbol: collection.symbol,
        description: collection.description,
        subtype: collection.isNumbered ? "numbered_pass" : "static_pass",
        pricingModel: collection.price ? "pay_once" : "free",
        price: collection.price ?? undefined,
        infiniteSupply: collection.maxSupply ? false : true,
        maxSupply: collection.maxSupply ? collection.maxSupply : undefined,
      },
      */
      formData: formData,
      apiKey: record.cometApiKey,
    });

    // on success, update collection ID and isDeployed status
    await this.updateSqlRecord({
      fields: {
        collectionId: cometResponse.id,
        isDeployed: true,
      },
      where: {
        id: collection.id,
      },
    });

    return this.isEmptyQuery(query)
      ? {}
      : await this.getRecord({
          req,
          args: { id: collection.id },
          query,
          fieldPath,
          isAdmin,
          data,
        });
  }
}
