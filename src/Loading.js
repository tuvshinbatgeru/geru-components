'use strict';

import React, { Component } from 'react';
import { Box, Spinner } from 'gestalt'

class Loading extends Component {
  render() {
    return (
      <Box>
      	<Spinner show={true} accessibilityLabel="Loading component" />
      </Box>
    );
  }
}

export default Loading