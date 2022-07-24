<template>
  <div id="app" >
    <h1 v-html = "title" class="center"></h1>
    <el-select v-model="service.value" placeholder="Select" @change="selectChange($event)">
      <el-option
        v-for="item in service.options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <div class="sliceBlock">
      <span class="demonstration">Flow Rate</span>
      <el-slider
        v-model="selectService.flowRate"
        :step="10"
        show-stops
        @change="sliderFlowRateChange($event)">
      </el-slider>
    </div>
    <div class="sliceBlock" style="margin-top: 20px">
      <span class="demonstration">Service Flow Change Percent</span>
      <el-slider
        v-model="selectService.changePercent"
        :step="10"
        show-stops
        @change="sliderChange($event)">
      </el-slider>
    </div>
    <h2 v-html = "golang" class="center"></h2>
    <div class="servicePanel">
      <li v-for="(option, index) in selectService.images.optionsGo">
        <Chart :id="'mockGo'+index" :option="option"></Chart>
      </li>
    </div>
    <h2 v-html = "nodejs" class="center"></h2>
    <div class="servicePanel">
      <li v-for="(option, index) in selectService.images.optionsNode">
        <Chart :id="'mockNode'+index" :option="option"></Chart>
      </li>
    </div>
  </div>
  
</template>


<script>
import $ from 'jquery'
window.$ = $;
window.jQuery = $;
import Store from './store'
import HelloWorld from './components/HelloWorld.vue'
import Chart from './components/charts/DynamicCharts.vue';
import { MockServices, getService } from './data/MockService';
import { generateImages, connectComponent, updateImages } from './data/mockImages';
export default {
  components: {
    HelloWorld,
    Chart
  },
  data () {
    return {
      title: 'Monitor System',
      golang: 'Golang Services',
      nodejs: 'NodeJs Services',
      service: MockServices,
      selectService: {
        images: {
          optionsGo: [],
          optionsNode: []
        }
      },
    };
  },
  mounted () {
    console.log('init');
    this.init();
    this.initdata();
    connectComponent(this);
  },
  methods: {
    init () {
      var signalR = $.signalR;
      var $this = this;
      signalR.hub = $.hubConnection('http://localhost: 57577/signalr', {
        useDefaultPath: false
      });
      
    },
    initdata () {
      this.selectService = getService(this.service.value);
      this.updateOptions();
    },
    updateOptions(onlyChange=false) {
      if (!onlyChange || (this.selectService.images.optionsGo.length === 0 && this.selectService.images.optionsNode.length === 0)) {
        updateImages(this.selectService);
      }
    },
    rnd(low, high) {
      return Math.floor(Math.random() * (high - low + 1) + low) * (Math.random() % 2 === 0 ? -1 : 1) / 100;
    },
    selectChange(e) {
      this.selectService = getService(e);
      this.updateOptions(true);
    },
    sliderChange(e) {
      this.updateOptions();
    },
    sliderFlowRateChange(e) {
      this.updateOptions();
    },
    makeProxyCallback (hub, callback) {
      return function () {
        callback.apply(hub, $.makeArray(arguments));
      };
    },
    registerHubProxies (instance, shouldSubscribe) {
      var key, hub, memberKey, memberValue, subscriptionMethod;
      for (key in instance) {
        if (instance.hasOwnProperty(key)) {
          hub = instance[key];
          if (!hub.hubName) {
            // Not a client hub
            continue;
          }
          if (shouldSubscribe) {
            // We want to subscribe to the hub events
            subscriptionMethod = hub.on;
          } else {
            // We want to unsubscribe from the hub events
            subscriptionMethod = hub.off;
          }
          // Loop through all members on the hub and find client hub functions to subscribe/unsubscribe
          for (memberKey in hub.client) {
            if (hub.client.hasOwnProperty(memberKey)) {
              memberValue = hub.client[memberKey];
              if (!$.isFunction(memberValue)) {
                // Not a client hub function
                continue;
              }
              // Use the actual user-provided callback as the 'identity' value for the registration.
              subscriptionMethod.call(
                hub,
                memberKey,
                this.makeProxyCallback(hub, memberValue),
                memberValue
              );
            }
          }
        }
      }
    }
  }
}
</script>

<style>
.finished{
  text-decoration:line-through;
}
li{
  list-style:none;
  font-size:1.6em;
  margin-top:10px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 10px;
  color: #2c3e50;
  margin-top: 60px;
}

.center {
  text-align: center;
}
input{
  width:230px;
  height:40px;
  border-radius:20px;
  padding: 0.4em 0.35em;
  border:3px solid #CFCFCF;
  font-size: 1.55em;
}

</style>