<script lang="ts">
  import { db, type User } from "@sync/db/dexie.schema";
  import { onMount } from "svelte";
  let name = "";
  let email = "";
  let users: User[] = [];

  async function addUser() {
    await db.users.add({
      name,
      email,
      createdAt: new Date(),
    });
    name = "";
    email = "";
    users = await db.users.toArray();
  }

  onMount(async () => {
    users = await db.users.toArray();
  });
</script>

<form on:submit|preventDefault={addUser} style="margin-bottom: 1em;">
  <input bind:value={name} placeholder="Name" required />
  <input bind:value={email} placeholder="Email" required />
  <button type="submit">Add User</button>
</form>

<ul>
  {#each users as user}
    <li>{user.name} ({user.email})</li>
  {/each}
</ul>
