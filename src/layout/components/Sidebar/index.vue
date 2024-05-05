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

                <el-menu-item index="/" align="center">
                  <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      
      <el-menu-item index="/order" align="center">
        <i class="el-icon-platform-eleme"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>

      <el-menu-item index="/userInfo" align="center">
        <i class="el-icon-user-solid"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>

      <el-menu-item index="/physiotherapist" align="center">
        <i class="el-icon-user"></i>
        <span slot="title">理疗师管理</span>
      </el-menu-item>
      <el-menu-item index="/shop" align="center">
        <i class="el-icon-s-goods"></i>
        <span slot="title">店铺管理</span>
      </el-menu-item>
      <el-menu-item index="/extend" align="center">
        <i class="el-icon-star-on"></i>
        <span slot="title">推广管理</span>
      </el-menu-item>
      <el-menu-item index="/item" align="center">
        <i class="el-icon-message-solid"></i>
        <span slot="title">服务项目</span>
      </el-menu-item>
      <el-menu-item index="/favorable" align="center">
        <i class="el-icon-s-ticket"></i>
        <span slot="title">优惠券</span>
      </el-menu-item>
      <el-menu-item index="/car" align="center">
        <i class="el-icon-truck"></i>
        <span slot="title">车费设置</span>
      </el-menu-item>
      <el-menu-item index="/image" align="center">
        <i class="el-icon-picture"></i>
        <span slot="title">轮播图</span>
      </el-menu-item>
      <el-menu-item index="/withdraw" align="center">
        <i class="el-icon-s-order"></i>
        <span slot="title">提现记录</span>
      </el-menu-item>
      <el-menu-item index="/feedback" align="center">
        <i class="el-icon-s-operation"></i>
        <span slot="title">反馈意见</span>
      </el-menu-item>
      <el-menu-item index="/settings" align="center">
        <i class="el-icon-s-tools"></i>
        <span slot="title">系统管理</span>
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
        };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
};
</script>
