export interface VecLike {
    x: number;
    y: number;
}
export declare class Vec2 implements VecLike {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    static from(value: VecLike): Vec2;
    clone(): Vec2;
    set(x: number, y: number): this;
    copy(value: VecLike): this;
    add(value: VecLike): this;
    sub(value: VecLike): this;
    scale(factor: number): this;
    dot(value: VecLike): number;
    lengthSq(): number;
    length(): number;
    distanceSq(value: VecLike): number;
    distance(value: VecLike): number;
    equals(value: VecLike): boolean;
}
