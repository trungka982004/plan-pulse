<script setup>
import Sidebar from "./Sidebar.vue";
import Navbar from "./Navbar.vue";
</script>

<template>
  <div class="flex min-h-screen bg-slate-50">
    <!-- Thanh điều hướng bên trái (Sidebar) -->
    <Sidebar />
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <!-- Thanh tiêu đề phía trên (Navbar) -->
      <Navbar />
      <!-- Nội dung chính của từng trang (Sẽ được thay thế bởi RouterView) -->
      <main class="flex-1 overflow-y-auto p-8">
        <div class="max-w-5xl mx-auto">
          <slot></slot>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Bạn có thể thêm các hiệu ứng transition cho content ở đây nếu muốn */
</style>