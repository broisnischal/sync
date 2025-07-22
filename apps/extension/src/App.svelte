<script lang="ts">
  import { onMount } from "svelte";
  import { theme, initializeTheme } from "./lib/stores/theme";

  import ThemeToggle from "./lib/components/ThemeToggle.svelte";
  import Sidebar from "./lib/components/Sidebar.svelte";
  import MainContent from "./lib/components/MainContent.svelte";
  import { api } from "./api";

  async function sendAuthRequest() {
    try {
      const res = await api.post("/api/auth/google");
      console.log(res);
      // if (res.data.login) {
      //   // chrome.tabs.create({ url: res.data.url });
      // } else {
      // }
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      console.error(err);
    }
  }

  onMount(() => {
    initializeTheme();
  });
</script>

<div class="h-screen bg-base-100" data-theme={$theme}>
  <!-- <div class="flex h-full">
    <Sidebar />
    <main class="flex-1 p-4">
      <div class="flex justify-end mb-4">
        <ThemeToggle />
      </div>
      <MainContent />
    </main>
  </div> -->
  <div class="flex h-full">
    <div class="flex-1 p-4 flex flex-col items-center justify-center">
      <h1 class="text-2xl font-bold font-sans">Sync.me</h1>
      <p class="text-sm text-gray-500 text-center mx-10 mt-4">
        Sync.me is a tool that helps you sync your data between different
        services, Privacy-first browser sync across all your devices.
      </p>

      <div class="flex flex-col gap-2 mt-4">
        <button class="btn btn-neutral" onclick={sendAuthRequest}>
          Login with Google
        </button>
      </div>

      <div class="flex flex-col gap-2 mt-4">
        <ul class="list-disc list-inside text-sm text-gray-500">
          <li>End-to-End Encrypted</li>
          <li>Privacy-first</li>
          <li>Open Source</li>
        </ul>
      </div>
    </div>
  </div>
</div>
