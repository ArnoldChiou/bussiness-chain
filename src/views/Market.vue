<script setup>
import { resources, marketPrices, resourceNames, sellResource } from '../store/game.js'
</script>

<template>
  <div class="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-slate-800/80">
    <h2 class="text-xl font-bold mb-6 text-slate-200 flex items-center gap-2">
      <span class="text-emerald-400 text-2xl">💱</span> 資源交易所
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div v-for="(price, key) in marketPrices" :key="key" 
           class="bg-slate-800/50 p-5 rounded-xl border border-slate-700/50 flex flex-col gap-4">
        
        <div class="flex flex-col items-center justify-center p-4 bg-slate-900/80 rounded-lg border border-slate-800">
          <span class="text-slate-400 font-medium mb-1">{{ resourceNames[key] }} 市價</span>
          <div class="text-2xl font-mono text-emerald-400 font-bold">
            ${{ price }} <span class="text-sm text-slate-500 font-sans font-normal">/ 單位</span>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-2">
          <button 
            @click="sellResource(key, 1)"
            :disabled="resources[key] < 1"
            class="py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
            :class="resources[key] >= 1 
              ? 'bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white' 
              : 'bg-slate-800 text-slate-600 cursor-not-allowed'"
          >
            賣 1
          </button>
          <button 
            @click="sellResource(key, 10)"
            :disabled="resources[key] < 10"
            class="py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
            :class="resources[key] >= 10 
              ? 'bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white' 
              : 'bg-slate-800 text-slate-600 cursor-not-allowed'"
          >
            賣 10
          </button>
          <button 
            @click="sellResource(key, resources[key])"
            :disabled="resources[key] < 1"
            class="py-2.5 rounded-lg text-sm font-bold transition-all duration-200 border"
            :class="resources[key] >= 1 
              ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-600/30 hover:border-emerald-500/50' 
              : 'bg-slate-800 text-slate-600 border-transparent cursor-not-allowed'"
          >
            全賣
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
