import React, { Component } from "react";

export const UserStats = ({ profile }) => (
  <React.Fragment>
    <div className="row">
      <div className="col-md-6">
        <label>Aktualne zlecenia</label>
      </div>
      <div className="col-md-6">
        <p>{profile.actualOrderNumber}</p>
      </div>
    </div>

    <div className="row">
      <div className="col-md-6">
        <label>Wszystkie zlecenia</label>
      </div>
      <div className="col-md-6">
        <p>{profile.allOrderNumber}</p>
      </div>
    </div>

    <div className="row">
      <div className="col-md-6">
        <label>Aktualne prace</label>
      </div>
      <div className="col-md-6">
        <p>{profile.actualJobsNumber}</p>
      </div>
    </div>

    <div className="row">
      <div className="col-md-6">
        <label>Zakończone prace</label>
      </div>
      <div className="col-md-6">
        <p>{profile.finishedJobsNumber}</p>
      </div>
    </div>
  </React.Fragment>
);

export const DesignerStats = ({ profile }) => (
  <React.Fragment>
    <div className="row">
      <div className="col-md-6">
        <label>Aktualne zgłoszenia</label>
      </div>
      <div className="col-md-6">
        <p>{profile.actualProposalsNumber}</p>
      </div>
    </div>

    <div className="row">
      <div className="col-md-6">
        <label>Wszystkie zgłoszenia</label>
      </div>
      <div className="col-md-6">
        <p>{profile.allProposalsNumber}</p>
      </div>
    </div>

    <div className="row">
      <div className="col-md-6">
        <label>Aktualne prace</label>
      </div>
      <div className="col-md-6">
        <p>{profile.actualJobsNumber}</p>
      </div>
    </div>

    <div className="row">
      <div className="col-md-6">
        <label>Zakończone prace</label>
      </div>
      <div className="col-md-6">
        <p>{profile.finishedJobsNumber}</p>
      </div>
    </div>
  </React.Fragment>
);
