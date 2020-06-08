import _ from "lodash";
import React from "react";
import { ResourceFactory } from "../actions/resources";
import ResourceType from "../types/resources";
import moment from "moment";
import { Table } from "semantic-ui-react";

const headers = [
  { key: "message", name: "Message" },
  { key: "namespace", name: "Namespace" },
  { key: "type", name: "Type" },
  { key: "object", name: "Involved Object" },
  { key: "source", name: "Source" },
  { key: "count", name: "Count" },
  { key: "age", name: "Age" },
];

export default class EventTable extends React.Component {
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
    const events = await ResourceFactory.getResources(ResourceType.Event);

    const eventTableData = events.resourceList.items.map((event) => ({
      message: event.message,
      namespace: event.metadata.namespace,
      type: event.involvedObject.kind,
      object: event.involvedObject.name,
      source:
        event.source.component +
        " / " +
        (_.hasIn(event, "source.host") ? event.source.host : ""),
      count: event.count,
      age: moment(event.lastTimestamp).fromNow(),
    }));

    this.setState({
      data: eventTableData,
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
                key={key}
                sorted={column === key ? direction : null}
                onClick={this.handleSort(key)}
              >
                {name}
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(data, (row, index) => (
            <Table.Row cells={Object.values(row)} key={index}></Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}
