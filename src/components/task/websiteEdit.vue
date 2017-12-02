<template>
  <el-dialog title="添加网站" :visible.sync="visible">
    <el-form :model="form" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="form.title" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="网址">
        <el-input v-model="form.url" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submit()">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import http from '@/assets/js/http'
export default {
  data() {
    return {
      visible: false,
      disable: false,
      form: {
        title: '',
        url: '',
        tid: this.tid
      },
      loading: false,
      rules: {}
    }
  },
  prop() {
    return {
      tid: [Number]
    }
  },
  methods: {
    open() {
      this.visible = true
    },
    close() {
      this.visible = false
    },
    submit() {
      this.apiPost('website', this.form).then(res => {
        this.handelResponse(res, data => {
          _g.toastMsg('success', '添加成功')
          this.visible = false
          // this.getTaskInfo();
        })
      })
    }
  },
  mixins: [http]
}
</script>