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
        <div class="tetris-absolute" style="z-index: 3;left: 150px">
            <div class="tetris-block" v-for="(degree, dateIndex) in dateDegreesReverse" :key="dateIndex">
                <div class="tetris-block-item" v-for="(member, memberIndex) in memberTaskData" :key="memberIndex">
                    <div v-for="(task, taskIndex) in member.tasks" :key="taskIndex">
                        <div v-for="(curDate, taskDateIndex) in task.taskDate" :key="taskDateIndex">
                            <span v-if="curDate === degree">{{task.taskName}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tetris-absolute" style="z-index: 4;">
            <div class="tetris-row">
                <div
                    class="tetris-row-item"
                    v-for="(degree, index) in dateDegrees"
                    :key="degree"
                    :class="getIsWeekend(degree) && 'weekend'"
                >
                    <span>{{index === 6 ? `7天 ${degree}` : degree}}</span>
                </div>
            </div>
        </div>
        <div class="tetris-absolute" style="z-index: 2;left: 150px">
            <div class="tetris-column">
                <div
                    class="tetris-column-item"
                    v-for="(member) in memberTaskData"
                    :key="member._id"
                >
                    {{member.name}}
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from '@/utils/vue-decorators'
import { format, differenceInDays, isAfter, isBefore, isEqual, isWeekend} from 'date-fns'
import http from '@/utils/http'
import last from 'lodash/last'

const DAY = 24 * 3600 * 1000

@Component
export default class TaskBoard extends Vue {
    curDateTime = format(new Date(), 'yyyy-MM-dd')
    dateDegreeSize: number = 13
    dateDegrees: any[] = []
    members: any[] = []
    tasks: any[] = []
    memberTaskData: any[] = []

    get dateDegreesReverse() {
        return this.dateDegrees.reverse()
    }

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

    getIsWeekend(dateStr: string) {
        return isWeekend(new Date(dateStr))
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
        const compareEndDateResult = isAfter(new Date(), new Date(last(task.taskDate)))
        return checkId && !compareEndDateResult;
    }

    generateMemberTaskData() {
        this.memberTaskData = this.members.map((item: any) => {
            let targetTasks = this.tasks.filter((task: any) => {
                // 获取分配到的任务 & 该任务没有逾期
                return task.taskDate && this.checkTaskStatus(task, item);
            });
            return {
                ...item,
                tasks: targetTasks
            }
        })
    }

    getCurDateTask(dateStr: string, member: any) {
        const _tasks = member.tasks.filter((task: any) => {
            const curDate = new Date(dateStr);
            const taskEndDate = new Date(last(task.taskDate));
            const taskStartDate = new Date(task.taskDate[0]);
            return (isAfter(curDate, taskStartDate) && isBefore(curDate, taskEndDate)) || (isEqual(curDate, taskStartDate)) || isEqual(curDate, taskEndDate)
        });
        return _tasks.reduce((prevStr: string, task: any) => {
            prevStr = prevStr + task.taskName
            return prevStr
        }, '')
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
    min-height 900px
    &-absolute
        position absolute
        top 0
        left 0
        right 0
        bottom 0
    &-row
        display flex
        flex-direction column
        &-item
            width 100%
            height 60px
            line-height 60px
            margin-bottom 2px
    &-block
        display flex
        justify-content space-around
        &-item
            background #A9C9CF
            flex 1
            height 60px
            line-height 60px
            margin-bottom 2px
            text-align center
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
    &-column
        position absolute
        display flex
        width 100%
        bottom 0
        justify-content space-around
        &-item
            flex 1
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
.weekend
    background rgba(0.56, 0.31, 0.35, 0.3)
</style>
