<template>
  <div>
    <h1>Welcome to Minesweeper Game!</h1>
    <h2>Please select level to start game</h2>
    <Level level="Easy" @LevelSelected="startGame" />
    <Level level="Medium" @LevelSelected="startGame" />
    <Level level="Hard" @LevelSelected="startGame" />
  </div>
</template>

<script>
import Level from "./Level";

export default {
  components: {
    Level
  },
  methods: {
    startGame(level) {
      this.$emit("GameStarted", level);
    }
  }
};
</script>

<style scoped>
</style>