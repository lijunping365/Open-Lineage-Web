import React, { useEffect, useState } from 'react';
import './index.css';
import {
  BorderOuterOutlined,
  UndoOutlined,
  OneToOneOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  FileImageOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

export interface ToolBarProps {
  /**
   * 布局
   */
  layout: string;
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

  /**
   * 全屏查看
   */
  handleEnterFullscreen: () => void;

  /**
   * 退出全屏
   */
  handleExitFullscreen: () => void;

  /**
   * 改变画布大小
   */
  handleChangeSize: (width: number, height: number) => void;

  [key: string]: any;
}

const Toolbar: React.FC<ToolBarProps> = (props: any) => {
  const [isFull, setIsFull] = useState(true); // 判断显示全屏，退出全屏
  const {
    layout,
    handleZoomOut,
    handleZoomIn,
    handleRealZoom,
    handleAutoZoom,
    handleRefreshLayout,
    handleDownloadImage,
    handleEnterFullscreen,
    handleExitFullscreen,
    handleChangeSize,
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
    isFull
      ? {
          key: 'fullscreenOutlined',
          name: <FullscreenOutlined />,
          description: '全屏查看',
          action: () => {
            setIsFull(!isFull);
            handleEnterFullscreen();
          },
        }
      : {
          key: 'fullscreenExitOutlined',
          name: <FullscreenExitOutlined />,
          description: '退出全屏',
          action: () => {
            setIsFull(!isFull);
            handleExitFullscreen();
          },
        },
  ];

  useEffect(() => {
    // 监听退出全屏事件 --- chrome 用 esc 退出全屏并不会触发 keyup 事件
    document.addEventListener('webkitfullscreenchange', checkFull);
    document.addEventListener('mozfullscreenchange', checkFull);
    document.addEventListener('fullscreenchange', checkFull);
    document.addEventListener('MSFullscreenChange', checkFull);

    return () => {
      // 移除按键监听器
      document.removeEventListener('webkitfullscreenchange', checkFull);
      document.removeEventListener('mozfullscreenchange', checkFull);
      document.removeEventListener('fullscreenchange', checkFull);
      document.removeEventListener('MSFullscreenChange', checkFull);
    };
  }, [layout]);

  const checkFull = () => {
    const windowWidth = document.documentElement.clientWidth;
    if (
      // @ts-ignore
      !document.mozFullScreen &&
      // @ts-ignore
      !document.webkitIsFullScreen &&
      // @ts-ignore
      !document.msFullscreenElement
    ) {
      setIsFull(true);
      // 退出全屏修改canvas宽高
      const windowHeight = document.documentElement.clientHeight;
      const width = layout === 'preview' ? windowWidth : windowWidth - 340;
      const height = window.outerHeight - 141 || windowHeight;
      handleChangeSize(width, height);
    } else {
      setIsFull(false);
      // 全屏查看修改canvas宽高
      const width = windowWidth;
      const height = window.outerHeight;
      handleChangeSize(width, height);
    }
  };

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
