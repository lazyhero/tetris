<template>
    <div class="grid-cell">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from '@/utils/vue-decorators';

@Component({
})
export default class GridRow extends Vue {
}
</script>
