import { Component } from 'react';

export class InvokeError extends Component {
  componentDidMount(): void {
    throw new Error('Invoked error');
  }
  render() {
    return <h1>Error</h1>;
  }
}
