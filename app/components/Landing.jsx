import React from 'react'
import { Link } from 'react-router';

const Landing = (props) => {
  const latestHomes = props.latest
  return (
    <div className='container'>
      <header className='jumbotron hero-spacer'>
        <h1>Welcome Home... Anywhere In The Universe!</h1>
        <p>Whether you're looking for a pad to crash in Andromeda or Dagobah, we've got you covered. Check out the sweet places to stay below.</p>
        <p><Link to = '/homes' className='btn btn-primary btn-large'>View all homes</Link>
        </p>
      </header>

      <hr/>

      <div className='row'>
          <div className='col-lg-12'>
              <h3>Latest Homes Available</h3>
          </div>
      </div>

      <div className='row text-center'>

          {latestHomes.map(home => {
            return (
                <div key={home.id} className='col-md-3 col-sm-6 hero-feature'>
                    <div className='thumbnail'>
                        <img src={home.imageUrl} alt=''/>
                        <div className='caption'>
                            <h3>{home.name}</h3>
                            <p>{home.excerpt}</p>
                            <p>
                                <Link to={`/homes/${home.id}`} className='btn btn-primary'>More Info</Link>
                            </p>
                        </div>
                    </div>
                </div>
            )
          }
          )}

      </div>

      <hr />
      </div>
  )
}

export default Landing
