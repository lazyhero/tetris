'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/api/member', controller.member.getMembers);
  router.post('/api/member', controller.member.addMember);
  router.delete('/api/member', controller.member.deleteMember);
  router.put('/api/member', controller.member.updateMember);
  router.get('/api/task', controller.task.getTasks);
  router.post('/api/task', controller.task.addTask);
  router.delete('/api/task', controller.task.deleteTask);
  router.put('/api/task', controller.task.updateTask);
};
