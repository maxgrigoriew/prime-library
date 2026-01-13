<template>
  <Story title="UiCard" :layout="{ type: 'grid', width: 'min-content' }">
    <Variant title="Elevated Card">
      <UiCard title="Card Title" subtitle="Card Subtitle" variant="elevated">
        <p>This is the card content. It can contain any elements.</p>
      </UiCard>
    </Variant>

    <Variant title="Outlined Card">
      <UiCard title="Card Title" subtitle="Card Subtitle" variant="outlined">
        <p>This is the card content with an outlined style.</p>
      </UiCard>
    </Variant>

    <Variant title="Filled Card">
      <UiCard title="Card Title" subtitle="Card Subtitle" variant="filled">
        <p>This is the card content with a filled background.</p>
      </UiCard>
    </Variant>

    <Variant title="Card with Custom Header">
      <UiCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">Custom Header</h3>
            <button class="text-blue-5">Action</button>
          </div>
        </template>
        <p>This card has a custom header section.</p>
      </UiCard>
    </Variant>

    <Variant title="Card with Footer">
      <UiCard title="Card with Footer" variant="elevated">
        <p>Content goes here...</p>
        <template #footer>
          <div class="flex justify-end space-x-2 pt-4">
            <UiButton type="secondary" text="Cancel" />
            <UiButton type="primary" text="Save" />
          </div>
        </template>
      </UiCard>
    </Variant>

    <Variant title="Small Card">
      <UiCard title="Small Card" size="sm" variant="elevated">
        <p>Smaller card with compact padding.</p>
      </UiCard>
    </Variant>

    <Variant title="Large Card">
      <UiCard title="Large Card" size="lg" variant="elevated">
        <p>Larger card with more padding.</p>
      </UiCard>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import UiCard from '@/ui/UiCard/UiCard.vue'
import UiButton from '@/ui/UiButton/UiButton.vue'
</script>