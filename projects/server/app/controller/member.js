'use strict';

const Controller = require('egg').Controller;

class MemberController extends Controller {
  async getMembers() {
    const { ctx } = this;
    const members = await ctx.model.Member.find({})
    ctx.body = {
        code: 1,
        data: members,
    };
  }
  async addMember() {
    const { ctx } = this;
    await ctx.model.Member.create(ctx.request.body)
    ctx.body = {
        code: 1,
    };
  }
  async deleteMember() {
    const { ctx } = this;
    const member = ctx.request.body;
    await ctx.model.Member.deleteOne({
      _id: member._id
    }, () => {})
    ctx.body = {
        code: 1,
    };
  }
  async updateMember() {
    const { ctx } = this;
    const member = ctx.request.body;
    await ctx.model.Member.updateOne({
      _id: member._id
    }, member)
    ctx.body = {
        code: 1,
    };
  }
}

module.exports = MemberController;
