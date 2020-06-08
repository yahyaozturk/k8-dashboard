import React from "react";
import { Card, Icon } from "semantic-ui-react";
import k8 from "../api/k8";

const DeploymentList = (props) => {
  const deployments = props.deployments.map((deploy) => {
    return (
      <Card key={deploy.metadata.uid}>
        <Card.Content>
          <Card.Header>{deploy.metadata.namespace}</Card.Header>
          <Card.Description>{deploy.metadata.name}</Card.Description>
        </Card.Content>
        <PodList labels={deploy.metadata.labels}></PodList>
      </Card>
    );
  });
  return <Card.Group>{deployments}</Card.Group>;
};

class PodList extends React.Component {
  state = { pods: [] };

  async componentDidMount() {
    const response = await k8.get(
      "/api/v1/namespaces/dev/pods?labelSelector=" +
        Object.keys(this.props.labels)[0] +
        "=" +
        Object.values(this.props.labels)[0]
    );

    this.setState({ pods: response.data.items });
  }
  render() {
    return this.state.pods.map((deploy) => {
      return (
        <Card.Content extra key={deploy.metadata.uid}>
          <a href="/#">
            <Icon name="server" />
            {deploy.metadata.name}
          </a>
        </Card.Content>
      );
    });
  }
}

export default DeploymentList;
