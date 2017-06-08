'use strict'

const db = require('APP/db')
    , {User, Home, Favorite, Availability, Promise, Cart} = db
    , {mapValues} = require('lodash')

function seedEverything() {
    return users()
    .then(function(users) {
      return homes()
    })
    .then(function(homes) {
      return availabilities()
    })
}


const users = seed(User, {
  yoda: {
    name: 'Yoda',
    userType: 'host',
    email: 'yoda@example.com',
    password: '1234',
    id: 1
  },
  lando: {
    name: 'Lando Calrissian',
    userType: 'host',
    email: 'lando@example.gov',
    password: '1234',
    id: 2
  },
  kirk: {
    name: 'Captain Kirk',
    userType: 'host',
    email: 'captainkirk@example.gov',
    password: '1234',
    id: 3
  },
  drWho: {
    name: 'Dr. Who',
    userType: 'host',
    email: 'drwho@example.gov',
    password: '1234',
    id: 4
  },
  stormTrooper: {
    name: 'Storm Trooper 074',
    userType: 'host',
    email: 'st074@example.gov',
    password: '1234',
    id: 5
  },
  vader: {
    name: 'Darth Vader',
    userType: 'host',
    email: 'vaded@example.gov',
    password: '1234',
    id: 6
  },
  Jabba: {
    name: 'Jabba the Hut',
    userType: 'host',
    email: 'jh@example.gov',
    password: '1234',
    id: 7
  },
  Coop: {
    name: 'Joseph Cooper',
    userType: 'host',
    email: 'jc@example.gov',
    password: '1234',
    id: 8
  },
  Thanos: {
    name: 'Thanos',
    userType: 'host',
    email: 'thanos@example.gov',
    password: '1234',
    id: 9
  }})


const homes = seed(Home, {
  yoda: {
    name: 'Yoda\'s Hut',
    location: 'Dagobah',
    description: 'Yoda\'s hut was a dwelling made by Jedi Master Yoda during his self-imposed exile on Dagobah, starting from 19 BBY. The hut was simple, constructed of mud, but utilized his E3-standard starship lifeboat model escape pod energy source. Despite this, Yoda had to draw upon the Force at all times just to hold it together. Yoda salvaged most of the parts from his escape pod to build this hut. He utilized deck grating for a solid foundation, illumination panels for lighting, and thrust nozzles for shaping his windows and doorway. He then packed mud from around the area to form the outer "shell" of his home. Then, the only matter that remained to be built was the interior.',
    imageUrl: 'https://lumiere-a.akamaihd.net/v1/images/yodas-hut_a3d1133d.jpeg?region=0%2C75%2C1560%2C880&width=768',
    price: 150,
    host_id: 1,
    id: 1
  },
  lando: {
    name: 'Lando\'s Pad',
    location: 'Cloud City',
    description: 'Suspended high among the pastel clouds of Bespin is a floating metropolis of sophisticated beauty and political freedom. Cloud City exists not only as a mining colony, extracting valuable Tibanna gas from the depths of the giant planet, but also as a sanctuary for those trying to escape the turmoil gripping the galaxy. Though profitable, Cloud City is small enough not to be noticed by larger authorities such as the Mining Guild. It prospered under the capable stewardship of Baron-Administrator Lando Calrissian. Calrissian, assisted by his aide Lobot, contended with self-sufficiency issues and labor difficulties throughout his brief term.',
    imageUrl: 'https://s-media-cache-ak0.pinimg.com/736x/a2/58/7f/a2587f87d021095a1350ce58a999494b.jpg',
    price: 150,
    host_id: 2,
    id: 2
  },
  enterprise: {
    name: 'U.S.S. Enterprise Standard Cabin',
    location: 'Boards in low earth orbit',
    description: 'A living space assigned to a temporary resident of a space station or spacecraft. Standard guest quarters on a Galaxy-class starship were considered far more luxurious than those on board a 23rd century starbase, and were not the largest quarters available. (TNG: Relics). The guest quarters aboard Deep Space 9 were located in corridor H-12-A',
    imageUrl: 'http://www.startrekuncharted.com/uploads/2/5/7/3/25731757/4231759_orig.jpg',
    price: 150,
    host_id: 3,
    id: 3
  },
  tardis: {
    name: 'Tardis',
    location: 'Boards in London',
    description: 'The TARDIS is dimensionally transcendental, meaning it’s bigger on the inside than the outside. The interior exists in a different, relative dimension to the exterior. In the very first story it was established that the TARDIS usually changes its exterior appearance on each trip to blend in with its surroundings. The Doctor later stated that it was the broken chameleon circuit that caused it to be stuck in the shape of an old style police box.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/4/48/TARDIS_console_1996.jpg',
    price: 80,
    host_id: 4,
    id: 4
  },
  deathStar1: {
    name: 'Basic 1 bedroom',
    location: 'Death Star',
    description: 'The basic structure of the station was a sphere the size of a small class-IV moon, with a kilometer-wide trench containing docking bays running around its equator. It was the very incarnation of the Tarkin Doctrine. Because of its size and shape, it was sometimes mistaken for a small moon.The first Death Star, like its successor, was divided into two hemispheres, each subdivided into 12 bridge-controlled zones. The northern hemisphere held the main armament of the station, a fearsome superlaser. This weapon had the external appearance of a bowl several kilometers wide. When activated, eight separate beams were each activated by a crystal through the particle accelerator tubes, amplified through rings, and conjoined to form one of eight separate beams that would converge outside the dish, focusing into a point to form a single incredibly powerful superlaser beam. The power settings of the superlaser were adjustable, allowing for the destruction of naval vessels and planets alike.',
    imageUrl: 'https://lumiere-a.akamaihd.net/v1/images/Death-Star-II_b5760154.jpeg?region=0%2C68%2C2160%2C1080',
    price: 100,
    host_id: 5,
    id: 5
  },
  deathStar2: {
    name: 'VIP Suite',
    location: 'Death Star',
    description: 'The basic structure of the station was a sphere the size of a small class-IV moon, with a kilometer-wide trench containing docking bays running around its equator. It was the very incarnation of the Tarkin Doctrine. Because of its size and shape, it was sometimes mistaken for a small moon.The first Death Star, like its successor, was divided into two hemispheres, each subdivided into 12 bridge-controlled zones. The northern hemisphere held the main armament of the station, a fearsome superlaser. This weapon had the external appearance of a bowl several kilometers wide. When activated, eight separate beams were each activated by a crystal through the particle accelerator tubes, amplified through rings, and conjoined to form one of eight separate beams that would converge outside the dish, focusing into a point to form a single incredibly powerful superlaser beam. The power settings of the superlaser were adjustable, allowing for the destruction of naval vessels and planets alike.',
    imageUrl: 'https://vignette3.wikia.nocookie.net/starwars/images/7/72/DeathStar1-SWE.png/revision/latest?cb=20150121020639',
    price: 200,
    host_id: 6,
    id: 6
  },
  Jabba: {
    name: 'Basic 1 Bedroom',
    location: 'Jabba the Hut\'s Palace',
    description: '"I have never seen a more sinister and depraved crowd. One would think the rest of the galaxy safe, what with every thug, debaucher, and scofflaw having gathered here." ―C-3PO, to R2-D2, commenting on the inhabitants of Jabba\'s palace',
    imageUrl: 'http://i.imgur.com/1RyZ95r.jpg',
    price: 25,
    host_id: 7,
    id: 7
  },
  CooperStation: {
    name: 'The Lodge',
    location: 'Cooper Station Space Colony',
    description: 'Cooper Station is Space Colony that resembles an O\'Neill cylinder. Named after Murphy Cooper, it is located in orbit of the planet Saturn and near the Einstein-Rosen Bridge wormhole.',
    imageUrl: 'https://s-media-cache-ak0.pinimg.com/originals/e9/ed/6f/e9ed6f0fbb87e2c086fa17725d8da4dd.jpg',
    price: 150,
    host_id: 8,
    id: 8
  },
  Xandar: {
    name: '1 bedroom apt',
    location: 'Xandar',
    description: 'Xandar is a planet in the Tranta system in the Andromeda galaxy. It is best known as the home world of the Nova Corps, an intergalactic police task force. Xandar is also the home planet of Firelord and Air-Walker, former Heralds of Galactus as well as the super-villain Supernova.',
    imageUrl: 'https://s-media-cache-ak0.pinimg.com/originals/17/f1/3a/17f13a1ea2f5674339240e0a54d787ff.jpg',
    price: 60,
    host_id: 9,
    id: 9
  }})

