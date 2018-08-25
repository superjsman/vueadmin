<template>
    <div class="power">
        <el-row>
            <el-col :span="24">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
                    <el-breadcrumb-item>角色列表</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-table
            :data="powerList"
            border
            style="width: 100%"
            >
            <el-table-column type="expand">
                <template slot-scope="props">
                        <div>
                            <el-row v-for="(item, index) in props.row.children" :key="index" class="box">
                                <el-col :span="3">
                                    <el-tag closable type="">{{item.authName}}</el-tag><i class="el-icon-arrow-right"></i>
                                </el-col>
                                <el-col :span="21">
                                    <el-row v-for="(items,indexs) in item.children" :key="indexs" class="erhang">
                                        <el-col :span="4">
                                            <el-tag closable type="success">{{items.authName}}</el-tag><i class="el-icon-arrow-right"></i>
                                        </el-col>
                                        <el-col :span="20">
                                            <el-tag closable type="warning" v-for="(itemss,indexss) in items.children" :key="indexss">{{itemss.authName}}</el-tag>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </div>
                </template>
            </el-table-column>
            <el-table-column
            type="index"
            label="#"
            width="40">
            </el-table-column>
            <el-table-column
            prop="roleName"
            label="角色名称"
            width="180">
            </el-table-column>
            <el-table-column
            prop="roleDesc"
            label="描述"
            width="180">
            </el-table-column>
            <el-table-column label="操作">
             <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit" type="primary" plain></el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete" plain></el-button>
                    <el-button
                    size="mini"
                    type="warning"
                    @click="handleCheck(scope.$index, scope.row)" icon="el-icon-check" plain></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import {assignList} from '@/api'
    export default {
        data () {
            return {
                powerList: [{path:'',authName:''}]
            }
        },
        methods: {
             handleEdit(index, row) {
                    console.log(index, row);
                },
            handleDelete(index, row) {
                    console.log(index, row);
                },
            handleCheck(index, row) {
                    console.log(index, row);
                }
        },
        created () {
            assignList().then(res => {
                console.log(res)
                this.powerList = res.data.data
            })
        }
    }
</script>
<style lang="scss" scoped>
    .extendInfo{
        margin:0;
        padding: 0;
    }
    .box {
        background-color: #F3F5F9;
    }
    .erhang {
        border-bottom: 1px solid #ccc;
        border-top: 1px solid #ccc;
        margin-bottom: -1px;
        padding-bottom: 6px;
        padding-top: 2px;       
    }
    span {
        margin-right: 8px;
    }
</style>
