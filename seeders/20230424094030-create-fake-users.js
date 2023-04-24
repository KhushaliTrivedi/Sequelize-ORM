'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

  await queryInterface.bulkInsert('users', [{
     name: 'John Doe',
     email: 'admin@gmail.com',
     role: 'admin',
     uuid: '4e142475-6b91-4aa4-ac7b-856463e870a0',
     createdAt: '2023-04-24T09:23:48.230Z',
     updatedAt: '2023-04-24T09:23:48.230Z'
  },{
    name: 'Khushali Trivedi',
    email: 'admin@gmail.com',
    role: 'admin',
    uuid: '4e142475-6b91-4aa4-ac7b-856463e780a0',
    createdAt: '2023-04-24T09:23:48.230Z',
    updatedAt: '2023-04-24T09:23:48.230Z'
 }], {});
},

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
    */
    await queryInterface.bulkDelete('users', null, {});
  }
};
