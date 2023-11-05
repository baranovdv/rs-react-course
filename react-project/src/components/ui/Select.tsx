import { SelectData } from 'src/data/types';

interface SelectProps {
  data: SelectData;
  selected: number;
  onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({ data, selected, onSelect }: SelectProps) {
  return (
    <label>
      {data.selectLabel + ' '}
      <select
        className="p-1 border-2 border-red-800 bg-red-100"
        defaultValue={selected}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onSelect(e)}
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
}
