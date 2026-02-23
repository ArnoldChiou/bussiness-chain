<script setup>
import { money, factories, buyFactory, getFactoryCost } from '../store/game.js'

const formatNumber = (num) => Math.floor(num).toLocaleString()

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
        
        <div class="mb-5">
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

        <button 
          @click="buyFactory(key)"
          :disabled="money < getFactoryCost(key)"
          class="w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 active:scale-95 shadow-lg flex justify-between items-center px-5"
          :class="money >= getFactoryCost(key) 
            ? 'bg-linear-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-indigo-500/25 border border-indigo-500/50' 
            : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed shadow-none'"
        >
          <span>擴建工廠</span>
          <span class="font-mono bg-black/20 px-2 py-0.5 rounded ml-2">
            ${{ formatNumber(getFactoryCost(key)) }}
          </span>
        </button>

      </div>
    </div>
  </div>
</template>
