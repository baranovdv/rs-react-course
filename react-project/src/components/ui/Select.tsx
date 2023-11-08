import { FC } from 'react';
import { SelectData } from 'src/data/types';

interface SelectProps {
  data: SelectData;
  selected: number;
  onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: FC<SelectProps> = ({ data, selected, onSelect }) => {
  return (
    <label>
      {`${data.selectLabel} `}
      <select
        className="p-1 border-2 border-red-800 bg-red-100"
        defaultValue={selected}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>): void =>
          onSelect(event)
        }
      >
        {data.selectOptions.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export { Select };
