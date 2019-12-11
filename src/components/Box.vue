<template>
  <div
    :class="boxClass"
    @click="boxLeftClicked"
    @contextmenu="boxRightClicked"
  >{{ mineCount ? mineCount : "" }}</div>
</template>

<script>
export default {
  name: "Box",
  data() {
    return {
      isMine: this.mined,
      isFlagged: this.flagged,
      isSelected: this.selected,
      mineCount: 0
    };
  },
  props: ["selected", "flagged", "mined", "x", "y"],
  computed: {
    boxClass: function() {
      let isSelected = this.isSelected,
        isFlagged = this.isFlagged,
        isMine = this.isMine,
        mineCount = this.mineCount;
      return [
        "box",
        { locked: isSelected },
        { flagged: isFlagged },
        { mine: isSelected && isMine && !isFlagged },
        { "mine-low": isSelected && mineCount <= 3 },
        { "mine-mid": isSelected && mineCount > 3 && mineCount <= 6 },
        { "mine-high": isSelected && mineCount > 6 && mineCount <= 8 }
      ];
    }
  },
  methods: {
    boxLeftClicked() {
      this.$emit("BoxLeftClicked", this);
    },
    boxRightClicked() {
      this.$emit("BoxRightClicked", this);
    }
  }
};
</script>

<style scoped>
.box {
  background-color: #ccc;
  width: 40px;
  height: 40px;
  line-height: 40px;
  float: left;
  border: 1px solid #ddd;
  font-weight: bold;
  font-size: 18px;
}

.box:hover {
  background-color: #ddd;
}

.box.locked {
  background-color: gray;
}

.box.flagged {
  background-image: url("../assets/red-flag.png");
  background-size: cover;
}

.box.mine {
  background-image: url("../assets/bomb.png");
  background-size: cover;
}

.box.mine-low {
  color: blue;
}

.box.mine-mid {
  color: chartreuse;
}

.box.mine-high {
  color: crimson;
}
</style>