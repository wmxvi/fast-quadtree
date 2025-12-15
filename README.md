# Fast Quadtree

Tiny zero-dependency quadtree optimised for realtime spatial lookups in browsers and Node.js.

## Install

```bash
npm install fast-quadtree
```

## Usage

```ts
import { Bounds, QuadTree, Vec2 } from 'fast-quadtree'

const boundary = Bounds.fromBox(0, 0, 512, 512)
const tree = new QuadTree<string>(boundary, 4, 8)

tree.insert(new Vec2(32, 64), 'player')
tree.insert({ x: 128, y: 256 }, 'npc')

tree.queryRadius({ x: 48, y: 64 }, 64, value => {
  console.log('hit', value)
})

const hits = tree.query(new Bounds(new Vec2(100, 200), new Vec2(50, 50)))
```

## Scripts

- `npm run build` compiles both ESM and CJS bundles to `dist/`.
