import _ from "lodash";
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
              {moment(ns.metadata.creationTimestamp).fromNow()}
            </Card.Content>
            <Card.Content extra>
              <Card.Header>Labels</Card.Header>
              <List divided selection>
                <Label.Group color="teal">
                  {_.map(ns.metadata.labels, (value, key) => (
                    <Label key={key} size="tiny" as="a">
                      {key}
                      <Label.Detail>{value}</Label.Detail>
                    </Label>
                  ))}
                </Label.Group>
              </List>
            </Card.Content>
          </Card>
        </Grid.Column>
      );
    });
  }
}

export default NamespaceList;
