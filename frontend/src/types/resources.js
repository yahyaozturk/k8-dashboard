const ResourceType = Object.freeze({
  Namespace: {
    kind: "namespaces",
    apiURL: "/api/v1/namespaces/{name}",
  },
  Node: {
    kind: "nodes",
    apiURL: "/api/v1/nodes/{name}",
  },
  Pv: {
    kind: "persistentvolumes",
    apiURL: "/api/v1/persistentvolumes/{name}",
  },
  Deployment: {
    kind: "deployments",
    apiURL: "/apis/apps/v1/namespaces/{namespace}/deployments/{name}",
  },
  Pod: { kind: "pods", apiURL: "/api/v1/namespaces/{namespace}/pods/{name}" },
  Services: {
    kind: "services",
    apiURL: "/api/v1/namespaces/{namespace}/services/{name}",
  },
  Ingres: {
    kind: "ingress",
    apiURL:
      "/apis/networking.k8s.io/v1beta1/namespaces/{namespace}/ingresses/{name}",
  },
  DeamonSet: {
    kind: "deamonsets",
    apiURL: "/apis/apps/v1/namespaces/{namespace}/daemonsets/{name}",
  },
  StatefulSet: {
    kind: "statefulset",
    apiURL: "/apis/apps/v1/namespaces/{namespace}/statefulsets/{name}",
  },
  ConfigMap: {
    kind: "configmaps",
    apiURL: "/api/v1/namespaces/{namespace}/configmaps/{name}",
  },
  Secret: {
    kind: "secrets",
    apiURL: "/api/v1/namespaces/{namespace}/secrets/{name}",
  },
  Pvc: {
    kind: "persistentvolumeclaim",
    apiURL: "/api/v1/namespaces/{namespace}/persistentvolumeclaims/{name}",
  },
  Job: {
    kind: "jobs",
    apiURL: "/apis/batch/v1/namespaces/{namespace}/jobs/{name}",
  },
  CronJob: {
    kind: "cronjobs",
    apiURL: "/apis/batch/v1beta1/namespaces/{namespace}/cronjobs/{name}",
  },
  Event: {
    kind: "events",
    apiURL: "/api/v1/namespaces/{namespace}/events/{name}",
  },
});

export default ResourceType;
