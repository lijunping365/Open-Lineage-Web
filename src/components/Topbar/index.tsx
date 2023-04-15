import React from 'react';
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

const Topbar: React.FC<TopBarProps> = (props: any) => {
  const { handleFieldLineage, handleWholeLineage } = props;

  const options = [
    {
      key: 'zoomOut',
      name: '字段级血缘关系',
      action: (checked: boolean) => {
        handleFieldLineage(checked);
      },
    },
    {
      key: 'zoomIn',
      name: '完整血缘链路',
      action: (checked: boolean) => {
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
                defaultChecked
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
