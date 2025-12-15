import { Vec2, Vector } from './vector'

export interface VectorBound {
  center: Vector
  half: Vector
}

export class Bounds implements VectorBound {
  center: Vec2
  half: Vec2

  constructor(center: Vector, half: Vector) {
    this.center = new Vec2(center.x, center.y)
    this.half = new Vec2(half.x, half.y)
  }
  
  fromBox(x: number, y: number, width: number, height: number, offset: number = 0.5) {
    return new Bounds(
      new Vec2(x + width * offset, y + height * offset),
      new Vec2(width * offset, height * offset)
    )
  }
  
  clone() {
    return new Bounds(this.center, this.half);
  }
  
  contains(point: Vector) {
    const dx = Math.abs(point.x - this.center.x)
    const dy = Math.abs(point.y - this.center.y)

    return dx <= this.half.x && dy <= this.half.y
  }
  
  containsBounds(bounds: Bounds) {
    return (
      this.contains({
        x: bounds.center.x - bounds.half.x,
        y: bounds.center.y - bounds.half.y }
      ) && 
      this.contains({
        x: bounds.center.x + bounds.half.x,
        y: bounds.center.y + bounds.half.y 
      })
    );
  }
  
  intersects(bounds: Bounds) {
    return (
      Math.abs(this.center.x - bounds.center.x) <= this.half.x + bounds.half.x && 
      Math.abs(this.center.y - bounds.center.y) <= this.half.y + bounds.half.y
    );
  }
}
