import React from "react";
import apiClient from "../../utils/apiClient";
import { urls } from "../../config";
import Card from "./components/Card";
import { Modal, Button, Input, Skeleton } from 'antd';
import "./index.css";

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      currentPage: 1,
      totalPages: 1,
      isLoading: false,
      modalVisible: false,
      currentListItemId: undefined,
      text: ''
    };
  }

  covertOriginData (list) {
    if (!list || !list.map) {
      throw 'please set a array'
    }

    return list.map(item => {
      const payload = {};
      payload.id =item.id;
      payload.coverImgUrl = item.opportunity.profile_photo_urls.thumb;
      payload.coverAlt = item.opportunity.title;
      payload.linkUrl = item.url;
      payload.projectName = item.opportunity.title;
      payload.origanizationName = item.opportunity.office.full_name;
      payload.personName = item.person.full_name;
      payload.projectAim = item.opportunity.title;
      payload.description = item.opportunity.title;

      return payload;
    })
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
        const list = this.state.list.concat(this.covertOriginData(res.data.data));
        const currentPage = res.data.paging.current_page;
        const totalPages = res.data.paging.total_pages;

        this.setState({
          list,
          currentPage,
          totalPages,
          isLoading: false
        });
      },
      err => {
        this.setState({ isLoading: false });
      }
    );
  }

  handleModalOpen(id) {
    this.setState({
      currentListItemId: id,
      modalVisible: true
    })
  }

  handleModalClose() {
    this.setState({
      modalVisible: false
    })
  }

  handleSubmitChange() {
    const text = this.state.text;
    const list = [...this.state.list];
    const idx = this.state.list.findIndex((item) => item.id === this.state.currentListItemId);

    if (idx > -1) {
      list[idx].projectAim = text;
      list[idx].coverAlt = text;
      list[idx].projectName = text;
      this.setState({
        list
      })
      this.handleModalClose()
    }
  }

  componentDidMount() {
    const querySet = {
      page: this.state.currentPage
    };
    this.getOpportunityList(querySet);
  
    window.addEventListener('scroll', () => {
      var scrollTop = document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop;
      var clientHeight = document.documentElement.clientHeight?document.documentElement.clientHeight : document.body.clientHeight;
      var scrollHeight = document.documentElement.scrollHeight ? document.documentElement.scrollHeight : document.body.scrollHeight;

      if(this.state.isLoading) {
        return;
      }

      if((scrollTop + clientHeight + 50) > scrollHeight) {
        (this.state.currentPage < this.state.totalPages) && this.getOpportunityList({ page: this.state.currentPage + 1 });
      }
    })
  }

  render() {
    return (
      <div className="search-page-container">
        <div className="search-cover-picture-box">
          <p className="search-cover-picture-text">你的故事从这里开始...</p>
        </div>
        <div className="list-container">
          {this.state.list.map(item => {
            return <Card {...item} handleClick={this.handleModalOpen.bind(this)} key={item.id}></Card>;
          })}
          {this.state.isLoading && <Skeleton className="card-skeleton" active/>}
        </div>
        <Modal
          title="Change Title"
          visible={this.state.modalVisible}
          onOk={this.handleSubmitChange.bind(this)}
          onCancel={this.handleModalClose.bind(this)}
        >
          <Input onChange={(e) => (this.setState({text: e.target.value}))} />
        </Modal>
      </div>
    );
  }
}
