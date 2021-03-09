import React, {useState} from 'react';
import {SplitPane} from './SplitPane.js'
import SewerReportInput from './SewerReportInput.js';
import SewerReportPreview from './SewerReportPreview.js';
import {Profiler} from 'react';

export const sewerReportContext = React.createContext();

function SewerReportWithSplitPane() {

  const [blob, setBlob] = useState('')

  const profile = (id, phase) => {
    console.log('profile')
  }

  return (
    <>                      
      <div id='sewerReportDiv'>
      <Profiler id="Navigation" onRender={profile}>
        <sewerReportContext.Provider value={{blob: blob, setBlob: setBlob}}>
          <SplitPane>
            <SewerReportInput></SewerReportInput>
            <SewerReportPreview></SewerReportPreview>
          </SplitPane>
        </sewerReportContext.Provider>
      </Profiler>        
      </div>
    </>

  )
}

export default SewerReportWithSplitPane;