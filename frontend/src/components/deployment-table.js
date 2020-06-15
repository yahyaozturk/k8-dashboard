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
  { key: "available", name: "Available" },
  { key: "labels", name: "Labels" },
  { key: "age", name: "Age", sortable: true },
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
    const deploymentRestResult = await ResourceFactory.getResources(
      ResourceType.Deployment
    );
    const deployments = _.map(
      deploymentRestResult.resourceList.items,
      (deployment) => ({
        namespace: deployment.metadata.namespace,
        name: deployment.metadata.name,

        ready:
          deployment.spec.replicas -
          (_.hasIn(deployment, "status.unavailableReplicas")
            ? deployment.status.unavailableReplicas
            : 0) +
          "/" +
          deployment.spec.replicas,

        available: _.hasIn(deployment, "status.availableReplicas")
          ? deployment.status.availableReplicas
          : 0,

        labels: deployment.metadata.labels,

        age: moment(deployment.metadata.creationTimestamp).fromNow(),

        rawData: deployment,
      })
    );

    this.setState({
      data: deployments,
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
          {_.map(data, (deployment) => (
            <Table.Row key={deployment.namespace + "-" + deployment.name}>
              <Table.Cell>
                <Header as="h2" textAlign="center" inverted>
                  {deployment.namespace}
                </Header>
              </Table.Cell>
              <Table.Cell>{deployment.name}</Table.Cell>
              <Table.Cell>{deployment.ready}</Table.Cell>
              <Table.Cell>{deployment.available}</Table.Cell>
              <Table.Cell>
                <Label.Group color="teal">
                  {_.map(deployment.labels, (value, key) => (
                    <Label key={key} size="tiny" as="a">
                      {key}
                      <Label.Detail>{value}</Label.Detail>
                    </Label>
                  ))}
                </Label.Group>
              </Table.Cell>
              <Table.Cell>{deployment.age}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}
