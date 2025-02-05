import { GlideClient } from "@valkey/valkey-glide";
// When Valkey is in standalone mode, add address of the primary node, and any replicas you'd like to be able to read from.

//TODO: configure production setup
const addresses = [
    {
        host: "localhost",
        port: 6379,
    },
];
// Check `GlideClientConfiguration/GlideClusterClientConfiguration` for additional options.

const client = GlideClient.createClient({
    addresses: addresses,
    // if the server uses TLS, you'll need to enable it. Otherwise, the connection attempt will time out silently.
    // useTLS: true,
    clientName: "test_standalone_client",
});

export default await client;