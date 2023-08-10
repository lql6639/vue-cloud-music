<!--
  * @FileDescription: Weather
  * @Author: liqinglin
-->

<template>
  <div class="smile-container">
    <van-nav-bar title="天气" fixed safe-area-inset-top />

    <!-- weather -->
    <div class="weather-wrap">
      <!-- 上 -->
      <div class="info clearfix">
        <div class="pull-left">
          <p>
            <!-- 温度 -->
            <span class="temp">{{ this.temperature }}℃</span>
            <!-- 天气状态 -->
            <span class="type">{{ this.type }}</span>
          </p>
          <!-- 地区 -->
          <p class="area">{{ this.area }}</p>
        </div>
        <div class="pull-right">
          <!-- 天气状态图片 -->
          <svg class="icon weatherImg" aria-hidden="true" ref="weatherImg">
            <use xlink:href=""></use>
          </svg>
        </div>
      </div>
      <!-- 下 -->
      <ul class="list">
        <!-- 高温 -->
        <li class="item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gaowen"></use>
          </svg>
          <p>{{ this.daytemp }}℃</p>
        </li>
        <!-- 低温 -->
        <li class="item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-diwen"></use>
          </svg>
          <p>{{ this.nighttemp }}℃</p>
        </li>
        <!-- 感温 -->
        <li class="item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-ganwentanceqi"></use>
          </svg>
          <p>{{ this.temperature }}℃</p>
        </li>
        <!-- 湿度 -->
        <li class="item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shidu"></use>
          </svg>
          <p>{{ this.real.humidity }}%</p>
        </li>
        <!-- 风向 -->
        <li class="item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fengxiang"></use>
          </svg>
          <p>{{ this.real.winddirection }}</p>
        </li>
        <!-- 风力 -->
        <li class="item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fengli"></use>
          </svg>
          <p>{{ this.real.windpower }}级</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getIP, getReal, getFore } from '../../../api/apis.js'

// 防抖
import { debounce } from '../../../utils/debounce.js'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Weather',
  data () {
    return {
      // IP 定位
      ip: '',
      // 城市名称
      city: '',
      // 实时天气
      real: '',
      // 预报天气
      fore: '',
      // 地区
      area: '',
      // 天气状态
      type: '',
      // 温度
      temperature: '',
      // 高温
      daytemp: '',
      // 低温
      nighttemp: ''
    }
  },
  mounted () {
    this.getWeather()
  },
  methods: {
    async getWeather () {
      const { data: ip } = await getIP()
      this.ip = ip
      // console.log('IP 定位')
      // console.log(this.ip)
      this.city = ip.city
      sessionStorage.setItem('ip', JSON.stringify(this.ip))

      const { data: real } = await getReal(this.city)
      this.real = real.lives[0]
      // console.log('实时天气')
      // console.log(this.real)
      sessionStorage.setItem('real', JSON.stringify(this.real))

      const { data: fore } = await getFore(this.city)
      this.fore = fore.forecasts[0].casts[0]
      // console.log('预报天气')
      // console.log(this.fore)
      sessionStorage.setItem('fore', JSON.stringify(this.fore))

      // 地区
      this.area = this.ip.city.replace(/市(.*)$/, '')
      // 天气状态
      this.type = this.real.weather.replace(/\/.*|-.*|（.*）|\(.*\)/g, '').trim().substring(0, 4)
      // 温度
      this.temperature = this.real.temperature
      // 高温
      this.daytemp = this.fore.daytemp
      if (this.daytemp >= this.temperature) {
        // eslint-disable-next-line no-self-assign
        this.daytemp = this.daytemp
      } else {
        this.daytemp = this.temperature
      }
      // 低温
      this.nighttemp = this.fore.nighttemp
      if (this.nighttemp <= this.temperature) {
        // eslint-disable-next-line no-self-assign
        this.nighttemp = this.nighttemp
      } else {
        this.nighttemp = this.temperature
      }
      // 天气状态图片
      const weatherImg = this.$refs.weatherImg
      // 返回的 weather 值
      const weather = this.real.weather
      // 使用数组来存储不同的天气类型
      const clear = ['晴']
      const clearCloud = ['晴间多云']
      const cloud = ['阴', '少云']
      const cloudy = ['多云']
      const lightRainy = ['雨', '毛毛雨/细雨', '小雨', '小雨-中雨']
      const moderateRainy = ['中雨', '中雨-大雨']
      const heavyRainy = ['大雨', '大雨-暴雨']
      const intenseFall = ['暴雨', '暴雨-大暴雨', '阵雨']
      const downpour = ['大暴雨', '大暴雨-特大暴雨']
      const heavyDownpour = ['特大暴雨', '强阵雨']
      const thundershower = ['雷阵雨', '强雷阵雨']
      const thundershowerHail = ['雷阵雨并伴有冰雹']
      const rainySnow = ['雨雪天气', '雨夹雪', '阵雨夹雪']
      const extremeRainyfall = ['极端降雨']
      const iceRainy = ['冻雨']
      const snow = ['雪']
      const lightSnow = ['小雪', '小雪-中雪']
      const moderateSnow = ['中雪', '中雪-大雪']
      const heavySnow = ['大雪', '大雪-暴雪']
      const blizzard = ['暴雪']
      const snowShower = ['阵雪']
      const fog = ['雾', '轻雾', '大雾']
      const heavyFog = ['浓雾', '强浓雾', '特强浓雾']
      const haze = ['霾']
      const moderateHaze = ['中度霾']
      const heavyHaze = ['重度霾']
      const severityHaze = ['严重霾']
      const floatingDust = ['浮尘']
      const blowingSand = ['扬沙']
      const sandstorm = ['沙尘暴']
      const heavySandstorm = ['强沙尘暴']
      const tornado = ['龙卷风']
      const breeze = ['有风', '平静']
      const southeastWind = ['微风', '和风', '清风']
      const strongBreeze = ['强风/劲风', '疾风', '大风']
      const hurricane = ['烈风', '风暴', '狂爆风', '飓风']
      const tropicalStorm = ['热带风暴']
      const hot = ['热']
      const cold = ['冷']
      // 判断，与 API 返回的 weather 属性匹配，替换 SVG 标签中的 href 值，从而达到需求
      if (clear.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-qing')
      } else if (clearCloud.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-duoyun')
      } else if (cloud.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-yin1')
      } else if (cloudy.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-yin')
      } else if (lightRainy.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-xiaoyu')
      } else if (moderateRainy.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-zhongyu')
      } else if (heavyRainy.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-dayu')
      } else if (intenseFall.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-baoyu')
      } else if (downpour.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-dabaoyu')
      } else if (heavyDownpour.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-tedabaoyu')
      } else if (thundershower.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-leizhenyu')
      } else if (thundershowerHail.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-leizhenyubanbingbao')
      } else if (rainySnow.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-yujiaxue')
      } else if (extremeRainyfall.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-jiduanjiangyu')
      } else if (iceRainy.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-dongyu')
      } else if (snow.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-xue')
      } else if (lightSnow.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-xiaoxue2')
      } else if (moderateSnow.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-zhongxue2')
      } else if (heavySnow.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-daxue2')
      } else if (blizzard.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-baoxue2')
      } else if (snowShower.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-zhenxue')
      } else if (fog.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-wu')
      } else if (heavyFog.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-a-tianqiwu')
      } else if (haze.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-mai')
      } else if (moderateHaze.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-zhongdumai')
      } else if (heavyHaze.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-zhongdumai1')
      } else if (severityHaze.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-yanzhongmai')
      } else if (floatingDust.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-fuchen')
      } else if (blowingSand.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-yangsha')
      } else if (sandstorm.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-a-shachenbao1')
      } else if (heavySandstorm.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-a-qiangshachenbao1')
      } else if (tornado.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-longjuanfeng')
      } else if (breeze.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-weifeng')
      } else if (southeastWind.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-ruofeng')
      } else if (strongBreeze.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-qiangfeng')
      } else if (hurricane.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-a-jufengredaifengbao')
      } else if (tropicalStorm.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-redaifengbao')
      } else if (hot.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-re')
      } else if (cold.includes(weather)) {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-a-re1')
      } else {
        weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-weizhi')
      }
    }
  },
  watch: {
    // 监听 weather data 的变化
    real: debounce(function (newVal, oldVal) {
      this.getWeather()
    }, 3 * 60 * 1000)
  }
}
</script>

