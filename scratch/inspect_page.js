const { spawn } = require('child_process');
const http = require('http');

async function main() {
  const chrome = spawn('google-chrome', [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1000));

  const req = http.request('http://127.0.0.1:9222/json/new?http://localhost:3001/?skipPreloader=true', { method: 'PUT' }, (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', async () => {
      const page = JSON.parse(data);
      console.log('Page created:', page.webSocketDebuggerUrl);

      // Connect via built-in WebSocket
      const ws = new WebSocket(page.webSocketDebuggerUrl);

      ws.addEventListener('open', () => {
        // Send Runtime.evaluate to get element offsets and dimensions
        ws.send(JSON.stringify({
          id: 1,
          method: 'Runtime.evaluate',
          params: {
            expression: `JSON.stringify({
              scrollHeight: document.body.scrollHeight,
              heroHeight: document.querySelector('section')?.offsetHeight,
              tickerOffset: document.querySelector('#ticker')?.offsetTop,
              bentoOffset: document.querySelector('#philosophy')?.offsetTop,
              workstationOffset: document.querySelector('#workstation')?.offsetTop,
              faqOffset: document.querySelector('#faq')?.offsetTop,
              intakeOffset: document.querySelector('#intake')?.offsetTop,
            })`,
            returnByValue: true,
            awaitPromise: true,
          }
        }));
      });

      ws.addEventListener('message', (event) => {
        const res = JSON.parse(event.data);
        if (res.id === 1) {
          console.log('Layout offsets:', res.result.result.value);
          chrome.kill();
          process.exit(0);
        }
      });
    });
  });
  req.end();
}

main().catch(console.error);
