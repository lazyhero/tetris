'use strict';
const egg = require('egg');
module.exports = class IndexService extends egg.Service {
  constructor(ctx) {
    super(ctx);
    this.ctx = ctx;
  }

  async getList() {
    return {};
  }
};