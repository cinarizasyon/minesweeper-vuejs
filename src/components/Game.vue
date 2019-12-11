<template>
  <div id="game">
    <transition name="fade">
      <span v-if="gameOver" :class="['game-over', gameOverClass]">{{ gameOverText }}</span>
    </transition>
    <Board :init="initData" @GameOverEvent="gameOverEvent" @GameWinEvent="gameWinEvent" />
    <button class="retry-again" v-if="gameOver && !gameWin" @click="retryAgain">{{retryAgainText}}</button>
  </div>
</template>

<script>
import Board from "./Board";
import Util from "../utils";

export default {
  components: {
    Board
  },
  props: ["level"],
  data() {
    return {
      initData: Util.getInitData(this.level),
      gameOver: false,
      gameWin: false
    };
  },
  computed: {
    retryAgainText: function() {
      return this.gameWin ? "Play Again" : "Retry Again";
    },
    gameOverText: function() {
      return this.gameWin ? "You Win!" : "You Lost";
    },
    gameOverClass: function() {
      return this.gameWin ? "you-win" : "you-lost";
    }
  },
  methods: {
    gameOverEvent() {
      this.gameOver = true;
    },
    retryAgain() {
      this.$emit("RetryAgainEvent");
    },
    gameWinEvent() {
      this.gameWin = true;
    }
  }
};
</script>

<style scoped>
.retry-again {
  color: white;
  background-color: yellowgreen;
  font-size: 18px;
  text-align: center;
  font-weight: bold;
  margin-top: 10px;
  width: 140px;
  height: 40px;
  padding: 10px;
  border: 0;
  outline: 0;
  box-shadow: none;
  cursor: pointer;
}

.retry-again:hover {
  background-color: green;
}

.game-over {
  font-size: 30px;
  font-weight: bold;
  transition: 2s;
}

.you-win {
  color: greenyellow;
}

.you-lost {
  color: mediumblue;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>