<script>
    import { onDestroy, onMount } from 'svelte';
    import QRCode from 'qrcode';

    import { getUserId } from '../../stores/user';
    import { getLogger } from '../../stores/debug-logger.js';
    import RouteHeader from '../../components/RouteHeader.svelte';

    let userId, logger;
    let qrBase64;
    let unsub;
    onMount(() => {
        userId = getUserId();
        logger = getLogger();

        unsub = userId.subscribe((uid) => {
            const hostname = window.location.hostname;
            let joinURL = '';
            if (hostname === 'localhost') {
                joinURL = `http://localhost/join/${uid}`;
            } else {
                joinURL = `https://${hostname}/join/${uid}`;
            }
            writeQrCode(joinURL);
        });
    });

    function writeQrCode(dataString) {
        QRCode.toDataURL(dataString, (err, code) => {
            if (err) {
                logger.log({
                    logLevel: 'log',
                    message: `qr-gen errror: ${JSON.stringify(err)}`,
                });
            }
            qrBase64 = code;
        });
    }

    onDestroy(() => {
        if (unsub) {
            unsub();
        }
    });
</script>

<RouteHeader title="Route beitreten" />
{#if $userId}
    <h1>Meiner eigenen Route beitreten</h1>
    <a href="/join/{$userId}">beitreten</a>
{/if}

<h2>dein Freund muss diesen code scannen:</h2>

<img src={qrBase64} alt="Einladungs QR-Code" />
