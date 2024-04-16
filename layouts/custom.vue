<template>
  <div class="flex h-screen bg-blue-200">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <Header />
      <main class="overflow-y-auto m-6">
        <slot />
      </main>
    </div>
  </div>
</template>