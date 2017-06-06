'use strict'

const db = require('APP/db')
    , {Home, User, Transaction, Promise} = db
    , {mapValues} = require('lodash')

function seedEverything() {
  const seeded = {
    users: users(),
    homes: homes(),
    transactions: transactions()
  }

  seeded.favorites = favorites(seeded)

  return Promise.props(seeded)
}

//convert seed to JSON
//keep naming conventions consistent so you can utilize destructuring
//export seed file and import here

const users = seed(User, {
  yoda: {
    name: 'Yoda',
    email: 'yoda@example.com',
    password: '1234',
  },
  lando: {
    name: 'Lando Calrissian',
    email: 'lando@example.gov',
    password: '1234'
  },
  kirk: {
    name: 'Captain Kirk',
    email: 'captainkirk@example.gov',
    password: '1234'
  },
  drWho: {
    name: 'Dr. Who',
    email: 'drwho@example.gov',
    password: '1234'
  },
  stormTrooper: {
    name: 'Storm Trooper 074',
    email: 'st074@example.gov',
    password: '1234'
  },
  vader: {
    name: 'Darth Vader',
    email: 'vaded@example.gov',
    password: '1234'
  },
  Jabba: {
    name: 'Jabba the Hut',
    email: 'jh@example.gov',
    password: '1234'
  },
  Coop: {
    name: 'Joseph Cooper',
    email: 'jc@example.gov',
    password: '1234'
  },
  Thanos: {
    name: 'Thanos',
    email: 'thanos@example.gov',
    password: '1234'
  }
})

const homes = seed(Home, {

  yoda: {
    name: 'Yoda\'s Hut',
    location: 'Dagobah',
    description: 'Yoda\'s hut was a dwelling made by Jedi Master Yoda during his self-imposed exile on Dagobah, starting from 19 BBY. The hut was simple, constructed of mud, but utilized his E3-standard starship lifeboat model escape pod energy source. Despite this, Yoda had to draw upon the Force at all times just to hold it together. Yoda salvaged most of the parts from his escape pod to build this hut. He utilized deck grating for a solid foundation, illumination panels for lighting, and thrust nozzles for shaping his windows and doorway. He then packed mud from around the area to form the outer "shell" of his home. Then, the only matter that remained to be built was the interior.',
    imgUrl: '',
    price: '$100',
    startDate: '',
    endDate: ''
  },
  lando: {
    name: 'Lando\'s Pad',
    location: 'Cloud City',
    description: 'Suspended high among the pastel clouds of Bespin is a floating metropolis of sophisticated beauty and political freedom. Cloud City exists not only as a mining colony, extracting valuable Tibanna gas from the depths of the giant planet, but also as a sanctuary for those trying to escape the turmoil gripping the galaxy. Though profitable, Cloud City is small enough not to be noticed by larger authorities such as the Mining Guild. It prospered under the capable stewardship of Baron-Administrator Lando Calrissian. Calrissian, assisted by his aide Lobot, contended with self-sufficiency issues and labor difficulties throughout his brief term.',
    imgUrl: '',
    price: '$400',
    startDate: '',
    endDate: ''
  },
  enterprise: {
    name: 'U.S.S. Enterprise Standard Cabin',
    location: 'Boards in low earth orbit',
    description: 'A living space assigned to a temporary resident of a space station or spacecraft. Standard guest quarters on a Galaxy-class starship were considered far more luxurious than those on board a 23rd century starbase, and were not the largest quarters available. (TNG: Relics). The guest quarters aboard Deep Space 9 were located in corridor H-12-A',
    imgUrl: '',
    price: '',
    startDate: '',
    endDate: ''
  },
  tardis: {
    name: 'Tardis',
    location: 'Boards in London',
    description: 'The TARDIS is dimensionally transcendental, meaning it’s bigger on the inside than the outside. The interior exists in a different, relative dimension to the exterior. In the very first story it was established that the TARDIS usually changes its exterior appearance on each trip to blend in with its surroundings. The Doctor later stated that it was the broken chameleon circuit that caused it to be stuck in the shape of an old style police box.',
    imgUrl: '',
    price: '',
    startDate: '',
    endDate: ''
  },
  deathStar1: {
    name: 'Basic 1 bedroom',
    location: 'Death Star',
    description: 'The basic structure of the station was a sphere the size of a small class-IV moon, with a kilometer-wide trench containing docking bays running around its equator. It was the very incarnation of the Tarkin Doctrine. Because of its size and shape, it was sometimes mistaken for a small moon.The first Death Star, like its successor, was divided into two hemispheres, each subdivided into 12 bridge-controlled zones. The northern hemisphere held the main armament of the station, a fearsome superlaser. This weapon had the external appearance of a bowl several kilometers wide. When activated, eight separate beams were each activated by a crystal through the particle accelerator tubes, amplified through rings, and conjoined to form one of eight separate beams that would converge outside the dish, focusing into a point to form a single incredibly powerful superlaser beam. The power settings of the superlaser were adjustable, allowing for the destruction of naval vessels and planets alike.',
    imgUrl: '',
    price: '',
    startDate: '',
    endDate: ''
  },
  deathStar2: {
    name: 'VIP Suite',
    location: 'Death Star',
    description: 'The basic structure of the station was a sphere the size of a small class-IV moon, with a kilometer-wide trench containing docking bays running around its equator. It was the very incarnation of the Tarkin Doctrine. Because of its size and shape, it was sometimes mistaken for a small moon.The first Death Star, like its successor, was divided into two hemispheres, each subdivided into 12 bridge-controlled zones. The northern hemisphere held the main armament of the station, a fearsome superlaser. This weapon had the external appearance of a bowl several kilometers wide. When activated, eight separate beams were each activated by a crystal through the particle accelerator tubes, amplified through rings, and conjoined to form one of eight separate beams that would converge outside the dish, focusing into a point to form a single incredibly powerful superlaser beam. The power settings of the superlaser were adjustable, allowing for the destruction of naval vessels and planets alike.',
    imgUrl: '',
    price: '',
    startDate: '',
    endDate: ''
  },
  Jabba: {
    name: 'Basic 1 Bedroom',
    location: 'Jabba the Hut\'s Palace',
    description: '"I have never seen a more sinister and depraved crowd. One would think the rest of the galaxy safe, what with every thug, debaucher, and scofflaw having gathered here." ―C-3PO, to R2-D2, commenting on the inhabitants of Jabba\'s palace',
    imgUrl: '',
    price: '',
    startDate: '',
    endDate: ''
  },
  Cooper: {
    name: 'The Lodge',
    location: 'Cooper Station Space Colony',
    description: 'Cooper Station is Space Colony that resembles an O\'Neill cylinder. Named after Murphy Cooper, it is located in orbit of the planet Saturn and near the Einstein-Rosen Bridge wormhole.',
    imgUrl: 'https://s-media-cache-ak0.pinimg.com/originals/e9/ed/6f/e9ed6f0fbb87e2c086fa17725d8da4dd.jpg',
    price: '',
    startDate: '',
    endDate: ''
  },
  Xandar: {
    name: '1 bedroom apt',
    location: 'Xandar',
    description: 'Xandar is a planet in the Tranta system in the Andromeda galaxy. It is best known as the home world of the Nova Corps, an intergalactic police task force. Xandar is also the home planet of Firelord and Air-Walker, former Heralds of Galactus as well as the super-villain Supernova.',
    imgUrl: 'https://s-media-cache-ak0.pinimg.com/originals/17/f1/3a/17f13a1ea2f5674339240e0a54d787ff.jpg',
    price: '',
    startDate: '',
    endDate: ''
  }
})

