// @flow

export interface IStringMap {
  [key: string]: string;
}

export interface IErrStatus {
  message: string;
  code: number;
  status: string;
  reason?: string;
}

export interface ITypeMeta {
  kind: string;
}

export interface IListMeta {
  continue?: string;
  remainingItemCount?: Number;
  resourceVersion: string;
  selfLink: string;
}

export interface IObjectMeta {
  name: string;
  namespace?: string;
  labels?: IStringMap;
  annotations?: IStringMap;
  creationTimestamp: string;
  uid: string;
}

export interface IResource {
  objectMeta: IObjectMeta;
  typeMeta: ITypeMeta;
}

export interface IResourceList {
  listMeta: IListMeta;
  typeMeta: ITypeMeta;
  items?: IResource[];
  error?: IErrStatus;
}

export interface INamespace extends IResource {
  phase: string;
}

/*
export type ResourceOwner extends Resource {
  pods: PodInfo;
  containerImages: string[];
  initContainerImages: string[];
}

export type LabelSelector {
  matchLabels: StringMap;
}

export type CapacityItem {
  resourceName: string;
  quantity: string;
}

// List types
export class ClusterRoleList implements ResourceList {
  items: ClusterRole[];
}

export type ConfigMapList extends ResourceList {
  items: ConfigMap[];
}

export type CronJobList extends ResourceList {
  cumulativeMetrics: Metric[] | null;
  items: CronJob[];
  status: Status;
}

export type CRDList extends ResourceList {
  items: CRD[];
}

export type CRDObjectList extends ResourceList {
  typeMeta: TypeMeta;
  items: CRDObject[];
}

export type DaemonSetList extends ResourceList {
  cumulativeMetrics: Metric[] | null;
  daemonSets: DaemonSet[];
  status: Status;
}

export type DeploymentList extends ResourceList {
  cumulativeMetrics: Metric[] | null;
  deployments: Deployment[];
  status: Status;
}

export type EndpointList extends ResourceList {
  endpoints: Endpoint[];
}

export type EventList extends ResourceList {
  events: Event[];
}

export type HorizontalPodAutoscalerList extends ResourceList {
  horizontalpodautoscalers: HorizontalPodAutoscaler[];
}

export type IngressList extends ResourceList {
  items: Ingress[];
}

export type JobList extends ResourceList {
  cumulativeMetrics: Metric[] | null;
  jobs: Job[];
  status: Status;
}

export type NamespaceList extends ResourceList {
  namespaces: Namespace[];
}

export type NodeList extends ResourceList {
  cumulativeMetrics: Metric[] | null;
  nodes: Node[];
}

export type PersistentVolumeClaimList extends ResourceList {
  items: PersistentVolumeClaim[];
}

export type PersistentVolumeList extends ResourceList {
  items: PersistentVolume[];
}

export type PodContainerList {
  containers: string[];
}

export type PodList extends ResourceList {
  pods: Pod[];
  status: Status;
  podInfo?: PodInfo;
  cumulativeMetrics: Metric[] | null;
}

export type ReplicaSetList extends ResourceList {
  cumulativeMetrics: Metric[] | null;
  replicaSets: ReplicaSet[];
  status: Status;
}

export type ReplicationControllerList extends ResourceList {
  replicationControllers: ReplicationController[];
  status: Status;
}

export type ResourceQuotaDetailList extends ResourceList {
  items: ResourceQuotaDetail[];
}

export type SecretList extends ResourceList {
  secrets: Secret[];
}

export type ServiceList extends ResourceList {
  services: Service[];
}

export type StatefulSetList extends ResourceList {
  cumulativeMetrics: Metric[] | null;
  statefulSets: StatefulSet[];
  status: Status;
}

export type StorageClassList extends ResourceList {
  storageClasses: StorageClass[];
}

// Simple detail types
export type ClusterRole extends Resource {}

export type ConfigMap extends Resource {}

export type Controller extends Resource {
  pods: PodInfo;
  containerImages: string[];
  initContainerImages: string[];
}

export type CronJob extends Resource {
  schedule: string;
  suspend: boolean;
  active: number;
  lastSchedule: string;
}

export type CRD extends Resource {
  group: string;
  scope: string;
  nameKind: string;
  established: string;
}

export type CRDObject extends Resource {}

export type DaemonSet extends Resource {
  podInfo: PodInfo;
  containerImages: string[];
  initContainerImages: string[];
}

export type Deployment extends Resource {
  pods: PodInfo;
  containerImages: string[];
  initContainerImages: string[];
}

export type EndpointResourceList extends ResourceList {
  endpoints: EndpointResource[];
}

export type EndpointResource extends Resource {
  host: string;
  nodeName: string;
  ready: boolean;
  ports: EndpointResourcePort[];
}

export type EndpointResourcePort {
  name: string;
  port: number;
  protocol: string;
}

export type Port {
  port: number;
  name: string;
  protocol: string;
  nodePort?: number;
}

export type Endpoint {
  host: string;
  nodeName?: string;
  ports: Port[];
  ready?: boolean;
  typeMeta?: TypeMeta;
  objectMeta?: ObjectMeta;
}

export type Event extends Resource {
  message: string;
  sourceComponent: string;
  sourceHost: string;
  object: string;
  count: number;
  firstSeen: string;
  lastSeen: string;
  reason: string;
  type: string;
}

export type HorizontalPodAutoscaler extends Resource {
  scaleTargetRef: ScaleTargetRef;
  minReplicas: number;
  maxReplicas: number;
  currentCPUUtilization: number;
  targetCPUUtilization?: number;
}

export type Ingress extends Resource {
  endpoints: Endpoint[];
}

export type Job extends Resource {
  podInfo: PodInfo;
  containerImages: string[];
  initContainerImages: string[];
  parallelism: number;
}

export type Namespace extends Resource {
  phase: string;
}

export type Node extends Resource {
  ready: string;
}

export type PersistentVolume extends Resource {
  capacity: StringMap;
  storageClass: string;
  accessModes: string[];
  reclaimPolicy: string;
  status: string;
  claim: string;
  reason: string;
}

export type PersistentVolumeClaim extends Resource {
  status: string;
  volume: string;
}

export type Pod extends Resource {
  podStatus: PodStatus;
  podIP?: string;
  restartCount: number;
  qosClass?: string;
  metrics: PodMetrics;
  warnings: Event[];
  nodeName: string;
}

export type PodContainer {
  name: string;
  restartCount: number;
}

export type ReplicaSet extends Resource {
  podInfo: PodInfo;
  containerImages: string[];
  initContainerImages: string[];
}

export type ReplicationController extends Resource {
  podInfo: PodInfo;
  containerImages: string[];
  initContainerImages: string[];
}

export type Secret extends Resource {
  type: string;
}

export type Service extends Resource {
  internalEndpoint: Endpoint;
  externalEndpoints: Endpoint[];
  selector: StringMap;
  type: string;
  clusterIP: string;
}

export type StatefulSet extends Resource {
  podInfo: PodInfo;
  containerImages: string[];
  initContainerImages: string[];
}

export type StorageClass extends Resource {
  provisioner: string;
  parameters: StringMap[];
}

// Detail types

export type ReplicaSetDetail extends ResourceDetail {
  selector: LabelSelector;
  podInfo: PodInfo;
  podList: PodList;
  containerImages: string[];
  initContainerImages: string[];
  eventList: EventList;
}

export type ResourceQuotaDetail extends ResourceDetail {
  scopes: string[];
  statusList: { [key: string]: ResourceQuotaStatus };
}

export type DeploymentDetail extends ResourceDetail {
  selector: Label[];
  statusInfo: DeploymentInfo;
  conditions: Condition[];
  strategy: string;
  minReadySeconds: number;
  revisionHistoryLimit?: number;
  rollingUpdateStrategy?: RollingUpdateStrategy;
  events: EventList;
}

export type ReplicationControllerDetail extends ResourceDetail {
  labelSelector: StringMap;
  containerImages: string[];
  initContainerImages: string[];
  podInfo: PodInfo;
  podList: PodList;
  serviceList: ServiceList;
  eventList: EventList;
  hasMetrics: boolean;
}

export type ServiceDetail extends ResourceDetail {
  internalEndpoint: Endpoint;
  externalEndpoints: Endpoint[];
  endpointList: EndpointList;
  selector: StringMap;
  type: string;
  clusterIP: string;
  podList: PodList;
  sessionAffinity: string;
}

export type DaemonSetDetail extends ResourceDetail {
  labelSelector: StringMap;
  containerImages: string[];
  initContainerImages: string[];
  podInfo: PodInfo;
}

export type NamespaceDetail extends ResourceDetail {
  phase: string;
  eventList: EventList;
  resourceLimits: LimitRange[];
  resourceQuotaList: ResourceQuotaDetailList;
}

export type PolicyRule {
  verbs: string[];
  apiGroups: string[];
  resources: string[];
  resourceNames: string[];
  nonResourceURLs: string[];
}

export type ClusterRoleDetail extends ResourceDetail {
  rules: PolicyRule[];
}

export type SecretDetail extends ResourceDetail {
  type: string;
  data: StringMap;
}

export type IngressDetail extends ResourceDetail {}

export type PersistentVolumeClaimDetail extends ResourceDetail {
  status: string;
  volume: string;
  capacity: string;
  storageClass: string;
  accessModes: string[];
}

export type StorageClassDetail extends ResourceDetail {
  parameters: StringMap;
  provisioner: string;
}

export type ConfigMapDetail extends ResourceDetail {
  data: StringMap;
}

export type CRDDetail extends ResourceDetail {
  version?: string;
  group: string;
  scope: string;
  names: CRDNames;
  versions: CRDVersion[];
  objects: CRDObjectList;
  conditions: Condition[];
  subresources: string[];
}

export type CRDObjectDetail extends ResourceDetail {}

export type JobDetail extends ResourceDetail {
  podInfo: PodInfo;
  podList: PodList;
  containerImages: string[];
  initContainerImages: string[];
  eventList: EventList;
  parallelism: number;
  completions: number;
}

export type CronJobDetail extends ResourceDetail {
  schedule: string;
  suspend: boolean;
  active: number;
  lastSchedule: string;
  concurrencyPolicy: string;
  startingDeadlineSeconds: number;
}

export type StatefulSetDetail extends ResourceDetail {
  podInfo: PodInfo;
  podList: PodList;
  containerImages: string[];
  initContainerImages: string[];
  eventList: EventList;
}

export type PersistentVolumeDetail extends ResourceDetail {
  status: string;
  claim: string;
  reclaimPolicy: string;
  accessModes: string[];
  capacity: StringMap;
  message: string;
  storageClass: string;
  reason: string;
  persistentVolumeSource: PersistentVolumeSource;
}

export type PodDetail extends ResourceDetail {
  initContainers: Container[];
  containers: Container[];
  podPhase: string;
  podIP: string;
  nodeName: string;
  restartCount: number;
  qosClass: string;
  metrics: Metric[];
  conditions: Condition[];
  controller: Resource;
  eventList: EventList;
  persistentVolumeClaimList: PersistentVolumeClaimList;
}

export type NodeDetail extends ResourceDetail {
  phase: string;
  podCIDR: string;
  providerID: string;
  unschedulable: boolean;
  allocatedResources: NodeAllocatedResources;
  nodeInfo: NodeInfo;
  containerImages: string[];
  initContainerImages: string[];
  addresses: NodeAddress[];
  taints: NodeTaint[];
  metrics: Metric[];
  conditions: Condition[];
  podList: PodList;
  eventList: EventList;
}

export type HorizontalPodAutoscalerDetail extends ResourceDetail {
  scaleTargetRef: ScaleTargetRef;
  minReplicas: number;
  maxReplicas: number;
  currentCPUUtilization: number;
  targetCPUUtilization?: number;
  currentReplicas: number;
  desiredReplicas: number;
  lastScaleTime: string;
}

// Validation types
export type AppNameValidity {
  valid: boolean;
}

export type AppNameValiditySpec {
  name: string;
  namespace: string;
}

export type ImageReferenceValidity {
  valid: boolean;
  reason: string;
}

export type ImageReferenceValiditySpec {
  reference: string;
}

export type ProtocolValidity {
  valid: boolean;
}

export type ProtocolValiditySpec {
  protocol: string;
  isExternal: boolean;
}

// Auth related types
export type AuthResponse {
  jweToken: string;
  errors: K8sError[];
}

export type CanIResponse {
  allowed: boolean;
}

export type LoginSpec {
  username: string;
  password: string;
  token: string;
  kubeconfig: string;
}

export type LoginStatus {
  tokenPresent: boolean;
  headerPresent: boolean;
  httpsMode: boolean;
}

export type AppDeploymentContentSpec {
  name: string;
  namespace: string;
  content: string;
  validate: boolean;
}

export type AppDeploymentContentResponse {
  error: string;
  contet: string;
  name: string;
}

export type AppDeploymentSpec {
  containerImage: string;
  containerCommand?: string;
  containerCommandArgs?: string;
  isExternal: boolean;
  name: string;
  description?: string;
  portMappings: PortMapping[];
  labels: Label[];
  replicas: number;
  namespace: string;
  memoryRequirement?: string;
  cpuRequirement?: number;
  runAsPrivileged: boolean;
  imagePullSecret: string;
  variables: EnvironmentVariable[];
}

export type CsrfToken {
  token: string;
}

export type LocalSettings {
  isThemeDark: boolean;
}

export type AppConfig {
  serverTime: number;
}

export type StringMap {
  [key: string]: string;
}

export type Condition {
  type: string;
  status: string;
  lastProbeTime: string;
  lastTransitionTime: string;
  reason: string;
  message: string;
}

export type ContainerStateWaiting {
  reason: string;
}

export type ContainerStateRunning {
  startedAt: string;
}

export type ContainerStateTerminated {
  reason: string;
  signal: number;
  exitCode: number;
}

export type ContainerState {
  waiting?: ContainerStateWaiting;
  terminated?: ContainerStateTerminated;
  running?: ContainerStateRunning;
}

export type ResourceQuotaStatus {
  used: string;
  hard: string;
}

export type MetricResult {
  timestamp: string;
  value: number;
}

export type Metric {
  dataPoints: DataPoint[];
  metricName: string;
  aggregation: string;
}

export type DataPoint {
  x: number;
  y: number;
}

export type ConfigMapKeyRef {
  name: string;
  key: string;
}

export type SecretKeyRef {
  name: string;
  key: string;
}

export type EnvVar {
  name: string;
  value: string;
  valueFrom: EnvVarSource;
}

export type EnvVarSource {
  configMapKeyRef: ConfigMapKeyRef;
  secretKeyRef: SecretKeyRef;
}

export type Container {
  name: string;
  image: string;
  env: EnvVar[];
  commands: string[];
  args: string[];
}

export type CRDNames {
  plural: string;
  singular?: string;
  shortNames?: string[];
  kind: string;
  listKind?: string;
  categories?: string[];
}

export type CRDVersion {
  name: string;
  served: boolean;
  storage: boolean;
}

export type PodMetrics {
  cpuUsage: number;
  memoryUsage: number;
  cpuUsageHistory: MetricResult[];
  memoryUsageHistory: MetricResult[];
}

export type Status {
  running: number;
  failed: number;
  pending: number;
  succeeded: number;
}

export type PodStatus {
  podPhase: string;
  status: string;
  containerStates: ContainerState[];
}

export type PodInfo {
  current: number;
  desired: number;
  running: number;
  pending: number;
  failed: number;
  succeeded: number;
  warnings: Event[];
}

export type NodeAllocatedResources {
  cpuRequests: number;
  cpuRequestsFraction: number;
  cpuLimits: number;
  cpuLimitsFraction: number;
  cpuCapacity: number;
  memoryRequests: number;
  memoryRequestsFraction: number;
  memoryLimits: number;
  memoryLimitsFraction: number;
  memoryCapacity: number;
  allocatedPods: number;
  podCapacity: number;
  podFraction: number;
}

export type NodeInfo {
  machineID: string;
  systemUUID: string;
  bootID: string;
  kernelVersion: string;
  osImage: string;
  containerRuntimeVersion: string;
  kubeletVersion: string;
  kubeProxyVersion: string;
  operatingSystem: string;
  architecture: string;
}

export type NodeAddress {
  type: string;
  address: string;
}

export type NodeTaint {
  key: string;
  value: string;
  effect: string;
  timeAdded: number;
}

export type PortMapping {
  port: number | null;
  protocol: string;
  targetPort: number | null;
}

export type EnvironmentVariable {
  name: string;
  value: string;
}

export type Label {
  key: string;
  value: string;
}

export type PodEvent {
  reason: string;
  message: string;
}

export type GCEPersistentDiskVolumeSource {
  pdName: string;
  fsType: string;
  partition: number;
  readOnly: boolean;
}

export type AWSElasticBlockStorageVolumeSource {
  volumeID: string;
  fsType: string;
  partition: number;
  readOnly: boolean;
}

export type HostPathVolumeSource {
  path: string;
}

export type GlusterfsVolumeSource {
  endpoints: string;
  path: string;
  readOnly: boolean;
}

export type NFSVolumeSource {
  server: string;
  path: string;
  readOnly: boolean;
}

export type RBDVolumeSource {
  monitors: string[];
  image: string;
  fsType: string;
  pool: string;
  user: string;
  keyring: string;
  secretRef: LocalObjectReference;
  readOnly: boolean;
}

export type LocalObjectReference {
  name: string;
}


export type ISCSIVolumeSource {
  targetPortal: string;
  iqn: string;
  lun: number;
  fsType: string;
  readOnly: boolean;
}


export type CinderVolumeSource {
  volumeID: string;
  fsType: string;
  readOnly: boolean;
}

export type CephFSVolumeSource {
  monitors: string[];
  path: string;
  user: string;
  secretFile: string;
  secretRef: LocalObjectReference;
  readonly: boolean;
}

export type FCVolumeSource {
  targetWWNs: string[];
  lun: number;
  fsType: string;
  readOnly: boolean;
}

export type FlockerVolumeSource {
  datasetName: string;
}

export type RollingUpdateStrategy {
  maxSurge: number | string;
  maxUnavailable: number | string;
}

export type DeploymentInfo {
  replicas: number;
  updated: number;
  available: number;
  unavailable: number;
}

export type ReplicationControllerSpec {
  replicas: number;
}

export type ReplicaCounts {
  desiredReplicas: number;
  actualReplicas: number;
}

export type DeleteReplicationControllerSpec {
  deleteServices: boolean;
}

export type NamespaceSpec {
  name: string;
}

export type ReplicationControllerPodWithContainers {
  name: string;
  startTime?: string;
  totalRestartCount: number;
  podContainers: PodContainer[];
}

export type ReplicationControllerPods {
  pods: ReplicationControllerPodWithContainers[];
}

export type LogSources {
  podNames: string[];
  containerNames: string[];
  initContainerNames: string[];
}

export type LogDetails {
  info: LogInfo;
  logs: LogLine[];
  selection: LogSelection;
}

export type LogInfo {
  podName: string;
  containerName: string;
  initContainerName: string;
  fromDate: string;
  toDate: string;
  truncated: boolean;
}

export type LogLine {
  timestamp: string;
  content: string;
}

export type LogSelection {
  logFilePosition: string;
  referencePoint: LogLineReference;
  offsetFrom: number;
  offsetTo: number;
}

export type LogLineReference {
  timestamp: string;
  lineNum: number;
}

export type Protocols {
  protocols: string[];
}

export type SecretSpec {
  name: string;
  namespace: string;
  data: string;
}

export type LimitRange {
  resourceType: string;
  resourceName: string;
  min: string;
  max: string;
  default: string;
  defaultRequest: string;
  maxLimitRequestRatio: string;
}

export type ScaleTargetRef {
  kind: string;
  name: string;
}

export type GlobalSettings {
  clusterName: string;
  itemsPerPage: number;
  logsAutoRefreshTimeInterval: number;
  resourceAutoRefreshTimeInterval: number;
  disableAccessDeniedNotifications: boolean;
}

export type PinnedResource {
  kind: string;
  name: string;
  displayName: string;
  namespace?: string;
}

export type APIVersion {
  name: string;
}

export type AuthenticationMode = string;

export type EnabledAuthenticationModes {
  modes: AuthenticationMode[];
}

export type LoginSkippableResponse {
  skippable: boolean;
}

export type SystemBanner {
  message: string;
  severity: string;
}

export type PersistentVolumeSource {
  gcePersistentDisk: GCEPersistentDiskVolumeSource;
  awsElasticBlockStore: AWSElasticBlockStorageVolumeSource;
  hostPath: HostPathVolumeSource;
  glusterfs: GlusterfsVolumeSource;
  nfs: NFSVolumeSource;
  rbd: RBDVolumeSource;
  iscsi: ISCSIVolumeSource;
  cinder: CinderVolumeSource;
  fc: FCVolumeSource;
  flocker: FlockerVolumeSource;
}

export type TerminalResponse {
  id: string;
}

export type ShellFrame {
  Op: string;
  Data?: string;
  SessionID?: string;
  Rows?: number;
  Cols?: number;
}

export type TerminalPageParams {
  namespace: string;
  resourceKind: string;
  resourceName: string;

  // Optional
  pod?: string;
  container?: string;
}

export type SockJSSimpleEvent {
  type: string;
  toString(): string;
}

export type SJSCloseEvent extends SockJSSimpleEvent {
  code: number;
  reason: string;
  wasClean: boolean;
}

export type SJSMessageEvent extends SockJSSimpleEvent {
  data: string;
}

export type Plugin extends Resource {
  name: string;
  path: string;
  dependencies: string[];
}
*/
