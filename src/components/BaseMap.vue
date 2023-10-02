<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import { LControlAttribution, LControlZoom, LMap, LTileLayer } from '@vue-leaflet/vue-leaflet'
import { PointExpression } from 'leaflet'

const props = defineProps<{
  zoom: number
  center: PointExpression
}>()

const emit = defineEmits<Emits>()
interface Emits {
  (e: 'update:zoom', v: number): void
}

const _zoom = useVModel(props, 'zoom', emit)

// 這邊可以改底圖
// 目前是用 Mapbox
const url = ref('https://api.mapbox.com/styles/v1/kyart/cl4hx7oze000a14lndjby4zxk/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia3lhcnQiLCJhIjoiY2w0aHgyMHo4MG1ndzNkb2J3aXRidjN6ZiJ9.BUCq3e2frQfSYat-igeKAA')

// 底圖來源
const attribution = ref('&copy; <a href="https://www.mapbox.com/contribute/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>')
</script>

<template>
  <div>
    <LMap
      v-model:zoom="_zoom"
      :use-global-leaflet="false"
      :center="center"
      :min-zoom="6"
      :max-bounds="[[21, 117], [27, 123]]"
      :max-bounds-viscosity="1"
      :options="{
        attributionControl: false,
        zoomControl: false,
      }"
    >
      <!-- 圖資 -->
      <LTileLayer
        :url="url"
        :attribution="attribution"
      />

      <!-- 圖資來源 -->
      <LControlAttribution
        prefix=""
        position="bottomleft"
      />

      <!-- 地圖縮放控制 -->
      <LControlZoom position="bottomright" />

      <slot />
    </LMap>
  </div>
</template>

<style lang="scss" scoped>
::v-deep .leaflet-control-attribution {
  user-select: none;
  color: #4b5563;
  background: transparent;

  a {
    margin-right: .5em;
    color: inherit;

    &:link, &:visited {
      text-decoration: none;
    }

    &:hover, &:active {
      text-decoration: underline;
    }
  }
}
</style>