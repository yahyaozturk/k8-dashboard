import React, { Fragment } from "react";
import { Statistic, Divider, Header, Grid } from "semantic-ui-react";

import ResourceType from "../types/resources";
import EventTable from "./event-table";
import ResourceStatistic from "./resource-statistic";

export default class WorkloadOverview extends React.Component {
  _isMounted = false;
  state = {};

  async componentDidMount() {
    this._isMounted = true;

    if (this._isMounted) {
      this.setState({});
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <Fragment>
        <Grid.Row centered>
          <Statistic.Group inverted size={"huge"}>
            <ResourceStatistic
              resourceType={ResourceType.Pod}
            ></ResourceStatistic>

            <ResourceStatistic
              resourceType={ResourceType.Deployment}
            ></ResourceStatistic>

            <ResourceStatistic
              resourceType={ResourceType.StatefulSet}
            ></ResourceStatistic>

            <ResourceStatistic
              resourceType={ResourceType.DeamonSet}
            ></ResourceStatistic>

            <ResourceStatistic
              resourceType={ResourceType.Job}
            ></ResourceStatistic>

            <ResourceStatistic
              resourceType={ResourceType.CronJob}
            ></ResourceStatistic>
          </Statistic.Group>
        </Grid.Row>
        <Divider horizontal>
          <Header as="h2" inverted>
            Events
          </Header>
        </Divider>
        <Grid.Row>
          <EventTable></EventTable>
        </Grid.Row>
      </Fragment>
    );
  }
}
