<template>
    <van-overlay :show="showloading" z-index=30 class="loading">
        <van-loading type="spinner"  size="38" color="#4699f5" vertical>加载中...</van-loading>
    </van-overlay>
    <div v-wechat-title="title">
        <!--轮播图-->
        <van-swipe :autoplay="3000" indicator-color="white" >
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <!-- <img :src="image" height="280"/> -->
                <img v-lazy="image" height="280" v-on:click="imagePreview(image)" />
                <!-- <van-image :src="image" height="280" lazy-load>
                    <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                    </template>
                </van-image> -->
            </van-swipe-item>
        </van-swipe>

        <!--右上角按钮-->
        <div class="buttons">
            <van-icon name="music" color="black" size="48" v-bind:class="[isplay?'on1':'off1']" v-on:click="playmusic">
                <!-- <audio loop="loop" :src="this.music" id="music" preload="auto"></audio> -->
                <audio autoplay="autoplay" loop="true" :src="this.music" id="music" hidden="true"></audio>  
            </van-icon>
            <div class="button"  @click="showRules = true"><span>活动<br>玩法</span></div>
            <div class="button"  @click="showContact=true"><span>联系<br>机构</span></div>
            <div class="button" @click="userComplain"><span>用户<br>投诉</span></div>
        </div>

        <!--页面数量统计-->
        <div class="num_board">
            <div style="font-size:13px;">浏览量：{{view_num}}</div>
            <div style="font-size:13px;">团购人数：{{bulk_num}}</div>
            <div style="font-size:13px;">成团数量：{{total}}</div>
            <div style="font-size:13px;">分享：{{share_num}}</div>
        </div>

        <!--倒计时组件-->
        <div class="count_down">
            <div style="font-size:13px;color:white;margin-right:10px">活动倒计时</div>
            <van-count-down :time="time_diff">
                <template #default="timeData">
                    <span class="block">{{ timeData.days }}</span>
                    <span class="colon">天</span>
                    <span class="block">{{ timeData.hours }}</span>
                    <span class="colon">时</span>
                    <span class="block">{{ timeData.minutes }}</span>
                    <span class="colon">分</span>
                    <span class="block">{{ timeData.seconds }}</span>
                    <span class="colon">秒</span>
                </template>
            </van-count-down>
        </div>

        <!--气泡轮播-->
        <transition-group name="bubble" tag="ul" v-if="bubbles.length>0">
            <li v-for="(index, i) in list" :key="index" class="bubble_items">
                <div class="bubble_item">
                    <van-image
                    style="opacity:1"
                        round
                        width="2rem"
                        height="2rem"
                        fit="cover"
                        :src="bubbles[i].avatar"
                        />
                    <div style="font-size: 14px;margin: 5px;color: #dfbe08;">{{ bubbles[i].cap_name }}</div>
                    <div style="font-size: 14px;margin: 5px;color: white;">开团成功</div>
                </div>
                
            </li>
        </transition-group>

        <!--橙色分割条-->
        <div v-if="groupInfo.group_id" class="group_info" >
            <div class="info_up1">
                <div class="info_avatar">
                    <van-badge content="团长" color="#fd7f2a" :offset=[5,7] >
                    <van-image
                    round
                    width="62px"
                    height="62px"
                    fit="cover"
                    lazy-load
                    :src="groupInfo.avatar"
                    />
                    </van-badge>
                    <div style="font-size:15px">{{groupInfo.cap_name}}</div>
                </div>
                <div class="info_right">
                    <div style="font-size:13px;margin-bottom:5px">开团时间：{{groupInfo.created_at}}</div>
                    <div class="tag">
                        <span style="color:red;margin-left:10px;margin-right:10px;font-weight:bold">{{groupInfo.cap_name}}</span>邀您一起来拼团 
                    </div>

                </div>
            </div>
            <div style="font-size:13px;margin:10px">感谢诸位大侠帮助，团长泪流满面</div>
            <div class="share_button" @click="updateShareState">分享海报</div>
        </div>
        <div v-else class="orange_line"></div>

        <!--分享海报-->
        <van-popup v-model:show="showShare">
            <van-image
            width="300"
            height="300"
            fit="contain"
            lazy-load
            :src="poster"
            />
        </van-popup>

        <!--活动规则-->
        <van-popup v-model:show="showRules" :style="{ width: '98%' }">
            <div class="rules">
                <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px', font:'20px', margin:'10px'}" content-position="center">
                    报名流程
                </van-divider>
                <div style="font-size:13px;margin:5px;text-align:left">1. 打开链接，点击“立即开团”</div>
                <div style="font-size:13px;margin:5px;text-align:left">2. 选择项目开团，填写姓名电话</div>  
                <div style="font-size:13px;margin:5px;text-align:left">3. 提交报名，完成线上支付预定名额</div> 
                <div style="font-size:13px;margin:5px;text-align:left">4. 点击右上角三个小点，选择分享给好友、微信群或朋友圈</div>  
                <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px', font:'20px', margin:'10px'}" content-position="center">
                    注意事项
                </van-divider>
                <div style="font-size:13px;margin:5px;text-align:left">1. 老生只可以开团当团长，不可参团做团员（参团无效）</div>
                <div style="font-size:13px;margin:5px;text-align:left">2. 老生开团不成功，线下退还开团费用，新生报名即有效</div>
                <div style="font-size:13px;margin:5px;text-align:left">3. 老学员拼团成功后课程在原有课程上叠加，不限时间上完</div>
                <div style="font-size:13px;margin:5px;text-align:left">4. 所以机构课程混合参团，分开上课。现在上体验课的算老生。咨询过，没有长期缴费都为新生，均可直接开团当团长或者参团当团员，老生报名新科目也算新生。</div>
                <div style="font-size:13px;margin:5px;text-align:left">5. 所有成功报名的新学员需在通知上课后2个月有效</div>
                <div style="font-size:13px;margin:5px;text-align:left">6. 新生报名即有效，所有新生报名成功后不得转让，不予退费</div>
                <div style="font-size:13px;margin:5px;text-align:left">7. 报名链接限定一个微信号只能报一个科目，报名第二科目需要用到另外一个微信号</div>
            </div>

        </van-popup>
 
        <!--用户投诉-->
        <van-popup v-model:show="showComplain"
            closeable
            close-icon-position="top-left"
            :style="{ width: '98%' }">
            <van-form style="height:300px;padding-top:70px" ref="complainForm">
                <van-field
                    v-model="complain.content"
                    rows="3"
                    autosize
                    label="投诉内容"
                    type="textarea"
                    maxlength="400"
                    placeholder="请输入文字"
                    :rules="[{ required: true, message: '请填写内容' }]"
                    show-word-limit
                />
                <van-field
                    v-model="complain.contact"
                    name="联系方式"
                    label="联系方式"
                    placeholder="请输入联系方式"
                    :rules="[{ required: true, message: '请填写联系方式' }]"
                />
                <div style="margin: 16px;">
                    <van-button round block type="primary" native-type="submit" v-on:click="submitComplain">
                    提交
                    </van-button>
                </div>
            </van-form>
        </van-popup>


        <van-popup v-model:show="showContact">
            <van-image
                width="19rem"
                height="30rem"
                fit="contain"
                lazy-load
                :src="contact"
            />
        </van-popup>


        <!--组团信息-->
        <div class="group_board">
             <!--搜索按钮-->
             <div class="search_group" v-on:click="showDialog = true">
                <div style="font-size:15px;color:black;margin-right:5px">点击去搜索更多团</div>
                <van-icon name="search" size="17" color="#4699f5"/>
             </div>
             <!--开团项目-->
             <div class="group_items" v-for="item in group_list" :key="item.id">
                 <div class="group_item">
                    <van-image
                    round
                    width="62px"
                    height="62px"
                    fit="cover"
                    lazy-load
                    :src="item.avatar"
                    />
                    <div class="middle_info">
                        <div class="info_up">
                            <div style="font-size:13px">{{item.cap_name}}</div>
                            <div style="font-size:13px">团号：{{item.id}}</div>
                        </div>
                        <div class="info_down">
                            已参团{{item.num}}人,还差{{item.diff_num}}人进阶成{{item.next_type}}人团
                        </div>
                    </div>
                    <div v-if="item.num<10" class="button_right" v-on:click="joinGroup(item)">去参团</div>
                    <div v-else class="button_right2"></div>
                 </div>

             </div>
        </div>


        <!--组队弹窗-->
        <van-dialog v-model:show="showDialog" 
            title="更多附近的团" 
            show-cancel-button 
            :showConfirmButton= false 
            width="96%" 
            @cancel="onCancel"
            class="group_dialog">

            <van-search
                v-model="search_val"
                show-action
                background="#fd7f2a"
                placeholder="团长姓名/团编号"
                @search="onSearch"
                >
                <template #action>
                    <div @click="onSearch(search_val)">搜索</div>
                </template>
            </van-search>
             <div class="group_items" v-for="item in group_list" :key="item.id">
                 <div class="group_item">
                    <van-image
                    round
                    width="62px"
                    height="62px"
                    fit="cover"
                    lazy-load
                    :src="item.avatar"
                    />
                    <div class="middle_info">
                        <div class="info_up">
                            <div style="font-size:13px">{{item.cap_name}}</div>
                            <div style="font-size:13px">团号：{{item.id}}</div>
                        </div>
                        <div class="info_down">
                            已参团{{item.num}}人,还差{{item.diff_num}}人进阶成{{item.next_type}}人团
                        </div>
                    </div>
                    <div v-if="item.num<10" class="button_right" v-on:click="joinGroup(item)">去参团</div>
                    <div v-else class="button_right2"></div>
                 </div>

             </div>

             <van-pagination v-model="groupQuery.page" mode="simple" :page-count="page_count"  style="color:black" @change="getGroupList"/>
            

        </van-dialog>

        <!--活动详情面板-->
        <div class="detail_board">活动详情</div>
        
        <!--课程秒杀-->
        <div class="course_board">
            <div class="search_group">
                <div style="font-size:15px;color:black;margin-right:5px">课程秒杀</div>
            </div>
            <!--课程项目-->
            <div class="course_items" v-for="item in course_list" :key="item.id">
                <div class="course_item">
                    <van-image
                    width="9rem"
                    height="7rem"
                    fit="cover"
                    lazy-load
                    :src="item.img"
                    v-on:click="imagePreview(item.img)"
                    />
                    <div class="middle_info2">
                        <div class="course_name">{{item.name}}</div>
                        <div class="course_class">{{item.class}}</div>
                        <span class="origin_price">原价:¥{{item.ori_price}}</span>
                        <div class="prices">
                            <span class="price_board">现价</span>
                            <span class="price">¥{{item.price}}</span>
                        </div>
                        <div class="button_bottom" @click="openGroup(item)">立即开团</div>
                    </div>
                </div>
            </div>
        </div>

        <!--蓝色分割条-->
        <div class="blue_line"></div>
        
        <!--福利列表-->
        <div class="welfare_list" v-for="(item,index) in welfare_list" :key="index">
            <div class="welfare_item">
                <div class="search_group">
                    <div style="font-size:15px;color:black;margin-right:5px">{{item.title}}</div>
                </div>
                <div class="welfare_detail">
                    <div style="margin:8px">{{item.describe}}</div>
                </div>
                <div class="welfare_imgs" v-for="(img,idx) in item.imglist" :key="idx">
                    <van-image style="width:94%;margin-bottom:10px" fit="cover" lazy-load :src="img" v-on:click="imagePreview(img)" />
                </div>

            </div>
        </div>
        <!--蓝色分割条-->
        <div style="height: 24px;background-color: #4699f5;margin-left: 10px;margin-right:10px;margin-bottom:10px"></div>
        <div class="group_board">
            <div class="search_group">
                <div style="font-size:18px;color:black;margin-right:5px">机构介绍</div>
            </div>


            <div class="company_list" v-for="(item,index) in company_list" :key="index">
                <div class="company_name">{{item.name}}</div>
                <span style="margin:10px;font-size:15px;text-align: left;">{{item.describe}}</span>
                <div class="welfare_imgs" v-for="(img,idx) in item.imglist" :key="idx">
                    <van-image style="width:94%;margin-bottom:10px" fit="cover" lazy-load :src="img" v-on:click="imagePreview(img)" />
                </div>
                <div class="contact_board">联系方式</div>
                <div class="contact_phone">电话：{{item.phone}}</div>
                <div class="contact_phone">地址：{{item.address}}</div>
                <div class="welfare_imgs" v-for="(img,idx) in item.contacts" :key="idx">
                    <van-image style="width:94%;margin-bottom:10px" fit="cover" lazy-load :src="img" v-on:click="imagePreview(img)"/>
                </div>
            </div>

        </div>
        <!--立即开团按钮-->
        <div class="open_group" ></div>
        <div class="open_group_button" v-on:click="openGroup2">立即开团</div>

        <!--波浪效果-->
        <div class="wave wave1"></div>
        <div class="wave wave2"></div>
        <div class="wave wave3"></div>

        <!--快速招生联系-->
        <div class="contact" @click="showContact=true">
             <van-icon name="service" color="#f7c320"/>
             <div style="margin-left:5px;color:#f9ffff">快速招生联系</div>
             <div style="margin-left:5px;color:#f7c320">广在线</div>
        </div>

    </div>
