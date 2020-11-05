<template>
  <div class="membermanage">
      <common-page
        page-name="人员管理"
        key-name="member"
        :form-props="formProps"
      ></common-page>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from '@/utils/vue-decorators';
import CommonPage from '@/components/page/index.vue';

@Component({
  components:{
    CommonPage
  }
})
export default class MemberManage extends Vue {
  formProps = [
      {
        field: '_id',
        title: '成员ID',
        width: '100px',
        hidden: true,
        rowKey: true,
      },
      {
        field: 'name',
        type: 'input',
        title: '成员名称',
      },
    ]
}
</script>
