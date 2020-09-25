import React from 'react';
import Img from 'gatsby-image';

import tw, { styled, css } from 'twin.macro';

export const h4Style = css`
  ${tw`text-lg`}
`;

export const Portrait = styled.div`
  width: 200px;
  height: auto;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  img {
    display: block;
    margin: 0 auto;
    height: auto;
    width: 100%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
    border-radius: 50%;
  }
`;

/**
 * Describes how a Person component is displayed in
 * the site.
 *
 * TODO: Make responsive
 */
export const Person = ({ name, img }) => {
  if (!img || (!img.fluid && !img.fixed)) {
    console.log(`${name} does not have the correct image`);
  }

  return (
    <div className="person">
      <Img fluid={img} alt={name}></Img>

      <p>{name}</p>
    </div>
  );
};
