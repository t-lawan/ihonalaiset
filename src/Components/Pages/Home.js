import React, { Component } from "react";
import Layout from "../Layout/Layout";
import styled from "styled-components";
import PortfolioEnvironment from "../../Environment/PortfolioEnvironment";
import { connect } from "react-redux";
import { setItemList } from "../../Store/action";
import { ITEM_LIST, transformItemList } from "../../Utility/Data/ItemList";

class Home extends Component {

	componentWillMount() {
    this.loadStore()
  }
	loadStore = () => {
		let itemList = transformItemList(ITEM_LIST);
		this.props.setItemList(itemList)
	}
  render(){
    return (
      <Layout>
        <PortfolioEnvironment />
      </Layout>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    item_list: state.item_list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setItemList: (itemList) => dispatch(setItemList(itemList)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
