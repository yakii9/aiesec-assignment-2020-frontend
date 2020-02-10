import React from "react";
import apiClient from "../../utils/apiClient";
import { urls } from "../../config";
import Card from "./components/Card";
import "./index.css";

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
      <div className="search-page-container">
        <div className="search-cover-picture-box">
          <p className="search-cover-picture-text">你的故事从这里开始...</p>
        </div>
        {this.state.list.map(item => {
          return <Card {...item} key={item.id}></Card>;
        })}
      </div>
    );
  }
}
