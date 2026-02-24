import { reactive, ref } from 'vue'

export const money = ref(100000)

export const resources = reactive({
    power: 0,
    iron: 0,
    steel: 0
})

export const worldMap = reactive(Array(9).fill(null))

export const buildOnMap = (index, factoryType) => {
    const cost = getFactoryCost(factoryType)
    if (money.value >= cost && worldMap[index] === null) {
        money.value -= cost
        worldMap[index] = factoryType
        factories[factoryType].count++
        return true
    }
    return false
}

export const factories = reactive({
    powerPlant: { count: 1, baseCost: 500, costMultiplier: 1.15, name: '發電廠' },
    ironMine: { count: 1, baseCost: 800, costMultiplier: 1.15, name: '採礦場' },
    steelMill: { count: 0, baseCost: 2000, costMultiplier: 1.15, name: '煉鋼廠' }
})

export const marketPrices = {
    power: 1,
    iron: 5,
    steel: 20
}

export const resourceNames = {
    power: '電力',
    iron: '鐵礦',
    steel: '鋼鐵'
}

export const getFactoryCost = (type) => {
    const factory = factories[type]
    return Math.floor(factory.baseCost * Math.pow(factory.costMultiplier, factory.count))
}

export const buyFactory = (type) => {
    const cost = getFactoryCost(type)
    if (money.value >= cost) {
        money.value -= cost
        factories[type].count++
    }
}

export const sellResource = (type, amount) => {
    if (resources[type] >= amount) {
        resources[type] -= amount
        money.value += amount * marketPrices[type]
    }
}

let timer = null

const tick = () => {
    for (let i = 0; i < factories.powerPlant.count; i++) {
        resources.power += 2
    }

    for (let i = 0; i < factories.ironMine.count; i++) {
        if (resources.power >= 1) {
            resources.power -= 1
            resources.iron += 50
        }
    }

    for (let i = 0; i < factories.steelMill.count; i++) {
        if (resources.power >= 2 && resources.iron >= 1) {
            resources.power -= 2
            resources.iron -= 1
            resources.steel += 1
        }
    }
}

if (!timer) {
    timer = setInterval(tick, 1000)
}
