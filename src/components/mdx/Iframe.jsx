import React from 'react';

export const CustomIframe = (props) => (
  <iframe
    width="100%"
    height="440px"
    style={{ border: "none" }}
    {...props}
  />
);