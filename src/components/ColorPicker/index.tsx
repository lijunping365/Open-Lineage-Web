import { FC, useState } from 'react';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';

interface ColorPickerProps {
  defaultColor?: string;
  onChange?: (value: any) => void;
}

export const ColorPicker: FC<ColorPickerProps> = ({
  defaultColor,
  onChange,
}) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState(defaultColor || '#4A90E2');

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = ({ hex }: any) => {
    setColor(hex);
    onChange && onChange(hex);
  };

  const styles: any = reactCSS({
    default: {
      color: {
        width: '60px',
        height: '24px',
        borderRadius: '2px',
        background: color,
      },
      swatch: {
        padding: '4px',
        background: '#fff',
        borderRadius: '4px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });

  return (
    <div>
      <div
        style={styles.swatch}
        onClick={handleClick}
      >
        <div style={styles.color} />
      </div>
      {displayColorPicker ? (
        <div style={styles.popover}>
          <div
            style={styles.cover}
            onClick={handleClose}
          />
          <SketchPicker
            color={color}
            onChange={handleChange}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
