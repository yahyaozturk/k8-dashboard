// @flow
import _ from "lodash";
import { IResourceList } from "../types/backendapi.js";
import k8 from "../apis/k8";
import { ResourceType, MetaV1 } from "../types/resources";

export type ListOptions = {
  LabelSelector: string,
  FieldSelector: string,
};

export class ResourceFactory {
  kind: Object;
  namespaceName: string;

  constructor(kind: Object, namespaceName: string) {
    this.kind = kind;
    this.namespaceName = namespaceName;
  }

  async List(listOptions: ListOptions) {
    const response = await k8.get(
      EndpointManager.getListURL(this.kind, this.namespaceName)
    );
    return new ResourceList(response);
  }

  async Get(resourceName: string) {
    const response = await k8.get(
      EndpointManager.getListURL(this.kind, this.namespaceName, resourceName)
    );
    return new ResourceList(response);
  }
}

class EndpointManager {
  static getListURL(
    kind: Object,
    namespaceName?: string,
    resourceName?: string
  ) {
    var url = kind.apiURL;

    if (namespaceName != MetaV1.namespaceAll) {
      url = url.split("{namespace}").join(namespaceName);
    } else {
      url = url.split("/namespaces/{namespace}").join("");
    }
    if (resourceName != null) {
      url = url.split("{name}").join(resourceName);
    } else {
      url = url.split("/{name}").join("");
    }

    return url;
  }
}

export default class ResourceList {
  resourceList: IResourceList;
  totalItems: number;

  constructor(response: Object) {
    this.resourceList = {
      typeMeta: {
        kind: _.hasIn(response, "data.kind") ? response.data.kind : null,
      },
      listMeta: _.hasIn(response, "data.metadata")
        ? response.data.metadata
        : response.metadata,

      items: _.hasIn(response, "data.items")
        ? response.data.items
        : [response.data],
      error: {
        message: response.statusText,
        status: response.statusText,
        code: response.status,
      },
    };
    this.totalItems = _.hasIn(response, "data.items")
      ? response.data.items.length
      : 0;
  }
}
