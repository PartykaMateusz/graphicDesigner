import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Loading } from "../../components/Loading/Loading";
import { getJobById, updateJob } from "../../actions/jobActions";
import { createRate } from "../../actions/rateActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";

import StarRatings from "../../../node_modules/react-star-ratings";

import "./Job.css";
import { finished } from "stream";

const UserInfoJob = ({ user, redirectToUserProfile }) => (
  <React.Fragment>
    <div className="row">
      <div className="col-md-3 avatar">
        <img src={user.avatar.base64} alt="Avatar" />
      </div>
      <div className="col-md-6 username">{user.username}</div>
      <div className="col-md-3 showprofile">
        <button
          type="button"
          className="btn btn-info"
          onClick={() => redirectToUserProfile(user.id)}
        >
          Profil
        </button>
      </div>
    </div>
    <div className="row mt-2 userBorder">
      <div className="col-md-4">Imię</div>
      <div className="col-md-8">{user.firstName}</div>
    </div>
    <div className="row pt-1 userBorder">
      <div className="col-md-4">Nazwisko</div>
      <div className="col-md-8">{user.lastName}</div>
    </div>
    <div className="row pt-1 userBorder">
      <div className="col-md-4">email</div>
      <div className="col-md-8">{user.email}</div>
    </div>
    <div className="row pt-1 userBorder">
      <div className="col-md-4">Numer tel.</div>
      <div className="col-md-8">{user.telNumber}</div>
    </div>
  </React.Fragment>
);

const JobInfo = ({ order }) => (
  <React.Fragment>
    <div className="row">
      <div className="col-md-4 jobSubject">
        <div className="jobSubject">{order.subject}</div>
        <div className="jobDate">{order.date}</div>
        <div className="jobPrice"> {order.price} zł</div>
      </div>
      <div className="col-md-7 jobDescription">
        <div className="text">{order.text}</div>
      </div>
    </div>
    <div className="row mt-4 mb-3 jobCategories">
      <div className="col-md-2 jobCategoriesName">Kategorie:</div>
      <div className="col-md-10 jobCategoriesList">
        <Categories list={order.categoryList} />
      </div>
    </div>
  </React.Fragment>
);

const Categories = ({ list }) => {
  if (list) {
    return list.map(item => {
      return item.name + ", ";
    });
  } else {
    return "";
  }
};

const FinishButton = ({ hideShowFinishJob }) => (
  <button
    type="button"
    className="btn btn-success btn-lg mt-4 buttonWork"
    onClick={() => hideShowFinishJob()}
  >
    Zakończ pracę
  </button>
);

class Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobId: this.props.match.params.id,
      job: {},
      comment: "",
      showFinishRate: false
    };

    this.changeRating = this.changeRating.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getJobById(this.state.jobId);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.job !== this.state.job) {
      this.setState({
        job: nextProps.job
      });
    }
  }

  redirectToUserProfile = id => {
    this.props.history.push(`/profile/${id}`);
  };

  redirectBack = () => {
    this.props.history.goBack();
  };

  generateFinishButtonIfOwner = () => {
    return (
      <div className="row mt-3">
        <div className="col-md-11">
          <FinishButton hideShowFinishJob={this.hideShowFinishJob} />
        </div>
      </div>
    );
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const finishedJob = {
      isFinished: true
    };
    this.props.updateJob(this.state.jobId, finishedJob);

    const rate = {
      comment: this.state.comment,
      rate: this.state.rating,
      jobId: this.state.jobId
    };
    this.props.createRate(rate, this.props.history);

    console.log("rate: " + JSON.stringify(rate));
  }

  hideShowFinishJob = () => {
    this.setState({
      showFinishRate: !this.state.showFinishRate
    });
  };

  changeRating(newRating, name) {
    this.setState({
      rating: newRating
    });
  }

  render() {
    if (
      this.state.job.client === undefined ||
      this.state.job.designer === undefined
    ) {
      return (
        <React.Fragment>
          <Navbar history={this.props.history} />
          <Loading />
        </React.Fragment>
      );
    } else {
      return (
        <div>
          <Navbar history={this.props.history} />

          <div className="container">
            <div className="row mt-4">
              <div className="col-md-1">
                <div className="arrowIcon">
                  <FontAwesomeIcon
                    icon={faArrowAltCircleLeft}
                    onClick={() => this.redirectBack()}
                  />
                </div>
              </div>
              <div className="col-md-10">
                <div className="row">
                  <div className="col-md-5 col-sm-12 job-user">
                    <p className="roleInfo">Klient</p>
                    <UserInfoJob
                      user={this.state.job.client}
                      redirectToUserProfile={this.redirectToUserProfile}
                    />
                  </div>
                  <div className="col-md-5 offset-md-1 col-sm-12 job-user">
                    <p className="roleInfo">Grafik</p>
                    <UserInfoJob
                      user={this.state.job.designer}
                      redirectToUserProfile={this.redirectToUserProfile}
                    />
                  </div>
                </div>
                {this.generateFinishButtonIfOwner()}
                <div className="row mt-4">
                  <div
                    className={
                      this.state.showFinishRate
                        ? "displayFinish col-md-11"
                        : "notDisplayFinish col-md-11"
                    }
                  >
                    <div>
                      <StarRatings
                        rating={this.state.rating}
                        starRatedColor="blue"
                        changeRating={this.changeRating}
                        numberOfStars={10}
                        name="rating"
                      />
                    </div>
                    <div>
                      <textarea
                        className="ratingComment"
                        value={this.state.comment}
                        onChange={this.onChange}
                        rows="4"
                        cols="50"
                        maxLength="200"
                        placeholder="Komentarz"
                        name="comment"
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        class="btn btn-success"
                        onClick={this.onSubmit}
                      >
                        Zatwierdź
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-11 job-info">
                    <JobInfo order={this.state.job.fromOrder} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

Job.propTypes = {
  getJobById: PropTypes.func.isRequired,
  updateJob: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  createRate: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile,
  job: state.job
});

export default connect(mapStateToProps, { getJobById, createRate, updateJob })(
  Job
);
