import React from 'react'
import { Link } from 'react-router';

const Landing = () => {
  return (
    <div className='container'>
      <header className='jumbotron hero-spacer'>
        <h1>Welcome Home... Anywhere In The Universe!</h1>
        <p>Whether you're looking for a pad to crash in Andromeda or Dagobah, we've got you covered. Check out the sweet places to crash below.</p>
        <p><Link to = '/homes' className='btn btn-primary btn-large'>View all homes</Link>
        </p>
      </header>

      <hr/>

      <div className='row'>
          <div className='col-lg-12'>
              <h3>Latest Features</h3>
          </div>
      </div>

      <div className='row text-center'>

          <div className='col-md-3 col-sm-6 hero-feature'>
              <div className='thumbnail'>
                  <img src='http://placehold.it/800x500' alt=''/>
                  <div className='caption'>
                      <h3>Feature Label</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                      <p>
                          <a href='#' className='btn btn-primary'>Buy Now!</a> <a href='#' className='btn btn-default'>More Info</a>
                      </p>
                  </div>
              </div>
          </div>

          <div className='col-md-3 col-sm-6 hero-feature'>
              <div className='thumbnail'>
                  <img src='http://placehold.it/800x500' alt=''/>
                  <div className='caption'>
                      <h3>Feature Label</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                      <p>
                          <a href='#' className='btn btn-primary'>Buy Now!</a> <a href='#' className='btn btn-default'>More Info</a>
                      </p>
                  </div>
              </div>
          </div>

          <div className='col-md-3 col-sm-6 hero-feature'>
              <div className='thumbnail'>
                  <img src='http://placehold.it/800x500' alt='' />
                  <div className='caption'>
                      <h3>Feature Label</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                      <p>
                          <a href='#' className='btn btn-primary'>Buy Now!</a> <a href='#' className='btn btn-default'>More Info</a>
                      </p>
                  </div>
              </div>
          </div>

          <div className='col-md-3 col-sm-6 hero-feature'>
              <div className='thumbnail'>
                  <img src='http://placehold.it/800x500' alt='' />
                  <div className='caption'>
                      <h3>Feature Label</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                      <p>
                          <a href='#' className='btn btn-primary'>Buy Now!</a> <a href='#' className='btn btn-default'>More Info</a>
                      </p>
                  </div>
              </div>
          </div>

      </div>

      <hr />
      </div>
  )
}

export default Landing
