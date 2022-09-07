import Header from "@editorjs/header";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import ImageTool from "@editorjs/image";
import LinkTool from "@editorjs/link";
import Marker from "@editorjs/marker";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import RawTool from "@editorjs/raw";
import SimpleImage from "@editorjs/simple-image";
import Underline from "@editorjs/underline";
import Checklist from "@editorjs/checklist";
import Paragraph from "@editorjs/paragraph";
import { EditorConfig } from "@editorjs/editorjs";
import CodeBox from "@bomdi/codebox";

export const editorConfig: EditorConfig = {
  tools: {
    header: {
      class: Header,
      inlineToolbar: ["link"],
      config: {
        placeholder: "Header",
        levels: [2, 3, 4],
        defaultLevel: 3,
      },
    },
    list: {
      class: List,
      inlineToolbar: true,
      shortcut: "CMD+SHIFT+L",
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
    codeBox: {
      class: CodeBox,
      config: {
        themeURL:
          "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/dracula.min.css", // Optional
        themeName: "atom-one-dark", // Optional
        useDefaultTheme: "light", // Optional. This also determines the background color of the language select drop-down
      },
    },
    image: {
      class: ImageTool,
      config: {
        endpoints: {
          byFile: "http://localhost:5000/api/uploadFile", // Your backend file uploader endpoint
          byUrl: "http://localhost:5000/api/fetchUrl", // Your endpoint that provides uploading by Url
        },
      },
    },
    linkTool: {
      class: LinkTool,
      config: {
        endpoint: "http://localhost:8000/fetchUrl", // Your backend endpoint for url data fetching
      },
    },
    marker: {
      class: Marker,
      shortcut: "CMD+SHIFT+M",
    },
    quote: {
      class: Quote,
      inlineToolbar: true,
      config: {
        quotePlaceholder: "Enter a quote",
        captionPlaceholder: "Quote's author",
      },
      shortcut: "CMD+SHIFT+O",
    },
    table: {
      class: Table,
      inlineToolbar: true,
      shortcut: "CMD+ALT+T",
    },
    warning: {
      class: Warning,
      inlineToolbar: true,
      shortcut: "CMD+SHIFT+W",
      config: {
        titlePlaceholder: "Title",
        messagePlaceholder: "Message",
      },
    },
    code: {
      class: Code,
      shortcut: "CMD+SHIFT+C",
    },
    delimiter: Delimiter,
    inlineCode: {
      class: InlineCode,
      shortcut: "CMD+SHIFT+C",
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
