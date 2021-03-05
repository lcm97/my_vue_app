<template>
    <div>
        <!--轮播图-->
        <van-swipe :autoplay="3000" indicator-color="white" lazy-render>
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <img :src="image" height="280"/>
            </van-swipe-item>
        </van-swipe>

        <!--右上角按钮-->
        <div class="buttons">
            <div v-bind:class="[isplay?'on':'off']" v-on:click="playmusic">
                <audio loop="loop" src="../static/SeeYouAgain.mp3" id="music" preload="auto"></audio>
            </div> <!--音乐播放按钮 默认关闭-->
            <div class="button"><span>活动<br>玩法</span></div>
            <div class="button"><span>联系<br>机构</span></div>
            <div class="button"><span>用户<br>投诉</span></div>
        </div>

        <!--页面数量统计-->
        <div class="num_board">
            <div style="font-size:13px;">浏览量：{{view_num}}</div>
            <div style="font-size:13px;">团购人数：{{bulk_num}}</div>
            <div style="font-size:13px;">成团数量：{{group_num}}</div>
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

        <!--橙色分割条-->
        <div class="orange_line"></div>

        <!--组团信息-->
        <div class="group_board">
             <!--搜索按钮-->
             <div class="search_group">
                <div style="font-size:15px;color:black;margin-right:5px">点击去搜索更多团</div>
                <van-icon name="search" size="17" color="#4699f5"/>
             </div>
             <!--开团项目-->
             <div class="group_items" v-for="item in group_infos" :key="item.id">
                 <div class="group_item">
                    <van-image
                    round
                    width="62px"
                    height="62px"
                    fit="cover"
                    lazy-load
                    :src="item.img"
                    />
                    <div class="middle_info">
                        <div class="info_up">
                            <div style="font-size:13px">{{item.name}}</div>
                            <div style="font-size:13px">团号：{{item.id}}</div>
                        </div>
                        <div class="info_down">
                            已参团{{item.num}}人,还差2人进阶成3人团
                        </div>
                    </div>
                    <div class="button_right">去参团</div>
                 </div>

             </div>
        </div>

        <!--立即开团按钮-->
        <div class="open_group"></div>
        <div class="open_group_button">立即开团</div>

        <!--波浪效果-->
        <div class="wave wave1"></div>
        <div class="wave wave2"></div>
        <div class="wave wave3"></div>

        <!--快速招生联系-->
        <div class="contact">
             <van-icon name="service" color="#f7c320"/>
             <div style="margin-left:5px;color:#f9ffff">快速招生联系</div>
             <div style="margin-left:5px;color:#f7c320">一键钟琴</div>
        </div>

    </div>
</template>

<script>

export default {
  name: 'Index',
  data () {
    return {
      msg: '这是我的第一个VUE网页',
      isplay: false,
      images: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg',
        'https://img01.yzcdn.cn/vant/apple-3.jpg',
        'https://img01.yzcdn.cn/vant/apple-4.jpg'
      ],
      view_num: 4088, // 浏览量
      bulk_num: 248, // 团购人数
      group_num: 99, // 成团数量
      share_num: 297, // 分享数量

      time_diff: 30 * 60 * 60 * 1000, // 倒计时间差

      group_infos: [ // 使用computer属性计算进阶还需参团人数
        {
          img: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          name: '钟梓建',
          id: 791523,
          type: 1, // 组团人数类型
          num: 1 // 参团人数
        },
        {
          img: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          name: '钟梓建',
          id: 791524,
          type: 1, // 组团人数类型
          num: 1 // 参团人数
        },
        {
          img: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          name: '钟梓建',
          id: 791525,
          type: 1, // 组团人数类型
          num: 1 // 参团人数
        },
        {
          img: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          name: '钟梓建',
          id: 791526,
          type: 1, // 组团人数类型
          num: 1 // 参团人数
        },
        {
          img: 'https://img01.yzcdn.cn/vant/cat.jpeg',
          name: '钟梓建',
          id: 791527,
          type: 1, // 组团人数类型
          num: 1 // 参团人数
        }
      ]

    }
  },
  components: {},
  props: {

  },
  methods: {
    playmusic: function (event) {
      this.isplay = !this.isplay
      const m = document.getElementById('music')
       	this.isplay ? m.play() : m.pause()
    }
  }
}

</script>

<style>
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
      border: blue solid 1px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      color: cornsilk;
      background-color: black;
      opacity: 0.5;
      margin-bottom: 10px;
  }
  .on{
      width: 44px;
      height: 44px;
      background: url('../assets/music_on.png') no-repeat 0 0;
      -webkit-animation: rotating 2s linear infinite;
      animation: rotating 2s linear infinite;
      margin-bottom: 10px;
  }
  .off{
      width: 44px;
      height: 44px;
      background: url('../assets/music_off.png') no-repeat 0 0;
      margin-bottom: 10px;
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
      width: 50%;
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
  .wave{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 90px;
      background: url(../assets/svg.png);
      background-size: 1200px 90px;
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
