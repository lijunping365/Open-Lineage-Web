import React, { useEffect, useRef, useState } from 'react';
import { Tour, TourProps } from 'antd';
import tour1 from '/tour1.gif';
import tour2 from '/tour2.png';

const ITour = ({ ref1, ref2 }: any) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(true);
  }, [ref1, ref2]);

  const steps: TourProps['steps'] = [
    {
      title: 'SQL 编辑区',
      placement: 'right',
      description: '编辑完SQL之后点击解析血缘按钮即可看到效果',
      cover: (
        <img
          alt='tour1.gif'
          src={tour1}
        />
      ),
      target: () => ref1.current,
    },
    {
      title: '血缘展示区',
      placement: 'center',
      description: '根据你的SQL生成的血缘图将会在这里展示',
      cover: (
        <img
          alt='tour2.png'
          src={tour2}
        />
      ),
      target: () => ref2.current,
    },
  ];

  return (
    <>
      <Tour
        open={open}
        onClose={() => setOpen(false)}
        steps={steps}
      />
    </>
  );
};

export default ITour;
