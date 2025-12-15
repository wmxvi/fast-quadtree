import { Vec2, VecLike } from './vector';
export interface BoundsLike {
    center: VecLike;
    half: VecLike;
}
export declare class Bounds implements BoundsLike {
    center: Vec2;
    half: Vec2;
    constructor(center: VecLike, half: VecLike);
    static fromBox(x: number, y: number, width: number, height: number): Bounds;
    clone(): Bounds;
    contains(point: VecLike): boolean;
    containsBounds(bounds: Bounds): boolean;
    intersects(bounds: Bounds): boolean;
}
