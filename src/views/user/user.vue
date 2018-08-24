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
                <el-input placeholder="请输入内容" v-model="search" class="search-input" @keyup.native.enter="searchinfo()">
                    <el-button slot="append" icon="el-icon-search" @click="searchinfo()"></el-button>
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
                    <el-switch
                    v-model="scope.row.mg_state"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    @change="changestatus(scope.row)">
                    </el-switch>
                </template>
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
            :page-sizes="[1, 2, 3, 4]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>
        <el-dialog title="收货地址" :visible.sync="addDialogFormVisible">
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="80px">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password" type="password" auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email" auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item label="电话" prop="phone">
                    <el-input v-model="addForm.phone" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addTijiao('addForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {getInfo, putInfo,postInfo} from '@/api'
    export default {
        data () {
            return {
                search: '',            
                userList: [],
                currentPage4: 1,
                value2: true,
                total: null,
                pagenum: 1,
                pagesize: 1,
                addDialogFormVisible: false,
                addForm: {
                    name: '',
                    password: '',
                    email: '',
                    phone: ''
                    },
                rules: {
                    name: [
                        { required: true,message: '用户名不能为空', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
                            ],
                    password: [{ required: true,message: '密码不能为空', trigger: 'blur' }],
                    email: [{ required: true,message: '邮箱不能为空', trigger: 'blur' },
                            { pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, message: '请输入正确的邮箱格式',trigger: 'blur' }],
                    phone: [{ required: true,message: '手机号不能为空', trigger: 'blur' },
                            {pattern:/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/,message: '请输入正确的手机号格式',trigger: 'blur'}
                            ],
                }

            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pagesize = val
                this.searchinfo()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pagenum = val
                this.searchinfo()
            },
             handleEdit(index, row) {
                console.log(index, row);
                this.addDialogFormVisible = true
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            handleCheck(index, row) {
                console.log(index, row);
            },
            changestatus(a) {
                console.log(a.id)
                console.log(a.mg_state)
                putInfo({uId: a.id, type: a.mg_state})
                .then(res => {
                    console.log(res)
                    if(res.data.meta.status === 200) {
                         this.$message({
                            message: res.data.meta.msg,
                            type: 'success'
                            })
                    } else {
                        this.$message.error('操作失败!!')
                    }
                })
            },
            addTijiao(formName){ //提交添加表单
                    this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                        postInfo('users',{
                            username: this.addForm.name,
                            password: this.addForm.password,
                            email: this.addForm.email,
                            mobile: this.addForm.phone
                        }).then(res => {
                            this.addDialogFormVisible = false
                            console.log(res)
                            if(res.meta.status === 201){
                                this.searchinfo()
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                    });
            },
            searchinfo(){ 
                getInfo('/users',{
                    query: this.search,
                    pagenum: this.pagenum,
                    pagesize: this.pagesize
                }).then(res => {
                    console.log(res)
                    this.userList = res.data.data.users,
                    this.total = res.data.data.total
                })
            }
            },
        mounted () {
            this.searchinfo(this.search)
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

