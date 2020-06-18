import React from "react";
import { Grid, Card, Icon } from "semantic-ui-react";
import { ResourceFactory } from "../actions/resources";
import { ResourceType, MetaV1 } from "../types/resources";
import moment from "moment";

class NodeList extends React.Component {
  _isMounted = false;
  state = { nodes: [] };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  async componentDidMount() {
    this._isMounted = true;
    const nodes = await new ResourceFactory(
      ResourceType.Node,
      MetaV1.namespaceAll
    ).List();

    if (this._isMounted) {
      this.setState({ nodes: nodes.resourceList.items });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return this.state.nodes.map((node) => {
      const age = moment(node.metadata.creationTimestamp).fromNow();

      return (
        <Grid.Column key={node.metadata.uid} computer={4}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{node.metadata.name}</Card.Header>
              <Card.Meta>
                Role: {node.metadata.labels["kubernetes.io/role"]}
              </Card.Meta>
              <Card.Description>
                <Icon name="server" />
                {node.status.nodeInfo.osImage}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Icon name="stopwatch" />
              {age}
            </Card.Content>
            <Card.Content extra>
              <Icon name="edit outline" />
              {node.status.nodeInfo.kubeletVersion}
            </Card.Content>
            <Card.Content extra>
              <Icon name="microchip" />
              {node.status.capacity.cpu} core
            </Card.Content>
            <Card.Content extra>
              <Icon name="hdd outline" />
              {node.status.capacity.memory}
            </Card.Content>
          </Card>
        </Grid.Column>
      );
    });
  }
}

export default NodeList;
