// @flow
import { IResourceList } from "../types/backendapi.js";
import k8 from "../apis/k8";

export class ResourceFactory {
  static async getResources(kind: Object, namespaceName?: string) {
    const response = await k8.get(
      EndpointManager.getListURL(kind, namespaceName)
    );
    return new ResourceList(response);
  }
  static async getResource(
    kind: Object,
    namespaceName?: string,
    resourceName?: string
  ) {
    const response = await k8.get(
      EndpointManager.getListURL(kind, namespaceName, resourceName)
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

    if (namespaceName != null) {
      url = url.split("{namespace}").join(namespaceName);
    } else {
      url = url.split("/namespaces/{namespace}").join("");
    }
    if (resourceName != null) {
      url = url.split("{name}").join(resourceName);
    } else {
      url = url.split("{name}").join("");
    }

    return url;
  }
}

export default class ResourceList {
  resourceList: IResourceList;
  totalItems: Number;

  constructor(response: Object) {
    this.resourceList = {
      typeMeta: { kind: response.data.kind },
      listMeta: response.data.metadata,
      items: response.data.items,
      error: {
        message: response.statusText,
        status: response.statusText,
        code: response.status,
      },
    };
    this.totalItems = response.data.items.length;
  }
}
