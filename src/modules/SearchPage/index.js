import React from "react";
import apiClient from "../../utils/apiClient";
import { urls } from "../../config";
import Card from "./components/Card";

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      currentPage: 1,
      totalPages: 1,
      isLoading: false
    };
  }

  getOpportunityList(params) {
    if (this.state.isLoading) {
      return false;
    }

    this.setState({ isLoading: true });
    apiClient.get(
      urls.opportunities,
      params,
      res => {
        const list = res.data.data;
        const currentPage = res.data.paging.current_page;
        const totalPages = res.data.paging.total_pages;

        this.setState({
          list,
          currentPage,
          totalPages
        });
      },
      err => {
        this.setState({ isLoading: false });
      }
    );
  }

  componentDidMount() {
    const querySet = {
      page: this.state.currentPage
    };
    this.getOpportunityList(querySet);
  }

  render() {
    return (
      <div className="container">
        {this.state.list.map(item => {
          return <Card key={item.id}></Card>;
        })}
      </div>
    );
  }
}
