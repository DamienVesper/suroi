import { mergeConfig, type UserConfig } from "vite";

import common from "./vite.common";

const config: UserConfig = {
    server: {
        port: 7010,
        strictPort: true,
        host: "0.0.0.0"

    },
    preview: {
        port: 7010,
        strictPort: true,
        host: "0.0.0.0"
    },

    define: {
        API_URL: JSON.stringify("http://localhost:8080/api")
    }
};

export default mergeConfig(common, config);
