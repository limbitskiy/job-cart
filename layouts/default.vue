<template>
  <UContainer class="h-screen flex flex-col md:flex-row">
    <Sidebar />

    <div class="content flex-1">
      <slot />
    </div>
  </UContainer>
</template>

<script setup lang="ts"></script>
