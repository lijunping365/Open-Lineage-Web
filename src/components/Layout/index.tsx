import './index.css';
import Sidebar from '../Sidebar'
import LineageGraph from '../LineageGraph'
import React, { useState } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { dataTransform, initData } from '../../utils/common'

const LineageLayout = () => {
  const [lineageData, setLineageData] = useState<any>();
  const [highlightColor, setHighlightColor] = useState<string>('red');
  const [textWaterMarker, setTextWaterMarker] = useState<string>('Open-Lineage');

  const handleParseSql = (sql: string) => {
    console.log('sql....', sql)
    // 模拟发请求，处理数据
    const data = dataTransform(initData(100));
    // 这个数据还需要处理成 Graph 需要的格式，所以此时没有展示出来
    console.log('datadddddddddddd', data);
    setLineageData(data);
  }

  return (
    <>
      <Header/>
      <main>
        <div className="mx-auto py-6 sm:px-6 lg:px-8 bg-gray-100">
          <div className='layout-container'>
            <div className='layout-sidebar'>
              <Sidebar
                handleParseSql={handleParseSql}
                textWaterMarker={textWaterMarker}
                highlightColor={highlightColor}
                setTextWaterMarker={(text) => setTextWaterMarker(text)}
                setHighlightColor={(color) => setHighlightColor(color)}
              />
            </div>
            <div className='layout-content'>
              <LineageGraph
                lineageData={lineageData}
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
