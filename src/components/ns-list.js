import React from "react";
import { Grid, Card, Label, List, Icon } from "semantic-ui-react";
import { ResourceFactory } from "../actions/resources";
import ResourceType from "../types/resources";
import moment from "moment";

class NamespaceList extends React.Component {
  _isMounted = false;
  state = { namespaces: [] };

  async componentDidMount() {
    this._isMounted = true;
    const namespaces = await ResourceFactory.getResources(
      ResourceType.Namespace
    );

    if (this._isMounted) {
      this.setState({ namespaces: namespaces.resourceList.items });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return this.state.namespaces.map((ns) => {
      const age = moment(ns.metadata.creationTimestamp).fromNow();
      let labels = new Map();

      if (Object.keys(ns.metadata).indexOf("labels") > -1) {
        Object.keys(ns.metadata.labels).forEach(function eachKey(key) {
          labels.set(
            <List.Item>
              <Label size="tiny" as="a" color="teal">
                {key}
                <Label.Detail>{ns.metadata.labels[key]}</Label.Detail>
              </Label>
            </List.Item>
          );
        });
      } else {
        labels.set(<div></div>);
      }

      return (
        <Grid.Column key={ns.metadata.uid} width={4}>
          <Card fluid>
            <Card.Content>
              <Card.Header textAlign="center">{ns.metadata.name}</Card.Header>
              <Card.Description>
                <Icon name="heartbeat" />
                {ns.status.phase}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Icon name="stopwatch" />
              {age}
            </Card.Content>
            <Card.Content extra>
              <Card.Header>Labels</Card.Header>
              <List divided selection>
                {labels}
              </List>
            </Card.Content>
          </Card>
        </Grid.Column>
      );
    });
  }
}

export default NamespaceList;
