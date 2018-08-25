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
                            <el-row>
                                <el-col :span="24" v-if="props.row.children.length === 0">
                                    该角色没有分配权限,请前往分配!
                                </el-col>
                            </el-row>
                            <el-row v-for="(item, index) in props.row.children" :key="index" class="box">
                                <el-col :span="3">
                                    <el-tag closable type=""  @close="handleClose(item.id, props.row.id)">{{item.authName}}</el-tag><i class="el-icon-arrow-right"></i>
                                </el-col>
                                <el-col :span="21">
                                    <el-row v-for="(items,indexs) in item.children" :key="indexs" class="erhang">
                                        <el-col :span="4">
                                            <el-tag closable type="success" @close="handleClose(items.id, props.row.id)">{{items.authName}}</el-tag><i class="el-icon-arrow-right"></i>
                                        </el-col>
                                        <el-col :span="20">
                                            <el-tag closable type="warning" v-for="(itemss,indexss) in items.children" :key="indexss" @close="handleClose(itemss.id, props.row.id)">{{itemss.authName}}</el-tag>
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
        <el-dialog title="角色授权" :visible.sync="assigVisible">
                <el-tree
                :data="treeData"
                show-checkbox
                default-expand-all
                node-key="id"
                ref="tree"
                highlight-current
                :props="defaultProps">
                </el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="assigVisible = false">取 消</el-button>
                <el-button type="primary" @click="assignpower">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {assignList, deletePower, getPowerTree, authority} from '@/api'
    export default {
        data () {
            return {
                powerList: [{path:'',authName:''}],
                assigVisible: false,                
                formLabelWidth: '120px',
                treeData: [],
                defaultProps: {
                        children: 'children',
                        label: 'authName'
                        },
                addPowerId: ''
            }
        },
        methods: {
             handleEdit(index, row) {
                    console.log(index, row);
                },
            handleDelete(index, row) {
                    console.log(index, row);
                },
            handleCheck(index, row) { //点击添加权限, 发起数据tree请求并渲染到页面
                    console.log(index, row.id)
                    this.assigVisible = true
                    this.addPowerId = row.id
                    getPowerTree().then(res => {
                        console.log(res)
                        this.treeData = res.data
                    })
                },
            handleClose(rightId, roleId) { //删除标签
                    console.log(rightId,roleId)
                    deletePower({rightId, roleId}).then(res => {
                        console.log(res)
                        if(res.meta.status === 200) {
                            this.$message({
                            message: '删除成功',
                            type: 'success'
                            })
                                assignList().then(res => {
                                    
                                    this.powerList = res.data.data
                                })
                        }
                    })
                    
                },
                assignpower(){ // 点击确认添加权限
                    let arr = this.$refs.tree.getCheckedKeys()
                    arr = arr.join(',')
                    authority({roleId: this.addPowerId,rids: arr}).then(res => {
                        console.log(res)
                        if(res.meta.status === 200) {
                            this.$message({
                                message: '操作成功',
                                type: 'success'
                            })
                            this.assigVisible = false
                             assignList().then(res => {
                                this.powerList = res.data.data
                            })
                        }
                    })
                }
        },
        created () {
            assignList().then(res => {
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
