var React = require('react');
//import {React} from 'react';
var $ = require('jquery');

/*
export class BushoItem extends React.component {
  render() {
    return (
      <li className="list-group-item">{this.props.item.name}</li>
    );
  }
}
*/

var BushoItem = React.createClass({
  render: function() {
    return (
      <li className="list-group-item">{this.props.item.name}</li>
    );
  }
});

var BushoList = React.createClass({
  render: function() {
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
});

var Main = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
    $.ajax({
      url: '/san9busho.json',
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr,  status,  err) {
        console.error('Error happend');
        console.error(xhr);
        console.error(status);
        console.error(err);
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div className="container">
        <div className="page-header">
          <h1>san9busho</h1>
        </div>
      <BushoList data={this.state.data} />
      </div>
    );
  }
});

module.exports = Main;
