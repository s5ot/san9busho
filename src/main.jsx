import React from 'react';
import $ from 'jquery';

class BushoItem extends React.Component {
  render() {
    return (
      <li className="list-group-item">{this.props.item.name}</li>
    );
  }
}

class BushoList extends React.Component {
  render() {
    var items = this.props.data.map((busho) => {
      return (
        <BushoItem item={busho}/>
      );
    });

    return (
      <ul class="list-group">
      {items}
      </ul>
    );
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  componentDidMount() {
    $.ajax({
      url: '/san9busho.json',
      dataType: 'json',
      type: 'GET',
      success: (data) => {
        this.setState({data: data});
      },
      error: (xhr,  status,  err) => {
        console.error('Error happend');
        console.error(xhr);
        console.error(status);
        console.error(err);
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div className="page-header">
          <h1>san9busho</h1>
        </div>
      <BushoList data={this.state.data} />
      </div>
    );
  }
}

module.exports = Main;
