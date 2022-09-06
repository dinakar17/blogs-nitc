// run editorjs with nextjs 

import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import ImageTool from '@editorjs/image';
import LinkTool from '@editorjs/link'
import Marker from '@editorjs/marker';
import Quote from '@editorjs/quote';
import Table from '@editorjs/table';
import Warning from '@editorjs/warning';
import Code from '@editorjs/code';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import RawTool from '@editorjs/raw';
import SimpleImage from '@editorjs/simple-image';
import Underline from '@editorjs/underline';
import Checklist from '@editorjs/checklist';
import Paragraph from '@editorjs/paragraph';
import { EditorConfig } from '@editorjs/editorjs';

const editorConfig: EditorConfig = {
  tools: {
    header: {
      class: Header,
      inlineToolbar: ['link'],
      config: {
        placeholder: 'Header',
        levels: [2, 3, 4],
        defaultLevel: 3,
      },
    },
    list: {
      class: List,
      inlineToolbar: true,
      shortcut: 'CMD+SHIFT+L',
    },
    embed: {
      class: Embed,
      inlineToolbar: true,
      config: {
        services: {
          youtube: true,
          coub: true,
        },
      },
    },
    image: {
      class: ImageTool
    },
    linkTool: {
        class: LinkTool,
        config: {
            endpoint: 'http://localhost:8000/fetchUrl', // Your backend endpoint for url data fetching
        },
    },
    marker: {
        class: Marker,
        shortcut: 'CMD+SHIFT+M',
    },
    quote: {
        class: Quote,
        inlineToolbar: true,
        config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: 'Quote\'s author',
        },
        shortcut: 'CMD+SHIFT+O',
    },
    table: {
        class: Table,
        inlineToolbar: true,
        shortcut: 'CMD+ALT+T',
    },
    warning: {
        class: Warning,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+W',
        config: {
            titlePlaceholder: 'Title',
            messagePlaceholder: 'Message',
        },
    },
    code: {
        class: Code,
        shortcut: 'CMD+SHIFT+C',
    },
    delimiter: Delimiter,
    inlineCode: {
        class: InlineCode,
        shortcut: 'CMD+SHIFT+C',
    },
    raw: RawTool,
    simpleImage: {
        class: SimpleImage,
        inlineToolbar: true,
    },
    underline: Underline,
    checklist: {
        class: Checklist,
        inlineToolbar: true,
    },
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
    },
    },
};

const Editor = () => {
    // save the content and images of the editor
    const [content, setContent] = React.useState(null);
    const [images, setImages] = React.useState(null);


    const editor = useRef(null);
    
    useEffect(() => {
        editor.current = new EditorJS({
        holder: 'editorjs',
        ...editorConfig,
        });
    }, []);

    const saveContent = async () => {
        const savedContent = await editor.current.save();
        setContent(savedContent);
        console.log(savedContent);
    };
    
    return (
        <>
        <div id="editorjs" />
        <button onClick={saveContent}>Save</button>
</>
    );
    }

export default Editor;