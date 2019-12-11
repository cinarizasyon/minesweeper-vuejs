<template>
  <div :class="backgorundClass" @click="selectLevel">{{ level }}</div>
</template>

<script>
export default {
  name: "Level",
  props: ["level"],
  computed: {
    backgorundClass: function() {
      return "level " + this.level.trim().toLowerCase();
    }
  },
  methods: {
    selectLevel() {
      this.$emit("LevelSelected", this.level);
    }
  }
};
</script>

<style scoped>
.level {
  width: 400px;
  margin: 0 auto;
  margin-bottom: 10px;
  padding: 10px;
  cursor: pointer;
  font-size: 20px;
  color: white;
  font-weight: bold;
}

.easy {
  background: darkgreen;
}
.medium {
  background: chocolate;
}
.hard {
  background: crimson;
}
</style>