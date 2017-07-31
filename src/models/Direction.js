class Direction {

    rowOffset;
    colOffset;

    constructor (rowOffset, colOffset){
        this.rowOffset = rowOffset;
        this.colOffset = colOffset;
    }

    static extractDirection(keyCode){
        switch (keyCode){
            case 'ArrowUp':
                return new Direction(-1, 0);
            case 'ArrowRight':
                return new Direction(0, 1);
            case 'ArrowDown':
                return new Direction(1, 0);
            case 'ArrowLeft':
                return new Direction(0, -1);
            default:
                return null;
        }
    }
}

export default Direction;