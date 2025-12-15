"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuadTree = void 0;
const bounds_1 = require("./bounds");
const vector_1 = require("./vector");
class QuadTree {
    constructor(boundary, capacity = 8, maxDepth = 8, depth = 0) {
        this.entries = [];
        this.children = null;
        this.boundary = boundary;
        this.capacity = capacity;
        this.maxDepth = maxDepth;
        this.depth = depth;
    }
    insert(position, value) {
        return this.insertEntry({ point: vector_1.Vec2.from(position), value });
    }
    bulkInsert(data) {
        let inserted = 0;
        for (const item of data) {
            if (this.insert(item.position, item.value))
                inserted++;
        }
        return inserted;
    }
    remove(position, value) {
        if (!this.boundary.contains(position))
            return false;
        for (let i = 0; i < this.entries.length; i++) {
            const entry = this.entries[i];
            if (entry.point.equals(position) && (value === undefined || entry.value === value)) {
                this.entries.splice(i, 1);
                return true;
            }
        }
        if (!this.children)
            return false;
        for (const child of this.children) {
            if (child.remove(position, value)) {
                this.tryMerge();
                return true;
            }
        }
        return false;
    }
    clear() {
        this.entries = [];
        if (this.children) {
            for (const child of this.children)
                child.clear();
        }
        this.children = null;
    }
    query(range, handler, out = []) {
        const bounds = range instanceof bounds_1.Bounds ? range : new bounds_1.Bounds(range.center, range.half);
        this.queryRange(bounds, handler, out);
        return out;
    }
    queryRadius(center, radius, handler, out = []) {
        const bounds = new bounds_1.Bounds(vector_1.Vec2.from(center), new vector_1.Vec2(radius, radius));
        this.queryCircle(center, radius * radius, bounds, handler, out);
        return out;
    }
    forEach(handler) {
        for (const entry of this.entries)
            handler(entry.value, entry.point);
        if (this.children) {
            for (const child of this.children)
                child.forEach(handler);
        }
    }
    get size() {
        let total = this.entries.length;
        if (this.children) {
            for (const child of this.children)
                total += child.size;
        }
        return total;
    }
    insertEntry(entry) {
        if (!this.boundary.contains(entry.point))
            return false;
        if (!this.children && (this.entries.length < this.capacity || this.depth >= this.maxDepth)) {
            this.entries.push(entry);
            return true;
        }
        if (!this.children)
            this.subdivide();
        if (!this.children)
            return false;
        for (const child of this.children) {
            if (child.insertEntry(entry))
                return true;
        }
        return false;
    }
    subdivide() {
        const hx = this.boundary.half.x * 0.5;
        const hy = this.boundary.half.y * 0.5;
        if (hx <= 0 || hy <= 0)
            return;
        const cx = this.boundary.center.x;
        const cy = this.boundary.center.y;
        this.children = [
            new QuadTree(new bounds_1.Bounds(new vector_1.Vec2(cx - hx, cy - hy), new vector_1.Vec2(hx, hy)), this.capacity, this.maxDepth, this.depth + 1),
            new QuadTree(new bounds_1.Bounds(new vector_1.Vec2(cx + hx, cy - hy), new vector_1.Vec2(hx, hy)), this.capacity, this.maxDepth, this.depth + 1),
            new QuadTree(new bounds_1.Bounds(new vector_1.Vec2(cx - hx, cy + hy), new vector_1.Vec2(hx, hy)), this.capacity, this.maxDepth, this.depth + 1),
            new QuadTree(new bounds_1.Bounds(new vector_1.Vec2(cx + hx, cy + hy), new vector_1.Vec2(hx, hy)), this.capacity, this.maxDepth, this.depth + 1)
        ];
        const existing = this.entries;
        this.entries = [];
        for (const entry of existing)
            this.insertEntry(entry);
    }
    queryRange(range, handler, out) {
        if (!this.boundary.intersects(range))
            return;
        for (const entry of this.entries) {
            if (range.contains(entry.point)) {
                out.push(entry);
                if (handler)
                    handler(entry.value, entry.point);
            }
        }
        if (this.children) {
            for (const child of this.children)
                child.queryRange(range, handler, out);
        }
    }
    queryCircle(center, radiusSq, bounds, handler, out) {
        if (!this.boundary.intersects(bounds))
            return;
        for (const entry of this.entries) {
            if (bounds.contains(entry.point) && entry.point.distanceSq(center) <= radiusSq) {
                out.push(entry);
                if (handler)
                    handler(entry.value, entry.point);
            }
        }
        if (this.children) {
            for (const child of this.children)
                child.queryCircle(center, radiusSq, bounds, handler, out);
        }
    }
    tryMerge() {
        if (!this.children)
            return;
        let total = this.entries.length;
        for (const child of this.children) {
            if (child.children)
                return;
            total += child.entries.length;
        }
        if (total > this.capacity)
            return;
        for (const child of this.children)
            this.entries.push(...child.entries);
        this.children = null;
    }
}
exports.QuadTree = QuadTree;
