import { useState } from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { GridFilterCellProps } from '@progress/kendo-react-grid';

export const AvgFilterCell = (props: GridFilterCellProps) => {
  const { onChange } = props;
  const [selected, setSelected] = useState(false);

  const handleClick = (e: React.SyntheticEvent) => {
    onChange({
      value: !selected ? 8 : 0,
      operator: '',
      syntheticEvent: e
    });
    setSelected(!selected);
  };

  return (
    <div className="k-filtercell">
      <Button togglable={true} onClick={handleClick} selected={selected}>
        {'Only > 8%'}
      </Button>
    </div>
  );
};
