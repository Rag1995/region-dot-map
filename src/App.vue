<script setup lang="ts">
import _data from '@/assets/json/雲市集A區地圖資料.json'
import { PointExpression } from 'leaflet'

const data = ref(_data)

const center = ref<PointExpression>([23.83012792456308, 120.92954073665844])

</script>

<template>
  <RegionDotMap
    :zoom="8"
    :center="center"
    :data="data"
    map-title="這邊是地圖標題"
    legend-title="圖例標題"
    color="#b91c1c"
    style="width: 800px; height: 300px; margin-bottom: 2rem;"
  />
  <div class="container">
    <RegionDotMap
      :zoom="6"
      :center="center"
      :data="data"
      map-title="數位轉型補助地圖"
      legend-title="核定補助金額(千元)"
      color="#059669"
      class="example-map"
    />
    <RegionDotMap
      :zoom="6"
      :center="center"
      :data="data"
      map-title="數位轉型家數地圖"
      legend-title="縣市上雲百分比"
      color="#3b82f6"
      style="width: 400px; height: 500px;"
    />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-flow: row nowrap;
}

.example-map {
  width: 400px;
  height: 500px;
}

</style>
