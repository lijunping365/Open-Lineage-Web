import React, { forwardRef, useImperativeHandle, useState } from 'react';
import './index.css';
import { Switch } from 'antd';

export interface TopBarProps {
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

const Topbar = forwardRef((props: any, ref: any) => {
  const { handleFieldLineage, handleWholeLineage } = props;
  const [fieldChecked, setFieldChecked] = useState(true);
  const [wholeChecked, setWholeChecked] = useState(true);

  useImperativeHandle(ref, () => ({
    fieldChecked,
    wholeChecked,
    setFieldChecked,
    setWholeChecked,
  }));

  const options = [
    {
      key: 'zoomOut',
      name: '字段级血缘关系',
      value: fieldChecked,
      action: (checked: boolean) => {
        setFieldChecked(checked);
        handleFieldLineage(checked);
      },
    },
    {
      key: 'zoomIn',
      name: '完整血缘链路',
      value: wholeChecked,
      action: (checked: boolean) => {
        setWholeChecked(checked);
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
});

export default Topbar;
