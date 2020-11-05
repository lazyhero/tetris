<template>
  <div class="common-page">
    <div>
        <el-button size="medium" @click="handleCreate">新增{{pageName}}</el-button>
    </div>
    <el-divider></el-divider>
    <!-- data -->
    <el-table
        ref="dragTable"
        :data="data"
        border
        style="width: 100%"
        align="center"
        :row-key="getRowKey"
    >
        <el-table-column
        type="index"
        width="50">
        </el-table-column>
        <template
            v-for="(formPropItem, index) in formPropsCopy"
        >
            <el-table-column
                v-if="!formPropItem.hidden"
                :key="index"
                :prop="formPropItem.field"
                :label="formPropItem.title"
                :width="formPropItem.width"
            >
                <template slot-scope="scope">
                    <div v-if="formPropItem.type === 'Upload'" class="commonpage-column-pic">
                        <img :src="scope.row[formPropItem.field]">
                    </div>
                    <p v-else>{{getTableColumn(scope.row, formPropItem)}}</p>
                </template>
            </el-table-column>
        </template>
        <el-table-column
            width="300"
            label="操作"
        >
            <template slot-scope="scope">
                <el-button
                    @click="handleEdit(scope.row, scope.$index)"
                    type="text"
                    size="small"
                >
                    编辑
                </el-button>
                <el-button
                    @click="handleDelete(scope.row, scope.$index)"
                    type="danger"
                    size="small"
                >
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- form -->
     <el-dialog
        v-if="isShowFormDialog"
        :visible.sync="dialogVisible"
        @close="handleResetForm"
        width="30%"
    >
        <form-create
            v-if="formPropsCopy.length"
            v-model="fApi"
            :rule="formPropsCopy"
            @mounted="fcMounted"
            :option="option"
        ></form-create>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from '@/utils/vue-decorators';
import get from 'lodash/get';
import { Message } from 'element-ui';
import http from '@/utils/http';

@Component
export default class CommonPage extends Vue {
    @Prop(String)
    keyName!: string;
    @Prop(String)
    pageName!: string;
    @Prop(Array)
    formProps!: any
    
    fApi: any = {};
    data: any = [];
    dialogVisible = true;
    currentData: any = null;
    currentDataIndex = 0;
    isEdit = false;
    formPropsCopy: any = [];
    option: any = {
        submitBtn: false
    };
    isShowFormDialog = false

    getTableColumn(row: any, formPropItem: any) {
        if (typeof formPropItem.fieldFormat === 'function') {
            return formPropItem.fieldFormat(row, formPropItem);
        }
        return row[formPropItem.field];
    }
    handleResetForm() {
        this.fApi.resetFields()
        this.isEdit = false
        this.currentData = null
        this.currentDataIndex = 0
        this.isShowFormDialog = false
    }
    getRowKey(row: any) {
        const keyFormColumn = this.formProps.find((item: any) => item.rowKey);
        return row[keyFormColumn.field]
    }
    async fetchData() {
        const res = await http.get(`/api/${this.keyName}`);
        this.data = res.data || [];
    }
    handleCreate() {
        this.isShowFormDialog = true;
        this.dialogVisible = true;
    }
    async handleEdit(data: any, index: number) {
        this.isEdit = true;
        this.currentDataIndex = index;
        this.currentData = data;
        await this.$nextTick();
        this.isShowFormDialog = true;
        this.dialogVisible = true;
    }
    handleSave(formData: any) {
        console.log(formData)
        if (this.isEdit) {
            return http.put(`/api/${this.keyName}`, formData)
        }
        return http.post(`/api/${this.keyName}`, formData)
    }
    handleDelete(formData: any, index: number) {
        return http.delete(`/api/${this.keyName}`, {
            data: formData
        })
    }
    handleSubmit() {
        // 编辑 or 新增后的数据
        this.fApi.submit(async (formData: any) => {
            await this.handleSave(formData);
            // @ts-ignore
            this.$message.success('保存成功')
            this.isShowFormDialog = false
            this.fetchData()
            this.handleResetForm()
        });
    }
    fcMounted() {
        // 编辑状态给表单赋值
        this.formPropsCopy.forEach((item: any) => {
            if (this.isEdit) {
                const value = get(this.currentData, item.field);
                this.fApi.setValue(item.field, value);
            } else {
                if (typeof item.generator === 'function') {
                    this.fApi.setValue(item.field, item.generator());
                }
            }
        });
    }
    async mounted() {
        this.formPropsCopy = this.formProps;
        await this.fetchData();
    }
}
</script>
