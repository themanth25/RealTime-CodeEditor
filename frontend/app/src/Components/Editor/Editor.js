import React from 'react';
import { ControlledEditor } from '@monaco-editor/react';

import classes from './Editor.module.css';

const editor = (props) => {
    const options = {
        selectOnLineNumbers: true,
        fontSize: props.fontSize

    };
    return (
        <div className={classes.EditorContainer} style={{width: props.editorWidth}}>
            <ControlledEditor
                width="100%"
                height="100%"
                language={props.language}
                theme={props.theme}
                value={props.code}
                options={options}
                onChange={props.change}
                editorDidMount={props.editorMount}
            />
        </div>
    );
};

export default editor