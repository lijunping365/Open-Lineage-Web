import './index.css';
import Sidebar from '../components/Sidebar';
import LineageGraph from '../components/LineageGraph';
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import sourceData from '../test/data.json';
import { getLineageData } from '../services/api';
import { message, Spin } from 'antd';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [lineageData, setLineageData] = useState<any>();
  const [highlightColor, setHighlightColor] = useState<string>('red');
  const [textWaterMarker, setTextWaterMarker] = useState<string>('OpenLineage');

  const handleParseSql = (sql: string) => {
    setLineageData(sourceData.data);
    // if (!sql) return;
    //
    // setLoading(true);
    // getLineageData('hive', sql)
    //   .then((data: any) => {
    //     setLineageData(data);
    //   })
    //   .catch((e: any) => {
    //     message.error('处理异常！' + e);
    //   })
    //   .finally(() => setLoading(false));
  };

  return (
    <>
      <Header />
      <main>
        <div className='mx-auto bg-gray-100 py-6 sm:px-6 lg:px-8'>
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
              <Spin spinning={loading}>
                <LineageGraph
                  lineageData={lineageData}
                  highlightColor={highlightColor}
                  textWaterMarker={textWaterMarker}
                />
              </Spin>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
