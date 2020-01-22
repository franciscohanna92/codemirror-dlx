# codemirror-dlx
A CodeMirror mode for the DLX Assembly language

### [Live Demo](https://franciscohanna.me/codemirror-dlx/)

<!-- ## Installation

```console
npm install codemirror-dlx --save
``` -->

## Usage

1. Include mode and style into your project.

    ```html
    <link href="node_modules/codemirror-dlx/theme/dlx-dark.css">
    <script src="node_modules/codemirror-dlx/mode/dlx.js"></script>
    ```

    or

    ```js
    import 'codemirror-dlx/theme/dlx-dark.css'
    import 'codemirror-dlx/mode/dlx'
    ```

2. Set 'dlx' as the mode and choose your theme when creating the CodeMirror editor.

    ```js
    CodeMirror.fromTextArea(document.getElementById('your-textarea-id'), { 
        mode: 'dlx',
        theme: 'dlx-dark'
    })
    ```

## About

Developed by [Sven Cheng](https://github.com/huesersohn).

Published and mantained by [Francisco Hanna](https://github.com/franciscohanna92).