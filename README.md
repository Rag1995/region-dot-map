

# 雲市集圖資

<aside>
💡 Github Repo

</aside>

# Directives
---

## thousandsSeparatorDirective.ts

負責把數字轉換成千分位的數字

```jsx
// 需要於 main.ts 註冊 directives

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { thousandsSeparatorDirective } from '@/directives'

const app = createApp(App)

app.directive('thousands-separator', thousandsSeparatorDirective)

app.mount('#app')
```

# C**omponents**

---

## BaseMap **基本地圖**

地圖的基礎設定會在這邊，例如：Mapbox圖資等…

## RegionDotMap **區域散點圖**

縣市行政區的散點圖

### Props

| 參數名稱 | 描述 | 型別 | 範例 | 預設 |
| --- | --- | --- | --- | --- |
| zoom | 地圖預設縮放大小 | number |  | 8 |
| center | 地圖預設中心位置 | [number, number] |  | [23.83012792456308,120.92954073665844] |
| data | 散點圖資料 | array | [{"zoneName": "北部", "area": "桃園市", "region": "楊梅區", "amount": 561 }, …] | [] |
| mapTitle | 地圖標題 | string |  |  |
| legendTitle | 圖例名稱 | string |  |  |
| color | 圓圈顏色 | string | #059669 | #059669 |

### Example

```jsx
<RegionDotMap
  :zoom="6"
  :center="[0,0]"
  :data="[]"
  map-title="map-title"
  legend-title="legend-title"
  color="#059669"
  class="example-map"
	style="width: 400px; height: 500px;"
/>
```