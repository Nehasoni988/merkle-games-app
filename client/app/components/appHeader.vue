<template>
  <header class="header">
    <div class="container navbar">
      <NuxtLink to="/" class="logo">
        <div class="logo-badge">M</div>
        <span>Merkle Games</span>
      </NuxtLink>

      <div class="nav-actions">
        <NuxtErrorBoundary>
          <AppTheme />
          <template #error="{ error }">
            <ErrorBoundary
              component-name="AppTheme"
              :errorMsg="error?.message"
            />
          </template>
        </NuxtErrorBoundary>
      </div>
    </div>
  </header>
</template>