import React from 'react';
import DOMPurify from 'dompurify';

const HTMLFilter = ({ htmlContent }) => {
  const purifiedHTML = DOMPurify.sanitize(htmlContent);

  return <div dangerouslySetInnerHTML={{ __html: purifiedHTML }} />;
};

export default HTMLFilter;
