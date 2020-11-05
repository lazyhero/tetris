'use strict';

const Controller = require('egg').Controller;

class TaskController extends Controller {
  async getTasks() {
    const { ctx } = this;
    const tasks = await ctx.model.Task.find({})
    ctx.body = {
        code: 1,
        data: tasks,
    };
  }
  async addTask() {
    const { ctx } = this;
    await ctx.model.Task.create(ctx.request.body)
    ctx.body = {
        code: 1,
    };
  }
  async deleteTask() {
    const { ctx } = this;
    const task = ctx.request.body;
    await ctx.model.Task.deleteOne({
        _id: task._id
    }, () => {})
    ctx.body = {
        code: 1,
    };
  }
  async updateTask() {
    const { ctx } = this;
    const task = ctx.request.body;
    await ctx.model.Task.updateOne({
        _id: task._id
    }, task)
    ctx.body = {
        code: 1,
    };
  }
}

module.exports = TaskController;
