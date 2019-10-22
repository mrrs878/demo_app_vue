<template>
  <div class="svg-container" :style="{ color: fillColor, display: titlePosition ? 'flex' : 'block' }" @click="$emit('click')">
    <svg class="svg-icon"  :style="{ width: `${ size }px`, height: `${ size }px` }" aria-hidden="true" :fill="fillColor">
      <use :xlink:href="iconName" />
    </svg>
    <p class="title">{{ title }}</p>
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
    },
    title: {
      type: String,
      default: ''
    },
    titlePosition: {
      type: Boolean,
      default: true
    },
    size: {
      type: Number,
      default: 16
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
  display: flex;
  align-items: center;
  .svg-icon {
    height: 0.48rem;
    width: 0.48rem;
    text-align: center;
    vertical-align: middle;
  }
  .title {
    margin: 0;
  }
}
</style>
