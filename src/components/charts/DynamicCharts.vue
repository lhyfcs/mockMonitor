<template>
  <div :id='id' :style='style'></div>
</template>
<script>
export default {
  name: 'Chart',
  data () {
    return {
      chart: ''
    };
  },
  props: {
    id: {
      type: String
    },
    width: {
      type: String,
      default: '300px'
    },
    height: {
      type: String,
      default: '300px'
    },
    option: {
      type: Object,
      default () {
        return {
          title: {
            text: 'test'
          },
          legend: {
            data: 'tag'
          },
          xAxis: {
            data: []
          },
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: 'tag',
              type: 'line',
              data: []
            }
          ]
        };
      }
    }
  },
  computed: {
    style () {
      return {
        height: this.height,
        width: this.width
      };
    }
  },
  mounted () {
    this.init();
  },
  methods: {
    init () {
      window.addEventListener('resize', this.chart.resize);
      this.chart = this.$echarts.init(document.getElementById(this.id));
      this.chart.setOption(this.option);
    }
  },
  watch: {
    option: {
      handler: function (val, oldval) {
        if (this.chart) {
          if (val) {
            this.chart.setOption(val);
          } else {
            this.chart.setOption(oldval);
          }
        } else {
          this.init();
        }
      },
      deep: true
    }
  }
};
</script>