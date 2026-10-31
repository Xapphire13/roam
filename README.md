# Roam

An isometric RTS/RPG inspired by Age of Empires, Minecraft, Terraria and Dwarf Fortress.
Built in Rust with the [Bevy](https://bevy.org) game engine, targeting the web browser.

## Prerequisites

- Rust (stable, 1.97.1 or newer): <https://rustup.rs>
- The WebAssembly target and [Trunk](https://trunkrs.dev), which builds and serves the wasm bundle:

```sh
rustup target add wasm32-unknown-unknown
cargo install --locked trunk
```

## Run in the browser

```sh
trunk serve --open
```

This compiles the game to WebAssembly, serves it at <http://127.0.0.1:8080>, and rebuilds on file changes.
The first build takes a few minutes while Bevy compiles; later builds are much faster.

## Build for release

```sh
trunk build --release
```

The static site is written to `dist/` and can be hosted on any static file server.

## Run natively (optional)

Handy for faster iteration and debugging:

```sh
cargo run
```

On Linux you may need Bevy's system dependencies; see
[Bevy's Linux dependencies guide](https://github.com/bevyengine/bevy/blob/main/docs/linux_dependencies.md).

## Project layout

- `src/main.rs`: the Bevy app
- `index.html`: the page Trunk builds around the game; the game renders into `<canvas id="roam">`
