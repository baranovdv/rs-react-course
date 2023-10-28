import { ChangeEvent, Component } from 'react';
import { AppStatus, ResponseData, ResultData, TableRow } from '../data/types';
import { Spinner } from './Spinner';
import { Table } from './Table';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

const MAIN_DATA = {
  inputLabel: 'Search by name:',
  tableHeaders: ['Name:', 'Description:'],
  APIurl: 'https://rickandmortyapi.com/api/character/',
  localStorageQuery: 'search_Query',
};

type State = {
  status: AppStatus;
  searchInput: string;
  tableContent: TableRow[];
  error: string;
};

export class Main extends Component {
  state: State = {
    status: 'idle',
    searchInput: '',
    tableContent: [],
    error: '',
  };

  handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      searchInput: e.target.value,
    });
  };

  handleSearchButton = (e: React.FormEvent<HTMLElement>): void => {
    e.preventDefault();
    this.fetchData(this.state.searchInput.trim().toLowerCase());
  };

  handleThrowButton = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
  };

  convertToTableRow = (result: ResultData): TableRow => {
    let description = `${result.status !== 'unknown' ? result.status : ''} 
    ${result.gender !== 'unknown' ? result.gender.toLowerCase() : ''} ${
      result.species !== 'unknown' ? result.species.toLowerCase() : ''
    } from ${result.location.name}`.trim();
    description = description[0].toUpperCase() + description.slice(1);
    return {
      id: result.id,
      name: result.name,
      description: description,
    };
  };

  fetchData = (query?: string | undefined): void => {
    this.setState({
      status: 'wait',
    });
    const q = query !== undefined ? '?name=' + query : '';
    fetch(MAIN_DATA.APIurl + q)
      .then((response) => response.json())
      .then((data: ResponseData) => {
        const tableData = data.results.map((item) =>
          this.convertToTableRow(item)
        );
        this.setState({
          tableContent: tableData,
          status: 'idle',
        });
        localStorage.setItem(MAIN_DATA.localStorageQuery, query || '');
      })
      .catch((e: Error) => {
        console.log(e);
        this.setState({
          status: 'error',
          error: e.message,
        });
      });
  };

  componentDidMount(): void {
    const query = localStorage.getItem(MAIN_DATA.localStorageQuery);
    this.setState({
      searchInput: query,
    });
    this.fetchData(query ?? '');
  }

  render() {
    return (
      <main className="py-4 px-5 bg-slate-300">
        <form className="flex gap-5" onSubmit={this.handleSearchButton}>
          <Input
            value={this.state.searchInput}
            setValue={this.handleInput}
            label={MAIN_DATA.inputLabel}
          />
          <Button onClick={this.handleSearchButton}>Search</Button>
          <Button onClick={this.handleThrowButton}>Throw Error</Button>
        </form>
        <hr
          style={{
            marginTop: '10px',
            marginBottom: '20px',
            background: 'rgb(100,116,139)',
            height: '4px',
          }}
        />
        {this.state.status === 'wait' && <Spinner />}

        {this.state.status === 'error' && <h1>{this.state.error}</h1>}

        {this.state.status === 'idle' && (
          <Table
            headers={MAIN_DATA.tableHeaders}
            data={this.state.tableContent}
          />
        )}
      </main>
    );
  }
}
