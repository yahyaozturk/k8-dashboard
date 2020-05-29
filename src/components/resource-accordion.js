import React from "react";
import { Icon, Accordion, Item } from "semantic-ui-react";
import { ResourceFactory } from "../actions/resources";

class ResourceAccordion extends React.Component {
  _isMounted = false;
  state = { resources: [], activeIndex: 0, open: false };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  async componentDidMount() {
    this._isMounted = true;

    const resources = await ResourceFactory.getResources(
      this.props.resourceName,
      this.props.namespace
    );

    if (this._isMounted) {
      this.setState({ resources: resources.resourceList.items });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { activeIndex } = this.state;

    const resourceList = this.state.resources.map((resource) => {
      return (
        <Item key={resource.metadata.uid}>
          <Item.Content verticalAlign="middle">
            {resource.metadata.name}
          </Item.Content>
        </Item>
      );
    });

    return (
      <div>
        <Accordion>
          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={this.handleClick}
          >
            {this.props.resourceName.kind}
            <Icon name="dropdown" />
            {this.state.resources.length}
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <Item.Group divided>{resourceList}</Item.Group>
          </Accordion.Content>
        </Accordion>
      </div>
    );
  }
}

export default ResourceAccordion;