</template>

<script>
import { fetchCompanybyLink} from '@/api/company'
import { fetchCoursebyLink,fetchCoursebyName } from '@/api/course'
import { fetchGroupList,infoGroup } from '@/api/group'
import { fetchWelfareList} from '@/api/welfare'
import { isNumber} from '@/utils/validate'
import { getUrlKey } from '@/utils/index'
import { findorCreate,getbulknum,getUserInfo,updateUserStatus} from '@/api/user'
import { updateViews,updateShares} from '@/api/links'
import { addComplain} from '@/api/complain'
import { Notify,ImagePreview,Dialog } from 'vant';
import { weixinPrePay} from '@/api/wxpay'
import { buildMessage, sign } from '@/utils/sign'
export default {
  name: 'Index',
  data () {
    return {
      showloading: false,
      listQuery: {
            page: 1,
            limit: 10,

            name: undefined,
            company: undefined
      },
      groupQuery:{
            page: 1,
            limit: 5,
            cap_name: undefined,
            id: undefined,
            link_id: undefined,
      },
      link_id: undefined,
      title: '广在线招生',
      search_val: undefined,
      total: 0,
      page_count: 12,
      isplay: true,

      images:[],
      view_num: undefined, // 浏览量
      bulk_num: undefined, // 团购人数
      group_num: 99, // 成团数量
      share_num: undefined, // 分享数量

      poster: '', //分享海报url
      contact: '', //联系人二维码url

      time_diff: undefined, // 倒计时间差

      group_list: [], 
      course_list:[],
      welfare_list:[],
      company_list:[],
      showDialog: false,
      showShare: false,
      showContact: false,
      showComplain: false,
      showRules:false,

      groupInfo:{
         group_id: undefined,
         avatar: undefined,
         cap_name: undefined,
         created_at: undefined
      },

      complain:{
          content: '',
          contact: '',
      },

      bubbles: [],
      list: [0],
      next: 1,

      music: '',
    

    }
  },
  components: {},
  props: {

  },
  created() {
        this.initPage()
  },
  mounted(){
    setInterval(() => {
        this.list.shift()
        this.list.push(this.next++)
        if(this.bubbles.length>0){
            const out = this.bubbles.shift()
            this.bubbles.push(out)
        }
    }, 3000)

  },
  methods: {
    initPage(){
        this.showloading = true

        let code = undefined
        if(this.$store.getters.link_id){
            this.link_id = this.$store.getters.link_id
            //console.log(this.link_id)
        }else{
            this.link_id = parseInt(getUrlKey("state"))
            code = getUrlKey("code")
        }
        this.groupQuery.link_id = this.link_id
        //if(this.link_id == undefined){this.link_id = 1}
        if(code){ //用户首次登录
            console.log('用户首次登录')
            this.$store.dispatch('user/setLinkId', this.link_id)
            getUserInfo(code).then(response=>{
                if(response.data.errcode){
                    let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9921568c91d3e0d1&redirect_uri=http://www.20gzx.com&response_type=code&scope=snsapi_userinfo&state='+this.link_id+'#wechat_redirect'
                    window.location.href = url
                    //Notify({ type: 'warning', message: '用户登录出错，请退出浏览器重新登录' });
                    this.showloading = false
                }else{
                    var userInfo = {
                        openid: response.data.openid,
                        avatar: response.data.headimgurl,
                        link_id: this.link_id
                    }
                    this.$store.dispatch('user/setInfo', userInfo)
                    findorCreate(userInfo).then(response =>{
                        var [user, created] = response.data
                        this.$store.dispatch('user/setUserId', user.id)
                        if(user.group_id){
                            infoGroup(user.group_id).then(response=>{
                                this.groupInfo.group_id = response.data.id
                                this.groupInfo.avatar = response.data.avatar
                                this.groupInfo.cap_name = response.data.cap_name
                                this.groupInfo.created_at = response.data.created_at
                            })
                        }
                        this.showloading = false

                        if(user.status=='未付款'){
                            let _company = user.company
                            let _course = user.course
                            Dialog.confirm({
                                title: '提示',
                                message: `您有一项课程未付款:\r\n机构名称： ${ _company }\r\n课程名称：${ _course } `,
                                theme: 'round-button',
                                confirmButtonText: '去支付'
                            })
                            .then(() => {
                                //用户点击去支付
                                this.showloading = true
                                //1、获取课程价格
                                fetchCoursebyName({link_id: this.link_id, name: _course}).then(response=>{
                                    //console.log(response.data.price)
                                    let out_trade_no = parseInt(+new Date() / 1000 + '').toString()
                                    let query_data = this.setPayConfig(
                                        response.data.name, //商品描述
                                        response.data.price,  //商品价格
                                        user.openid, //openid
                                        out_trade_no //订单号
                                    )
                                    //console.log(query_data)
                                    var course_id = response.data.id
                                    weixinPrePay(query_data).then(response=>{
                                        if(response.statusCode==200){
                                            const prepay_id = response.body.prepay_id
                                            //2 按照签名规则进行签名计算
                                            const nonceStr = Math.random().toString(36).substr(2, 15), // 随机字符串
                                            timestamp = parseInt(+new Date() / 1000 + '').toString() // 时间戳 秒
                                            
                                            var message = buildMessage(timestamp, nonceStr, prepay_id)
                                            const paySign = sign(message)

                                            if (typeof WeixinJSBridge == "undefined"){
                                                if( document.addEventListener ){
                                                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                                                }else if (document.attachEvent){
                                                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                                                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                                                }
                                            }else{
                                                //3 发起支付
                                                this.showloading = false
                                                var that = this
                                                var _course_id = course_id
                                                
                                                //console.log( `course_id${_course_id}`)
                                                WeixinJSBridge.invoke(
                                                    'getBrandWCPayRequest', {
                                                        "appId":"wx9921568c91d3e0d1",     //公众号ID，由商户传入     
                                                        "timeStamp": timestamp,         //时间戳，自1970年以来的秒数     
                                                        "nonceStr": nonceStr, //随机串     
                                                        "package": "prepay_id="+prepay_id,     
                                                        "signType": "RSA",           
                                                        "paySign": paySign 
                                                    },
                                                    function(res){
                                                    if(res.err_msg == "get_brand_wcpay_request:ok" ){
                                                        let _userid = that.$store.getters.user_id
                                                        let status = '已付款'
                                                        //更新用户的支付状态
                                                        updateUserStatus({id:_userid, status:status, course_id: _course_id}).then(response=>{
                                                            Notify({type: 'success', message: '支付成功'})
                                                        })
                                                    }else{
                                                        //console.log('用户支付失败')
                                                        Notify({type: 'danger', message: '支付失败'})
                                                    } 
                                                }); 
                                            }
                                        }else{
                                            Notify({type: 'danger', message: '提交订单失败'});
                                        }
                                }) 



                                })

                            })
                            .catch(() => {
                                //用户点击取消
                                // on cancel
                            });
                        }


                    })
                    
                }

            })
        }else{ //由其它页面跳转
            console.log('由其它页面跳转')
            var userInfo = {
                openid: this.$store.getters.openid,
                avatar: this.$store.getters.avatar,
                link_id: this.$store.getters.link_id
            }
            findorCreate(userInfo).then(response =>{
                var [user, created] = response.data
                this.$store.dispatch('user/setUserId', user.id)
                this.showloading = false
                if(user.group_id){
                    infoGroup(user.group_id).then(response=>{
                        this.groupInfo.group_id = response.data.id
                        this.groupInfo.avatar = response.data.avatar
                        this.groupInfo.cap_name = response.data.cap_name
                        this.groupInfo.created_at = response.data.created_at
                        })
                }
                this.showloading = false
            })            
        }

        this.getLinkViews()
        this.getCompanyList()
        this.getGroupList()
        this.getCourseList()
        this.getWelfareList()
        this.getBulkNum()
    },
    getGroupList(){
        this.groupQuery.link_id = this.link_id
        fetchGroupList(this.groupQuery).then(response => {
            this.group_list = response.data.items 
            this.group_list.forEach(v=>{
                this.bubbles.push(v)
            })
            this.total = response.data.total
            this.page_count = Math.ceil(this.total / 5)
        })    
    },
    getCourseList(){
        //this.link_id = 1
        fetchCoursebyLink(this.link_id).then(response => {
            //console.log(response.data.items)
            this.course_list = response.data.items 
        })    
    },
    getCompanyList(){
        //this.link_id = 1
        this.showloading = true
        fetchCompanybyLink(this.link_id).then(response => {
            this.company_list = response.data.items
            this.images = []
            //let temp_list = []
            this.company_list.forEach(v=>{
                var that = this
                v.imglist.forEach((j,index)=>{
                    if(index==0){
                        that.images.push(j)
                    }
                })
                //如果只有一个机构
                if(that.images.length==1){
                    that.images = []
                    v.imglist.forEach((j,index)=>{
                        that.images.push(j)
                    })
                }
                //如果只有一个机构一张照片
                // if(that.images.length==1){
                //     v.imglist.forEach((j,index)=>{
                //         that.images.push(j)
                //     })
                // }
            })
            this.showloading = false

        })    
    },
    getWelfareList(){
        fetchWelfareList().then(response =>{
            this.welfare_list = response.data.items
        })
    },
    getLinkViews(){
        //this.link_id = 1
        updateViews(this.link_id).then(response=>{
            //console.log(response)
            this.music = response.data.item.music
            this.view_num = response.data.item.views
            this.share_num = response.data.item.shares
            this.poster = response.data.item.poster
            this.contact = response.data.item.contact
            this.deadline = response.data.item.deadline

            this.$store.dispatch('user/setTitle', response.data.item.name)
            this.title = response.data.item.name

            if(this.deadline==''){
                this.time_diff = 30 * 60 * 60 * 1000;
            }else{
                this.getTimeDiff(this.deadline)
            }
            // this.isplay = true
            // document.getElementById('music').play()
        })
    },
    getTimeDiff(deadline){
        var ddl = new Date(deadline.replace(/-/g, '/')).getTime();
        var now = new Date().getTime();
        if(ddl-now>0){
            this.time_diff = ddl-now
        }else{
            this.time_diff = 30 * 60 * 60 * 1000;
        }

    },
    updateShareState(){
        this.showShare=true
        //this.link_id = 1
        updateShares(this.link_id).then(response=>{
            this.share_num = response.data.item.shares
        })
    },

    userComplain(){
        this.complain.contact = ''
        this.complain.content = ''
        this.showComplain = true
    },
    submitComplain(){
        this.$refs['complainForm'].validate().then(()=>{
            addComplain(this.complain).then(response=>{
                Notify({ type: 'success', message: '提交成功' });
                this.showComplain = false;
            })
        })
    },

    getBulkNum(){
        //this.link_id = 1
        getbulknum(this.link_id).then(response=>{
            this.bulk_num = response.data.total
        })
        
    },
    onSearch(val){
        if(isNumber(val)){
            this.groupQuery.id = val
            console.log(this.groupQuery.id)
        }else{
            this.groupQuery.cap_name = val
        }
        this.groupQuery.page = 1
        this.getGroupList() 
    },
    onCancel(){
        this.groupQuery.cap_name = undefined
        this.groupQuery.id = undefined
        this.groupQuery.page = 1
        this.getGroupList() 
    },
    playmusic: function (event) {
        this.isplay = !this.isplay
        const m = document.getElementById('music')
       	this.isplay ? m.play() : m.pause()
    },
    imagePreview(url){
        var imglist = []
        imglist.push(url)
        ImagePreview({images: imglist,closeable: true,})
    },

    joinGroup(item){
        //console.log(item.id)
        this.$router.push({ 
            name: 'Register', 
            query: { group_id: item.id }
        })
    },
    openGroup(item){
        //console.log(item)
        this.$router.push({ 
            name: 'Register', 
            query: { course_id: item.id }
        })
    },
    openGroup2(){
        this.$router.push({ 
            name: 'Register', 
        })
    },
    //处理未付款
    setPayConfig(description, price, openid, out_trade_no){
            const query_data = {
                appid: "wx9921568c91d3e0d1",
                mchid: "1607853953",
                description, //商品描述
                out_trade_no, //生成订单号ToDo
                notify_url: 'http://www.20gzx.com',
                amount:{
                    total:price*100, //单位为分
                    currency: 'CNY',
                },
                payer:{
                    openid:openid
                }
            }
            return query_data
      },
  }
}

