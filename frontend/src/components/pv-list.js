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

    console.log(pvs);

    if (this._isMounted) {
      this.setState({ pvs: pvs.resourceList.items });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return this.state.pvs.map((pv) => {
      const age = moment(pv.metadata.creationTimestamp).fromNow();
      let annotations = new Map();

      if (Object.keys(pv.metadata).indexOf("annotations") > -1) {
        Object.keys(pv.metadata.annotations).forEach(function eachKey(key) {
          annotations.set(
            <List.Item>
              <Label size="tiny" as="a" color="teal">
                {key}
                <Label.Detail>{pv.metadata.annotations[key]}</Label.Detail>
              </Label>
            </List.Item>
          );
        });
      } else {
        annotations.set(<div></div>);
      }

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
              {age}
            </Card.Content>
            <Card.Content extra>
              <Card.Header>Annotations</Card.Header>
              <List divided selection>
                {annotations}
              </List>
            </Card.Content>
          </Card>
        </Grid.Column>
      );
    });
  }
}
