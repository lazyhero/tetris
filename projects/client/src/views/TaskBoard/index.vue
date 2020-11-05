<template>
<div class="taskboard">
    <div class="total">
        <p>等待落下</p>
        <div class="total-tasks">
            <div class="total-tasks-task" v-for="task in unAssignmentTasks" :key="task.taskId">
                {{task.taskName}}
            </div>
        </div>
    </div>
    <el-divider></el-divider>
    <div class="tetris">
        <div
            class="tetris-degree-y"
            v-for="(degree, index) in dateDegrees"
            :key="degree"
            :style="{bottom: `${index * 50}px`}"
        >
            <span>{{index === 6 ? `7天 ${degree}` : degree}}</span>
        </div>
        <div
            class="tetris-column"
            v-for="(member) in memberTaskData"
            :key="member._id"
        >
            <div class="tetris-column-task">
                <div
                    class="task-block"
                    v-for="(task, taskIndex) in member.tasks"
                    :key="taskIndex"
                    :style="{height: `${task.height}px`}"
                >
                    {{task.taskName}}
                </div>
            </div>
            <span class="tetris-column-member">{{member.name}}</span>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from '@/utils/vue-decorators'
import { format, differenceInDays, isAfter } from 'date-fns'
import http from '@/utils/http'

const DAY = 24 * 3600 * 1000
const TASK_WIDTH = 120;
const TASK_HEIGHT = 50;

@Component
export default class TaskBoard extends Vue {
    curDateTime = format(new Date(), 'yyyy-MM-dd')
    middleDateTime = format(new Date().getTime() + 7 * DAY, 'yyyy-MM-dd')
    dateDegreeSize: number = 13
    dateDegrees: any[] = []
    members: any[] = []
    tasks: any[] = []
    memberTaskData: any[] = []

    get unAssignmentTasks() {
        return this.tasks.filter((item: any) => {
            return !item.taskMemberId
        })
    }

    generateDateDegrees() {
        const curDate = new Date().getTime();
        const dateDegrees: any[] = [curDate];
        for (let i = 1; i <= this.dateDegreeSize; i++) {
            const prevDate = dateDegrees[i - 1]
            dateDegrees.push(prevDate + DAY)
        }
        this.dateDegrees = dateDegrees.map((item: any) => {
            return format(item, 'yyyy-MM-dd');
        });
    }

    async getMembers() {
        const res = await http.get('/api/member');
        this.members = res.data || []
    }

    async getTasks() {
        const res = await http.get('/api/task');
        this.tasks = res.data || []
    }
    
    checkTaskStatus(task: any, member: any) {
        const checkId = task.taskMemberId === member._id
        const compareEndDateResult = isAfter(new Date(), new Date(task.taskDate[1]))
        return checkId && !compareEndDateResult;
    }

    generateMemberTaskData() {
        this.memberTaskData = this.members.map((item: any) => {
            let targetTasks = this.tasks.filter((task: any) => {
                // 获取分配到的任务 & 该任务没有逾期
                return task.taskDate && this.checkTaskStatus(task, item);
            });
            targetTasks = targetTasks.map((task: any) => {
                // 通过时间计算高度
                // TODO 
                const days = differenceInDays(new Date(task.taskDate[1]), new Date()) + 1;
                return {
                    ...task,
                    days,
                    width: TASK_WIDTH,
                    height: TASK_HEIGHT * days
                };
            })
            return {
                ...item,
                tasks: targetTasks
            }
        })
    }

    async mounted() {
        this.generateDateDegrees()
        await this.getMembers()
        await this.getTasks()
        this.generateMemberTaskData()
    }
}
</script>
<style lang="stylus" scoped>
.total
    &-tasks
        display flex
        &-task
            box-sizing border-box
            background green
            border-radius 10px
            color #ffffff
            margin-right 10px
            display flex
            justify-content center
            align-items center
            font-size 14px
            padding 10px
            width 150px
            height 60px
            overflow-y auto
.tetris
    position relative
    display flex
    min-height 700px
    padding-left 200px
    &-degree
        &-x
            position absolute
            left 0px
            width 100%
            bottom -20px
            span
                position absolute
                background #ffffff
                bottom -10px
        &-y
            position absolute
            left 0px
            border-bottom 1px solid red
            width 100%
            span
                position absolute
                background #ffffff
                bottom -10px
    &-column
        position relative
        display flex
        flex-direction column
        justify-content flex-end
        margin-right 10px
        width 120px
        &-member
            position absolute
            width 100%
            text-align center
            color green
.task-block
    display flex
    box-sizing border-box
    justify-content center
    align-items center
    background #333333
    color #ffffff
    width 120px
    height 50px
    border 1px solid #333333
    border-radius 10px
    // margin-bottom 10px
</style>
