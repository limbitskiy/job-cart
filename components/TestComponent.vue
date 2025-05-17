<template>
  <Transition name="slow-fade" mode="out-in">
    <div v-if="isLoaded" class="test-main grid lg:grid-cols-[auto_275px] h-full">
      <!-- main content -->
      <div class="main-content flex flex-col lg:gap-8 md:border-r ring-default p-0 pb-4 md:p-0">
        <!-- top part -->
        <div class="top flex gap-4 flex-col md:flex-row items-center w-full p-8 pb-0">
          <div class="avatar h-full">
            <NuxtImg class="w-40 object-cover rounded-full" :src="config.public.apiBase + data?.photo" />
          </div>
          <div class="text text-center md:text-left">
            <div class="name flex gap-2">
              <h2 class="font-bold text-xl md:text-lg">{{ data?.name }}</h2>
            </div>
            <span class="text-muted text-sm">({{ data?.date }} отклик)</span>
            <div class="spacer h-4"></div>
            <div class="status flex gap-2 items-center justify-center md:justify-start">
              <span class="text-muted text-sm">Статус: </span>
              <UBadge color="success" class="max-h-[24px]">{{ Status[data?.status] }}</UBadge>
            </div>
            <div class="spacer h-4"></div>
            <div class="age">
              <span class="text-muted text-sm">Возраст: </span>
              <span class="text-md">{{ data?.age }} лет</span>
            </div>
            <div class="location">
              <span class="text-muted text-sm">Расположение: </span>
              <span class="text-md">Россия/{{ data?.town }}</span>
            </div>
            <div class="phone">
              <span class="text-muted text-sm">Телефон: </span>
              <span class="text-md">{{ data?.phone }}</span>
            </div>
            <div class="email">
              <span class="text-muted text-sm">Email: </span>
              <span class="text-md">{{ data?.email }}</span>
            </div>
          </div>
        </div>
        <div class="action-btn-cnt px-4 block lg:hidden">
          <UButton class="mt-4" size="xl" color="primary" variant="solid" block @click="isMobileActionMenuShown = true"
            >Действия</UButton
          >
        </div>

        <!-- tabs -->
        <main class="flex-1 py-4 pb-0">
          <UCard class="mt-4 hidden md:block">
            <UTabs
              v-model="selectedTab"
              :items="tabs"
              :content="false"
              :ui="{
                list: 'w-full',
              }"
              class="w-full mb-4 hidden md:block"
              variant="pill"
              size="lg"
            />
            <Transition name="page" mode="out-in">
              <div v-if="selectedTab == Tabs.description">
                <div class="desc-content md:h-[calc(100dvh-420px)] lg:h-[calc(100dvh-410px)] overflow-auto">
                  <h3 class="text-lg font-bold">Описание</h3>
                  <div class="mt-4" v-html="parsedDesc"></div>
                </div>
              </div>
              <div v-else-if="selectedTab == Tabs.other">
                <h3 class="text-lg font-bold mb-4">Прочее</h3>
                <div class="grid-cnt grid xl:grid-cols-3">
                  <div class="pikabu">
                    <h5 class="text-sm text-muted">Pikabu отклик</h5>
                    <span>нет</span>
                  </div>
                  <div class="pikabu">
                    <h5 class="text-sm text-muted">Сопроводительное письмо</h5>
                    <span>нет</span>
                  </div>
                  <div class="pikabu">
                    <h5 class="text-sm text-muted">Файлы портфолио</h5>
                    <span>нет</span>
                  </div>
                </div>
              </div>
            </Transition>
          </UCard>

          <UCard class="mt-4 md:hidden">
            <div class="desc-content md:h-[calc(100dvh-450px)] lg:h-[calc(100dvh-410px)] overflow-auto">
              <h3 class="text-lg font-bold">Описание</h3>
              <div class="mt-4" v-html="parsedDesc"></div>
            </div>
          </UCard>

          <UCard class="mt-4 md:hidden">
            <h3 class="text-lg font-bold mb-4">Прочее</h3>
            <div class="grid-cnt grid xl:grid-cols-3">
              <div class="pikabu">
                <h5 class="text-sm text-muted">Pikabu отклик</h5>
                <span>нет</span>
              </div>
              <div class="pikabu">
                <h5 class="text-sm text-muted">Сопроводительное письмо</h5>
                <span>нет</span>
              </div>
              <div class="pikabu">
                <h5 class="text-sm text-muted">Файлы портфолио</h5>
                <span>нет</span>
              </div>
            </div>
          </UCard>
        </main>
      </div>

      <!-- right column -->
      <div class="action-icons flex-col gap-2 p-4 hidden lg:flex">
        <div class="action-icons">
          <UButton
            icon="solar:printer-2-linear"
            size="xl"
            style="font-size: 18px; color: grey"
            color="neutral"
            variant="ghost"
          />
          <UButton
            icon="tabler:file-type-pdf"
            size="xl"
            style="font-size: 18px; color: grey"
            color="neutral"
            variant="ghost"
          />
          <UButton
            icon="material-symbols:lab-profile-outline"
            size="xl"
            style="font-size: 18px; color: grey"
            color="neutral"
            variant="ghost"
          />
          <UButton
            icon="gridicons:create"
            size="xl"
            style="font-size: 18px; color: grey"
            color="neutral"
            variant="ghost"
          />
          <UButton
            icon="ic:baseline-delete-outline"
            size="xl"
            style="font-size: 18px; color: grey"
            color="neutral"
            variant="ghost"
          />
          <UButton
            icon="mi:document-download"
            size="xl"
            style="font-size: 18px; color: grey"
            color="neutral"
            variant="ghost"
          />
          <UButton
            icon="material-symbols:favorite-outline-rounded"
            size="xl"
            style="font-size: 18px; color: grey"
            color="neutral"
            variant="ghost"
          />
        </div>
        <UButton size="lg" color="primary" variant="solid" block>Изменить статус</UButton>

        <div class="action-menu flex flex-col justify-between mt-4">
          <h3 class="text-muted mb-1 text-sm">Действия:</h3>
          <UButton icon="solar:users-group-rounded-broken" size="xl" color="success" variant="solid" class="text-[20px]"
            ><span class="text-[16px] font-normal leading-5 text-center">Собеседование</span></UButton
          >
          <UButton
            icon="material-symbols:auto-videocam-outline"
            size="xl"
            color="neutral"
            variant="ghost"
            class="text-[20px] text-muted"
            ><span class="text-[16px] font-normal leading-5">Видеозвонок</span></UButton
          >
          <UButton
            icon="mdi:clipboard-account-outline"
            size="xl"
            color="neutral"
            variant="ghost"
            class="text-[20px] text-muted"
            disabled
            ><span class="text-[16px] font-normal leading-5">Запланировать</span></UButton
          >
          <UButton
            icon="material-symbols:send-outline"
            size="xl"
            color="neutral"
            variant="ghost"
            class="text-[20px] text-muted"
            ><span class="text-[16px] font-normal leading-5">Запрос</span></UButton
          >
        </div>
      </div>

      <!-- mobile actions menu -->
      <ClientOnly>
        <Transition name="slide" mode="out-in">
          <div v-if="isMobileActionMenuShown" class="overlay fixed inset-0 bg-default flex flex-col z-10">
            <div class="top-controls flex justify-between px-4 py-2">
              <UButton
                icon="i-heroicons-arrow-left"
                class="text-3xl text-gray-400"
                variant="link"
                color="neutral"
                @click="isMobileActionMenuShown = false"
              />
            </div>

            <div class="content flex-1">
              <div class="action-icons flex-col gap-2 p-4 flex">
                <div class="action-icons flex justify-around">
                  <UButton
                    icon="solar:printer-2-linear"
                    size="xl"
                    style="font-size: 26px; color: grey"
                    color="neutral"
                    variant="ghost"
                  />
                  <UButton
                    icon="tabler:file-type-pdf"
                    size="xl"
                    style="font-size: 26px; color: grey"
                    color="neutral"
                    variant="ghost"
                  />
                  <UButton
                    icon="material-symbols:lab-profile-outline"
                    size="xl"
                    style="font-size: 26px; color: grey"
                    color="neutral"
                    variant="ghost"
                  />
                  <UButton
                    icon="gridicons:create"
                    size="xl"
                    style="font-size: 26px; color: grey"
                    color="neutral"
                    variant="ghost"
                  />
                  <UButton
                    icon="ic:baseline-delete-outline"
                    size="xl"
                    style="font-size: 26px; color: grey"
                    color="neutral"
                    variant="ghost"
                  />
                  <UButton
                    icon="mi:document-download"
                    size="xl"
                    style="font-size: 26px; color: grey"
                    color="neutral"
                    variant="ghost"
                  />
                  <UButton
                    icon="material-symbols:favorite-outline-rounded"
                    size="xl"
                    style="font-size: 26px; color: grey"
                    color="neutral"
                    variant="ghost"
                  />
                </div>
                <UButton size="xl" color="primary" variant="solid" block>Изменить статус</UButton>

                <div class="action-menu flex flex-col justify-between mt-4">
                  <h3 class="text-muted mb-1 text-sm">Действия:</h3>
                  <UButton
                    icon="solar:users-group-rounded-broken"
                    size="xl"
                    color="success"
                    variant="solid"
                    class="text-[20px]"
                    ><span class="text-[16px] font-normal leading-5 text-center">Собеседование</span></UButton
                  >
                  <UButton
                    icon="material-symbols:auto-videocam-outline"
                    size="xl"
                    color="neutral"
                    variant="ghost"
                    class="text-[20px] text-muted"
                    ><span class="text-[16px] font-normal leading-5">Видеозвонок</span></UButton
                  >
                  <UButton
                    icon="mdi:clipboard-account-outline"
                    size="xl"
                    color="neutral"
                    variant="ghost"
                    class="text-[20px] text-muted"
                    disabled
                    ><span class="text-[16px] font-normal leading-5">Запланировать</span></UButton
                  >
                  <UButton
                    icon="material-symbols:send-outline"
                    size="xl"
                    color="neutral"
                    variant="ghost"
                    class="text-[20px] text-muted"
                    ><span class="text-[16px] font-normal leading-5">Запрос</span></UButton
                  >
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </ClientOnly>
    </div>

    <!-- skeleton -->
    <div v-else class="flex flex-col gap-8 p-8 h-[calc(100dvh-120px)] overflow-hidden md:h-full md:overflow-initial">
      <div class="header flex gap-4 items-center flex-wrap justify-center md:justify-start">
        <USkeleton class="h-42 w-42 rounded-full" />

        <div class="flex flex-col gap-2">
          <USkeleton class="h-6 w-[250px]" />
          <USkeleton class="h-6 w-[200px]" />
          <USkeleton class="h-6 w-[230px]" />
          <USkeleton class="h-6 w-[200px]" />
        </div>
      </div>

      <div class="content flex flex-col gap-2 items-center md:items-start">
        <USkeleton class="h-6 w-1/2" />
        <USkeleton class="h-6 w-3/4" />
        <USkeleton class="h-6 w-2/3" />
        <USkeleton class="h-6 w-2/5" />
        <USkeleton class="h-6 w-3/4" />
      </div>

      <div class="content flex flex-col gap-2 items-center md:items-start">
        <USkeleton class="h-6 w-3/4" />
        <USkeleton class="h-6 w-1/2" />
        <USkeleton class="h-6 w-2/5" />
        <USkeleton class="h-6 w-3/4" />
        <USkeleton class="h-6 w-4/5" />
        <USkeleton class="h-6 w-2/3" />
      </div>

      <div class="content flex flex-col gap-2 items-center md:items-start">
        <USkeleton class="h-6 w-3/4" />
        <USkeleton class="h-6 w-3/4" />
        <USkeleton class="h-6 w-4/5" />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";

