import './index.css';
import Sidebar from '../Sidebar'
import LineageGraph from '../LineageGraph'
import React, { useState } from 'react'
import Header from '../Header'
import Footer from '../Footer'

const LineageLayout = () => {
  const [highlightColor, setHighlightColor] = useState<string>('');
  const [textWaterMarker, setTextWaterMarker] = useState<string>('Open-Lineage');

  const handleTextWaterMarker = (text: string) =>{

  }

  const handleHighlightColor = (color: string) =>{

  }

  return (
    <>
      <Header/>
      <main>
        <div className="mx-auto py-6 sm:px-6 lg:px-8 bg-gray-100">
          <div className='layout-container'>
            <div className='layout-sidebar'>
              <Sidebar
                textWaterMarker={textWaterMarker}
                highlightColor={highlightColor}
                setTextWaterMarker={(text) => handleTextWaterMarker(text)}
                setHighlightColor={(color) => handleHighlightColor(color)}
              />
            </div>
            <div className='layout-content'>
              <LineageGraph
                highlightColor={highlightColor}
                textWaterMarker={textWaterMarker}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  );
};

export default LineageLayout;
