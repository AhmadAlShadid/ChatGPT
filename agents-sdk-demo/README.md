**D-ID Agents SDK Demo - Vite & Vanilla JavaScript**

In the terminal, navigate to this project folder and run the following commands:

- `npm init`

- `npm i vite`

- `npm i @d-id/client-sdk`


In the created `package.json` file, add the following to the `scripts` object:

- `"dev": "vite --port 3000"`

<br>

Fetch the `data-client-key` and the `data-agent-id` as explained on the [Agents SDK Overview Page](https://docs.d-id.com/reference/agents-sdk-overview).
<br>
Paste these into their respective variables at the top of the `main.js` file and save.

Create a `.env` file based on `.env.example` containing:
```
AA_API_URL     - Automation Anywhere endpoint URL
AA_MODEL_NAME  - model name to use
AA_BOT_NAME    - bot name to invoke
AA_TOKEN       - API token
PORT           - port for the proxy server (default 3001)
```

Start the proxy server with `node aa-proxy.js` and in another terminal run `npm run dev`


Open [http://localhost:3000/](http://localhost:3000/)
