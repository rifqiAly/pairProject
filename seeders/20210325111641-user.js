'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     let sample = 
     [
       {
       username : "aly123",
       password : "pairproject",
       first_name : "rifqi",
       last_name : "aly",
       gender : "male",
       email : "aly1@mail.com",
       createdAt : new Date(),
       updatedAt : new Date()
      },
      {
        username : "majid123",
        password : "pairproject",
        first_name : "Abdul",
        last_name : "Majid",
        gender : "male",
        email : "abdul123@mail.com",
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ]
    return queryInterface.bulkInsert('Users', sample)
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
