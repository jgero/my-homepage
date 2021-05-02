<script>
    import firebase from 'firebase/app';
    import { onMount } from 'svelte';
    import { getUserId } from '../stores/user.js';
    import Logger from '../components/Logger.svelte';

    let userId;

    onMount(() => {
        // initialize stores
        userId = getUserId();

        setTimeout(() => {
            if (!$userId) {
                userId.reset();
            }
        }, 3000);

        // listen to auth state changes to restore login on app open
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                userId.setUserId(user.uid);
            } else {
                userId.setUserId(null);
            }
        });
    });
</script>

<slot />
<Logger />