const availabilities = seed(Availability, {
  date1: {date: "2017-07-01", home_id: 1},
  date2: {date: "2017-07-02", home_id: 1},
  date3: {date: "2017-07-03", home_id: 1},
  date4: {date: "2017-07-04", home_id: 1},
  date5: {date: "2017-07-05", home_id: 1},
  date6: {date: "2017-07-06", home_id: 1},
  date7: {date: "2017-07-07", home_id: 1},
  date8: {date: "2017-07-08", home_id: 1},
  date9: {date: "2017-07-09", home_id: 1},
  date10: {date: "2017-07-10", home_id: 1},
  date11: {date: "2017-07-11", home_id: 1},
  date12: {date: "2017-07-12", home_id: 1},
  date13: {date: "2017-07-13", home_id: 1},
  date14: {date: "2017-07-14", home_id: 1},
  date15: {date: "2017-07-15", home_id: 1},
  date16: {date: "2017-07-16", home_id: 1},
  date17: {date: "2017-07-17", home_id: 1},
  date18: {date: "2017-07-18", home_id: 1},
  date19: {date: "2017-07-19", home_id: 1},
  date20: {date: "2017-07-20", home_id: 1},
  date21: {date: "2017-07-21", home_id: 1},
  date22: {date: "2017-07-22", home_id: 1},
  date23: {date: "2017-07-23", home_id: 1},
  date24: {date: "2017-07-24", home_id: 1},
  date25: {date: "2017-07-25", home_id: 1},
  date26: {date: "2017-07-26", home_id: 1},
  date27: {date: "2017-07-27", home_id: 1},
  date28: {date: "2017-07-28", home_id: 1},
  date29: {date: "2017-07-29", home_id: 1},
  date30: {date: "2017-07-30", home_id: 1},
  date31: {date: "2017-07-31", home_id: 1},
  date32: {date: "2017-08-01", home_id: 1},
  date33: {date: "2017-08-02", home_id: 1},
  date34: {date: "2017-08-03", home_id: 1},
  date35: {date: "2017-08-04", home_id: 1},
  date36: {date: "2017-08-05", home_id: 1},
})

if (module === require.main) {
  db.didSync
    .then(() => db.sync({force: true}))
    .then(seedEverything)
    .finally(() => process.exit(0))
}

class BadRow extends Error {
  constructor(key, row, error) {
    super(error)
    this.cause = error
    this.row = row
    this.key = key
  }

  toString() {
    return `[${this.key}] ${this.cause} while creating ${JSON.stringify(this.row, 0, 2)}`
  }
}

function seed(Model, rows) {
  return (others={}) => {
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

module.exports = Object.assign(seed, {users, homes})
