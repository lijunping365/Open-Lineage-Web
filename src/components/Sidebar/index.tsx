import { Button, Popover, Select } from 'antd';
import { SearchOutlined, SettingOutlined } from '@ant-design/icons';
import Setting from '../Setting';
import MonacoEditor from '../MonacoEditor';
import { useState } from 'react';
import './index.css';

interface SidebarProps {
  /**
   * 水印文字
   */
  textWaterMarker: string;
  /**
   * 高亮颜色
   */
  highlightColor: string;
  /**
   * 设置水印文字
   */
  setTextWaterMarker: (text: string) => void;
  /**
   * 设置线条高亮色
   */
  setHighlightColor: (color: string) => void;
  /**
   * 解析 sql
   */
  handleParseSql: (sql: string) => void;
}

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const Sidebar = ({
  textWaterMarker,
  highlightColor,
  setTextWaterMarker,
  setHighlightColor,
  handleParseSql,
}: SidebarProps) => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<string>('vs-light');
  const [code, setCode] = useState('select * from ');
  const [formatCode, setFormatCode] = useState<string>();

  const handleFormatSql = () => {
    setFormatCode('select * ');
  };

  return (
    <>
      <div className='layout-sidebar-header'>
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
          icon={<SearchOutlined />}
          style={{ padding: '4px 6px' }}
          onClick={() => handleParseSql(code)}
        >
          解析血缘
        </Button>
        <Button
          type='primary'
          icon={<SearchOutlined />}
          style={{ padding: '4px 6px' }}
          onClick={handleFormatSql}
        >
          美化SQL
        </Button>
        <Popover
          content={
            <Setting
              textWaterMarker={textWaterMarker}
              highlightColor={highlightColor}
              changeTheme={(theme) => setTheme(theme)}
              close={() => setOpen(!open)}
              setTextWaterMarker={(marker) => setTextWaterMarker(marker)}
              setHighlightColor={(color) => setHighlightColor(color)}
            />
          }
          title='设置'
          placement='rightTop'
          trigger='click'
          open={open}
          onOpenChange={() => setOpen(!open)}
        >
          <Button
            type='primary'
            shape='circle'
            icon={<SettingOutlined />}
          />
        </Popover>
      </div>
      <div className='layout-sidebar-edit'>
        <MonacoEditor
          width='340'
          height='600'
          language='sql'
          theme={theme}
          value={code}
          defaultValue={formatCode}
          onChange={(value) => setCode(value)}
        />
      </div>
    </>
  );
};

export default Sidebar;
