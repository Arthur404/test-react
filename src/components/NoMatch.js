// @flow

import React from 'react';
import {Grid}  from 'react-bootstrap';

type Props = {
    location: {
        pathname: string
    }
};

const NoMatch = (props: Props) => (
    <Grid fluid={true}>
        <h3>No match for <code>{props.location.pathname}</code></h3>
    </Grid>
);

export default NoMatch;