import React, { useEffect, useState } from 'react';
import Editor from './components/Editor'

export type Template = {
  name: string;
  html: string;
  design: object;
};

const App: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedForLoad, setSelectedForLoad] = useState<Template | undefined>(undefined)

  useEffect(() => {
    fetch('http://localhost:4000/templates')
      .then(res => res.json())
      .then(data => {
        console.log('data : ', data)
        console.log('DATA : ', data[0])
        setTemplates(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);


  const loadrDesign = (designName: string) => {
    setSelectedForLoad(templates.find((obj) => obj.name === designName))
  }


  return (
    <div>
      {loading && (
        <h1>Loading...</h1>
      )}

      <div style={{
        margin: '20px',
        display: 'flex',
        gap: '10px',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        {templates && (
          <>
            {templates.map((temp, index) => (
              <div key={index}>
                <button onClick={() => loadrDesign(temp.name)}>Load {temp.name}</button>
              </div>
            ))}
          </>
        )}
      </div>


      <Editor pageData={selectedForLoad} />
      <div dangerouslySetInnerHTML={{ __html: selectedForLoad?.html ?? '' }}></div>
    </div>
  );
};

export default App;
