<template>

	<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
		<sidebar class="sidebar-container"></sidebar>
		<div class="main-container">
			<navbar></navbar>
			<app-main></app-main>
		</div>
	</div>
	<!-- <el-row class="panel m-w-1280">
		<el-col :span="24" class="panel-top">
			<el-col :span="4">
        <template v-if="logo_type == '1'">
          <img :src="img" class="logo">
        </template>
        <template v-else>
          <span class="p-l-20">{{title}}</span>
        </template>
			</el-col>
			<el-col :span="16" class="ofv-hd">
				<div class="fl p-l-20 p-r-20 top-menu" :key="index" :class="{'top-active': menu.selected}" v-for="(menu, index) in topMenu" @click="switchTopMenu(menu)">{{menu.title}}</div>
			</el-col>
			<el-col :span="4" class="pos-rel">
				<el-dropdown @command="handleMenu" class="user-menu">
		      <span class="el-dropdown-link c-gra" style="cursor: default">
		        {{username}}&nbsp;&nbsp;<i class="fa fa-user" aria-hidden="true"></i>
		      </span>
		      <el-dropdown-menu slot="dropdown">
		        <el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
		        <el-dropdown-item command="logout">退出</el-dropdown-item>
		      </el-dropdown-menu>
		    </el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="panel-center">
			<aside class="w-180 ovf-hd" v-show="!showLeftMenu">
				<leftMenu :menuData="menuData" :menu="menu" ref="leftMenu"></leftMenu>
			</aside>
			<section class="panel-c-c" :class="{'hide-leftMenu': hasChildMenu}">
				<div class="grid-content bg-purple-light">
					<el-col :span="24">
						<transition name="fade" mode="out-in" appear>
							<router-view v-loading="showLoading"></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
		<changePwd ref="changePwd"></changePwd>
	</el-row> -->
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

</style>
<script>
import leftMenu from '@/components/Common/leftMenu.vue'
import changePwd from '@/components/Account/changePwd.vue'
import http from '@/assets/js/http'
import { Navbar, Sidebar, AppMain } from '@/views/layout'

export default {
  components: {
    leftMenu,
    changePwd,
    Navbar,
    Sidebar,
    AppMain
  },
  data() {
    return {
      username: '',
      topMenu: [],
      childMenu: [],
      menuData: [],
      hasChildMenu: false,
      menu: null,
      module: null,
      img: '',
      title: '',
      logo_type: null
    }
  },
  methods: {
    logout() {
      this.$confirm('确认退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          _g.openGlobalLoading()
          let data = {
            authkey: Lockr.get('authKey'),
            sessionId: Lockr.get('sessionId')
          }
          this.apiPost('admin/base/logout', data).then(res => {
            _g.closeGlobalLoading()
            this.handelResponse(res, data => {
              Lockr.rm('menus')
              Lockr.rm('authKey')
              Lockr.rm('rememberKey')
              Lockr.rm('authList')
              Lockr.rm('userInfo')
              Lockr.rm('sessionId')
              Cookies.remove('rememberPwd')
              _g.toastMsg('success', '退出成功')
              setTimeout(() => {
                router.replace('/')
              }, 1500)
            })
          })
        })
        .catch(() => {})
    },
    switchTopMenu(item) {
      if (!item.child) {
        router.push(item.url)
      } else {
        router.push(item.child[0].child[0].url)
      }
    },
    handleMenu(val) {
      switch (val) {
        case 'logout':
          this.logout()
          break
        case 'changePwd':
          this.changePwd()
          break
      }
    },
    changePwd() {
      this.$refs.changePwd.open()
    },
    getTitleAndLogo() {
      this.apiPost('admin/base/getConfigs').then(res => {
        this.handelResponse(res, data => {
          document.title = data.SYSTEM_NAME
          this.logo_type = data.LOGO_TYPE
          this.title = data.SYSTEM_NAME
          this.img = window.HOST + data.SYSTEM_LOGO
        })
      })
    },
    getUsername() {
      this.username = Lockr.get('userInfo').username
    }
  },
  created() {
    this.getTitleAndLogo()
    let authKey = Lockr.get('authKey')
    let sessionId = Lockr.get('sessionId')
    if (!authKey || !sessionId) {
      _g.toastMsg('warning', '您尚未登录')
      setTimeout(() => {
        router.replace('/')
      }, 1500)
      return
    }
    this.getUsername()
    let menus = Lockr.get('menus')
    this.menu = this.$route.meta.menu
    this.module = this.$route.meta.module
    this.topMenu = menus
    _(menus).forEach(res => {
      if (res.module == this.module) {
        this.menuData = res.child
        res.selected = true
      } else {
        res.selected = false
      }
    })
  },
  computed: {
    routerShow() {
      return store.state.routerShow
    },
    sidebar() {
      return this.$store.state.app.sidebar
    }
  },
  watch: {
    $route(to, from) {
      _(this.topMenu).forEach(res => {
        if (res.module == to.meta.module) {
          res.selected = true
          if (!to.meta.hideLeft) {
            this.menu = to.meta.menu
            this.menuData = res.child
          }
        } else {
          res.selected = false
        }
      })
    }
  },
  mixins: [http]
}
</script>
