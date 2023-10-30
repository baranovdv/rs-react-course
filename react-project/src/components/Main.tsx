import { Component } from 'react';
import { COMMON_DATA } from '../data/data';
import { AppStatus, ResponseData, ResultData, TableRow } from '../data/types';
import { Menu } from './Menu';
import { Spinner } from './Spinner';
import { Table } from './Table';

interface MainInterface {
  state: {
    status: AppStatus;
    tableContent: TableRow[];
    error: string;
  };
}

export class Main extends Component<MainInterface['state']> {
  state = {
    status: 'idle',
    tableContent: [],
    error: '',
  };

  handleSearch = (query: string): void => {
    this.fetchData(query.trim().toLowerCase());
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
    fetch(COMMON_DATA.APIurl + q)
      .then((response) => response.json())
      .then((data: ResponseData) => {
        if (data.error) {
          throw new Error(data.error);
        }
        const tableData = data.results?.map((item) =>
          this.convertToTableRow(item)
        );
        this.setState({
          tableContent: tableData,
          status: 'idle',
        });
        localStorage.setItem(COMMON_DATA.localStorageQuery, query || '');
      })
      .catch((e: Error) => {
        this.setState({
          status: 'error',
          error: e.message,
        });
      });
  };

  componentDidMount(): void {
    const query = localStorage.getItem(COMMON_DATA.localStorageQuery);
    this.setState({
      searchInput: query,
    });
    this.fetchData(query ?? '');
  }

  render() {
    return (
      <main className="py-4 px-5 bg-slate-300">
        <Menu
          onSearchButton={this.handleSearch}
          inputLabel={COMMON_DATA.inputLabel}
        />
        <hr
          style={{
            marginTop: '10px',
            marginBottom: '20px',
            background: 'rgb(100,116,139)',
            height: '4px',
          }}
        />
        {this.state.status === 'wait' && <Spinner />}

        {this.state.status === 'error' && (
          <h1 className="py-4 text-2xl font-bold">
            Error message: {this.state.error}
          </h1>
        )}

        {this.state.status === 'idle' && (
          <Table
            headers={COMMON_DATA.tableHeaders}
            data={this.state.tableContent}
          />
        )}
      </main>
    );
  }
}
