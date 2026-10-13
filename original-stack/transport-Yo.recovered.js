function Yo(e){if(process.env.CODEX_APP_SERVER_FORCE_CLI===`1`)return null;let t=process.env.CODEX_APP_SERVER_WS_URL??e.websocket_url;return!t||typeof t!=`string`?null:t}
