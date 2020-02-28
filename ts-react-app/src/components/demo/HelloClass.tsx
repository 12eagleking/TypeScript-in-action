import React from 'react'
import { Button } from 'antd'

// interface Props {
//   name: string;
//   firstName: string;
//   lastName: string;
// }

// class Hello extends React.Component<Props, null> {
//   render() {
//     return (
//       <Button>Hello {this.props.name}</Button>
//     )
//   }
// }

// export default Hello

interface Greeting {
  name: string;
  firstName?: string;
  lastName?: string;
}

interface State {
  count: number;
}

class Hello extends React.Component<Greeting, State> {
  state: State = {
    count: 0
  }
  static defaultProps = {
    firstName: '',
    lastName: ''
  }
  render() {
    return (
      <>
        <p>你点击了 {this.state.count} 次</p>
        <Button onClick={() => {this.setState({ count: this.state.count + 1 })}}>
          Hello {this.props.name}
        </Button>
      </>
    )
  }
}

export default Hello