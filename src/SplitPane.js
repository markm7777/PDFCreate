import React, {useState} from 'react';
import './SplitPane.css';

const SplitPane = ({children}) => {
  const [leftPaneWidth, setLeftPaneWidth] = useState(window.innerWidth/2);
  const separatorXPosition = React.useRef(null);
  const leftPanel = React.useRef(null);
  const rightPanel = React.useRef(null);

  const handleMouseDown = (e) => {
    separatorXPosition.current = e.clientX;
  }

  const handleMouseMove = (e) => {
    if (!separatorXPosition.current)
      return;

    document.body.style.cursor = 'col-resize';      

    leftPanel.current.style.userSelect = 'none';
    leftPanel.current.style.pointerEvents = 'none';
    rightPanel.current.style.userSelect = 'none';
    rightPanel.current.style.pointerEvents = 'none';

    const newWidth = leftPaneWidth + e.clientX - separatorXPosition.current;
    separatorXPosition.current = e.clientX;
    setLeftPaneWidth(newWidth);
  }

  const handleMouseUp = (e) => {
    separatorXPosition.current = null;
    e.target.style.removeProperty('cursor');
    document.body.style.removeProperty('cursor');

    leftPanel.current.style.removeProperty('user-select');
    leftPanel.current.style.removeProperty('pointer-events');
    rightPanel.current.style.removeProperty('user-select');
    rightPanel.current.style.removeProperty('pointer-events');
  }

  return (
    <div className='container' onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
        <div className='leftPane' style={{width: `${leftPaneWidth}px`}} ref={leftPanel}>
          {children[0]}
        </div>
        <div className={'resizer'} onMouseDown={handleMouseDown}></div>
        <div className='rightPane'  ref={rightPanel}>
          {children[1]}
        </div>
    </div>
  )
}

export {SplitPane}