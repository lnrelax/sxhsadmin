<template>
    <div :class="{'has-logo':showLogo}" :style="{ backgroundColor: settings.sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground }">
        <logo v-if="showLogo" :collapse="isCollapse" />
        <el-scrollbar :class="settings.sideTheme" wrap-class="scrollbar-wrapper">
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#304156"
                text-color="#fff"
                active-text-color="#ffd04b"
                router 
                :default-active="$route.path"
                >

                <el-menu-item v-if="userType == 1" index="/dataInfo" >
                  <i class="el-icon-s-home"></i>
        <span slot="title">统计分析</span>
      </el-menu-item>
      
      <el-menu-item v-if="userType == 1" index="/order" >
        <i class="el-icon-platform-eleme"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>

      <el-menu-item index="/" >
        <i class="el-icon-user-solid"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>

      <el-menu-item v-if="userType == 1" index="/physiotherapist" >
        <i class="el-icon-user"></i>
        <span slot="title">理疗师管理</span>
      </el-menu-item>
      <el-menu-item v-if="userType == 1" index="/shop" >
        <i class="el-icon-s-goods"></i>
        <span slot="title">店铺管理</span>
      </el-menu-item>
      <el-menu-item v-if="userType == 1" index="/extend" >
        <i class="el-icon-star-on"></i>
        <span slot="title">推广管理</span>
      </el-menu-item>
      <el-menu-item v-if="userType == 1" index="/item" >
        <i class="el-icon-message-solid"></i>
        <span slot="title">服务项目</span>
      </el-menu-item>
      <el-menu-item v-if="userType == 1" index="/favorable" >
        <i class="el-icon-s-ticket"></i>
        <span slot="title">优惠券</span>
      </el-menu-item>
      <el-menu-item v-if="userType == 1" index="/car" >
        <i class="el-icon-truck"></i>
        <span slot="title">车费设置</span>
      </el-menu-item>
      <el-menu-item v-if="userType == 1" index="/image" >
        <i class="el-icon-picture"></i>
        <span slot="title">轮播图</span>
      </el-menu-item>
      <el-menu-item v-if="userType == 1" index="/withdraw" >
        <i class="el-icon-s-order"></i>
        <span slot="title">提现记录</span>
      </el-menu-item>
      <el-menu-item v-if="userType == 1" index="/feedback" >
        <i class="el-icon-s-operation"></i>
        <span slot="title">反馈意见</span>
      </el-menu-item>
      <el-menu-item v-if="userType == 1" index="/settings" >
        <i class="el-icon-s-tools"></i>
        <span slot="title">系统管理</span>
      </el-menu-item>

      <el-menu-item v-if="userType == 2" index="/profit" >
        <i class="el-icon-platform-eleme"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>

      <el-menu-item v-if="userType == 2" index="/extendTg" >
        <i class="el-icon-star-on"></i>
        <span slot="title">推广管理</span>
      </el-menu-item>

      <el-menu-item v-if="userType == 2" index="/withdrawTg" >
        <i class="el-icon-s-order"></i>
        <span slot="title">提现记录</span>
      </el-menu-item>

      <el-menu-item v-if="userType == 2" index="/balance" >
        <i class="el-icon-s-order"></i>
        <span slot="title">余额明细</span>
      </el-menu-item>

      <el-menu-item v-if="userType == 2" index="/userInfoTg" >
        <i class="el-icon-user-solid"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
      
    </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/assets/styles/variables.scss";
import { getUserType } from '@/utils/auth'

export default {
    components: { SidebarItem, Logo },
    computed: {
        ...mapState(["settings"]),
        ...mapGetters(["sidebarRouters", "sidebar"]),
        activeMenu() {
            const route = this.$route;
            const { meta, path } = route;
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        },
        showLogo() {
            return this.$store.state.settings.sidebarLogo;
        },
        variables() {
            return variables;
        },
        isCollapse() {
            return !this.sidebar.opened;
        }
    },
    data() {
        return {
          onRoutes: this.$route.path, // 当前激活的路由
          userType: getUserType(),
        };
    },
    created() {
      this.menuListSet();
    },
    methods: {
      menuListSet(){
        console.log("userType:",this.userType)

        if(this.userType == 2){
              this.$router.push({ path: "/"}).catch((err)=>{console.log(err)});
            }else{
              // this.$router.push({ path: '/userInfo'}, { replace: true }).catch((err)=>{console.log(err)});
              this.$router.replace({ path: '/dataInfo'});
            }

      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
};
</script>
