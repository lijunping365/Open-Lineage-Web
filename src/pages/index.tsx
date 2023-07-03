import './index.css';
import LineageGraph from '../components/LineageGraph';
import React, { useRef, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import sourceData from '../test/data.json';
import { getLineageData } from '../services/api';
import { message, Spin } from 'antd';
import ITour from '../components/Tour';
import { sql } from '../test/sql';
import SplitPane from 'react-split-pane';
import MonacoEditor from '../components/MonacoEditor';
import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect';

const App = () => {
  const [code, setCode] = useState(sql());
  const [loading, setLoading] = useState(false);
  const [lineageData, setLineageData] = useState<any>();
  const [highlightColor, setHighlightColor] = useState<string>('red');
  const [textWaterMarker, setTextWaterMarker] = useState<string>('OpenLineage');
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const [size, setSize] = useState<any>({ percentage: 0.25 });
  const [layout, setLayout] = useState('vertical');
  const [theme, setTheme] = useState<string>('vs-light');

  const splitPaneProps: any = {
    split: 'vertical',
    minSize: size.min,
    maxSize: size.max,
    size: size.current,
    onChange: (newSize: any) => console.log(newSize),
    onDragStarted: () => console.log('拖动开始'),
    onDragFinished: () => console.log('拖动结束'),
    allowResize: false,
  };

  const handleParseSql = () => {
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

  useIsomorphicLayoutEffect(() => {
    function updateSize() {
      setSize((size: any) => {
        const windowSize = document.documentElement.clientWidth;
        if (layout !== 'preview') {
          const min = 340;
          const max = windowSize - min;
          return {
            ...size,
            min,
            max,
            current:
              layout === 'editor'
                ? document.documentElement.clientWidth
                : Math.max(
                    Math.min(Math.round(windowSize * size.percentage), max),
                    min
                  ),
          };
        }

        const newSize = layout !== 'preview' ? windowSize : 0;
        return {
          ...size,
          current: newSize,
          min: newSize,
          max: newSize,
        };
      });
    }
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, [layout]);

  return (
    <>
      <Header
        theme={theme}
        layout={layout}
        setTheme={setTheme}
        setLayout={setLayout}
        textWaterMarker={textWaterMarker}
        setTextWaterMarker={setTextWaterMarker}
        highlightColor={highlightColor}
        setHighlightColor={setHighlightColor}
        handleParseSql={handleParseSql}
      />
      <main className='border-border dark:border-border-dark flex-auto overflow-hidden border-t'>
        <SplitPane {...splitPaneProps}>
          <div
            className='flex flex-auto border-t border-gray-200 dark:border-white/10'
            ref={ref1}
          >
            {(layout === 'editor' || layout === 'vertical') && (
              <MonacoEditor
                width='340'
                height='600'
                language='sql'
                theme={theme}
                value={code}
                onChange={(value) => setCode(value)}
              />
            )}
          </div>
          <div
            className='bg-wash dark:bg-wash-dark absolute inset-0 w-full overflow-auto border-t border-gray-200 p-6 dark:border-white/10 md:h-full lg:top-0 lg:border-0'
            ref={ref2}
          >
            <Spin spinning={loading}>
              <LineageGraph
                lineageData={lineageData}
                highlightColor={highlightColor}
                textWaterMarker={textWaterMarker}
              />
            </Spin>
          </div>
        </SplitPane>
      </main>
      {/*<Footer />*/}
      {/*<ITour*/}
      {/*  ref1={ref1}*/}
      {/*  ref2={ref2}*/}
      {/*/>*/}
    </>
  );
};

export default App;
