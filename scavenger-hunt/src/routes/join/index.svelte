<script>
    import { onMount } from 'svelte';
    import QRCode from 'qrcode';

    import { getUserId } from '../../stores/user';
    import { getLogger } from '../../stores/debug-logger.js';
    import RouteHeader from '../../components/RouteHeader.svelte';

    let userId, logger;
    let qrBase64;
    onMount(() => {
        userId = getUserId();
        logger = getLogger();
        writeQrCode({ foo: 'bar', bar: 'baz' });
    });

    function writeQrCode(data) {
        QRCode.toDataURL(JSON.stringify(data), (err, code) => {
            if (err) {
                logger.log({
                    logLevel: 'log',
                    message: `qr-gen errror: ${JSON.stringify(err)}`,
                });
            }
            qrBase64 = code;
        });
    }
</script>

<RouteHeader title="Route beitreten" />
{#if $userId}
    <h1>Meiner eigenen Route beitreten</h1>
    <a href="/join/{$userId}">beitreten</a>
{/if}

<h2>dein Freund muss diesen code scannen:</h2>

<img src={qrBase64} alt="Einladungs QR-Code" />
