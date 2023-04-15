import React from 'react';
import './index.css';
import {
  BorderOuterOutlined,
  UndoOutlined,
  OneToOneOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  FileImageOutlined,
} from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

export interface ToolBarProps {
  /**
   * 放大
   */
  handleZoomOut: () => void;
  /**
   * 缩小
   */
  handleZoomIn: () => void;
  /**
   * 实际大小
   */
  handleRealZoom: () => void;

  /**
   * 自适应canvas大小
   */
  handleAutoZoom: () => void;

  /**
   * 重新布局
   */
  handleRefreshLayout: () => void;

  /**
   * 下载图片
   */
  handleDownloadImage: () => void;

  [key: string]: any;
}

const Toolbar: React.FC<ToolBarProps> = (props: any) => {
  const {
    handleZoomOut,
    handleZoomIn,
    handleRealZoom,
    handleAutoZoom,
    handleRefreshLayout,
    handleDownloadImage,
  } = props;

  const options = [
    {
      key: 'zoomOut',
      name: <ZoomInOutlined />,
      description: '放大',
      action: () => {
        handleZoomOut();
      },
    },
    {
      key: 'zoomIn',
      name: <ZoomOutOutlined />,
      description: '缩小',
      action: () => {
        handleZoomIn();
      },
    },
    {
      key: 'autoZoom',
      name: <OneToOneOutlined />,
      description: '自适应',
      action: () => {
        handleAutoZoom();
      },
    },
    {
      key: 'realZoom',
      name: <BorderOuterOutlined />,
      description: '视图居中',
      action: () => {
        handleRealZoom();
      },
    },
    {
      key: 'clearCanvas',
      name: <UndoOutlined />,
      description: '恢复布局',
      action: () => {
        handleRefreshLayout();
      },
    },
    {
      key: 'downloadImage',
      name: <FileImageOutlined />,
      description: '下载图片',
      action: () => {
        handleDownloadImage();
      },
    },
  ];

  return (
    <>
      <div className='g6-component-toolbar-content'>
        {options.map((item) => {
          return (
            <Tooltip
              title={item.description}
              key={item.key}
              placement='left'
              color='blue'
            >
              <Button
                type='text'
                className='g6-component-toolbar-item'
                onClick={item.action}
              >
                {item.name}
              </Button>
            </Tooltip>
          );
        })}
      </div>
    </>
  );
};

export default Toolbar;
