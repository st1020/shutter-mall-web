import { ref } from "vue";
import { defineStore } from "pinia";
import type { Product } from "@/types";

export const useViewHistoryStore = defineStore("viewHistory", () => {
  const viewHistory = ref<Product[]>([]);
  function addViewHistory(product: Product) {
    viewHistory.value.unshift(product);
  }
  function clearViewHistory() {
    viewHistory.value = [];
  }
  return { viewHistory, addViewHistory, clearViewHistory };
});
