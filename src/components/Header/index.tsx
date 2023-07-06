import logo from '/logo.svg';
import metadata from '../../config/metadata';
import { Button, Form, Input, Popover, Select } from 'antd';
import { CodeSandboxOutlined, RocketOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import ColorPicker from '../ColorPicker';
import clsx from 'classnames';
import { IconSetting } from '../Icon/IconSetting';

interface HeaderProps {
  /** 模式 */
  model: string;
  /** 编辑器主题色 */
  theme: string;
  /** 布局方式 */
  layout: string;
  /** 水印文字 */
  textWaterMarker: string;
  /** 高亮颜色 */
  highlightColor: string;
  /** 解析 sql */
  handleParseSql: () => void;
  /** 设置编辑器主题 */
  setTheme: (value: string) => void;
  /** 设置布局方式 */
  setLayout: (value: string) => void;
  /** 设置节点数量 */
  setNodeSize: (value: number) => void;
  /** 设置水印文字 */
  setTextWaterMarker: (text: string) => void;
  /** 设置线条高亮色 */
  setHighlightColor: (color: string) => void;
  /** 切换模式 */
  handleChangeModel: (model: string) => void;
}

const Header = ({
  model,
  theme,
  layout,
  setLayout,
  setTheme,
  setNodeSize,
  textWaterMarker,
  highlightColor,
  setTextWaterMarker,
  setHighlightColor,
  handleParseSql,
  handleChangeModel,
}: HeaderProps) => {
  const [open, setOpen] = useState(false);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleChangeSize = (value: string) => {
    setNodeSize(Number(value));
  };

  return (
    <>
      <header className='min-w-full text-gray-600'>
        <div className='container mx-auto flex flex-col flex-wrap items-center px-5 py-3 shadow-md md:flex-row'>
          <a
            className='mb-4 flex items-center font-medium text-gray-900 md:mb-0'
            href={metadata.website}
            target='_blank'
          >
            <img
              src={logo}
              className='h-10'
              alt='logo'
            />
            <span className='ml-3 text-xl'>Open-Lineage</span>
          </a>
          <nav className='flex flex-wrap items-center justify-center space-x-2 text-base md:ml-4	md:mr-auto md:border-l md:border-gray-400 md:py-1 md:pl-4'>
            <Select
              defaultValue='Hive'
              style={{ width: 100 }}
              onChange={handleChange}
              options={[
                { value: 'hive', label: 'Hive' },
                { value: 'mysql', label: 'Mysql' },
              ]}
            />
            <Button
              type='primary'
              icon={<RocketOutlined />}
              className='bg-[#1677ff]'
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={() => handleParseSql()}
            >
              解析血缘
            </Button>
            <Button
              type='default'
              icon={<CodeSandboxOutlined />}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={() =>
                handleChangeModel(model === 'test' ? 'default' : 'test')
              }
            >
              {model === 'test' ? '退出测试' : '开始测试'}
            </Button>
            {model === 'test' && (
              <Select
                defaultValue='请选择'
                style={{ width: 100 }}
                onChange={handleChangeSize}
                options={[
                  { value: '100', label: '100节点' },
                  { value: '500', label: '500节点' },
                  { value: '1000', label: '1000节点' },
                ]}
              />
            )}
          </nav>
          <Setting
            open={open}
            setOpen={() => setOpen(!open)}
            children={
              <Form
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 12 }}
                style={{ width: 240 }}
              >
                <Form.Item
                  label='设置代码主题颜色'
                  name='codeTheme'
                >
                  <Select
                    style={{ width: 120 }}
                    onChange={(value) => setTheme(value)}
                    defaultValue={theme}
                    options={[
                      { value: 'vs-light', label: 'light' },
                      { value: 'vs-dark', label: 'dark' },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  label='支持设置水印文字：'
                  name='waterMaker'
                >
                  <Input
                    defaultValue={textWaterMarker}
                    onChange={(e) => setTextWaterMarker(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label='选择线条高亮颜色'
                  name='highlight'
                >
                  <ColorPicker
                    defaultColor={highlightColor}
                    onChange={(value: string) => setHighlightColor(value)}
                  />
                </Form.Item>
              </Form>
            }
          />
          <div className='ml-2 hidden items-center rounded-md shadow-sm ring-1 ring-gray-900/5 lg:flex'>
            <HeaderButton
              isActive={layout === 'vertical'}
              label='Switch to vertical split layout'
              onClick={() => setLayout('vertical')}
            >
              <path
                d='M12 3h9a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-9'
                fill='none'
              />
              <path d='M3 17V5a2 2 0 0 1 2-2h7a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2Z' />
            </HeaderButton>
            <HeaderButton
              isActive={layout === 'editor'}
              label='Switch to preview-only layout'
              onClick={() => setLayout('editor')}
            >
              <path
                fill='none'
                d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
              />
            </HeaderButton>
            <HeaderButton
              isActive={layout === 'preview'}
              label='Switch to preview-only layout'
              onClick={() => setLayout('preview')}
            >
              <path
                d='M23 17V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z'
                fill='none'
              />
            </HeaderButton>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

interface SettingProps {
  /** 弹窗开关 */
  open: boolean;
  /** 关闭弹窗 */
  setOpen: () => void;
  /** 水印文字 */
  children: any;
}
const Setting = ({ open, setOpen, children }: SettingProps) => {
  return (
    <Popover
      title='设置'
      trigger='click'
      open={open}
      onOpenChange={() => setOpen()}
      content={children}
    >
      <button
        className={clsx(
          'dark:shadow-highlight/4 block shadow-sm ring-1 ring-gray-900/5 hover:bg-gray-50 dark:bg-gray-800 dark:ring-0 dark:hover:bg-gray-700',
          'group rounded-md focus:outline-none focus-visible:ring-2',
          open
            ? 'focus-visible:ring-sky-500 dark:focus-visible:ring-sky-400'
            : 'focus-visible:ring-gray-400/70 dark:focus-visible:ring-gray-500'
        )}
      >
        <span className='sr-only'>设置</span>
        <IconSetting
          className={
            open
              ? 'fill-sky-100 stroke-sky-500 dark:fill-sky-400/50 dark:stroke-sky-400'
              : 'fill-gray-100 stroke-gray-400/70 hover:fill-gray-200 hover:stroke-gray-400 dark:fill-gray-400/20 dark:stroke-gray-500 dark:hover:fill-gray-400/30 dark:hover:stroke-gray-400'
          }
        />
      </button>
    </Popover>
  );
};

export function HeaderButton({
  isActive = false,
  label,
  onClick,
  width = 42,
  height = 36,
  naturalWidth = 26,
  naturalHeight = 22,
  className,
  children,
  iconClassName,
  ringClassName,
}: any) {
  return (
    <button
      type='button'
      className={clsx(
        className,
        'group rounded-md focus:outline-none focus-visible:ring-2',
        ringClassName ||
          (isActive
            ? 'focus-visible:ring-sky-500 dark:focus-visible:ring-sky-400'
            : 'focus-visible:ring-gray-400/70 dark:focus-visible:ring-gray-500')
      )}
      onClick={onClick}
    >
      <span className='sr-only'>{label}</span>
      <svg
        width={width}
        height={height}
        viewBox={`${(width - naturalWidth) / -2} ${
          (height - naturalHeight) / -2
        } ${width} ${height}`}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={
          iconClassName ||
          (isActive
            ? 'fill-sky-100 stroke-sky-500 dark:fill-sky-400/50 dark:stroke-sky-400'
            : 'fill-gray-100 stroke-gray-400/70 hover:fill-gray-200 hover:stroke-gray-400 dark:fill-gray-400/20 dark:stroke-gray-500 dark:hover:fill-gray-400/30 dark:hover:stroke-gray-400')
        }
      >
        {children}
      </svg>
    </button>
  );
}
