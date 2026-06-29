import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** True only after client hydration — avoids SSR/client mismatch without setState-in-effect. */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
