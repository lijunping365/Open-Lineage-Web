import { Button, Select, Form, Input } from 'antd';
import { useState } from 'react';
import ColorPicker from '../ColorPicker';
import './index.css';

const onFinish = (values: any) => {
  console.log('Success:', values);
};

interface SettingProps {
  /**
   * 水印文字
   */
  textWaterMarker: string;
  /**
   * 高亮颜色
   */
  highlightColor: string;
  /**
   * 修改主题色
   */
  changeTheme: (theme: string) => void;
  /**
   * 设置文字水印
   */
  setTextWaterMarker: (waterMarker: string) => void;
  /**
   * 设置线条高亮色
   */
  setHighlightColor: (color: string) => void;
  /**
   * 关闭设置框
   */
  close: () => void;
}
const Setting = ({
  textWaterMarker,
  highlightColor,
  changeTheme,
  setTextWaterMarker,
  setHighlightColor,
  close,
}: SettingProps) => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    changeTheme(value);
  };

  const handleInputChange = (e: any) => {
    const { value: inputValue } = e.target;
    console.log('iiiiiiiiiiii', inputValue);
    setTextWaterMarker(inputValue);
  };

  const handlePickerChange = (value: any) => {
    console.log('ccccccccccccc', value);
    setHighlightColor(value);
  };

  return (
    <>
      <div className='setting'>
        <Form
          name='basic'
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 12 }}
          style={{ width: 240 }}
          initialValues={{
            codeTheme: 'vs-light',
            waterMaker: textWaterMarker,
            highlight: highlightColor,
          }}
          onFinish={onFinish}
          autoComplete='off'
        >
          <Form.Item
            label='设置代码主题颜色'
            name='codeTheme'
          >
            <Select
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: 'vs-light', label: 'ligth' },
                { value: 'vs-dark', label: 'dark' },
              ]}
            />
          </Form.Item>

          <Form.Item
            label='支持设置水印文字：'
            name='waterMaker'
          >
            <Input onChange={handleInputChange} />
          </Form.Item>

          <Form.Item
            label='选择线条高亮颜色'
            name='highlight'
          >
            <ColorPicker
              onChange={(value: string) => handlePickerChange(value)}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 16 }}>
            <Button
              type='primary'
              htmlType='submit'
              onClick={close}
            >
              确定
            </Button>

            <Button
              htmlType='button'
              onClick={close}
            >
              取消
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Setting;
