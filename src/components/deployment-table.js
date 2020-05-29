import _ from "lodash";
import React from "react";
import { ResourceFactory } from "../actions/resources";
import ResourceType from "../types/resources";
import moment from "moment";
import { Table } from "semantic-ui-react";

const headers = [
  { key: "name", name: "Name" },
  { key: "namespace", name: "Namespace" },
  { key: "pods", name: "Pods" },
  { key: "replicas", name: "Replicas" },
  { key: "age", name: "Age" },
  { key: "conditions", name: "Conditions" },
];

export default class DeploymentTable extends React.Component {
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
    const deployments = await ResourceFactory.getResources(
      ResourceType.Deployment
    );

    const deploymentTableData = deployments.resourceList.items.map(
      (deployment) => ({
        name: deployment.metadata.name,
        namespace: deployment.metadata.namespace,
        pods:
          deployment.spec.replicas -
          (_.hasIn(deployment, "status.unavailableReplicas")
            ? deployment.status.unavailableReplicas
            : 0) +
          "/" +
          deployment.spec.replicas,
        replicas: deployment.spec.replicas,
        age: moment(deployment.metadata.creationTimestamp).fromNow(),
        conditions: _.map(deployment.status.conditions, "type"),
      })
    );

    this.setState({
      data: deploymentTableData,
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
