import _ from "lodash";
import React from "react";
import { ResourceFactory } from "../actions/resources";
import ResourceType from "../types/resources";
import moment from "moment";
import { Table, Header, Label } from "semantic-ui-react";

const headers = [
  { key: "namespace", name: "Namespace", sortable: true },
  { key: "name", name: "Name", sortable: true },
  { key: "ready", name: "Ready" },
  { key: "restarts", name: "Restarts" },
  { key: "containers", name: "Containers" },
  { key: "controlledBy", name: "Controlled By" },
  { key: "labels", name: "Labels" },
  { key: "age", name: "Age", sortable: true },
  { key: "status", name: "Status", sortable: true },
];

export default class PodTable extends React.Component {
  state = {
    column: "namespace",
    data: [],
    direction: "ascending",
  };

  handleSort = (clickedColumn) => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: "ascending",
      });

      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending",
    });
  };

  async componentDidMount() {
    const podsRestResult = await ResourceFactory.getResources(ResourceType.Pod);

    const pods = _.map(podsRestResult.resourceList.items, (pod) => ({
      namespace: pod.metadata.namespace,

      name: pod.metadata.name,

      ready:
        (_.hasIn(pod, "status.containerStatuses")
          ? pod.status.containerStatuses.length
          : 0) +
        "/" +
        pod.spec.containers.length,

      restarts: _.hasIn(pod, "status.containerStatuses")
        ? _.map(pod.status.containerStatuses, function (o) {
            return o.restartCount;
          })
        : "-",

      containers: pod.spec.containers,

      controlledBy: _.hasIn(pod, "metadata.ownerReferences")
        ? pod.metadata.ownerReferences
        : null,

      labels: pod.metadata.labels,

      age: moment(pod.metadata.creationTimestamp).fromNow(),

      status: pod.status.phase,

      rawData: pod,
    }));

    this.setState({
      data: pods,
    });
  }

  render() {
    const { column, data, direction } = this.state;

    return (
      <Table sortable celled fixed inverted padded>
        <Table.Header>
          <Table.Row>
            {_.map(headers, ({ key, name, sortable }) => (
              <Table.HeaderCell
                key={"header-" + key}
                sorted={column === key ? direction : null}
                onClick={sortable ? this.handleSort(key) : null}
              >
                {name}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {_.map(data, (row) => (
            <Table.Row key={row.namespace + "-" + row.name}>
              <Table.Cell>
                <Header as="h2" textAlign="center" inverted>
                  {row.namespace}
                </Header>
              </Table.Cell>

              <Table.Cell>{row.name}</Table.Cell>

              <Table.Cell>{row.ready}</Table.Cell>

              <Table.Cell>
                <Label.Group color="teal">
                  {_.map(row.restarts, (restart) => restart)}
                </Label.Group>
              </Table.Cell>

              <Table.Cell>
                <Label.Group color="teal">
                  {_.map(row.containers, (container) => (
                    <Label key={container.name} size="tiny" as="a">
                      {container.name}
                      <Label.Detail>{container.image}</Label.Detail>
                    </Label>
                  ))}
                </Label.Group>
              </Table.Cell>

              <Table.Cell>
                <Label.Group color="teal">
                  {_.map(row.controlledBy, (controller) => (
                    <Label key={controller.kind} size="tiny" as="a">
                      {controller.kind}
                      <Label.Detail>{controller.name}</Label.Detail>
                    </Label>
                  ))}
                </Label.Group>
              </Table.Cell>

              <Table.Cell>
                <Label.Group color="teal">
                  {_.map(row.labels, (value, key) => (
                    <Label key={key} size="tiny" as="a">
                      {key}
                      <Label.Detail>{value}</Label.Detail>
                    </Label>
                  ))}
                </Label.Group>
              </Table.Cell>

              <Table.Cell>{row.age}</Table.Cell>
              <Table.Cell>{row.status}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}
