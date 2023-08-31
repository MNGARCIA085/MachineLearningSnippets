import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus,tomorrow,solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';


const CodeCopyBox = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    const textarea = document.createElement('textarea');
    textarea.value = code;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    setIsCopied(true);
  };

  return (
    <div className="code-copy-box">
      <div className="textarea-container">
        <SyntaxHighlighter language="python" >
          {code}
        </SyntaxHighlighter>
        <button class="btn btn-sm" onClick={handleCopyClick}>
          Copy Code
        </button>
      </div>
      <br></br>
    </div>
  );
};

export default CodeCopyBox;
