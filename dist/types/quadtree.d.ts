import { Bounds, BoundsLike } from './bounds';
import { Vec2, VecLike } from './vector';
export interface QuadNode<T> {
    point: Vec2;
    value: T;
}
type RangeLike = Bounds | BoundsLike;
type HitHandler<T> = (value: T, point: Vec2) => void;
export declare class QuadTree<T> {
    boundary: Bounds;
    capacity: number;
    maxDepth: number;
    private depth;
    private entries;
    private children;
    constructor(boundary: Bounds, capacity?: number, maxDepth?: number, depth?: number);
    insert(position: VecLike, value: T): boolean;
    bulkInsert(data: Iterable<{
        position: VecLike;
        value: T;
    }>): number;
    remove(position: VecLike, value?: T): boolean;
    clear(): void;
    query(range: RangeLike, handler?: HitHandler<T>, out?: QuadNode<T>[]): QuadNode<T>[];
    queryRadius(center: VecLike, radius: number, handler?: HitHandler<T>, out?: QuadNode<T>[]): QuadNode<T>[];
    forEach(handler: HitHandler<T>): void;
    get size(): number;
    private insertEntry;
    private subdivide;
    private queryRange;
    private queryCircle;
    private tryMerge;
}
export {};
