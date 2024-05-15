<script setup lang="ts">
import { getKnowledgePage } from '@/services/consult'
import type { KnowledgeType, KnowledgeParams, KnowledgeList } from '@/types/consult'
import KnowledgeCard from './KnowledgeCard.vue'

import { ref } from 'vue'
const loading = ref(false)
const finished = ref(false)
const list = ref<KnowledgeList>([])
const props = defineProps<{
  type: KnowledgeType
}>()

const params = ref<KnowledgeParams>({
  type: props.type,
  current: 1,
  pageSize: 5
})

const onLoad = async () => {
  const res = await getKnowledgePage(params.value)
  //   console.log(res)
  list.value.push(...res.data.rows)
  if (params.value.current >= res.data.pageTotal) {
    finished.value = true
  } else {
    params.value.current++
  }
  loading.value = false
}

// const finished = ref(false)
// const onLoad = () => {
//   console.log('加载中')
//   setTimeout(() => {
//     const data = [1, 2, 3, 4, 5]
//     list.value.push(...data)
//     if (list.value.length > 10) {
//       finished.value = true
//     }
//     loading.value = false
//   }, 1000)
// }
</script>

<template>
  <div class="knowledge-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <knowledge-card v-for="item in list" :key="item.id" :item="item"></knowledge-card>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