interface PersonData {
  id: number;
  lisdting_id: number;
  age: number;
  birth_date: string;
  date: string;
  description: string;
  email: string;
  name: string;
  phone: string;
  photo: string;
  portfolios: string[];
  status: "viewed";
  town: string;
}

enum Status {
  viewed = "Просмотрено",
}

enum Tabs {
  description,
  other,
}

const toast = useToast();
const config = useRuntimeConfig();
const isMobileActionMenuShown = ref(false);
const isLoaded = ref(false);

const { data } = await useFetch<PersonData>(`${config.public.apiBase}/wp-json/test/v2/app`, {
  // artificial timeout to show skeleton
  onResponse() {
    setTimeout(() => {
      isLoaded.value = true;
    }, 1000);
  },
  onResponseError() {
    toast.add({
      title: "Uh oh! Something went wrong.",
      description: "There was a problem loading page data.",
      icon: "i-lucide-wifi",
      color: "error",
    });
  },
});

const parsedDesc = data.value?.description?.replace(/\r\n/gm, "<br />");

const selectedTab = ref("0");

const tabs = [
  {
    label: "Описание",
    icon: "i-lucide-user",
  },
  {
    label: "Прочее",
    icon: "ic:baseline-miscellaneous-services",
  },
] satisfies TabsItem[];

onMounted(() => {
  // artificial timeout to show skeleton
  setTimeout(() => {
    if (data) {
      isLoaded.value = true;
      console.log(`mounted finished`);
    }
  }, 1000);
});
</script>
