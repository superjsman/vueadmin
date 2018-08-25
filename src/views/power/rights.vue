<template>
    <div class="assign">
        <el-row>
            <el-col :span="24">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
                    <el-breadcrumb-item>权限列表</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-table
            :data="powerList"
            border
            style="width: 100%"
            :sort-orders="{prop: 'level', order: 'descending'}">
            <el-table-column
            type="index"
            label="#"
            width="40">
            </el-table-column>
            <el-table-column
            prop="authName"
            label="权限名称"
            width="180">
            </el-table-column>
            <el-table-column
            prop="path"
            label="路径"
            width="180">
            </el-table-column>
            <el-table-column
            label="层级"
            width="180"
            prop="level"
            sortable>
            <template slot-scope="scope">
                <span>{{ scope.row.level|toHanzi }}</span>
            </template>
            </el-table-column>
        </el-table>
    </div>
    
</template>
<script>
import {getPowerList} from '@/api'
    export default {
        data () {
            return {
                powerList: []
            }
        },
        methods: {
            
        },
        created () {
            getPowerList().then(res => {
                console.log(res)
               let arr = res.data.data
               let item = null
               for (let i = 0; i<arr.length; i++) {
                   for(let j = i;j<arr.length ;j++) {
                       if(arr[i].level>arr[j].level) {
                           item = arr[j].level
                           arr[j].level = arr[i].level
                           arr[i].level = item
                       }
                   }
                   }

               
                this.powerList = res.data.data
            })
        },
        filters: {
            toHanzi(item){
                switch (item) {
                    case "0":
                        item = "一"
                        break;
                    case "1":
                        item = "二"
                        break;
                    case "2":
                        item = "三"
                        break;
                    default:
                        break;
                }
                return `第${item}层`
            }
        }
    }
</script>
