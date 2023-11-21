import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePlanStore = defineStore(
  'planStore',
  () => {
    const plan = ref()
    function addPlan(param) {
      plan.value = param
    }

    return { plan, addPlan }
  },
  {
    persist: { storage: sessionStorage }
  }
)
