import React from 'react';

function Project({ pageContext }) {
  const { project } = pageContext;
  return (
    <div>
      Name: {project.name}
      Price: {project.price}
      Description: {project.description}
    </div>
  );
}

export default Project;
