import React, { Component } from "react";
import "./LoginForm.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllCategories } from "../../actions/categoryActions";
import { addOrder } from "../../actions/orderActions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import "./AddWorkForm.css";

const Categories = ({ categories, changeSelected }) =>
  categories.map(category => {
    return category.isSelected ? (
      category.isNew ? (
        <div
          key={category.id}
          className="alert-warning category m-1"
          onClick={() => changeSelected(category)}
        >
          {category.name}
        </div>
      ) : (
        <div
          key={category.id}
          className="alert-success category m-1"
          onClick={() => changeSelected(category)}
        >
          {category.name}
        </div>
      )
    ) : (
      <div
        key={category.id}
        className="alert-dark category m-1"
        onClick={() => changeSelected(category)}
      >
        {category.name}
      </div>
    );
  });

class AddWorkWorm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      subject: "",
      text: "",
      price: "",
      addCategory: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.changeSelected = this.changeSelected.bind(this);
  }

  componentDidMount() {
    this.props.getAllCategories();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.categories) {
      let categories = nextProps.categories.categories;
      let categoriesList = [];

      //convert object to list, and add isSelected property
      Object.keys(categories).forEach(function(key) {
        categoriesList.push({
          id: categories[key]["id"],
          name: categories[key]["name"],
          isSelected: false,
          isNew: false
        });
      });

      this.setState({
        categories: categoriesList
      });
    }
  }

  changeSelected(category) {
    let categories = [...this.state.categories];

    if (category.isNew) {
      for (var i = categories.length - 1; i >= 0; i--) {
        if (categories[i]["name"] === category["name"]) {
          categories.splice(i, 1);
        }
      }
    } else {
      category.isSelected = !category.isSelected;
    }

    this.setState({
      categories: categories
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    let allCategories = this.state.categories;
    let selectedCategories = [];

    Object.keys(allCategories).forEach(function(key) {
      if (allCategories[key].isSelected) {
        selectedCategories.push(allCategories[key]);
      }
    });

    const work = {
      user_id: this.props.profile.data.id,
      subject: this.state.subject,
      text: this.state.text,
      price: this.state.price,
      categoryList: selectedCategories
    };

    this.props.addOrder(work, this.props.history);
  }

  addOwnCategory = () => {
    //id: categories[key]["id"],
    let tempCategories = [...this.state.categories];
    let category = {
      id: 0,
      name: this.state.addCategory,
      isSelected: true,
      isNew: true
    };

    tempCategories.push(category);

    this.setState({
      categories: tempCategories,
      addCategory: ""
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Temat</label>
          <input
            className="form-control"
            placeholder="Podaj nazwę zlecenia"
            id="subject"
            name="subject"
            value={this.state.subject}
            onChange={this.onChange}
            maxLength="15"
          />
        </div>

        <div className="form-group">
          <label>Treść</label>
          <textarea
            maxLength="255"
            className="form-control"
            rows="3"
            id="text"
            name="text"
            value={this.state.text}
            onChange={this.onChange}
          />
        </div>

        <div className="form-group">
          <label>Cena</label>
          <input
            type="number"
            className="form-control"
            placeholder="Podaj cenę"
            id="price"
            name="price"
            value={this.state.price}
            onChange={this.onChange}
            maxLength="6"
          />
        </div>

        <div className="form-group">
          <div>
            <label>Wybierz kategorię:</label>
          </div>
          <div>
            <Categories
              categories={this.state.categories}
              changeSelected={this.changeSelected}
            />
          </div>
          <form>
            <div class="form-group form-inline">
              <input
                type="text"
                class="form-control"
                id="addCategory"
                name="addCategory"
                placeholder="Dodaj kategorie"
                value={this.state.addCategory}
                onChange={this.onChange}
              />
              <FontAwesomeIcon
                className="addCategoryPlus"
                icon={faPlusCircle}
                onClick={() => this.addOwnCategory()}
              />
            </div>
          </form>
        </div>

        <div>
          <button type="submit" className="btn btn-primary mt-3">
            Wyślij
          </button>
        </div>
      </form>
    );
  }
}

AddWorkWorm.propTypes = {
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
  getAllCategories: PropTypes.func.isRequired,
  addOrder: PropTypes.func.isRequired,
  categories: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  security: state.security,
  categories: state.categories,
  profile: state.profile
});

export default connect(mapStateToProps, { getAllCategories, addOrder })(
  AddWorkWorm
);
