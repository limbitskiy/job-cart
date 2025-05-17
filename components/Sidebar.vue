<template>
  <!-- mobile navbar -->
  <div class="top-navbar md:hidden border-b ring-default py-2 flex justify-end mb-4">
    <UButton
      icon="material-symbols:menu"
      class="text-3xl"
      variant="link"
      color="neutral"
      @click="isMobileMenuShown = true"
    />
  </div>

  <!-- mobile menu -->
  <ClientOnly>
    <Transition name="slide" mode="out-in">
      <div v-if="isMobileMenuShown" class="overlay fixed inset-0 bg-default flex flex-col z-10">
        <div class="top-controls flex justify-between px-4 py-2">
          <UButton
            :icon="$colorMode.value === 'light' ? 'i-heroicons-moon' : 'solar:sun-2-line-duotone'"
            class="text-3xl text-gray-400"
            variant="link"
            color="neutral"
            aria-label="Toggle theme"
            @click="toggleColorMode"
          />

          <UButton
            icon="i-heroicons-arrow-left"
            class="text-3xl text-gray-400"
            variant="link"
            color="neutral"
            @click="isMobileMenuShown = false"
          />
        </div>

        <div class="content grid place-items-center flex-1">
          <UNavigationMenu
            orientation="vertical"
            class="px-4"
            :items="menu!"
            :ui="{
              linkLeadingIcon: 'text-2xl',
            }"
          />
        </div>
      </div>
    </Transition>
  </ClientOnly>

  <!-- desktop sidebar -->
  <aside
    :class="[
      'border-r ring-default transition-all duration-300 hidden md:block',
      isCollapsed ? 'w-[70px] min-w-[70px]' : 'w-[250px] min-w-[250px]',
    ]"
  >
    <div class="flex flex-col h-full grow">
      <!-- Logo -->
      <div class="text-center" :class="isCollapsed ? 'px-3 py-3' : 'px-4 py-6'">
        <a :href="config.public.apiBase" target="_blank">
          <NuxtImg src="/logo.svg" alt="Logo" class="mx-auto" :class="isCollapsed ? 'max-h-10' : 'max-h-14'" />
        </a>
      </div>

      <!-- Menu -->
      <div class="flex-1 overflow-y-auto">
        <div v-if="status === 'idle' || status === 'pending'" class="flex items-center gap-2 justify-center">
          <Icon name="i-heroicons-arrow-path" class="animate-spin" />
          Loading...
        </div>
        <div v-else-if="status === 'error'" class="flex items-center gap-2 justify-center">
          <Icon name="i-heroicons-exclamation-triangle" />
          Error loading menu
        </div>
        <UNavigationMenu
          v-else
          orientation="vertical"
          class="px-4"
          :items="menu!"
          :collapsed="isCollapsed"
          :ui="{
            linkLeadingIcon: 'text-2xl',
          }"
        />
      </div>

      <!-- Bottom Controls -->
      <div class="border-t ring-default py-2">
        <!-- Toggle Theme Button -->
        <div class="mb-2 flex justify-center">
          <ClientOnly>
            <UButton
              :icon="$colorMode.value === 'light' ? 'i-heroicons-moon' : 'solar:sun-2-line-duotone'"
              variant="link"
              color="neutral"
              aria-label="Toggle theme"
              @click="toggleColorMode"
            />
          </ClientOnly>
          <!-- <select class="ring-default text-sm" v-model="$colorMode.preference">
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="sepia">Sepia</option>
          </select> -->
        </div>

        <!-- Toggle Sidebar Button -->
        <UButton
          :icon="isCollapsed ? 'ic:baseline-arrow-forward' : 'i-heroicons-arrow-left'"
          variant="link"
          color="neutral"
          size="sm"
          block
          @click="toggleSidebar"
        >
          <span v-if="!isCollapsed">Collapse</span>
        </UButton>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
interface MenuItem {
  post_title: string;
  icon: string;
  url: string;
}

const toast = useToast();
const router = useRouter();
const $colorMode = useColorMode();
const config = useRuntimeConfig();

const isMobileMenuShown = ref(false);
const isCollapsed = ref(false);

// close mobile menu on route change
router.beforeEach(() => {
  isMobileMenuShown.value = false;
});

const newMenuItem = {
  label: "Тестовое задание",
  icon: "material-symbols:person-raised-hand-outline",
  to: "/test",
};

const { data: menu, status } = await useFetch(`${config.public.wordpressApiUrl}/menus/87`, {
  transform: (data: MenuItem[]) => {
    return [newMenuItem, ...data.map((item) => ({ label: item.post_title, icon: item.icon, to: `${item.url}` }))];
  },
  onResponseError() {
    toast.add({
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with loading menu items.",
      icon: "i-lucide-wifi",
      color: "error",
    });
  },
});

// Function to toggle sidebar collapse state
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};

// Function to toggle theme
const toggleColorMode = () => {
  $colorMode.preference = $colorMode.value === "dark" ? "light" : "dark";
};
</script>