const transactions = seed(Transaction, {
  god: {
    email: 'god@example.com',
    name: 'So many names',
    password: '1234',
  },
  barack: {
    name: 'Barack Obama',
    email: 'barack@example.gov',
    password: '1234'
  },
})

// seed(Model: Sequelize.Model, rows: Function|Object) ->
//   (others?: {...Function|Object}) -> Promise<Seeded>
//
// Takes a model and either an Object describing rows to insert,
// or a function that when called, returns rows to insert. returns
// a function that will seed the DB when called and resolve with
// a Promise of the object of all seeded rows.
//
// The function form can be used to initialize rows that reference
// other models.
function seed(Model, rows) {
  return (others ={}) => {
    if (typeof rows === 'function') {
      rows = Promise.props(
        mapValues(others,
          other =>
            // Is other a function? If so, call it. Otherwise, leave it alone.
            typeof other === 'function' ? other() : other)
      ).then(rows)
    }

    return Promise.resolve(rows)
      .then(rows => Promise.props(
        Object.keys(rows)
          .map(key => {
            const row = rows[key]
            return {
              key,
              value: Promise.props(row)
                .then(row => Model.create(row)
                  .catch(error => { throw new BadRow(key, row, error) })
                )
            }
          }).reduce(
            (all, one) => Object.assign({}, all, {[one.key]: one.value}),
            {}
          )
        )
      )
      .then(seeded => {
        console.log(`Seeded ${Object.keys(seeded).length} ${Model.name} OK`)
        return seeded
      }).catch(error => {
        console.error(`Error seeding ${Model.name}: ${error} \n${error.stack}`)
      })
  }
}

module.exports = Object.assign(seed, {users, homes, transactions})
