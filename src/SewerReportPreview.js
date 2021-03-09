import React from 'react'
import {useContext} from 'react';
import {sewerReportContext} from './SewerReportWithSplitPane.js';

const SewerReportPreview = () => {      

  const {blob} = useContext(sewerReportContext);

  return (
    <div id='sewerReportPreviewDiv'>
      <h2>Preview</h2>
      <iframe title="preview" src={blob} width="90%" height="90%"></iframe>
    </div>
  )
}

export default SewerReportPreview;
