import _ from "lodash";
import React from "react";
import { ResourceFactory } from "../actions/resources";
import ResourceType from "../types/resources";
import moment from "moment";
import { Table } from "semantic-ui-react";

const headers = [
  { key: "name", name: "Name" },
  { key: "namespace", name: "Namespace" },
  { key: "containers", name: "Containers" },
  { key: "restarts", name: "Restarts" },
  { key: "controlledBy", name: "Controlled By" },
  { key: "age", name: "Age" },
  { key: "status", name: "Status" },
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
    const pods = await ResourceFactory.getResources(ResourceType.Pod);

    const podTableData = pods.resourceList.items.map((pod) => ({
      name: pod.metadata.name,
      namespace: pod.metadata.namespace,
      containers: pod.spec.containers.length,
      restarts: _.hasIn(pod, "status.containerStatuses")
        ? pod.status.containerStatuses[0].restartCount
        : "-",
      controlledBy: _.hasIn(pod, "metadata.ownerReferences")
        ? pod.metadata.ownerReferences[0].kind
        : "-",
      age: moment(pod.metadata.creationTimestamp).fromNow(),
      status: pod.status.phase,
    }));

    this.setState({
      data: podTableData,
    });
  }

  render() {
    const { column, data, direction } = this.state;

    return (
      <Table sortable celled fixed inverted padded>
        <Table.Header>
          <Table.Row>
            {_.map(headers, ({ key, name }) => (
              <Table.HeaderCell
                key={"header-" + key}
                sorted={column === key ? direction : null}
                onClick={this.handleSort(key)}
              >
                {name}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {_.map(data, (row) => (
            <Table.Row key={row.name} cells={Object.values(row)}></Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}
