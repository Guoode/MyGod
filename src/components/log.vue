<template>
  <div>
    <h2>位置信息</h2>
    <p>{{ location }}</p>
  </div>
</template>

<script>
export default {
  props: {
    location: String,
  },
};
</script>