</script>

<style>
  .loading{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .van-swipe-item {
    width: 100%;
    height: 280px;
    z-index: 1;
  }
  .buttons{
      position: fixed;
      top: 6%;
      right: 5%;
      /* border: solid red 1px; */
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      z-index: 2;
  }
  .button{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      color: cornsilk;
      background-color: black;
      opacity: 0.5;
      margin-bottom: 10px;
  }
  .on1{
      -webkit-animation: rotating 2s linear infinite;
      animation: rotating 2s linear infinite;
      margin-bottom: 10px;
      opacity: 0.5;
  }
  .off1{
      margin-bottom: 10px;
      opacity: 0.5;
  }
  .num_board{
      width: 100%;
      height: 32px;
      background-color: #feda01;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
  }
  .count_down{
      width: 100%;
      height: 40px;
      background-color: #4699f5;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
  }
  .colon {
    display: inline-block;
    /*margin: 0 4px;*/
    color: white;
    font-size: 13px;
    margin-right: 3px;
  }
  .block {
    display: inline-block;
    width: 30px;
    height: 25px;
    text-align:center;
    line-height: 25px;
    color: #f4f6f5;
    font-size: 18px;
    text-align: center;
    background-color: #03060b;
    border-radius: 10%;
    margin-right:3px ;
  }
  .group_info{
      margin: 10px;
      background-color: #feda01;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
  }
  .info_up1{
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
  }
  .info_avatar{
      margin-top: 15px;
      margin-left: 20px;
  }
  .info_right{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      margin-left: 25px;
  }
  .tag{
      position: relative;
      height: 55px;
      width: 220px;
      background-color: white;
      border-radius: 5px;
      border: 1px black solid;
      line-height: 40px;
      text-align: left;
      font-size: 14px;
  }
  .tag::before,.tag::after{
      content: "";
      display: block;
      position: absolute;
      right: 220px;
      top: 10px;
      border-width: 13px;
      border-style: solid dashed dashed;
      border-color: transparent black transparent transparent;

  }
  .tag::after{
      right: 219px;
      border-color: transparent white transparent transparent;
  }
  .share_button{
      height: 2rem;
      width: 10rem;
      line-height: 2rem;
      color: cornsilk;
      font-size: 15px;
      background-color: #fd7f2a;
      margin: 10px ;
  }
  .orange_line{
      height: 24px;
      background-color: #feda01;
      margin: 10px;
  }
  .group_board{
      margin-right: 10px;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
  }
  .search_group{
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: 45px;
      width: 100%;
      background-color: #fd7f2a;
      border: black 1px dashed;
  }
  .group_items{
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
  }
  .group_item{
      width: 100%;
      height: 80px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      background-color: #feda02;
      border-bottom: black dashed 1px;
  }
  .middle_info{
      width: 51%;
      height: 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;

  }
  .info_up{
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
  }
  .info_down{
      font-size: 11px;

  }
  .button_right{
      width: 17%;
      height: 40px;
      font-size: 13px;
      text-align: center;
      line-height: 40px;
      background-color: white;
      border-radius: 10%;
      border: black solid 1px;
  }
  .button_right2{
      width: 17%;
      height: 40px;
      font-size: 13px;
      text-align: center;
      line-height: 40px;
      background-color: #feda02;
      border-radius: 10%;
      border: #feda02 solid 1px;
  }
  .open_group{
      position: fixed;
      bottom: 0px;
      width: 100%;
      height: 100px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      z-index: 5;
      background-color: black;
      opacity: 0.5;
  }
  .open_group_button{
      position: fixed;
      bottom: 0px;
      margin:auto;
      left:0;
      right:0;
      height: 90px;
      width: 50%;
      font-size: 18px;
      color: white;
      text-align: center;
      padding-top: 10px;
      background-color: #4699f5;
      z-index: 6;
  }
  .detail_board{
      width: 100%;
      height: 42px;
      margin-top: 10px;
      margin-bottom: 10px;
      color: white;
      font-size: 18px;
      text-align: center;
      line-height: 42px;
      background-color: #4699f5;
  }
  .course_board{
      margin-right: 10px;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
  }
  .course_items{
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
  }
  .course_item{
      width: 100%;
      height: 160px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      background-color: #feda02;
      border-bottom: black dashed 1px;    
  }

  .middle_info2{
      width: 53%;
      height: 130px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
  }
  .course_name{
      font-size: 15px;
      margin-bottom: 5px;

  }
  .course_class{
      font-size: 13px;
      color: gray;
  }
  .prices{
      height: 23px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-end;
  }
  .price_board{
      width: 2rem;
      height: 1rem;
      background-color: red;
      font-size: 13px;
      color: whitesmoke;
      border-radius: 15%;
  }
  .price{
      font-size: 17px;
      margin-left: 8px;
      line-height: 18px;
      margin-top: 3px;
  }
  .origin_price{
      font-size: 13px;
      color: gray;
      text-decoration: line-through;
      margin-top: 5px;
  }
  .button_bottom{
      width: 98%;
      height: 28px;
      line-height: 28px;
      background-color: white;
      border: 1px black solid;
      border-radius: 5px;
      margin-top: 8px;
  }
  .blue_line{
      height: 24px;
      background-color: #4699f5;
      margin: 10px;
  }
  .welfare_list{
      margin-right: 10px;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
  }
  .welfare_item{
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 10px;
  }
  .welfare_detail{
      width: 100%;
      font-size: 15px;
      text-align: left;
      background-color: #feda02;
      padding-bottom: 5px;
      padding-top: 8px;
  }
  .welfare_imgs{
      width: 100%;
      background-color: #feda02;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
  }
  .company_list{
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      background-color: #feda02;
      border: black dashed 1px;
      margin-bottom: 15px;

  }
  .rules{
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      width: 100%;
  }
  .company_name{
      font-size: 16px;
      border-bottom: black dashed 1px;
      width: 100%;
      height: 2rem;
      line-height: 2rem;
  }
  .contact_board{
      width: 95%;
      height: 30px;
      background-color: whitesmoke;
      line-height: 30px;
      font-size: 15px;
  }
  .contact_phone{
      width: 95%;
      text-align: left;
      margin: 5px;
      font-size: 15px;
  }

  li {
    transition: all 1s;
    display: block;
  }
  .bubble-enter {
    opacity: 0;
    transform: translateY(50px);
  }
  .bubble-leave-to {
    opacity: 0;
    transform: translateY(-50px);
  }
  /* 这个看似无用，但必须加上 */
  .bubble-leave-active {
    position: fixed;
  }
  .bubble_items{
      position: fixed;
      left: 2%;
      /* border: solid red 1px; */
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      z-index: 2;
  }

   .bubble_item{
       display: flex;
       flex: row;
       justify-content: center;
       align-items: center;
       background-color: black;
       opacity: 0.6;
       border-radius: 2rem;
   }


  .wave{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 50px;
      background: url(../assets/svg.png);
      background-size: 1200px 50px;
  }
  .wave.wave1{
      animation: animate 7s linear infinite;
      z-index: 20;
      opacity: 0.9;
      animation-delay: 0s;
      bottom: 0;
  }
  .wave.wave2{
      animation: animate 5s linear infinite;
      z-index: 19;
      opacity: 0.7;
      animation-delay: -2s;
      bottom: 0;
  }
  .wave.wave3{
      animation: animate 3s linear infinite;
      z-index: 18;
      opacity: 0.6;
      animation-delay: -1s;
      bottom: 0;
  }
  .contact{
      position: fixed;
      padding-right: 10px ;
      bottom: 0px;
      right: 0px;
      width: 100%;
      height: 50px;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      z-index: 21;
  }
@keyframes animate{
    0%{
        background-position-x: 0px;
    }
    100%{
        background-position-x: 1200px;
    }
}
@-webkit-keyframes rotating {
	from{
		-webkit-transform: rotate(0deg);
		-moz-transform: rotate(0deg);
		-ms-transform: rotate(0deg);
		-o-transform: rotate(0deg);
    	transform: rotate(0deg);
	}
	to{
		-webkit-transform: rotate(360deg);
		-moz-transform: rotate(360deg);
		-ms-transform: rotate(360deg);
		-o-transform: rotate(360deg);
		transform: rotate(360deg);
	}
}
@keyframes rotating {
    from{
        -webkit-transform: rotate(0deg);
		-moz-transform: rotate(0deg);
		-ms-transform: rotate(0deg);
		-o-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    to{
        -webkit-transform: rotate(360deg);
		-moz-transform: rotate(360deg);
		-ms-transform: rotate(360deg);
		-o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style>
