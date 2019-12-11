export default class Util {
    static EASY_MINE_COUNT = 10;
    static EASY_ROW_COUNT = 9;
    static EASY_COLUMN_COUNT = 9;
    static MEDIUM_MINE_COUNT = 40;
    static MEDIUM_ROW_COUNT = 16;
    static MEDIUM_COLUMN_COUNT = 16;
    static HARD_MINE_COUNT = 99;
    static HARD_ROW_COUNT = 24;
    static HARD_COLUMN_COUNT = 24;

    static getInitData(level) {
        let initData = this.getCounts(level);
        initData.boxes = this.getBoxes(initData.row, initData.column);
        initData.boxes = this.setMines(initData.boxes, initData.mine);
        return initData;
    }

    static setMines(boxes, mineCount) {
        let indexes = [];
        let _boxes = boxes;
        for (let i = 0; i < mineCount; i++) {
            let randIndex = this.getRandom(0, _boxes.length);
            while (indexes.indexOf(randIndex) != -1)
                randIndex = this.getRandom(0, _boxes.length);
            indexes.push(randIndex);
        }
        for (let i = 0; i < indexes.length; i++) {
            _boxes[indexes[i]].isMine = true;
        }
        return _boxes;
    }

    static getRandom(min, max) {
        return Math.floor((Math.random() * max) + min)
    }

    static getBoxes(rowCount, columnCount) {
        let boxes = [];
        for (let i = 0; i < rowCount; i++) {
            for (let j = 0; j < columnCount; j++) {
                boxes.push({
                    id: this.uuidv4(),
                    isSelected: false,
                    isFlagged: false,
                    isMine: false,
                    xCoord: i,
                    yCoord: j
                });
            }
        }
        return boxes;
    }

    static uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    static getCounts(level) {
        if (!level)
            return;
        let _level = level.trim().toLowerCase();
        if (_level == "easy")
            return {
                mine: this.EASY_MINE_COUNT,
                row: this.EASY_ROW_COUNT,
                column: this.EASY_COLUMN_COUNT
            }
        else if (_level == "medium")
            return {
                mine: this.MEDIUM_MINE_COUNT,
                row: this.MEDIUM_ROW_COUNT,
                column: this.MEDIUM_COLUMN_COUNT
            }
        else if (_level == "hard")
            return {
                mine: this.HARD_MINE_COUNT,
                row: this.HARD_ROW_COUNT,
                column: this.HARD_COLUMN_COUNT
            }
    }

    static getNeighboord(xCoord, yCoord, rowCount, columnCount) {
        let neighboord_matrix = [
            [xCoord - 1, yCoord + 1], [xCoord, yCoord + 1], [xCoord + 1, yCoord + 1],
            [xCoord - 1, yCoord], [xCoord + 1, yCoord],
            [xCoord - 1, yCoord - 1], [xCoord, yCoord - 1], [xCoord + 1, yCoord - 1]
        ]
        let neighbors = []
        neighboord_matrix.forEach(separation => {
            if (this.isValidSeparation(separation[0], separation[1], rowCount, columnCount))
                neighbors.push(separation);
        });
        return neighbors;
    }

    static isValidSeparation(xCoord, yCoord, rowCount, columnCount) {
        return xCoord >= 0 && yCoord >= 0 &&
            xCoord < rowCount && yCoord < columnCount;
    }
}