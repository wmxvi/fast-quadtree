export class Vec2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    static from(value) {
        return new Vec2(value.x, value.y);
    }
    clone() {
        return new Vec2(this.x, this.y);
    }
    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    copy(value) {
        this.x = value.x;
        this.y = value.y;
        return this;
    }
    add(value) {
        this.x += value.x;
        this.y += value.y;
        return this;
    }
    sub(value) {
        this.x -= value.x;
        this.y -= value.y;
        return this;
    }
    scale(factor) {
        this.x *= factor;
        this.y *= factor;
        return this;
    }
    dot(value) {
        return this.x * value.x + this.y * value.y;
    }
    lengthSq() {
        return this.x * this.x + this.y * this.y;
    }
    length() {
        return Math.hypot(this.x, this.y);
    }
    distanceSq(value) {
        const dx = this.x - value.x;
        const dy = this.y - value.y;
        return dx * dx + dy * dy;
    }
    distance(value) {
        return Math.hypot(this.x - value.x, this.y - value.y);
    }
    equals(value) {
        return this.x === value.x && this.y === value.y;
    }
}
