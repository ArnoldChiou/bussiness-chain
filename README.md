# SimBusiness 商業模擬遊戲 MVP 🏭

這是一個基於 Vue 3 開發的輕量級網頁版商業模擬遊戲 MVP（最小可行性產品）。玩家可以透過建設工廠、管理生產線以及在交易所買賣資源來擴張自己的商業帝國。

## 🎮 遊戲特色

* **自動化生產迴圈**：內建背景 Tick 系統，工廠會根據配方自動消耗與產出資源。
* **資源供應鏈**：
  * ⚡ **發電廠**：持續產出電力。
  * 🪨 **採礦場**：消耗電力，開採鐵礦。
  * 🏗️ **煉鋼廠**：消耗電力與鐵礦，冶煉高價值的鋼鐵。
* **動態路由介面**：包含「總覽儀表板 (Dashboard)」、「生產管理 (Production)」與「資源交易所 (Market)」。
* **響應式 UI**：使用 Tailwind CSS 打造具備現代感與科技感的深色主題儀表板。

## 🛠️ 技術棧

* **前端框架**：Vue 3 (Composition API)
* **建置工具**：Vite
* **路由管理**：Vue Router 4
* **樣式框架**：Tailwind CSS
* **狀態管理**：Vue 內建 `reactive` 與 `ref` (輕量級 Store)

## 📁 專案結構

```text
src/
├── assets/         # 靜態資源 (圖示、圖片)
├── components/     # 共用 UI 組件
├── router/         # Vue Router 路由設定 (index.js)
├── store/          # 遊戲全局狀態與核心迴圈 (game.js)
├── views/          # 頁面視圖
│   ├── Dashboard.vue   # 庫存與資產總覽
│   ├── Production.vue  # 工廠建設與產能管理
│   └── Market.vue      # 資源販售與市價追蹤
├── App.vue         # 應用程式主入口與側邊導覽列
├── main.js         # Vue 實體初始化
└── style.css       # Tailwind 引入與全域樣式
