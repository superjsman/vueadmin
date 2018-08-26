<template>
    <div class="categories">
        <el-row>
            <el-col :span="24">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                    <el-breadcrumb-item>商品分类</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24"> <el-button type="success" plain @click="addCat">添加分类</el-button></el-col>
        </el-row>
        <tree-grid
        :treeStructure="true"
        :columns="columns"
        :data-source="dataSource"
        @deleteCate="deleteCategory"
        @editCate="editCategory"
        v-loading="loading"
        >
        </tree-grid>
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>
        <el-dialog title="添加分类" :visible.sync="addFormVisible">
        <el-form :model="addForm" label-width="80px" ref="addForm" :rules="addreles">
            <el-form-item label="分类名称" prop="catName">
            <el-input v-model="addForm.catName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="选择分类">
                <el-cascader
                :props="props"
                :options="options"
                placeholder="请选择分类"
                :show-all-levels="false"
                v-model="selectData"
                @change="handleChange">
                </el-cascader>
            </el-form-item>
           
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addCatSure">确 定</el-button>
        </div>
        </el-dialog>
    </div>
</template>
<script>
import TreeGrid from '@/components/TreeGrid/TreeGrid'
import {goodCat, CatById, addCat} from '@/api'
    export default {
        data () {
            return {
                dataSource: [],
                columns: [{
                text: '分类名称',
                dataIndex: 'cat_name',
                width: '600px'
                }, {
                text: '是否有效',
                dataIndex: 'cat_deleted',
                width: '80px'
                }, {
                text: '排序',
                dataIndex: 'cat_level',
                width: '80px'
                }],
                query: '',
                pagenum: 1,
                pagesize: 10,
                total: 0,
                loading: false,
                addFormVisible: false,
                addForm: {
                    catName: '',                    
                    },
                options: [],
                selectData: [],
                 props: {
                        value: 'cat_id',
                        label: 'cat_name',
                        children: 'children'
                    },
                catId: 0,
                level: 0,
                addreles: {
                    catName: [{required: true, message: '分类名称不能为空', trigger: 'blur'}]
                }
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pagesize = val
                this.getlist()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pagenum = val
                this.getlist()
            },
            deleteCategory (cid) {
                console.log(cid)
            },
            editCategory (cid) {
                console.log(cid)
            },
            getlist(){ //获取数据
                this.loading = true
                goodCat(3).then(res => {
                    console.log(res)
                    this.total = res.data.length
                    let that = this
                    let arr = []
                    res.data.forEach(function(item, index){
                        if(that.pagesize*(that.pagenum-1) <=index && index <that.pagesize*that.pagenum){
                            arr.push(item)
                        }
                    })
                    console.log(arr)
                    this.dataSource = arr
                    this.loading = false
                })
            },
            addCat() { //选择框数据初始化
                let that = this
                this.addFormVisible = true
                goodCat(2).then(res => {
                    this.options = res.data
                    })
            },
             handleChange(value) { //添加分类选择框变化函数
                console.log(value);
                this.catId = value[value.length-1],
                CatById(this.catId).then(res => {
                    if(res.meta.status === 200) {
                       this.level = res.data.cat_level
                    }
                })
                
                            },
            addCatSure(){
                if (this.catName === '') {
                    this.$message({
                        message: '操作失败!请填写完整信息!',
                        type: 'error'
                    })
                } else {
                    this.addFormVisible = false                    
                    addCat({
                        cat_pid: this.catId,
                        cat_name: this.addForm.catName,
                        cat_level: this.level
                    }).then(res => {
                        if(res.meta.status === 201){
                            this.$message({
                                message: res.meta.msg,
                                type: 'success'
                            })
                            this.getlist()
                            this.addForm.catName = ''
                        }
                    })
                }
            }
        },
        components: {
            TreeGrid
        },
        created() {
           this.getlist()
        },
    }
</script>