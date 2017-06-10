import React, { Component } from 'react'
import { Link } from 'react-router'

const HomeInformationForm = (props) => {
  return (
    <div>
      <form onSubmit = {props.handleSubmit}>
        <div className = "form-group row">
          <div className = "col-sm-3">
            <h3>Home name:</h3>
          </div>
          <div className = "col-sm-9">
            <input
              type="text"
              className="form-control"
              name="homeName"
              value = {props.homeName}
              onChange = {props.handleChange}
              placeholder = "Name"
            />
          </div>
        </div>
        <div className = "form-group row">
          <div className = "col-sm-3">
            <h3>Location:</h3>
          </div>
          <div className = "col-sm-9">
            <input
              type="text"
              className="form-control"
              name="homeLocation"
              placeholder = "Location"
              value = {props.homeLocation}
              onChange = {props.handleChange}
              />
          </div>
        </div>
        <div className = "form-group row">
          <div className = "col-sm-3">
            <h3>Image URL:</h3>
          </div>
          <div className = "col-sm-9">
            <input
              type="text"
              className="form-control"
              name="homeImageUrl"
              placeholder="Image URL"
              value = {props.homeImageUrl}
              onChange = {props.handleChange}
              />
          </div>
        </div>
        <div className = "form-group row">
          <div className = "col-sm-3">
            <h3>Price/Night:</h3>
          </div>
          <div className = "col-sm-9">
            <input
              type="number"
              className="form-control"
              name="homePrice"
              placeholder = "Price"
              value = {props.homePrice}
              onChange = {props.handleChange}
              />
          </div>
        </div>
        <div className = "form-group">
          <h3>Description:</h3>
          <textarea
            className="form-control"
            name="homeDescription"
            placeholder="Description"
            rows="5"
            value = {props.homeDescription}
            onChange = {props.handleChange}
          />
        </div>

        <button type = "submit" className = "btn btn-primary" onSubmit={props.handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default HomeInformationForm;
