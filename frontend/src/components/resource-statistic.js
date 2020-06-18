import React from "react";
import PropTypes from "prop-types";
import { Statistic } from "semantic-ui-react";

import { ResourceFactory } from "../actions/resources";

export default class ResourceStatistic extends React.Component {
  _isMounted = false;
  state = {};

  async componentDidMount() {
    this._isMounted = true;
    const resources = await new ResourceFactory(
      this.props.resourceType,
      this.props.ns
    ).List();

    if (this._isMounted) {
      this.setState({
        resourceCount: resources.totalItems,
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { resourceCount } = this.state;

    return (
      <Statistic>
        <Statistic.Value>{resourceCount}</Statistic.Value>
        <Statistic.Label>{this.props.resourceType.kind}</Statistic.Label>
      </Statistic>
    );
  }
}

ResourceStatistic.propTypes = {
  resourceType: PropTypes.object,
};
