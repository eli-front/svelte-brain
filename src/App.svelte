<script>
  import { onMount } from "svelte";
  import { createScene } from "./scene";
  let element;
  onMount(() => {
    createScene(element);
  });
</script>

<canvas bind:this={element} />

<style>
  canvas {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    position: fixed;
  }
  :global(html),
  :global(body) {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    background-color: black;
  }
</style>
