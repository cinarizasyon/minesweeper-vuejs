<template>
  <div class="board" :style="boardStyle">
    <p class="flag-text">Flags Left: {{ remainedFlag }}</p>
    <div v-for="box in initData.boxes" :key="box.id">
      <Box
        @BoxLeftClicked="boxClicked"
        @BoxRightClicked="boxFlagged"
        :selected="box.isSelected"
        :mined="box.isMine"
        :flagged="box.isFlagged"
        :x="box.xCoord"
        :y="box.yCoord"
      />
    </div>
  </div>
</template>

<script>
import Box from "./Box";
import Util from "../utils";
export default {
  components: {
    Box
  },
  props: ["init"],
  data() {
    return {
      initData: this.init,
      gameOver: false,
      flagCount: 0
    };
  },
  computed: {
    boardStyle: function() {
      return {
        width: this.initData.column * 42 + "px",
        height: this.initData.column * 42 + "px"
      };
    },
    remainedFlag: function() {
      return this.initData.mine - this.flagCount;
    },
    notSelectedCount: function() {
      return this.$children.filter(x => !x.isSelected).length;
    }
  },
  methods: {
    boxClicked(box) {
      if (box.isFlagged) return;
      box.isSelected = true;
      if (box.isMine) {
        this.lockAllBoxes();
        this.gameOver = true;
        this.$emit("GameOverEvent");
      } else {
        this.writeMineCounts(box);
        if (this.notSelectedCount - this.flagCount == 0)
          this.$emit("GameWinEvent");
      }
    },
    boxFlagged(box) {
      if (box.isSelected || (!box.isFlagged && this.remainedFlag == 0)) return;
      if (!box.isFlagged) this.flagCount++;
      if (box.isFlagged) this.flagCount--;
      box.isFlagged = !box.isFlagged;
    },
    lockAllBoxes() {
      this.$children.filter(x => !x.selected).map(x => (x.isSelected = true));
    },
    getNeighbors(box) {
      let neighboors_coords = Util.getNeighboord(
        box.x,
        box.y,
        this.initData.row,
        this.initData.column
      );
      let neighbors = [];
      neighboors_coords.forEach(coord => {
        neighbors.push(this.getBoxByCoord(coord[0], coord[1]));
      });
      return neighbors;
    },
    getBoxByCoord(xCoord, yCoord) {
      return this.$children.filter(
        box => box.x == xCoord && box.y == yCoord
      )[0];
    },
    mineCountInNeighbors(neighbors) {
      return neighbors.filter(x => x.isMine).length;
    },
    writeMineCounts(box) {
      let neighbors = this.getNeighbors(box);
      let mineCount = this.mineCountInNeighbors(neighbors);
      box.isSelected = true;
      if (mineCount == 0)
        neighbors.forEach(n => {
          if (!n.isSelected) this.writeMineCounts(n);
        });
      else box.mineCount = mineCount;
    }
  }
};
</script>

<style scoped>
.board {
  margin: 0 auto;
}
.flag-text {
  color: firebrick;
  font-size: 20px;
  font-weight: bold;
}
</style>