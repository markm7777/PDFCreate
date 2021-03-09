import React, {useState} from 'react';
import {SplitPane} from './SplitPane.js'
import SewerReportInput from './SewerReportInput.js';
import SewerReportPreview from './SewerReportPreview.js';

export const sewerReportContext = React.createContext();

function SewerReportWithSplitPane() {

  const [blob, setBlob] = useState('')

  return (
    <>                      
      <div id='sewerReportDiv'>
        <sewerReportContext.Provider value={{blob: blob, setBlob: setBlob}}>
          <SplitPane>
            <SewerReportInput></SewerReportInput>
            <SewerReportPreview></SewerReportPreview>
          </SplitPane>
        </sewerReportContext.Provider>
      </div>
    </>

  )
}

export default SewerReportWithSplitPane;