import _ from "lodash";
import React from "react";
import { Grid, Card, Label, List, Icon } from "semantic-ui-react";
import { ResourceFactory } from "../actions/resources";
import ResourceType from "../types/resources";
import moment from "moment";

export default class PVList extends React.Component {
  _isMounted = false;
  state = { pvs: [] };

  async componentDidMount() {
    this._isMounted = true;
    const pvs = await ResourceFactory.getResources(ResourceType.Pv);

    if (this._isMounted) {
      this.setState({ pvs: pvs.resourceList.items });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return this.state.pvs.map((pv) => {
      return (
        <Grid.Column key={pv.metadata.uid} width={4}>
          <Card fluid>
            <Card.Content>
              <Card.Header textAlign="center">{pv.metadata.name}</Card.Header>
              <Card.Description>
                <Icon name="heartbeat" />
                {pv.status.phase}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Icon name="disk" />
              {pv.spec.capacity.storage}
            </Card.Content>
            <Card.Content extra>
              <Icon name="stopwatch" />
              {moment(pv.metadata.creationTimestamp).fromNow()}
            </Card.Content>
            <Card.Content extra>
              <Card.Header>Annotations</Card.Header>
              <List divided selection>
                <Label.Group color="teal">
                  {_.map(pv.metadata.annotations, (value, key) => (
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
