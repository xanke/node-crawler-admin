<template>
  <div>

    <div class="scan-arr-list">
      <ul>
        <li v-for="(item, index) in arr" class="arr-item">

          <a target="_blank" :href="item.url">
            <!-- <img :src="item.image" /> -->
            <p class="title">{{item.name}}</p>
            <p class="price">{{item.price}}</p>

          </a>
        </li>
      </ul>


    </div>
  </div>
</template>

<script type="text-/ecmascript-6">
  export default {
    props: {
      arr: {}
    },
    data () {
      return {
      }
    },
    mounted() {
    },
    computed: {
    },
    components: {
    },
    filters: {
    },
    methods: {
    },
    created () {
    }
  }
</script>


<style lang="stylus">
  .scan-arr-list
    .arr-item
      display inline-block
      overflow: hidden
      margin 5px
      border 2px solid #EEE
      width 100px
      height 200px
      position: relative
      img
        width 100%
      .title
        font-size 12px
        line-height 1.4
        margin-bottom: 10px
      .price
        color #FFF
        background #000
        font-size 12px
        line-height 1.4
        padding 5px
        position: absolute
        top 0px
        margin 0px
      &:hover
        border-color #CCC
</style>
