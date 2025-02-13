import { GlideClient } from "@valkey/valkey-glide";

//TODO: configure production setup
const addresses = [
    {
        host: "localhost",
        port: 6379,
    },
];

const client = GlideClient.createClient({
    addresses: addresses,
    // useTLS: true,
    clientName: "test_standalone_client",
});

export default await client;