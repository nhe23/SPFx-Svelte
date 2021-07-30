<script>
  import styles from "./HelloSvelteWebPart.module.scss";
  import { counter } from "./store";
  export let description;
</script>

<div>Hello svelte {$counter}</div>
<button
  on:click={() => {
    counter.update((c) => c + 1);
  }}>Count</button
>
