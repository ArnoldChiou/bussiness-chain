<template>
  <div class="p-6 max-w-7xl mx-auto">
    <div class="flex items-center gap-4 mb-6">
      <h2 class="text-3xl font-bold text-white tracking-tight">工業園區</h2>
      <div class="bg-blue-900/40 px-3 py-1 rounded text-blue-200 border border-blue-800/50 font-medium tracking-wider text-sm">
        3x3 建築區塊
      </div>
    </div>
    
    <div class="flex flex-col lg:flex-row gap-8 items-start">
      <!-- 網格地圖區 (3D 等角透視) -->
      <div class="w-full max-w-[450px] shrink-0 mt-6 lg:mt-10 mb-10 lg:ml-8" style="perspective: 1500px;">
        <div class="w-full aspect-square bg-slate-800/90 p-5 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-slate-700/50 transition-transform duration-700 relative" style="transform: rotateX(60deg) rotateZ(-45deg); transform-style: preserve-3d;">
          <div class="grid grid-cols-3 gap-3 w-full h-full relative" style="transform-style: preserve-3d;">
            <div 
              v-for="(building, index) in worldMap" 
              :key="index"
              @click="handleGridClick(index)"
              class="group relative bg-[#1e293b] rounded-[16px] flex items-center justify-center cursor-pointer hover:bg-[#334155] transition-all duration-300 w-full h-full preserve-3d"
              style="transform-style: preserve-3d; transform: translateZ(0px);"
            >
              <!-- 3D Block Thickness (Bottom shadow & side edges) -->
              <!-- Front Edge -->
              <div class="absolute inset-0 bg-slate-700/80 rounded-[16px] pointer-events-none transition-all duration-300" style="transform: translateZ(-8px);"></div>
              <div class="absolute inset-0 border-2 border-slate-600/50 bg-slate-900 rounded-[16px] pointer-events-none group-hover:bg-slate-800 transition-all duration-300" style="transform: translateZ(0px);"></div>
              
              <!-- Background decorative grid for empty spots -->
              <div v-if="!building" class="absolute inset-0 opacity-[0.05] rounded-[16px]" style="transform: translateZ(1px); background-image: radial-gradient(#94a3b8 2px, transparent 2px); background-size: 20px 20px;"></div>

              <!-- Empty state (land image fits perfectly) -->
              <div v-if="!building" class="absolute inset-x-0 bottom-0 top-auto h-[150%] flex flex-col items-center justify-end w-full pointer-events-none z-10" style="transform: rotateZ(45deg) rotateX(-60deg) translateZ(0px) translateX(-40px) translateY(10px) scale(1.2); transform-origin: bottom center;">
                <img src="/images/land.png" class="w-full h-full object-contain object-bottom drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)] opacity-80 group-hover:opacity-100 z-10 transition-all duration-500 group-hover:scale-105 pointer-events-auto" alt="可用空地" />
                <span class="absolute bottom-2 text-[10px] font-bold text-slate-200 group-hover:text-white bg-slate-900/60 backdrop-blur-md border border-slate-600/50 px-3 py-1 rounded-full shadow-[0_10px_15px_rgba(0,0,0,0.5)] z-20 tracking-wider transition-colors">可用空地</span>
              </div>
              
              <!-- Built state -->
              <div v-else class="absolute inset-x-0 bottom-0 top-auto h-[150%] flex flex-col items-center justify-end w-full pointer-events-none z-10" style="transform: rotateZ(45deg) rotateX(-60deg) translateZ(0px) translateX(-40px) translateY(10px) scale(1.2); transform-origin: bottom center;">
                <img :src="getBuildingIcon(building)" class="w-full h-full object-contain object-bottom drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)] z-10 transition-transform duration-500 group-hover:scale-105 pointer-events-auto" />
                <span class="absolute -bottom-2 text-[10px] font-bold text-white bg-slate-800/90 backdrop-blur-md border border-slate-600/50 px-3 py-1 rounded-full shadow-[0_10px_15px_rgba(0,0,0,0.5)] z-20 tracking-wider">
                  {{ factories[building]?.name || building }}
                </span>
              </div>

              <!-- Hover glow effect -->
              <div class="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors duration-300 z-0 rounded-[16px]" style="transform: translateZ(3px);"></div>
              
              <!-- Selection indicator -->
              <div v-if="selectedPlot === index" class="absolute inset-0 border-4 border-blue-400 rounded-[14px] z-20 pointer-events-none shadow-[0_0_15px_rgba(96,165,250,0.5)]" style="transform: translateZ(4px);"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 建造選單面板 -->
      <transition
        enter-active-class="transform transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-4 lg:translate-y-0 lg:translate-x-8"
        enter-to-class="opacity-100 translate-y-0 lg:translate-x-0"
        leave-active-class="transform transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0 lg:translate-x-0"
        leave-to-class="opacity-0 translate-y-4 lg:translate-y-0 lg:-translate-x-2"
      >
        <div v-if="selectedPlot !== null" class="w-full max-w-[450px] p-6 bg-slate-800 border-2 border-slate-700/80 shadow-[0_0_40px_rgba(0,0,0,0.3)] rounded-[24px]">
          <div class="flex justify-between items-center mb-6 pb-4 border-b border-slate-700/80">
            <h3 class="text-white font-bold text-xl flex items-center gap-3 tracking-wide">
              <div class="bg-blue-500/20 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clip-rule="evenodd" />
                </svg>
              </div>
              建設區塊 {{ selectedPlot + 1 }}
            </h3>
            <button @click="selectedPlot = null" class="text-slate-400 hover:text-white bg-slate-700/50 hover:bg-slate-600 p-2 rounded-xl transition-all hover:rotate-90">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div class="grid grid-cols-1 gap-4">
            <button 
              v-for="(factory, type) in factories"
              :key="type"
              @click="confirmBuild(type)" 
              class="flex items-center justify-between bg-slate-900/50 border border-slate-700/50 hover:border-blue-500/50 hover:bg-slate-700 p-4 rounded-2xl text-white transition-all duration-300 group text-left relative overflow-hidden shadow-inner"
              :disabled="money < getFactoryCost(type)"
              :class="{ 'opacity-50 grayscale cursor-not-allowed hover:border-slate-700/50 hover:bg-slate-900/50': money < getFactoryCost(type) }"
            >
              <!-- Highlight overlay when hover (only active) -->
              <div v-if="money >= getFactoryCost(type)" class="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-500/10 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div class="flex items-center gap-5 relative z-10">
                <div class="bg-slate-800 p-2.5 rounded-xl border border-slate-600/80 shadow-md group-hover:shadow-blue-900/50 group-hover:border-blue-500/30 transition-all">
                  <img :src="getBuildingIcon(type)" class="w-10 h-10 object-contain drop-shadow" />
                </div>
                <div>
                  <div class="font-bold text-lg tracking-wide group-hover:text-blue-100 transition-colors">{{ factory.name }}</div>
                  <div class="text-sm font-semibold flex items-center gap-1.5 mt-1" :class="money >= getFactoryCost(type) ? 'text-emerald-400 group-hover:text-emerald-300' : 'text-red-400'">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
                    </svg>
                    {{ getFactoryCost(type).toLocaleString() }}
                  </div>
                </div>
              </div>
              <div class="relative z-10 flex items-center">
                <span v-if="money >= getFactoryCost(type)" class="text-sm font-bold bg-blue-600 text-white px-5 py-2.5 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.4)] group-hover:bg-blue-500 group-hover:scale-105 transition-all">
                  建造
                </span>
                <span v-else class="text-xs text-red-300 font-bold bg-red-900/30 px-3 py-1.5 rounded-lg border border-red-800/50 backdrop-blur-sm">資金不足</span>
              </div>
            </button>
          </div>
          <div v-if="selectedPlot !== null" class="mt-4 text-center text-xs text-slate-500 font-medium">
            點擊建造後將自動扣除您的資金
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { worldMap, buildOnMap, factories, getFactoryCost, money } from '../store/game';

const selectedPlot = ref(null);

const handleGridClick = (index) => {
  if (!worldMap[index]) {
    selectedPlot.value = index;
  }
};

const confirmBuild = (type) => {
  if (buildOnMap(selectedPlot.value, type)) {
    selectedPlot.value = null;
  }
};

const getBuildingIcon = (type) => {
  const icons = {
    powerPlant: '/images/power_plant.png',
    ironMine: '/images/mine.png',
    steelMill: '/images/factory.png'
  };
  return icons[type] || '/images/power_plant.png'; // fallback
};
</script>

<style scoped>
/* Optional: slightly soften the gradient background for empty spots */
</style>