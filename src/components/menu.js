import React, { Component } from "react";
import { Menu, Icon } from "semantic-ui-react";

export default class MenuVertical extends Component {
  render() {
    return (
      <Menu vertical inverted fluid size="massive">
        <Menu.Item
          name="home"
          active={this.props.activeItem === "home"}
          onClick={this.props.handleItemClick}
        >
          <Icon name="home" />
          Home
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Workloads</Menu.Header>
          <Menu.Menu>
            <Menu.Item
              name="overview"
              active={this.props.activeItem === "overview"}
              onClick={this.props.handleItemClick}
            />
            <Menu.Item
              name="deployments"
              active={this.props.activeItem === "deployments"}
              onClick={this.props.handleItemClick}
            />
            <Menu.Item
              name="pods"
              active={this.props.activeItem === "pods"}
              onClick={this.props.handleItemClick}
            />
            <Menu.Item
              name="deamonsets"
              active={this.props.activeItem === "deamonsets"}
              onClick={this.props.handleItemClick}
            />
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Cluster</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name="nodes"
              active={this.props.activeItem === "nodes"}
              onClick={this.props.handleItemClick}
            />
            <Menu.Item
              name="namespaces"
              active={this.props.activeItem === "namespaces"}
              onClick={this.props.handleItemClick}
            />
            <Menu.Item
              name="persistent-volumes"
              active={this.props.activeItem === "persistent-volumes"}
              onClick={this.props.handleItemClick}
            />
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Config</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name="secrets"
              active={this.props.activeItem === "secrets"}
              onClick={this.props.handleItemClick}
            />
            <Menu.Item
              name="configmaps"
              active={this.props.activeItem === "configmaps"}
              onClick={this.props.handleItemClick}
            />
            <Menu.Item
              name="persistent-volume-claims"
              active={this.props.activeItem === "persistent-volume-claims"}
              onClick={this.props.handleItemClick}
            />
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Misc</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name="roles"
              active={this.props.activeItem === "roles"}
              onClick={this.props.handleItemClick}
            ></Menu.Item>

            <Menu.Item
              name="faq"
              active={this.props.activeItem === "faq"}
              onClick={this.props.handleItemClick}
            >
              FAQs
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    );
  }
}
