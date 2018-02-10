module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'statlyzer_data'
    },
    seeds: {
      directory: './seeds'
    }
  },

  test: {
    client: 'postgresql',
    connection: {
      database: 'statlyzer_data_test'
    },
    seeds: {
      directory: __dirname + '/db/seeds/test'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: ''
    },
  }

};
