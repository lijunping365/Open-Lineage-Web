import './index.css';
import Sidebar from '../Sidebar';
import LineageGraph from '../LineageGraph';
import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import sourceData from '../../config/data.json';
import { getLineageData } from '../../services/api';
import { Spin } from 'antd';

const LineageLayout = () => {
  const [loading, setLoading] = useState(false);
  const [lineageData, setLineageData] = useState<any>();
  const [highlightColor, setHighlightColor] = useState<string>('red');
  const [textWaterMarker, setTextWaterMarker] = useState<string>('Antv');

  const handleParseSql = (sql: string) => {
    console.log('sql....', sql);
    if (!sql) return;

    setLoading(true);
    getLineageData('hive', sql)
      .then((data: any) => {
        setLineageData(data);
      })
      .catch((e: any) => {
        console.log('接口出错了', e);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {/* <Header /> */}
      <main>
        <div className='mx-auto py-6 sm:px-6 lg:px-8 bg-gray-100'>
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
      {/* <Footer /> */}
    </>
  );
};

export default LineageLayout;
