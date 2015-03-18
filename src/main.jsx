import React from "react";
import $ from "jquery";
import Store from "./store";
import _ from 'underscore';

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

import action from "./action";

var SearchForm = React.createClass ({

  getInitialState() {
    return {name: ''};
  },

  componentWillMount: function() {
    this.delayedSearchByName = _.debounce(function(e) {
      action.searchByName(e.target.value);
    }, 500);

    action.searchByName('');
  },

  onNameChange: function(e) {
    e.persist();
    this.delayedSearchByName(e);
  },

  render() {
    return (
      <div className="container">
        <form>
          <div className="form-group">
            <input type="name" className="form-control" placeholder="name" onChange={this.onNameChange} />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <div className="form-group">
            <label for="exampleInputFile">File input</label>
            <input type="file" id="exampleInputFile" />
            <p className="help-block">Example block-level help text here.</p>
          </div>
          <div class="checkbox">
            <label>
            <input type="checkbox" /> Check me out
            </label>
          </div>
        </form>
      </div>
    );
  }
});

export default React.createClass({
  displayName: 'Main',

  getInitialState() {
    return {
      data: Store.getAll()
    };
  },

  _onChange: function() {
    console.log(this);
    this.setState({data: Store.getAll()});
  },

  componentDidMount() {
    Store.addChangeListener(this._onChange.bind(this));

    /*
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
    */
 },

  componentWillUnmount() {
    Store.removeChangeListener(this._onChange.bind(this));
  },

  render() {
    return (
      <div className="container">
        <div className="page-header">
          <h1>san9busho</h1>
        </div>
      <SearchForm />
      <BushoList data={this.state.data} />
      </div>
    );
  }
});

//module.exports = Main;
//export default Main;
