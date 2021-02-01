import React, { Component, Fragment } from 'react';
import BaseLoading from '../components/BaseLoading';

import '../style/PetsList.css';

export default class PetsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [], // 总数据
      showLoading: false, // 是否显示loading
    };
    this.fetchPetsList = this.fetchPetsList.bind(this);
    this.filterCatsAndSort = this.filterCatsAndSort.bind(this);
    this.catsList = this.catsList.bind(this);
  }

  componentDidMount() {
    this.fetchPetsList();
  }

  async fetchPetsList() {
    this.setState({
      showLoading: true,
    });
    try {
      const resRaw = await fetch(
        'https://5c92dbfae7b1a00014078e61.mockapi.io/owners'
      );
      const resJson = await resRaw.json();
      this.setState({
        list: resJson,
      });
    } catch (e) {
      alert(e);
    } finally {
      this.setState({
        showLoading: false,
      });
    }
  }

  filterCatsAndSort(arr) {
    const catsArr = arr.filter(pet => pet.type === 'Cat');
    catsArr.sort((a, b) => a.name.localeCompare(b.name));
    return catsArr;
  }

  catsList() {
    return this.state.list.reduce((acc, cur) => {
      acc[cur.gender] = cur.pets ? this.filterCatsAndSort([...cur.pets]) : [];
      return acc;
    }, {});
  }

  render() {
    const catsList = this.catsList();
    return (
      <div>
        <ul className="pets-list">
          {Object.keys(catsList).map(key => {
            return (
              <Fragment key={key}>
                <h4>{key}</h4>
                {catsList[key].map(cat => {
                  return <li key={cat.name}>{cat.name}</li>;
                })}
              </Fragment>
            );
          })}
        </ul>
        <BaseLoading isShow={this.state.showLoading} />
      </div>
    );
  }
}
