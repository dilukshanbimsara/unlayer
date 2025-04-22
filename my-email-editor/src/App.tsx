import React, { useRef } from 'react';
import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor';

const App: React.FC = () => {
  const emailEditorRef = useRef<EditorRef>(null);

  // Export HTML and design JSON
  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;
    unlayer?.exportHtml((data: any) => {
      const { design, html } = data;
      // Save html and design to file or backend here
      console.log('Template HTML:', html);
      console.log('Template Design JSON:', design);
      // Example: Save to file (see step 5)
    });
  };

  const onReady: EmailEditorProps['onReady'] = (unlayer) => {
    // Editor is ready
    // Optionally load a saved template here
  };

  const onLoad = () => {
    const unlayer = emailEditorRef.current?.editor

    unlayer?.initEditor({
      id: 'emailEditor',
      displayMode: 'web',
      features: {
        pageAnchors: true,
        textEditor: {
          tables: true
        }
      },
      tools: {
        carousel: {
          enabled: true
        },
        anchor: {
          enabled: true,
          position: 2
        }
      }
    })

    unlayer?.setDisplayMode('web')
  }

  return (
    <div>
      <button onClick={exportHtml}>Export HTML</button>
      <EmailEditor
        editorId='emailEditor'
        ref={emailEditorRef}
        onLoad={onLoad}
        onReady={onReady}
        minHeight={window.innerWidth > 2200 ? '65vh' : '70vh'}
      />
    </div>
  );
};

export default App;
