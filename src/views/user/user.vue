<template>
    <div class="user">
        <el-row>
            <el-col :span="24">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-input placeholder="请输入内容" v-model="input5" class="search-input">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <el-button type="success" plain>添加用户</el-button>
            </el-col>
        </el-row>
         <el-table
            :data="userList"
            border
            style="width: 100%">
            <el-table-column
            prop="username"
            label="姓名"
            width="180">
            </el-table-column>
            <el-table-column
            prop="email"
            label="邮箱"
            width="180">
            </el-table-column>
            <el-table-column
            prop="mobile"
            label="电话">
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
        <div class="page">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {getInfo} from '@/api'
    export default {
        data () {
            return {
                input5: '',            
                userList: [],
                currentPage4: 4
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
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
        mounted () {
            getInfo('/users',{
                query: '',
                pagenum: 1,
                pagesize: 10
            }).then(res => {
                console.log(res)
                this.userList = res.data.data.users
            })
        }    

    }
</script>
<style lang="scss" scoped>
.user {
  .search-input {
    width: 300px;
  }
  .page {
    padding: 5px 0;
    background-color: #D3DCE6;
  }
}
</style>

