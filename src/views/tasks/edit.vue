<template>
  <div>
    <el-form ref="form" :model="form"   label-width="130px">
      <el-form-item label="名称" prop="title">
        <el-input v-model.trim="form.title" class="h-40 w-200"></el-input>
      </el-form-item>
 
      <el-form-item label="备注">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="备注"
          v-model="form.desc"
          class="w-200">
        </el-input>
      </el-form-item>
      <el-form-item label="网站">
        <div class="bor-gray  ovf-y-auto bor-ra-5 bg-wh">

          <el-table @expand-change="getWebsiteInfo" :data="form.website_list" style="width: 100%; height: 1800px">
            <el-table-column type="expand">
              <template slot-scope="props" >

                <el-form ref="form" label-width="80px">
                  <div class="bor-gray  ovf-y-auto bor-ra-5 bg-wh" style="overflow: hidden;">
                      <el-row :gutter="10">
                        <el-col :span="6">
                          <el-form-item label="名称">
                            <el-input size="mini" v-model="props.row.title"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    <div class="bor-b-ccc bg-gra p-l-10 p-r-10" :key="index" v-for="(item, index) in props.row.model">

                      <el-row :gutter="10">
                        <el-col :span="6">
                          <el-form-item label="节点名称">
                            <el-input size="mini" v-model="item.find"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <div :key="cIndex" v-for="(cItem, cIndex) in item.child">
                        <el-row :gutter="10">
                          <el-col :span="8">
                            <el-form-item label="元素">
                              <el-input size="mini" v-model="cItem.name"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="14">
                            <el-select size="mini" v-model="cItem.type" placeholder="方法类型">
                              <el-option value="" label="自动"></el-option>
                              <el-option value="or" label="or"></el-option>
                              <el-option value="list" label="list"></el-option>
                            </el-select>
                            <el-button size="mini" type="default" @click="wmRemoveChild(item.child, cIndex)">删除</el-button>
                          </el-col>
                        </el-row>
                        <div :key="mIndex" v-for="(mItem, mIndex) in cItem.method">
                          <el-row :gutter="10">
                            <el-col :span="8">
                              <el-form-item label="Find">
                                <el-input size="mini" v-model="mItem.find"></el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="4">
                              <el-input size="mini" v-model="mItem.attr" placeholder="attr"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <el-button size="mini" type="default" @click="wmRemoveMethod(cItem.method, mIndex)">删除</el-button>
                            </el-col>
                          </el-row>
                        </div>
                        <el-row :gutter="10">
                          <el-form-item>
                            <el-button size="mini" type="primary" @click="wmAddMethod(cItem.method)">增加方法</el-button>
                          </el-form-item>
                        </el-row>
                      </div>
                      <el-row :gutter="10">
                        <el-form-item>
                          <el-button size="mini" type="primary" @click="wmAddChild(item.child)">增加元素</el-button>
                        </el-form-item>
                      </el-row>
                    </div>

              

                    <el-table :data="props.row.rule_list" style="width: 100%">
                      <el-table-column prop="url" label="网址" ></el-table-column>
                      <el-table-column prop="key" label="Key" width="250"></el-table-column>
                      <el-table-column prop="page" label="page" width="80"></el-table-column>
                      <el-table-column prop="page_times" label="p_times" width="80"></el-table-column>
                      <el-table-column prop="page_end" label="p_end" width="80"></el-table-column>
                      <el-table-column prop="page_run" label="p_run" width="80"></el-table-column>
                    </el-table>

                    <div class="p-l-20 bor-b-ccc bg-gra">

               
                      <el-button size="mini" type="primary" @click="openWebsiteRuleDialog(props.row)">增加规则</el-button>

                    </div>



                    <div class="p-l-20 bor-b-ccc bg-gra">
                      <el-button size="mini" type="primary" @click="saveWebsite(props.row)">保存</el-button>
                      <el-button size="mini" type="primary" @click="wmTest(props.row)">测试</el-button>
                    </div>
                  

                  </div>
                </el-form>

                <div>
                  {{props.row.scan_data}}
                </div>

      