<style lang="less" scoped>
.smile-container {
  padding: 46px 0 100px 0;

  // weather
  .weather-wrap {
    width: 240px;
    padding: 40px 30px;
    margin-top: -25px;
    background-color: antiquewhite;
    border-radius: 20px;
    font-size: 14px;
    color: #21206a;
    position: absolute;
    top: 50%;
    left: 50%;
    /* 50%为自身尺寸的一半 */
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);

    /* icon */
    .icon {
      /* 控制图标大小 */
      width: 35px;
      height: 35px;
      /* 图标和文字相邻时，垂直对齐 */
      vertical-align: -0.15em;
      /* 通过设置 color 来改变 SVG 的颜色/fill */
      fill: currentColor;
      /* path 和 stroke 溢出 viewBox 部分在 IE 下会显示，normalize.css 中也包含这行 */
      overflow: hidden;
    }

    // top
    .clearfix {

      .pull-left {
        float: left;

        p {
          .temp {
            margin-right: 10px;
            font-size: 30px;
            font-weight: bolder;
          }

          .type {
            font-size: 14px;
            color: #21206a;
          }
        }

        .area {
          margin: 16px 0 0 30px;
          font-size: 24px;
          color: #a1a1a1;
        }
      }

      .pull-right {
        float: right;

        .weatherImg {
          width: 100px;
          height: 100px;
          margin-top: 5px;
        }
      }
    }

    .clearfix::after {
      content: "";
      display: block;
      clear: both;
    }

    .info {
      margin-bottom: 30px;

      p {
        margin-bottom: 18px;
      }
    }

    // bottom
    .list {
      display: flex;
      flex-wrap: wrap;
      background-color: #fff;
      border-radius: 20px;

      .item {
        width: 33.33%;
        padding: 8px 0;
        text-align: center;
        font-size: 16px;

        svg {
          width: 30px;
        }

        p {
          margin: 6px 0;
        }
      }
    }
  }
}
</style>
