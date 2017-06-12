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
              name="name"
              value = {props.name}
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
              name="location"
              placeholder = "Location"
              value = {props.location}
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
              name="imageUrl"
              placeholder="Image URL"
              value = {props.imageUrl}
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
              name="price"
              placeholder = "Price"
              value = {props.price}
              onChange = {props.handleChange}
              />
          </div>
        </div>
        <div className = "form-group">
          <h3>Description:</h3>
          <textarea
            className="form-control"
            name="description"
            placeholder="Description"
            rows="5"
            value = {props.description}
            onChange = {props.handleChange}
          />
        </div>

        <button type = "submit" className = "btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default HomeInformationForm;
