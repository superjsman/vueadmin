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
                <el-button type="success" plain @click="adduser">添加用户</el-button>
            </el-col>
        </el-row>
         <el-table
            :data="userList"
            border
            style="width: 100%">
            <el-table-column
            type="index"
            label="#"
            width="40">
            </el-table-column>
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
            <el-table-column label="状态">
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
            :page-sizes="[5,10, 20, 30, 40]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>
        <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
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
        <el-dialog title="编辑用户" :visible.sync="editDialogFormVisible">
            <el-form :model="editForm" label-width="80px" ref="editForm" :rules="editRules">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="editForm.username" auto-complete="off" :disabled="true" :style="{width:'80px'}"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editForm.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="editForm.mobile" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editTijiao('editForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="分配角色" :visible.sync="assignDialogFormVisible">
            <el-form :model="assignForm" label-width="100px" ref="assignForm">
                <el-form-item label="当前的用户" prop="username">
                <span v-text="assignForm.username"></span>
                </el-form-item>
                <el-form-item label="请选择角色" prop="quanxian">
                <el-select v-model="assignForm.quanxian" placeholder="选择角色">
                    <el-option :label="item.roleName" :value="item.id" v-for="(item ,index) in assignForm.quanxianList" :key="index"></el-option>
                </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="assignDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="assign">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {getInfo, putInfo, postInfo, editUserInfo, deleteUser, assignList, userAssign} from '@/api'
    export default {
        data () {
            return {
                search: '',            
                userList: [],
                currentPage4: 1,
                value2: true,
                total: null,
                pagenum: 1,
                pagesize: 5,
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
                },
                editDialogFormVisible: false,
                editForm: {
                    username: '',
                    email: '',
                    mobile: '',
                    id: '',
                },
                editRules:{
                    username: [{ required: true,message: '用户名不能为空', trigger: 'blur' }],
                    email: [{ required: true,message: '邮箱不能为空', trigger: 'blur' }],
                    mobile: [{ required: true,message: '手机号不能为空', trigger: 'blur' }],
                },
                assignDialogFormVisible: false,
                assignForm: {
                    username: 'admin',
                    quanxianList: [],
                    quanxian: '',
                    id: ''
                    }

            }
        },
        methods: {
            handleSizeChange(val) {
                this.pagesize = val
                this.searchinfo()
            },
            handleCurrentChange(val) {
                this.pagenum = val
                this.searchinfo()
            },
             handleEdit(index, row) { //编辑点击事件
               this.editDialogFormVisible = true
               this.editForm.username = row.username
               this.editForm.email = row.email
               this.editForm.mobile = row.mobile,
               this.editForm.id = row.id
            },
            editTijiao(formName) { //提交编辑
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                       editUserInfo({
                           id: this.editForm.id,
                           email: this.editForm.email,
                           mobile: this.editForm.mobile,
                       }).then(res => {
                           if(res.data.meta.status === 200){
                               this.$message({
                                    message: res.data.meta.msg,
                                    type: 'success'
                                    })
                                this.editDialogFormVisible = false
                                this.searchinfo()
                           }
                       })
                        
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                    });
            },
            handleDelete(index, row) {
                        console.log(index, row);
                this.$confirm('确定要删除该用户吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        deleteUser(row.id).then(res => {
                            console.log(res)
                            if (res.data.meta.status === 200 ) {
                                 this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    })
                                this.searchinfo()
                            }
                        })
                   
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                    });
            },
            handleCheck(index, row) { //分配角色
                this.assignForm.id = row.id
                this.assignDialogFormVisible = true;
                assignList().then(res => {
                    if(res.data.meta.status === 200){
                        this.assignForm.quanxianList = res.data.data
                    }
                    
                })
            },
            assign(){ //分配角色
                if(this.assignForm.quanxian){
                    userAssign({
                        id: this.assignForm.id,
                        rid: this.assignForm.quanxian
                    }).then(res => {
                        if (res.data.meta.status === 200) {
                            this.assignDialogFormVisible = false
                            this.$message({
                            message: res.data.meta.msg,
                            type: 'success'
                            })
                        }
                    })
                } else {
                    this.$message({
                            message: '请选择角色信息',
                            type: 'warning'
                            })
                }
            },
            changestatus(a) {
                putInfo({uId: a.id, type: a.mg_state})
                .then(res => {
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
            adduser(){
                 this.addDialogFormVisible = true
            },
            addTijiao(formName){ //提交添加表单
                    this.$refs[formName].validate((valid) => {
                    if (valid) {
                        postInfo('users',{
                            username: this.addForm.name,
                            password: this.addForm.password,
                            email: this.addForm.email,
                            mobile: this.addForm.phone
                        }).then(res => {
                            this.addDialogFormVisible = false
                            if(res.meta.status === 201){
                                this.$message({
                                    message: '添加用户成功!!',
                                    type: 'success'
                                    })
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
                    this.userList = res.data.data.users,
                    this.total = res.data.data.total
                })
            }
            },
        mounted () {
            this.searchinfo()
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

