<script setup>
import { money, resources, factories, resourceNames } from '../store/game.js'

const formatNumber = (num) => Math.floor(num).toLocaleString()
</script>

<template>
  <div class="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-slate-800/80">
    <h2 class="text-xl font-bold mb-6 text-slate-200 flex items-center gap-2">
      <span class="text-blue-400 text-2xl">📦</span> 資源庫存狀態
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="(amount, key) in resources" :key="key" 
           class="group relative bg-slate-800/50 hover:bg-slate-800 p-5 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all duration-300 flex justify-between items-center overflow-hidden">
        <div class="absolute inset-0 bg-linear-to-r from-transparent via-blue-500/5 to-transparent -translate-x-full group-hover:translate-x-full duration-1000"></div>
        <div class="flex items-center gap-3">
          <div class="w-2 h-2 rounded-full" 
               :class="{
                 'bg-amber-400': key === 'power',
                 'bg-stone-400': key === 'iron',
                 'bg-slate-300': key === 'steel'
               }">
          </div>
          <span class="text-slate-300 font-medium">{{ resourceNames[key] }}</span>
        </div>
        <span class="font-mono text-xl font-semibold text-white tracking-tight">{{ formatNumber(amount) }}</span>
      </div>
    </div>

    <h2 class="text-xl font-bold mt-8 mb-6 text-slate-200 flex items-center gap-2">
      <span class="text-amber-400 text-2xl">🏭</span> 工廠總覽
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="(factory, key) in factories" :key="key" 
           class="bg-slate-800/50 p-5 rounded-xl border border-slate-700/50 flex justify-between items-center">
        <span class="text-slate-300 font-medium">{{ factory.name }}</span>
        <span class="text-xs font-bold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full">
          Lv. {{ factory.count }}
        </span>
      </div>
    </div>
  </div>
</template>