<template>

<div class="main">
    <van-image width="100%" height="200" :src="require('../assets/comealong.png')" />
    <!--表单-->
    <div class="form">
        <van-form >
        <van-field
            v-model="state.name"
            name="姓名"
            label="姓名"
            placeholder="学员真实姓名"
            label-width="3.2em"
            :rules="[{ required: true, message: '请填写学员真实姓名' }]"
        />
        <van-field
            v-model="state.phone"
            type="tel"
            name="电话"
            label="电话"
            label-width="3.2em"
            placeholder="家长真实电话"
            :rules="[{ required: true, message: '请填写家长真实电话' }]"
        />
        <van-field
            v-model="state.age"
            readonly
            clickable
            name="picker"
            label="年龄"
            label-width="3.2em"
            placeholder="点击选择年龄"
            :rules="[{ required: true, message: '请选择年龄' }]"
            @click="formState.showAges = true"
        />
        <van-popup v-model:show="formState.showAges" position="bottom">
        <van-picker
            :columns="ages"
            @confirm="onAgeConfirm"
            @cancel="formState.showAges = false"
            :default-index="20"
        />
        </van-popup>
        <van-field name="radio" label="请选择类型" >
        <template #input>
            <van-radio-group v-model="state.identity" direction="horizontal" @change="onIdetityChange">
            <van-radio name="新生">新生</van-radio>
            <van-radio name="老生">老生</van-radio>
            </van-radio-group>
        </template>
        </van-field>

        <van-field
            v-model="state.company"
            readonly
            clickable
            name="机构"
            label="选择机构"
            placeholder="点击选择项目机构"
            @click="formState.showCompany = true"
        />
        <van-popup v-model:show="formState.showCompany" position="bottom">
            <van-picker
                :columns="companyList"
                :columns-field-names="{text:'name'}"
                @confirm="onCompanyConfirm"
                @cancel="formState.showCompany = false"
            />
        </van-popup>

        <div class="course_items" >
            <div
             class="info"
            >请选择报名课程</div>
            <van-radio-group v-model="state.course" class="courses" @change="onCourseChange">
                <van-radio v-for="item in courseList" :key="item.id" 
                :name="item.name" 
                icon-size="15px" 
                class="item">{{item.name}}
                </van-radio>
            </van-radio-group>
            <div class="price_info">微信支付：<span style="color:red;">168.00元</span></div>
        </div>
        </van-form>
    </div>
    <div class="notes">注意：老学员只能开团，不能参团（参团会无效）
    ，新生开团参团皆可，新生老生报名既有效。
    </div>
</div>
<div style="position: fixed;bottom: 0;width: 100%;display: flex;flex-direction: row;">
    <div class="toindex" @click="toIndex">返回首页</div>
    <div class="tojoin" @click="toPay">立即报名</div>
</div>

    
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
        ages:['1','2','3','4','5','6','7','8','9',
        '10','11','12','13','14','15','16','17','18','18',
        '20','21','22','23','24','25','26','27','28','29',
        '30','31','32','33','34','35','36','37','38','39',
        '40','41','42','43','44','45','46','47','48','49','50'],
        companyList:[{
            id:1,
            name:'德州教育'
        },{
            id:2,
            name:'翔太体育'
        },{
            id:3,
            name:'智慧教育'
        }

        ],
        courseList:[{
            id:1,
            name:'功夫明星跆拳道1'
        },{
            id:2,
            name:'功夫明星跆拳道2'
        },{
            id:3,
            name:'功夫明星跆拳道3'
        }

        ],
        state:{
            name:'', //学生真实姓名
            phone:'', //学生联系方式
            age: '', //学生年龄
            identity: '新生',
            company:'',//机构
            course:'',//项目
        },
        formState:{
            showAges: false,
            showCompany: false,
            
        }
    }
  },
  components: {},
  props: {},
  created() {
        this.getGroupItem()
        this.testvues()
  },
  methods: {
      testvues(){
          console.log(this.$store.getters.name)
      },
      getGroupItem(){
          console.log(this.$route.query.group_id)
      },
      onAgeConfirm(val){
          this.state.age = val
          this.formState.showAges = false
      },
      onCompanyConfirm(val){
          this.state.company = val.name
          this.formState.showCompany = false
          //ToDo更新课程列表
      },
      onIdetityChange(val){
          this.state.identity = val
      },
      onCourseChange(val){
          console.log(val)
          this.state.course = val

      },
      toIndex(){
          this.$router.push({ name: 'Index', })
      },
      toPay(){
          console.log('支付现金')
      },

      onSubmit(val){
          console.log(val)
      }

  }
}
</script>

<style scoped>
.main{
    background-color: #efefef;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding-bottom: 110px;
}
.form{
    margin-top: 40px;
    width: 93%;
    box-shadow: rgb(199, 197, 197) 3px 3px 3px 3px ;
}
.course_items{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: white;
    
}
.info{
    font-size: 0.9rem;
    margin: 1rem;
    align-self: start;

}
.courses{
    border: rgb(214, 212, 212) 1px solid;
    width: 95%;
    border-radius: 3%;
    margin-bottom: 10px;
}
.item{
    margin: 0.5rem;
    font-size: 0.9rem;
}
.price_info{
    font-size: 0.9rem;
    align-self: flex-start;
    margin-left: 1rem;
    margin-bottom: 0.7rem;
}
.toindex{
    width: 50%;
    font-size: 15px;
    background-color: white;
    line-height: 55px;
}
.tojoin{
    width: 50%;
    font-size: 15px;
    background-color: #23b4eb;
    line-height: 55px;
    color: white;
}
.notes{
    width: 90%;
    margin-top: 20px;
    font-size: 10px;
    color: grey;
    text-align: left;
}


</style>