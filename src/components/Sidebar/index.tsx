import { Button, Popover, Select } from 'antd'
import { SearchOutlined, SettingOutlined } from '@ant-design/icons'
import Setting from '../Setting'
import MonacoEditor from '../MonacoEditor'
import { useState } from 'react'

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
}

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const Sidebar = ({
  textWaterMarker,
  highlightColor,
  setTextWaterMarker,
  setHighlightColor,
}: SidebarProps) =>{
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<string>();
  const [code, setCode] = useState('select * from ');

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleChangeTheme = (theme: string) => {
    setTheme(theme);
  };

  return (
    <>
      <div className='layout-sider-header'>
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
        >
          解析血缘
        </Button>
        <Button
          type='primary'
          icon={<SearchOutlined />}
          style={{ padding: '4px 6px' }}
        >
          美化SQL
        </Button>
        <Popover
          content={
            <Setting
              textWaterMarker={textWaterMarker}
              highlightColor={highlightColor}
              changeTheme={(theme) => handleChangeTheme(theme)}
              close={() => setOpen(!open)}
              setTextWaterMarker={(marker) => setTextWaterMarker(marker)}
              setHighlightColor={(color) => setHighlightColor(color)}
            />
          }
          title='设置'
          placement='rightTop'
          trigger='click'
          open={open}
          onOpenChange={handleOpenChange}
        >
          <Button
            type='primary'
            shape='circle'
            icon={<SettingOutlined />}
          />
        </Popover>
      </div>
      <div className='layout-sider-edit'>
        <MonacoEditor
          width='340'
          height='600'
          language='sql'
          theme={theme || 'vs-light'}
          value={code}
          // options={options}
          // onChange={onChange}
          //editorDidMount={editorDidMount}
        />
      </div>
    </>
  )
}

export default Sidebar;
