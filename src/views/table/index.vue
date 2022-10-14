<!--
 * @Date: 2022-10-14 10:38:47
 * @LastEditors: Cosima
 * @LastEditTime: 2022-10-14 18:18:18
 * @FilePath: \vue-admin\src\views\table\index.vue
-->
<template>
  <div>
    <span>Table</span>
  </div>
</template>

<script>
import { textThis } from '@/utils/common'
export default {
  data () {
    return {
      a: 123
    }
  },
  created () {
    this.initCall()
  },
  methods: {
    initCall () {
      textThis.call(this)
    }
  }
}
</script>
