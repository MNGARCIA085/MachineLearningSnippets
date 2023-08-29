import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNight } from 'react-syntax-highlighter/dist/esm/styles/hljs'; // Elige un estilo de resaltado

import 'react-quill/dist/quill.snow.css';

const WysiwygEditor = ({ onChange }) => {
    const [editorHtml, setEditorHtml] = useState('');
  
    const handleEditorChange = (content) => {
      setEditorHtml(content);
      onChange(content);
    };
  
    const modules = {
      toolbar: {
        container: [
          [{ font: [] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ color: [] }, { background: [] }],
          
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ indent: '-1' }, { indent: '+1' }],
          ['link', 'image', 'video'],
          ['clean'],
        ],
      },
      // ...otros módulos
    };


/**
 * para el container dentro del toolbar
 * 
 * [{ script: 'sub' }, { script: 'super' }],
 * 
 * 
 */

  
    return (
      <div>
        <ReactQuill
          value={editorHtml}
          onChange={handleEditorChange}
          modules={modules} // Agrega los módulos personalizados
          placeholder="Escribe algo..."
        />
      </div>
    );
  };

export default WysiwygEditor;
