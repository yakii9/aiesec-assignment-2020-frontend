import React, { useState } from "react";
import "./index.css";

export default function Card(props) {
  const [isMouseOver, setMouseOverCondition] = setState(false);

  const BaseLayer = (
    <div className="baseLayer-outer-box">
      <img
        className="baseLayer-cover-img"
        src={props.coverImgUrl}
        alt={props.coverAlt}
      />
      <div className="baseLayer-info-box">
        <h3 className="baseLayer-title">{props.projectName}</h3>
        <p className="baseLayer-append-info">{`${props.personName} · ${props.date} · ${props.duration}`}</p>
        <div className="baseLayer-inner-box">
          <p className="baseLayer-organization-name">
            {props.OrganizationName}
          </p>
          <p className="baseLayer-applicant-name">
            {props.applicantNum} applicants
          </p>
        </div>
      </div>
    </div>
  );

  const OverLayer = (
    <div className="overlayer-outer-box">
      <h3 className="overLayer-Aim">{props.projectAim}</h3>
      <p className="overLayer-description">{props.description}</p>
    </div>
  );

  return (
    <div
      className="card-container"
      onMouseOver={() => setMouseOverCondition(true)}
      onMouseLeave={() => setMouseOverCondition(false)}
    >
      {isMouseOver ? <OverLayer /> : <BaseLayer />}
    </div>
  );
}