<!-- 
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="名称">
                    <span>{{ props.row.title }}</span>
                  </el-form-item>
                  <el-form-item label="网址">
                    <span>{{ props.row.url }}</span>
                  </el-form-item>
                  <el-form-item label="采集数量">
                    <span>{{ props.row.id }}</span>
                  </el-form-item>
                  <el-form-item label="运行时间">
                    <span>{{ props.row.run_time }}</span>
                  </el-form-item>
                </el-form> -->
              </template>
            </el-table-column>
            <el-table-column label="名称" prop="title"></el-table-column>
            <el-table-column label="网址" prop="url"></el-table-column>
            <el-table-column label="采集数量" prop="scan_num"></el-table-column>
            <el-table-column label="运行时间" prop="run_time"></el-table-column>
            <el-table-column  label="操作" width="120">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button  @click="wmTest(scope.row)" type="button" size="mini">运行</el-button>
              </template>
            </el-table-column>

          </el-table>



        </div>
      </el-form-item>
<!--       <el-form-item>
        <el-button type="primary" @click="edit('form')" :loading="isLoading">提交</el-button>
        <el-button @click="goback()">返回</el-button>
      </el-form-item>
 -->

      <el-form-item>
        <el-button type="primary" @click="addWebsiteDialog.visible = true">新建网站</el-button>

        <el-button @click="getTaskInfo">刷新</el-button>
      </el-form-item>


    </el-form>



<el-dialog :fullscreen="true" title="开始采集" :visible.sync="websiteScanDialog.visible">
    

      <el-table :data="websiteScanDialog.row.rule_list" style="width: 100%">
        <el-table-column prop="url" label="网址" ></el-table-column>
        <el-table-column prop="key" label="Key" width="150"></el-table-column>
        <!-- <el-table-column prop="page" label="page" width="80"></el-table-column> -->
        <!-- <el-table-column prop="page_times" label="p_times" width="80"></el-table-column> -->
        <el-table-column prop="page_end" label="p_end" width="80"></el-table-column>
        <el-table-column prop="page_run" label="p_run" width="80"></el-table-column>
        <el-table-column prop="status" label="ststus" width="80"></el-table-column>

        <el-table-column  label="操作" width="150">
          <template slot-scope="scope">
            <el-button  @click="websiteRuleRun(websiteScanDialog.row, scope.row)"  type="primary" size="mini">运行</el-button>

            <el-button  @click="websiteRuleRest(websiteScanDialog.row, scope.row)"  type="default" size="mini">重置</el-button>


            

          </template>
        </el-table-column>
      </el-table>

      <div class="p-l-20 bor-b-ccc bg-gra">

 
        <el-button size="mini" type="primary" @click="openWebsiteRuleDialog(websiteScanDialog.row)">增加规则</el-button>

        <el-button  @click="addScanData" type="button" size="mini">入库</el-button>

      </div>



    <scanArrList :arr="websiteScanDialog.data.arr"></scanArrList>
 



   

  <div slot="footer" class="dialog-footer">
    <el-button @click="websiteScanDialog.visible = false">取 消</el-button>
    <el-button type="primary" @click="addWebsite()">确 定</el-button>
  </div>
</el-dialog>




<!-- Form -->

<el-dialog title="添加网站" :visible.sync="addWebsiteDialog.visible">
  <el-form :model="form" label-width="80px">
    <el-form-item label="名称">
      <el-input v-model="addWebsiteDialog.form.title" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="网址">
      <el-input v-model="addWebsiteDialog.form.url" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addWebsiteDialog.visible = false">取 消</el-button>
    <el-button type="primary" @click="addWebsite()">确 定</el-button>
  </div>
</el-dialog>


<el-dialog title="增加规则" :visible.sync="addWebsiteRuleDialog.visible">
  <el-form :model="form" label-width="80px">
    <el-form-item label="网址">
      <el-input v-model="addWebsiteRuleDialog.form.url" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="规则">
      <el-col :span="8">
        <el-input placeholder="key" v-model="addWebsiteRuleDialog.form.key" auto-complete="off"></el-input>
      </el-col>
      <el-col :span="8">
        <el-input placeholder="page" v-model="addWebsiteRuleDialog.form.page" auto-complete="off"></el-input>
      </el-col>
      <el-col :span="8">
        <el-input placeholder="page_times" v-model="addWebsiteRuleDialog.form.page_times" auto-complete="off"></el-input>
      </el-col>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addWebsiteRuleDialog.visible = false">取 消</el-button>
    <el-button type="primary" @click="addWebsiteRule()">确 定</el-button>
  </div>
