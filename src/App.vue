<template>
  <div id="app" @contextmenu.prevent>
    <Welcome v-show="!started" @GameStarted="gameStarted" />
    <Game v-if="started" :level="level" @RetryAgainEvent="retryAgain"></Game>
  </div>
</template>

<script>
import Welcome from "./components/Welcome.vue";
import Game from "./components/Game";

export default {
  name: "app",
  components: {
    Welcome,
    Game
  },
  data() {
    return {
      started: false,
      level: null
    };
  },
  methods: {
    gameStarted(level) {
      this.level = level;
      this.started = true;
    },
    retryAgain() {
      this.started = false;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
