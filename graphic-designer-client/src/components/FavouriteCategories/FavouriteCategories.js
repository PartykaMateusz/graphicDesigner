import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFavouriteCategories } from "../../actions/categoryActions";
import { Loading } from "../Loading/Loading";
import { List } from "antd";
import "./favouriteCategories.css";

const MyItem = ({ name }) => <div className="favouriteCategory">{name}</div>;

class FavouriteCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      favouriteCategories: {}
    };
  }

  componentDidMount() {
    this.props.getFavouriteCategories(this.state.userId, 5);
  }

  componentWillUpdate(nextProps) {
    if (
      nextProps.categories.favouriteCategories !==
      this.state.favouriteCategories
    ) {
      this.setState({
        favouriteCategories: nextProps.categories.favouriteCategories
      });
    }
    if (nextProps.userId !== this.state.userId) {
      this.setState({
        userId: nextProps.userId
      });
      this.props.getFavouriteCategories(nextProps.userId, 5);
    }
  }

  componentReceiveProps(nextProps) {
    if (
      nextProps.categories.favouriteCategories !==
      this.state.favouriteCategories
    ) {
      this.setState({
        favouriteCategories: nextProps.categories.favouriteCategories
      });
    }
  }

  convertToArray = categories => {
    let tempCategories = [];

    Object.keys(categories).forEach(function(key) {
      tempCategories.push(categories[key]);
    });

    return tempCategories;
  };

  render() {
    if (this.state.favouriteCategories === undefined) {
      console.log("undevined");
      return (
        <React.Fragment>
          <Loading />
        </React.Fragment>
      );
    }
    if (this.state.favouriteCategories.length === 0) {
      console.log("zero");
      return <div></div>;
    } else {
      return (
        <div className="profile-work favouriteCategories">
          <p>Ulubione Kategorie</p>
          <List
            itemLayout="horizontal"
            dataSource={this.convertToArray(this.state.favouriteCategories)}
            bordered={true}
            renderItem={item => <MyItem name={item.name} />}
          />
        </div>
      );
    }
  }
}

FavouriteCategories.propTypes = {
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  security: state.security,
  categories: state.categories
});

export default connect(mapStateToProps, { getFavouriteCategories })(
  FavouriteCategories
);
