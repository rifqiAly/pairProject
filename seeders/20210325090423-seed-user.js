'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return queryInterface.bulkInsert('Users', [
      {
        nameuser: 'Rifqi Aly',
        username: 'iQily',
        password: 'asdasd',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nameuser: 'Aly Rifqi',
        username: 'yLiqi',
        password: 'dsadsa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down:  (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Users', null, {});
  }
};
