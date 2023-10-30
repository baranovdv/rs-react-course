import { ChangeEvent, Component } from 'react';
import { COMMON_DATA } from '../data/data';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface MenuInterface {
  props: {
    onSearchButton: (query: string) => void;
    inputLabel: string;
  };
  state: {
    searchInput: string;
    throwError: boolean;
  };
}

export class Menu extends Component<
  MenuInterface['props'],
  MenuInterface['state']
> {
  constructor(props: MenuInterface['props']) {
    super(props);
    this.state = {
      searchInput: this.checkInput(),
      throwError: false,
    };
  }

  checkInput = () => {
    const query = localStorage.getItem(COMMON_DATA.localStorageQuery);
    return query ? query : '';
  };

  handleSearchButton = (e: React.FormEvent<HTMLElement>): void => {
    e.preventDefault();
    this.props.onSearchButton(this.state.searchInput);
  };

  handleThrowButton = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();

    this.setState({ throwError: true });
  };

  render() {
    if (this.state.throwError) throw new Error();
    else
      return (
        <form className="flex gap-5" onSubmit={this.handleSearchButton}>
          <Input
            value={this.state.searchInput}
            setValue={(e: ChangeEvent<HTMLInputElement>) =>
              this.setState({ searchInput: e.target.value })
            }
            label={this.props.inputLabel}
          />
          <Button onClick={this.handleSearchButton}>Search</Button>

          <Button onClick={this.handleThrowButton}>Throw Error</Button>
        </form>
      );
  }
}
