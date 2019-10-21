<template>
  <div class="svg-container">
    <svg class="svg-icon" aria-hidden="true" :fill="fillColor">
      <use :xlink:href="iconName" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'MIcon',
  props: {
    fillColor: {
      type: String,
      default: '#fff'
    },
    iconClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.iconClass}`
    }
  }
}
</script>

<style scoped lang="less">
@import '~@/assets/less/mainStyle.less';

.svg-container {
  text-align: center;
  .svg-icon {
    height: 0.48rem;
    width: 0.48rem;
    text-align: center;
    vertical-align: middle;
  }
}
</style>
