<script lang="ts"> 
  import { db, type User } from "@sync/db/src/dexie.schema";
  import { onMount } from "svelte";
  let name = $state("");
  let email = $state("");
  let users: User[] = $state([]);

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

  // async function fetchBookmarks() {
  //   const bookmarks = await chrome.bookmarks.getTree();
  //   const flattenedBookmarks: any[] = [];

  //   function flattenBookmarks(bookmarkItems: any[]) {
  //     for (const item of bookmarkItems) {
  //       if (item.url) {
  //         flattenedBookmarks.push(item);
  //       }
  //       if (item.children) {
  //         flattenBookmarks(item.children);
  //       }
  //     }
  //   }

  //   flattenBookmarks(bookmarks);
  //   console.log("All bookmarks:", flattenedBookmarks);
  // }

  onMount(async () => {
    users = await db.users.toArray();
  });
</script>

<form onsubmit={addUser} style="margin-bottom: 1em;">
  <input bind:value={name} placeholder="Name" required />
  <input bind:value={email} placeholder="Email" required />
  <button type="submit">Add User</button>
</form>

<p>Users count: {users.length}</p>
<ul class="list-disc">
  {#each users as user}
    <li>{user.name} ({user.email})</li>
  {/each}
</ul>

<button
  onclick={() => {
    // fetchBookmarks();
  }}>fetch Bookmarks</button
>
