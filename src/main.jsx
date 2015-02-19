import React from "react";
import $ from "jquery";
import store from "./store";

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

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: ''};
  }

  handleNameChange(e) {
    action.searchByName(e.target.value);
  }

  render() {
    return (
      <div className="container">
        <form>
          <div className="form-group">
            <input type="name" className="form-control" placeholder="name" onChange={this.handleNameChange} />
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
      <SearchForm />
      <BushoList data={this.state.data} />
      </div>
    );
  }
}

module.exports = Main;
