import React, { useEffect, useState } from 'react';
import './index.css';
import { Switch } from 'antd';

export interface TopBarProps {
  /**
   * 字段血缘
   */
  fieldChecked: boolean;

  /**
   * 完整血缘
   */
  wholeChecked: boolean;
  /**
   * 字段血缘
   */
  handleFieldLineage: (checked: boolean) => void;
  /**
   * 完整血缘
   */
  handleWholeLineage: (checked: boolean) => void;

  [key: string]: any;
}

const Topbar: React.FC<TopBarProps> = (props: any) => {
  const { fieldChecked, wholeChecked, handleFieldLineage, handleWholeLineage } =
    props;
  const [fieldCheckedState, setFieldCheckedState] = useState(fieldChecked);
  const [wholeCheckedState, setWholeCheckedState] = useState(wholeChecked);

  useEffect(() => {
    console.log('yyyyyyyyyyyyyyyyyyy', fieldChecked);
    setFieldCheckedState(fieldChecked);
  }, [fieldChecked]);

  useEffect(() => {
    console.log('wwwwwwwwwwwwwwwwwww', wholeChecked);
    setWholeCheckedState(wholeChecked);
  }, [wholeChecked]);

  const options = [
    {
      key: 'zoomOut',
      name: '字段级血缘关系',
      value: fieldCheckedState,
      action: (checked: boolean) => {
        setFieldCheckedState(checked);
        handleFieldLineage(checked);
      },
    },
    {
      key: 'zoomIn',
      name: '完整血缘链路',
      value: wholeCheckedState,
      action: (checked: boolean) => {
        setWholeCheckedState(checked);
        handleWholeLineage(checked);
      },
    },
  ];

  return (
    <>
      <div className='g6-component-topbar-content'>
        {options.map((item) => {
          return (
            <div
              key={item.key}
              className='g6-component-topbar-item'
            >
              <span>{item.name}</span>
              <Switch
                size='small'
                checked={item.value}
                onChange={item.action}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Topbar;
