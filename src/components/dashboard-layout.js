import React from "react";
import { Container, Grid, Header } from "semantic-ui-react";
import NodeList from "./node-list";
import NamespaceList from "./ns-list";
import MenuVertical from "./menu";
import WorkloadOverview from "./workload-overview";
import PodTable from "./pod-table";
import DeploymentTable from "./deployment-table";

export default class DashboardLayout extends React.Component {
  state = { activeItem: "home" };
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;
    let content;

    switch (activeItem) {
      case "nodes":
        content = <NodeList></NodeList>;
        break;
      case "namespaces":
        content = <NamespaceList></NamespaceList>;
        break;
      case "overview":
        content = <WorkloadOverview></WorkloadOverview>;
        break;
      case "pods":
        content = <PodTable></PodTable>;
        break;
      case "deployments":
        content = <DeploymentTable></DeploymentTable>;
        break;

      default:
        content = <NodeList></NodeList>;
        break;
    }

    return (
      <Container fluid>
        {/* Heads up! We apply there some custom styling, you usually will not need it. */}
        <style>
          {`
      html, body {
        background-color: #252839 !important;
      }
      p {
        align-content: center;
        background-color: #495285;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 6em;
      }
      p > span {
        opacity: 0.4;
        text-align: center;
      }
    }
    `}
        </style>

        <Grid columns={2} padded={"vertically"}>
          <Grid.Row>
            <Grid.Column width={2}>
              <MenuVertical
                activeItem={activeItem}
                handleItemClick={this.handleItemClick.bind(this)}
              ></MenuVertical>
            </Grid.Column>
            <Grid.Column width={14}>
              <Grid name="main-content" padded={"horizontally"}>
                <Grid.Row as={Header}>
                  <Header as="h2" icon inverted textAlign="center">
                    {activeItem.toUpperCase()}
                  </Header>
                </Grid.Row>
                {content}
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
