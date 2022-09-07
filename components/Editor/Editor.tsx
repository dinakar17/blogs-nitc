// run editorjs with nextjs 

import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import { editorConfig } from './EditorConfig';


const Editor = () => {
    // save the content and images of the editor
    const [content, setContent] = React.useState(null);
    const [images, setImages] = React.useState(null);


    const editor = useRef(null);
    
    useEffect(() => {
        editor.current = new EditorJS({
        holder: 'editor-js',
        ...editorConfig,
        // initial placeholder "Write something"
        placeholder: 'Write something',
        });
    }, []);

    const saveContent = async () => {
        editor.current.save().then((outputData) => {
            console.log('Article data: ', outputData)
          }).catch((error) => {
            console.log('Saving failed: ', error)
          });
        
    };
    
    return (
        <>
        <div id="editor-js"/>
        <button onClick={saveContent}>Save</button>
</>
    );
    }

export default Editor;