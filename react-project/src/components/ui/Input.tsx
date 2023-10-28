import { ChangeEvent, Component } from 'react';

type InputProps = {
  value: string;
  setValue: (s: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
};

export class Input extends Component<InputProps> {
  render() {
    return (
      <>
        <label className="flex items-center text-2xl" htmlFor="input">
          {this.props.label || ''}
        </label>
        <input
          id="input"
          value={this.props.value}
          onChange={(e) => this.props.setValue(e)}
          className="w-[15%] px-1 border-2 border-red-800"
        ></input>
      </>
    );
  }
}