</el-dialog>



<el-dialog title="编辑规则" :visible.sync="updateWebsiteRuleDialog.visible">
  <el-form :model="form" label-width="80px">
    <el-form-item label="网址">
      <el-input v-model="updateWebsiteRuleDialog.form.url" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="规则">
      <el-col :span="8">
        <el-input placeholder="key" v-model="updateWebsiteRuleDialog.form.key" auto-complete="off"></el-input>
      </el-col>
      <el-col :span="8">
        <el-input placeholder="page" v-model="updateWebsiteRuleDialog.form.page" auto-complete="off"></el-input>
      </el-col>
      <el-col :span="8">
        <el-input placeholder="page_times" v-model="updateWebsiteRuleDialog.form.page_times" auto-complete="off"></el-input>
      </el-col>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="updateWebsiteRuleDialog.visible = false">取 消</el-button>
    <el-button type="primary" @click="updateWebsiteRule()">确 定</el-button>
  </div>
</el-dialog>





  </div>
</template>
<script>
import scanArrList from '@/components/Common/scanArrList.vue'

  import websiteAdd from '@/views/website/add'

  import http from '@/assets/js/http'
  import fomrMixin from '@/assets/js/form_com'

import Qs    from 'qs'

  export default {
    data() {
      return {
        isLoading: false,
        websiteInfo: '',

        websiteModel: [
          {
            "find": "",
            "child": [
              {
                "name": "name",
                "type": "",
                "method": [
                  {
                    "find": "",
                    "attr": ""
                  }
                ]
              },
              {
                "name": "price",
                "type": "",
                "method": [
                  {
                    "find": "",
                    "attr": ""
                  }
                ]
              },
              {
                "name": "image",
                "type": "",
                "method": [
                  {
                    "find": "",
                    "attr": ""
                  }
                ]
              },
              {
                "name": "url",
                "type": "",
                "method": [
                  {
                    "find": "",
                    "attr": ""
                  }
                ]
              }
            ]
          }
        ],


        websiteScanDialog: {
          visible: false,
          data: {},
          row: {},
          loading: false,
        },


        addWebsiteDialog: {
          visible: false,
          form: {
            'title': '',
            'url': '',
            'tid': ''
          },
          loading: false,
        },

        addWebsiteRuleDialog: {
          visible: false,
          form: {
            'url': '',
            'wid': '',
            'key': '',
            'page': 0,
            'page_times': 1,
          },
          loading: false,
        },


        updateWebsiteRuleDialog: {
          visible: false,
          form: {},
          loading: false,
        },


        form: {
          id: null,
          title: '',
          pid: '',
          remark: '',
          rules: '',
          status: null
        }
      
      
      }
    },
    components: {
      scanArrList
    },

    methods: {

      wmAddNode() {

      },
      wmRemoveNode() {

      },
      wmAddChild(item) {
        item.push({
          "name": "",
          "type": "",
          "method": [
            {"find": "", "attr": ""}
          ]
        })
      },

      wmRemoveChild(item, index) {
        item.splice(index, 1)
      },
      wmAddMethod(item) {
        item.push({
          "find": "",
          "attr": ""
        })
      },

      wmRemoveMethod(item, index) {
        item.splice(index, 1)

      },


      addScanData() {

        let json = {
          data: this.websiteScanDialog.data.arr
        }

        this.apiPost('scan/data', json).then((res) => {
          this.handelResponse(res, (data) => {
            _g.toastMsg('success', '入库成功')
            console.log(data)
          })
        })



      },
      //采集测试
      wmTest(row) {

        this.websiteScanDialog.visible = true

        this.apiGet('website/' + row.id).then((res) => {
          this.handelResponse(res, (data) => {
            
            row.rule_list = data.rule_list
            this.websiteScanDialog.row = row

 

          })
        })


      },

      //重置采集规则
      websiteRuleRest(row, item) {

        let {id, page} = item
        let arg = {
          status: 0,
          hash: 0,
          page_run: page
        }

        this.apiPut('website/rule/', id, arg).then((res) => {
          this.handelResponse(res, (data) => {
            _g.toastMsg('success', '已重置')

            this.getWebsiteInfo(row)
          })
        })

      },

      websiteRuleRun(row, item) {
        let {key, url, page, page_run, page_times, id, hash} = item

        page = page_run
        if (page_times > 0 ) {
          let __xd_page__ = page * page_times
          url = url.replace('${page}', '${__xd_page__}')
        }

        let nItem = {
          id,
          page,
          url : eval('`' + url + '`'),
          hash
        }

        this.scanWebsite(row, nItem)

      },

      //采集网站
      scanWebsite(row, item) {


        let {url, page, id} = item

        function S4() {  
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);  
        };  
        function guid() {  
           return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());  
        };  


        let oid = guid()

        let json = {
          url,
          'model': JSON.stringify(row.model),
          oid
        }

        let host = '//127.0.0.1:1112/scan'
        host = '//47.88.52.88:1112/scan'

        axios.post(host, Qs.stringify(json), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }).then(response => response.data)
          .then(data => {
          
          let {arr, oid, hash} = data

          arr.forEach((item) => {
            let {price, url} = item
            if (typeof(price) !== 'number') {
              item.price = price.replace('$', '').replace('USD', '').replace('Sales Price', '').replace(/\ +/g,"").replace(/[\r\n\t]/g,"")
            }
            item.name = item.name.replace(/[\r\n]/g,"").replace(/(^\s*)|(\s*$)/g, "").replace(/\'/g,"\\'")
            item.image = row.image_url + item.image

            if (url.indexOf('http://') == -1 || url.indexOf('https://') == -1) {
              item.url = row.url + url
            }

          })


          console.log(JSON.stringify(arr))

          this.websiteScanDialog.data = data


          let arg = {
            oid,
            hash
          }

          if (hash == item.hash) {
            _g.toastMsg('success', '已完成此规则')
            arg.status = 1

          } else {
            arg.page_run = page + 1

          }

 


          this.apiPut('website/rule/', id, arg).then((res) => {
            this.handelResponse(res, (data) => {
              this.getWebsiteInfo(row)
            })
          })

        })

      },

      //打开增加网站规则
      openWebsiteRuleDialog(row) {
        this.addWebsiteRuleDialog.visible = true
        this.addWebsiteRuleDialog.form.wid = row.id
      },

      //增加网站规则
      addWebsiteRule() {
        this.apiPost('website/rule', this.addWebsiteRuleDialog.form).then((res) => {
          this.handelResponse(res, (data) => {
            _g.toastMsg('success', '添加成功')
            this.addWebsiteRuleDialog.visible = false
            this.getWebsiteInfo()
          })
        })
      },

      //编辑网站规则
      saveWebsiteRule(item) {
        let {url, key, page, page_times} = item
        let arg = {
          url,
          key,
          page,
          page_times
        }
        this.apiPut('website/rule', item.id, arg).then((res) => {
          this.handelResponse(res, (data) => {
            _g.toastMsg('success', '添加成功')
            this.saveWebsiteRule.visible = false
          })
        })
      },



      //获取网站详情
      getWebsiteInfo(row) {
        if (!row) {
          row = this.websiteInfo
        }

        this.apiGet('website/' + row.id).then((res) => {
          this.handelResponse(res, (data) => {
            row.rule_list = data.rule_list

            this.websiteInfo = row
          })
        })
      },

      //编辑网站      
      saveWebsite(item) {
        let {model, title, url} = item
        let arg = {
          title,
          url,
          model: JSON.stringify(model)
        }
        this.apiPut('website/', item.id, arg).then((res) => {
          this.handelResponse(res, (data) => {
            _g.toastMsg('success', '保存成功')
          })
        })
      },

      //增加网站
      addWebsite() {
        this.addWebsiteDialog.form.tid = this.$route.params.id
        this.apiPost('website', this.addWebsiteDialog.form).then((res) => {
          this.handelResponse(res, (data) => {
            _g.toastMsg('success', '添加成功')
            this.addWebsiteDialog.visible = false
          })
        })
      },
  
      //获取任务
      getTaskInfo() {
        this.form.id = this.$route.params.id
        this.apiGet('task/' + this.form.id).then((res) => {
          this.handelResponse(res, (data) => {
            data.website_list.forEach((item) => {
              if (!item.model) {
                item.model = this.websiteModel
              } else {
                item.model = JSON.parse(item.model)
              }
              item.rule_list = []
              item.scan_data = []
            })
            this.form = data
          })
        })
      },
    },
    created() {
      this.getTaskInfo()
    },
    mixins: [http, fomrMixin]
  }
</script>