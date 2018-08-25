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
    </div>
</template>
<script>
import TreeGrid from '@/components/TreeGrid/TreeGrid'
import {goodCat} from '@/api'
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
                loading: false
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
            getlist(){
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