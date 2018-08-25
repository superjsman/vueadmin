<template>
    <div class="home">
        <el-container>
            <el-aside width="auto">
                <div class="logo"></div>
 <el-menu
      :router="true"
      :collapse="isCollapse"
      class="el-menu-admin"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :style="{'border-right': 0}"
      unique-opened
      :default-active="currentMenu">
      <el-submenu :index="item.id" v-for="(item) in menuList" :key="item.id">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item.authName}}</span>
        </template>
        <el-menu-item-group v-for="itemm in item.children" :key="itemm.id">          
          <el-menu-item :index="itemm.path">
              <i class="el-icon-menu"></i>
              <span>{{itemm.authName}}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item-group>          
          <el-menu-item index="/roles">
              <i class="el-icon-menu"></i>
              <span>角色列表</span>
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>          
          <el-menu-item index="/rights">
              <i class="el-icon-menu"></i>
              <span>权限列表</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu> -->
         </el-menu>
            </el-aside>
            <el-container>
                <el-header>
                  <i class="myicon myicon-menu toggle-btn" @click="isCollapse=!isCollapse"></i>
                  <div class="system-title">
                    电商后台管理系统
                  </div>
                  <div>
                    <span class="welcome">您好,{{name}}</span>
                    <el-button type="text" @click="goOut">退出</el-button>
                  </div>
                </el-header>
                <el-main>
                  <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import {getMenus} from '@/api'
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      goOut(){
        localStorage.removeItem('mytoken')
        this.$router.push('/login')
      }
    },
    data: function(){
      return {
        isCollapse: false,
        currentMenu: '',
        menuList: []
      }
    },
    computed: {
      ...mapState(['name'])
    },
    created(){
      getMenus().then(res => {
        console.log(res)
        this.menuList = res.data
      })
    }
  }
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  background-color: #E5E5E5;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
    overflow-x: hidden;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #009688;
  }
  .logo {
    height:60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: white;
  }
  .toggle-btn {
    padding: 0 10px;
    margin-left: -20px;
    font-size: 36px;
    line-height: 60px;
    color: white;
    cursor: pointer;
    &:hover {
      background-color: #00635a;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome, {
    color: white;
  }
}
</style>

