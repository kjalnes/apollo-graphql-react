import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import Moment from 'react-moment';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local,
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

const Launch = (props) => {
  let { flight_number } = props.match.params;
  flight_number = parseInt(flight_number);
  return (
    <Fragment>
      <Query query={LAUNCH_QUERY} variables={{flight_number}}>
      {
        ({ loading, error, data }) => {
          if (loading) return <h4>Loading...</h4>
          if (error) console.log(error)

          const {
            flight_number,
            mission_name,
            launch_year,
            launch_success,
            launch_date_local,
            rocket: {
              rocket_id,
              rocket_name,
              rocket_type
            }
          } = data.launch;

          return <div>
            <h1 className='display-4 my-3'><span className='text-dark'>Mission</span> {mission_name}</h1>
            <h4>Launch Details</h4>
            <ul>
              <li>Flight Number: {flight_number}</li>
              <li>Launch Year: {launch_year}</li>
              <li>Launch Success: {launch_success ? "Yes" : "No" }</li>
              <li>Launch Date: {launch_date_local}</li>
            </ul>
            <h4>Rocket Details</h4>
            <ul>
              <li>Rocket ID: {rocket_id}</li>
              <li>Rocket Name: {rocket_name}</li>
              <li>Rocket Type: {rocket_type}</li>
            </ul>
            <hr />
            <Link className='btn btn-secondary' to='/'>Back</Link>
          </div>
        }
      }
      </Query>
    </Fragment>
  );
}

export default Launch;
