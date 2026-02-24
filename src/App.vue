<script setup>
import { money } from './store/game.js'

const formatNumber = (num) => Math.floor(num).toLocaleString()
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans selection:bg-indigo-500/30">
    <!-- Sidebar -->
    <aside class="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col sticky top-0 md:h-screen z-10">
      <div class="p-6 border-b border-slate-800">
        <h1 class="text-2xl font-black bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
          Bussiness Chain
        </h1>
        <p class="text-slate-500 text-xs mt-1">控制台</p>
      </div>

      <nav class="flex-1 p-4 space-y-2">
        <router-link to="/" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-slate-400 hover:text-slate-200 hover:bg-slate-800" active-class="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-inner">
          <span class="text-xl">�</span> 總覽
        </router-link>
        <router-link to="/map" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-slate-400 hover:text-slate-200 hover:bg-slate-800" active-class="bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-inner">
          <span class="text-xl">🗺️</span> 地圖
        </router-link>
        <router-link to="/production" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-slate-400 hover:text-slate-200 hover:bg-slate-800" active-class="bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-inner">
          <span class="text-xl">🏭</span> 生產
        </router-link>
        <router-link to="/market" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-slate-400 hover:text-slate-200 hover:bg-slate-800" active-class="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-inner">
          <span class="text-xl">💱</span> 交易所
        </router-link>
      </nav>

      <div class="p-6 border-t border-slate-800">
        <div class="text-xs text-slate-500 mb-1">公司資金</div>
        <div class="text-2xl font-mono text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]">
          ${{ formatNumber(money) }}
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6 md:p-8 overflow-y-auto">
      <div class="max-w-5xl mx-auto">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<style>
/* Use component styles strictly for animations since instructed to use Tailwind as much as possible */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(5px);
}
</style>
