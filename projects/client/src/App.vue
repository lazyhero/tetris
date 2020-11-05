<template>
  <div id="app">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose">
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">
                <router-link to="/">任务面板</router-link>
              </span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-document"></i>
              <span slot="title">
                <router-link to="/task">任务管理</router-link>
              </span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <span slot="title">
                <router-link to="/member">成员管理</router-link>
              </span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from '@/utils/vue-decorators';

@Component
export default class App extends Vue {
  handleOpen() {}
  handleClose() {}
}
</script>

<style lang="stylus">
</style>
