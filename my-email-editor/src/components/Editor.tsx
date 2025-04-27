import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor';
import { Template } from '../App'
import React, { useEffect, useRef } from 'react';

type EditorProps = {
    pageData?: Template | undefined
}


const Editor: React.FC<EditorProps> = ({ pageData }: EditorProps) => {
    const emailEditorRef = useRef<EditorRef>(null);
    const isEditorReadyRef = useRef(false); // <--- NEW: track if editor is ready

    useEffect(() => {
        console.log('PROPS : ', pageData)

        if (isEditorReadyRef.current && pageData) {
            console.log('Loading new design into editor');
             // @ts-ignore
            emailEditorRef.current?.editor?.loadDesign(pageData.design);
        }
    }, [pageData]);

    const exportHtml = () => {
        const unlayer = emailEditorRef.current?.editor;
        unlayer?.exportHtml((data: any) => {
            const { design, html } = data;
            const name = prompt('Enter template name');

            if (name) {
                fetch('http://localhost:4000/save-template', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, html, design })
                }).then(() => alert('Template saved')).catch(() => alert('Error!'));
            }
        });
    };

    const onReady: EmailEditorProps['onReady'] = (unlayer) => {
        console.log('Editor is ready');
        isEditorReadyRef.current = true;

        unlayer.setBodyValues({
            contentWidth: '100%',
        });

        if (pageData) {
            console.log('Loading design on ready');
             // @ts-ignore
            emailEditorRef.current?.editor?.loadDesign(pageData.design);
        }
    };

    const onLoad = () => {
        console.log('onLoad function');
        const unlayer = emailEditorRef.current?.editor;

        unlayer?.initEditor({
            id: 'emailEditor',
            displayMode: 'web',
            features: {
                pageAnchors: true,
                textEditor: {
                    tables: true,
                },
            },
            tools: {
                carousel: {
                    enabled: true,
                },
                anchor: {
                    enabled: true,
                    position: 2,
                },
            },
        });

        unlayer?.setDisplayMode('web');
    };

    return (
        <div>
            <div style={{
                display:'flex',
                justifyContent:'end',
                width:'80%',
                margin: 'auto',
                marginBottom: '20px',
            }}>
            <button onClick={exportHtml}>Export HTML</button>
            </div>
            <EmailEditor
                editorId="emailEditor"
                ref={emailEditorRef}
                onLoad={onLoad}
                onReady={onReady}
                minHeight={window.innerWidth > 2200 ? '65vh' : '70vh'}
            />
        </div>
    );
};


export default Editor