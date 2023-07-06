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
import LineageGraphTest from '../components/LineageGraphTest';
import { initData } from '../test/test';

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
  const [nodeSize, setNodeSize] = useState(0);
  const [nodeLevel, setNodeLevel] = useState(0);
  const [model, setModel] = useState('default');
  const [testSize, setTestSize] = useState(0);

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

  const handleChangeModel = (model: string) => {
    setModel(model);
    setLineageData(null);
    setNodeSize(0);
    setNodeLevel(0);
    setTestSize(0);
  };

  const handleParseSql = () => {
    if (model === 'test') {
      setNodeSize(testSize);
      setNodeLevel(testSize);
      setLineageData(initData(testSize));
    } else {
      setLineageData(sourceData.data);
    }

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
          const current = layout === 'editor' ? windowSize : min;
          return {
            ...size,
            min,
            max,
            current,
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
        model={model}
        theme={theme}
        layout={layout}
        setTheme={setTheme}
        setLayout={setLayout}
        setNodeSize={setTestSize}
        handleParseSql={handleParseSql}
        highlightColor={highlightColor}
        textWaterMarker={textWaterMarker}
        handleChangeModel={handleChangeModel}
        setHighlightColor={setHighlightColor}
        setTextWaterMarker={setTextWaterMarker}
      />
      <main className='flex-auto overflow-hidden border-t border-gray-200'>
        <SplitPane {...splitPaneProps}>
          <div
            className='flex flex-auto'
            ref={ref1}
          >
            {(layout === 'editor' || layout === 'vertical') && (
              <MonacoEditor
                width={size.current}
                height={'100vh'}
                language='sql'
                theme={theme}
                value={code}
                onChange={(value) => setCode(value)}
              />
            )}
          </div>
          <div
            className='absolute inset-0 w-full overflow-auto md:h-full'
            ref={ref2}
          >
            <Spin spinning={loading}>
              {model === 'test' ? (
                <LineageGraphTest
                  layout={layout}
                  lineageData={lineageData}
                  highlightColor={highlightColor}
                  textWaterMarker={textWaterMarker}
                />
              ) : (
                <LineageGraph
                  layout={layout}
                  lineageData={lineageData}
                  setNodeSize={setNodeSize}
                  setNodeLevel={setNodeLevel}
                  highlightColor={highlightColor}
                  textWaterMarker={textWaterMarker}
                />
              )}
            </Spin>
          </div>
        </SplitPane>
      </main>
      <Footer
        nodeSize={nodeSize}
        nodeLevel={nodeLevel}
      />
      {/*<ITour*/}
      {/*  ref1={ref1}*/}
      {/*  ref2={ref2}*/}
      {/*/>*/}
    </>
  );
};

export default App;
