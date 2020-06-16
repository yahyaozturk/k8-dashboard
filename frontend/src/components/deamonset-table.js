import _ from "lodash";
import React from "react";
import { ResourceFactory } from "../actions/resources";
import ResourceType from "../types/resources";
import moment from "moment";
import { Table, Header, Label } from "semantic-ui-react";

const headers = [
  { key: "namespace", name: "Namespace", sortable: true },
  { key: "name", name: "Name", sortable: true },
  { key: "desired", name: "Desired", sortable: true },
  { key: "current", name: "Current", sortable: true },
  { key: "ready", name: "Ready", sortable: true },
  { key: "available", name: "Available", sortable: true },
  { key: "nodeselector", name: "Node Selector" },
  { key: "age", name: "Age", sortable: true },
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
    const deamonsetRestResult = await ResourceFactory.getResources(
      ResourceType.DeamonSet
    );

    const deamonsets = _.map(
      deamonsetRestResult.resourceList.items,
      (deamonset) => ({
        namespace: deamonset.metadata.namespace,
        name: deamonset.metadata.name,
        desired: deamonset.status.desiredNumberScheduled,
        current: deamonset.status.currentNumberScheduled,
        ready: deamonset.status.numberReady,
        available: deamonset.status.numberAvailable,
        nodeselector: _.hasIn(deamonset, "spec.template.spec.nodeSelector")
          ? deamonset.spec.template.spec.nodeSelector
          : null,
        age: moment(deamonset.metadata.creationTimestamp).fromNow(),

        rawData: deamonset,
      })
    );

    this.setState({
      data: deamonsets,
    });
  }

  render() {
    const { column, data, direction } = this.state;

    console.log(data);

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
            <Table.Row key={row.name}>
              <Table.Cell>
                <Header as="h2" textAlign="center" inverted>
                  {row.namespace}
                </Header>
              </Table.Cell>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.desired}</Table.Cell>
              <Table.Cell>{row.current}</Table.Cell>
              <Table.Cell>{row.ready}</Table.Cell>
              <Table.Cell>{row.available}</Table.Cell>
              <Table.Cell>
                <Label.Group color="teal">
                  {_.map(row.nodeselector, (value, key) => (
                    <Label key={key} size="tiny" as="a">
                      {key}
                      <Label.Detail>{value}</Label.Detail>
                    </Label>
                  ))}
                </Label.Group>
              </Table.Cell>
              <Table.Cell>{row.age}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}
