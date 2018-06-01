// @flow

import React from 'react';
import {Grid}  from 'react-bootstrap';

const NoMatch = ({ location }) => (
    <Grid fluid={true}>
        <h3>No match for <code>{location.pathname}</code></h3>
    </Grid>
);

export default NoMatch;