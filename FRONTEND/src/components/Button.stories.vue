<template>
  <Story title="Button" :layout="{ type: 'grid', width: 'min-content' }">
    <Variant title="Primary">
      <Button variant="primary">Primary Button</Button>
    </Variant>
    
    <Variant title="Secondary">
      <Button variant="secondary">Secondary Button</Button>
    </Variant>
    
    <Variant title="Danger">
      <Button variant="danger">Danger Button</Button>
    </Variant>
    
    <Variant title="Success">
      <Button variant="success">Success Button</Button>
    </Variant>
    
    <Variant title="Text">
      <Button variant="text">Text Button</Button>
    </Variant>
    
    <Variant title="Disabled">
      <Button :disabled="true">Disabled Button</Button>
    </Variant>
  </Story>
  
  <Story title="Button Sizes" :layout="{ type: 'grid', width: 'min-content' }">
    <Variant title="Small">
      <Button size="small">Small Button</Button>
    </Variant>
    
    <Variant title="Medium">
      <Button size="medium">Medium Button</Button>
    </Variant>
    
    <Variant title="Large">
      <Button size="large">Large Button</Button>
    </Variant>
  </Story>
  
  <Story title="Button Combinations" :layout="{ type: 'grid', width: 'min-content' }">
    <Variant title="Primary Large">
      <Button variant="primary" size="large">Primary Large</Button>
    </Variant>
    
    <Variant title="Secondary Small">
      <Button variant="secondary" size="small">Secondary Small</Button>
    </Variant>
    
    <Variant title="Danger Large">
      <Button variant="danger" size="large">Danger Large</Button>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { Button } from './Button.vue';
</script>