<template>
  <div class="grid-column">
      <div></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from '@/utils/vue-decorators';

@Component({
})
export default class GridColumn extends Vue {
    @Prop({
        type: Number,
        required: true,
    })
    xAxis!: number;
    @Prop({
        type: Number,
        required: true,
    })
    yAxis!: number;
    @Prop({
        type: Array,
        required: true
    })
    taskList!: any;
}
</script>
