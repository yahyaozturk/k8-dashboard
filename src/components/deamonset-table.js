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
  { key: "nodeselector", name: "Node Selector" },
  { key: "age", name: "Age" },
];

export default class DeamonsetTable extends React.Component {
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
    const deamonsets = await ResourceFactory.getResources(
      ResourceType.DeamonSet
    );

    const deamonsetsTableData = deamonsets.resourceList.items.map(
      (deamonset) => ({
        name: deamonset.metadata.name,
        namespace: deamonset.metadata.namespace,
        pods:
          deamonset.status.numberReady +
          "/" +
          deamonset.status.desiredNumberScheduled,
        nodeselector: _.hasIn(deamonset, "spec.template.spec.nodeSelector")
          ? deamonset.spec.template.spec.nodeSelector
          : "-",
        age: moment(deamonset.metadata.creationTimestamp).fromNow(),
      })
    );

    this.setState({
      data: deamonsetsTableData,
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
