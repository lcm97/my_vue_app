<template>

<div class="main">
    <van-image width="100%" height="200" :src="require('../assets/comealong.png')" />
    <!--表单-->
    <div class="form">
        <van-form ref="dataForm" >
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
            :default-index="8"
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
                :columns="company_list"
                :columns-field-names="{text:'name'}"
                @confirm="onCompanyConfirm"
                @cancel="formState.showCompany = false"
            />
        </van-popup>

        <div class="course_items" >
            <div
             class="info"
            >请选择报名课程</div>
            <van-radio-group v-model="state.course" class="courses" >
                <van-radio v-for="item in course_list" :key="item.id" 
                :name="item.name" 
                icon-size="15px" 
                class="item"
                @click="onCourseChange(item)"
                >{{item.name}}
                </van-radio>
            </van-radio-group>

            <div class="price_info">微信支付：<span style="color:red;">{{state.price}}元</span></div>
        </div>

        <van-field
            v-if="formState.is_grade=='是'"
            v-model="state.grade"
            readonly
            clickable
            name="picker"
            label="年级"
            label-width="3.2em"
            placeholder="点击选择年级"
            :rules="[{ required: true, message: '请选择年级' }]"
            @click="formState.showGrades = true"
        />
        <van-popup v-model:show="formState.showGrades"  position="bottom">
                <van-picker
                    :columns="grades"
                    @confirm="onGradeConfirm"
                    @cancel="formState.showGrades = false"
                    :default-index="3"
                />
        </van-popup>


        </van-form>
    </div>
    <div class="notes">注意：老学员只能开团，不能参团（参团会无效）
    ，新生开团参团皆可，新生老生报名既有效。
    </div>
</div>
<div style="position: fixed;bottom: 0;width: 100%;display: flex;flex-direction: row;">
    <div class="toindex" @click="toIndex">返回首页</div>
    <div class="tojoin" @click="toPay">{{formState.map}}</div>
</div>

    
</template>

<script>
import { fetchCompanybyLink} from '@/api/company'
import { fetchCoursebyComName, refreshCourse} from '@/api/course'
import { joinGroup, openGroup} from '@/api/group'
import { Dialog, Notify } from 'vant';
export default {
  name: 'Register',
  data () {
    return {
        ages:['1','2','3','4','5','6','7','8','9',
        '10','11','12','13','14','15','16','17','18','18',
        '20','21','22','23','24','25','26','27','28','29',
        '30','31','32','33','34','35','36','37','38','39',
        '40','41','42','43','44','45','46','47','48','49','50'],
        grades:['小班','中班','大班','一年级','二年级','三年级',
        '四年级','五年级','六年级','初一','初二','初三','高一','高二','高三'],
        company_list:[],
        course_list:[],
        state:{
            name:'', //学生真实姓名
            phone:'', //学生联系方式
            age: '', //学生年龄
            identity: '新生',
            company:'',//机构
            course:'',//项目
            price:undefined,//需要支付
            group_id: undefined,
            openid: undefined,
            status: undefined,
            user_id: undefined,
            link_id: undefined,
            avatar: undefined,
            grade: '',
            
        },
        formState:{
            showAges: false,
            is_grade: '否',
            showGrades: false,
            showCompany: false,
            map:''
        },
    }
  },
  components: {},
  props: {},
  created() {
        this.getGroupItem()
        this.getCompanyList()
  },
  methods: {
      getGroupItem(){
          if(this.$route.query.group_id){
              this.formState.map = '立即参团'
          }else{
              this.formState.map = '立即开团'
          }
          this.state.group_id = this.$route.query.group_id
          this.state.openid = this.$store.getters.openid
          this.state.link_id = this.$store.getters.link_id
          this.state.user_id = this.$store.getters.user_id
          this.state.avatar = this.$store.getters.avatar
      },
      getCompanyList(){
        //this.link_id = 0
        if(this.$store.getters.link_id==undefined){
            this.$router.push({ name: 'Index', })
        }else{
            fetchCompanybyLink(this.$store.getters.link_id).then(response => {
                this.company_list = response.data.items 
                this.state.company = response.data.items[0].name //默认取第一个
                let query = {link_id:this.$store.getters.link_id,company:this.state.company}
                fetchCoursebyComName(query).then(response=>{
                    this.course_list = response.data.items 
                    this.state.course = this.course_list[0].name
                    this.state.price = this.course_list[0].price
                    this.formState.is_grade = this.course_list[0].is_grade
                })
            })    
        }

    },
      onAgeConfirm(val){
          this.state.age = val
          this.formState.showAges = false
      },
      onGradeConfirm(val){
          this.state.grade = val
          this.formState.showGrades = false
      },
      onCompanyConfirm(val){
          this.state.company = val.name
          this.formState.showCompany = false
          //ToDo更新课程列表 根据link_id 和 课程名字来加载课程列表
          let query = {link_id:this.$store.getters.link_id,company:this.state.company}
            fetchCoursebyComName(query).then(response=>{
                this.course_list = response.data.items 
                this.state.course = this.course_list[0].name
                this.state.price = this.course_list[0].price
                this.formState.is_grade = this.course_list[0].is_grade
          })

      },
      onIdetityChange(val){
          this.state.identity = val
      },
      onCourseChange(item){
          this.state.course = item.name
          this.state.price = item.price
          this.formState.is_grade = item.is_grade
          console.log(this.formState.is_grade)
      },
      toIndex(){
          this.$router.push({ name: 'Index', })
      },
      toPay(){
            this.$refs['dataForm'].validate().then(()=>{
                Dialog.confirm({
                    title: '标题',
                    message: '支付现金',
                    })
                    .then(() => {
                        //console.log('支付成功')
                        //判断是参团还是建团
                        if(this.$route.query.group_id){ //参团
                            this.state.status = '已付款'
                            joinGroup(this.state).then(response=>{
                                //console.log(response.data)
                                Notify({type: 'success', message: '参团成功'})
                                this.$router.push({ name: 'Index', })

                            })
                        }else{ //开团
                            this.state.status = '已付款'
                            //console.log(this.state)
                            openGroup(this.state).then(response=>{
                                //console.log(response.data)
                                Notify({type: 'success', message: '开团成功'});
                                this.$router.push({ name: 'Index', })
                            })
                        }

                    })
                    .catch(() => {
                        // on cancel
                        console.log('支付失败')
                });
            }).catch(()=>{

            })

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
    margin: 0.7rem;
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