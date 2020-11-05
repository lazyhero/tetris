<template>
  <div class="taskmanage">
      <common-page
        page-name="需求管理"
        key-name="task"
        :form-props="formProps"
      ></common-page>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from '@/utils/vue-decorators';
import CommonPage from '@/components/page/index.vue';
import PageMixin from '@/components/page/mixin'
import { format } from 'date-fns';
import get from 'lodash/get'
import { nanoid } from 'nanoid'

@Component({
  components:{
    CommonPage
  },
})
export default class TaskManage extends Mixins(PageMixin) {
  formProps = [
      {
        field: '_id',
        type: 'input',
        title: '需求ID',
        hidden: true,
        width: '100px',
        rowKey: true,
      },
      {
        field: 'taskName',
        type: 'input',
        title: '名称',
        width: '200px',
      },
      {
        field: 'taskDate',
        type: 'DatePicker',
        title: '工期',
        props: {
          type: 'daterange',
          format: 'yyyy-MM-dd',
          placeholder: '请选择任务工期',
        }
      },
      {
        field: 'taskMemberId',
        fieldFormat: (data: any, formItem: any) => {
          const target = formItem.options.find((item: any) => {
            return item.value === data.taskMemberId
          })
          return get(target, 'label', '')
        },
        type: 'select',
        title: '成员id',
        optionSource: '/api/member',
        optionValueKey: '_id',
        optionLabelKey: 'name',
        options: [],
      }
      // {
      //   field: 'taskDays',
      //   type: 'input',
      //   title: '工时(day)',
      //   width: '100px',
      // },
    ]
}
</script>
