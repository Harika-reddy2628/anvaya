const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const SECTIONS = [
  { name: '01_hero', y: 0 },
  { name: '02_ticker_bento', y: 1150 },
  { name: '03_bento_cards', y: 1550 },
  { name: '04_workstation_centered', y: 2050 },
  { name: '05_faq', y: 3020 },
  { name: '06_footer', y: 3650 },
];

async function main() {
  const chrome = spawn('google-chrome', [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--window-size=1920,1080',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1200));

  const req = http.request('http://127.0.0.1:9222/json/new?http://localhost:3001/?skipPreloader=true', { method: 'PUT' }, (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', async () => {
      const page = JSON.parse(data);
      const ws = new WebSocket(page.webSocketDebuggerUrl);

      let msgId = 1;
      const sendCommand = (method, params = {}) => {
        return new Promise((resolve) => {
          const id = msgId++;
          const handler = (event) => {
            const response = JSON.parse(event.data);
            if (response.id === id) {
              ws.removeEventListener('message', handler);
              resolve(response.result);
            }
          };
          ws.addEventListener('message', handler);
          ws.send(JSON.stringify({ id, method, params }));
        });
      };

      ws.addEventListener('open', async () => {
        // Wait for WebGL to render initial frames
        await new Promise(r => setTimeout(r, 1500));

        const outDir = path.join(__dirname, '..', 'prototypes');
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

        for (const sec of SECTIONS) {
          // Scroll instantly to position
          await sendCommand('Runtime.evaluate', {
            expression: `window.scrollTo({ top: ${sec.y}, behavior: 'instant' });`
          });
          await new Promise(r => setTimeout(r, 500));

          // Capture screenshot
          const result = await sendCommand('Page.captureScreenshot', { format: 'png' });
          const filePath = path.join(outDir, `${sec.name}.png`);
          fs.writeFileSync(filePath, Buffer.from(result.data, 'base64'));
          console.log(`Saved screenshot: ${filePath} (${fs.statSync(filePath).size} bytes)`);
        }

        chrome.kill();
        process.exit(0);
      });
    });
  });
  req.end();
}

main().catch(console.error);
