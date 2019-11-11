import React, { Component } from "react";
import { ROLE_USER, ROLE_DESIGNER } from "../../actions/types";

export const Stats = ({
  role,
  actualProposals,
  allProposals,
  actualJobs,
  allJobs
}) => {
  if (role === ROLE_USER) {
    return (
      <div className="information-box">
        <div className="row">
          <div className="col-md-3">
            <div class="badge badge-info">{actualProposals}</div>
            <div>Aktualne zlecenia</div>
          </div>
          <div className="col-md-3">
            <div class="badge badge-info">{allProposals}</div>{" "}
            <div>Wszystkie zlecenia</div>
          </div>
          <div className="col-md-3">
            <div class="badge badge-info">{actualJobs}</div>{" "}
            <div>Aktualne Prace</div>
          </div>
          <div className="col-md-3">
            <div class="badge badge-info">{allJobs}</div>{" "}
            <div>Zakończone prace</div>
          </div>
        </div>
      </div>
    );
  }
  if (role === ROLE_DESIGNER) {
    return (
      <div className="information-box">
        <div className="row">
          <div className="col-md-3">
            <div class="badge badge-info">{actualProposals}</div>
            <div>Aktualne zgłoszenia</div>
          </div>
          <div className="col-md-3">
            <div class="badge badge-info">{allProposals}</div>{" "}
            <div>Wszystkie zgłoszenia</div>
          </div>
          <div className="col-md-3">
            <div class="badge badge-info">{actualJobs}</div>{" "}
            <div>Aktualne Prace</div>
          </div>
          <div className="col-md-3">
            <div class="badge badge-info">{allJobs}</div>{" "}
            <div>Zakończone prace</div>
          </div>
        </div>
      </div>
    );
  }
};
