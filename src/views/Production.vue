<script setup>
import { factories } from '../store/game.js'

const formatYield = (type) => {
  if (type === 'powerPlant') return '+2 電力 / 秒'
  if (type === 'ironMine') return '-1 電力, +50 鐵礦 / 秒'
  if (type === 'steelMill') return '-2 電力, -1 鐵礦, +1 鋼鐵 / 秒'
}
</script>

<template>
  <div class="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-slate-800/80">
    <h2 class="text-xl font-bold mb-6 text-slate-200 flex items-center gap-2">
      <span class="text-amber-400 text-2xl">🏭</span> 生產設施管理
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div v-for="(factory, key) in factories" :key="key" 
           class="bg-slate-800/50 hover:bg-slate-800 p-5 rounded-xl border border-slate-700/50 transition-colors flex flex-col justify-between h-full group">
        
        <div>
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-lg font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
              {{ factory.name }}
            </h3>
            <span class="text-xs font-bold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full">
              Lv. {{ factory.count }}
            </span>
          </div>
          <div class="text-sm text-slate-400 font-medium flex items-center gap-1.5 bg-slate-900/50 p-2.5 rounded-lg border border-slate-800">
            <span class="text-slate-500">產能</span> {{ formatYield(key) }}
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
