import { Vec2 } from './vector';
export class Bounds {
    constructor(center, half) {
        this.center = Vec2.from(center);
        this.half = Vec2.from(half);
    }
    static fromBox(x, y, width, height) {
        return new Bounds(new Vec2(x + width * 0.5, y + height * 0.5), new Vec2(width * 0.5, height * 0.5));
    }
    clone() {
        return new Bounds(this.center, this.half);
    }
    contains(point) {
        const dx = Math.abs(point.x - this.center.x);
        const dy = Math.abs(point.y - this.center.y);
        return dx <= this.half.x && dy <= this.half.y;
    }
    containsBounds(bounds) {
        return this.contains({ x: bounds.center.x - bounds.half.x, y: bounds.center.y - bounds.half.y }) && this.contains({ x: bounds.center.x + bounds.half.x, y: bounds.center.y + bounds.half.y });
    }
    intersects(bounds) {
        return Math.abs(this.center.x - bounds.center.x) <= this.half.x + bounds.half.x && Math.abs(this.center.y - bounds.center.y) <= this.half.y + bounds.half.y;
    }
}
