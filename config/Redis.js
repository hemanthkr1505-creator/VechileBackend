
//import { createClient } from "redis"

import { createClient } from "redis";

export const client = createClient({
url:"redis://localhost:6379"

})

client.on("error", (error) => {
    console.error("Redis error:", error);
});
export async function redisConnect() {
    client.connect()
    console.log("redis connected")
    
}

