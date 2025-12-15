export interface Vector {
  x: number
  y: number
}

export class Vec2 implements Vector {
  x: number
  y: number

  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
  
  from(value: Vector) {
    return new Vec2(value.x, value.y)
  }
  
  clone() {
    return new Vec2(this.x, this.y)
  }
  
  set(x: number, y: number) {
    this.x = x
    this.y = y
    return this
  }
  
  copy(value: Vector) {
    this.x = value.x
    this.y = value.y
    return this
  }
  
  add(value: Vector) {
    this.x += value.x
    this.y += value.y
    return this
  }

  sub(value: Vector) {
    this.x -= value.x
    this.y -= value.y
    return this
  }

  scale(factor: number) {
    this.x *= factor
    this.y *= factor
    return this
  }

  dot(value: Vector) {
    return this.x * value.x + this.y * value.y
  }

  lengthSq() {
    return this.x * this.x + this.y * this.y
  }

  length() {
    return Math.hypot(this.x, this.y)
  }

  distanceSq(value: Vector) {
    const dx = this.x - value.x
    const dy = this.y - value.y
    return dx * dx + dy * dy
  }
  
  distance(value: Vector) {
    return Math.hypot(this.x - value.x, this.y - value.y)
  }
  
  equals(value: Vector) {
    return this.x === value.x && this.y === value.y
  }
}
