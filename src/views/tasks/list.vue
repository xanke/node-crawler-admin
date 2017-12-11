<template>
	<div>
    <el-dialog
      title="提示"
      :visible.sync="addDialog.show"
      width="30%"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog.show = false">取 消</el-button>
        <el-button type="primary" @click="addDialog.show = false">确 定</el-button>
      </span>
    </el-dialog>

		<div class="m-b-20">
			<el-button v-on:click="addDialog.show = true"   >
				<i class="el-icon-plus"></i>&nbsp;&nbsp;新建任务
			</el-button>
		</div>
		<el-table :data="tableData" style="width: 100%" @selection-change="selectItem">
			<el-table-column type="selection" width="50"></el-table-column>
			<el-table-column label="名称" prop="title"></el-table-column>
      <el-table-column label="网站数" prop="website_num"></el-table-column>
			<el-table-column label="状态" prop="status" width="100">
        <template slot-scope="scope">
          <div>
            {{ scope.row.status | status }}
          </div>
        </template>
			</el-table-column>
			<el-table-column label="操作" width="200"> 
        <template slot-scope="scope">
  				<div>
  					<span>
  						<router-link :to="{ name: 'tasksEdit', params: { id: scope.row.id }}">
                <el-button size="small" type="primary">进入</el-button>
  						</router-link>
  					</span>
  					<span>
  						<el-button size="small" type="danger" @click="confirmDelete(scope.row)">删除</el-button>
  					</span>
  				</div>
        </template>
			</el-table-column>
		</el-table>
		<div class="pos-rel p-t-20">
			<btnGroup :selectedData="multipleSelection" :type="'groups'"></btnGroup>
		</div>
	</div>
</template>

<script>
  import btnGroup from '@/components/Common/btn-group.vue'
  import http from '@/assets/js/http'

  export default {
    data() {
      return {
        tableData: [],
        multipleSelection: [],
        addDialog: {
          show: false
        }
      }
    },
    methods: {
      selectItem(val) {
        this.multipleSelection = val
      },
      confirmDelete(item) {
        this.$confirm('确认删除该任务?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _g.openGlobalLoading()
          this.apiDelete('admin/groups/', item.id).then((res) => {
            _g.closeGlobalLoading()
            this.handelResponse(res, (data) => {
              _g.toastMsg('success', '删除成功')
              setTimeout(() => {
                _g.shallowRefresh(this.$route.name)
              }, 1500)
            })
          })
        }).catch(() => {
          // handle error
        })
      },
      getgroups() {
        this.apiGet('task').then((res) => {
          this.handelResponse(res, (data) => {
            this.tableData = data
          })
        })
      }
    },
    created() {
      this.getgroups()
    },
    computed: {
      addShow() {
        return _g.getHasRule('groups-save')
      },
      editShow() {
        return _g.getHasRule('groups-update')
      },
      deleteShow() {
        return _g.getHasRule('groups-delete')
      }
    },
    components: {
      btnGroup
    },
    mixins: [http]
  }
</script>