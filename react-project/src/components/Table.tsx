import { Component } from 'react';
import { TableRow } from '../data/types';

interface TableInterface {
  props: {
    headers: string[];
    data?: TableRow[];
  };
}

export class Table extends Component<TableInterface['props']> {
  render() {
    return (
      <table className="w-full p-1 border-4 border-red-800">
        <thead>
          <tr className="p-1 border-2 border-red-800">
            {this.props.headers.map((item) => (
              <th key={item} className="p-1 border-2 border-red-800">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.props.data?.map((item) => (
            <tr key={item.id} className="p-1 border-2 border-red-400">
              <td className="p-1 border-2 border-red-400">{item.name}</td>
              <td className="p-1 border-2 border-red-400 text-center font-semibold">
                {item.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
