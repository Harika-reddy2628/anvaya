async (page) => {
  const routes = [
    ["work", "/work"],
    ["case-spatial", "/work/spatial-engine"],
    ["case-guild", "/work/guild"],
    ["case-oppy", "/work/oppy"],
    ["case-walkthrough", "/work/architectural-walkthrough"],
    ["case-verification", "/work/quality-harness"],
    ["case-robotics", "/work/sutra"],
    ["service-product", "/services/product"],
    ["service-ai", "/services/automation"],
    ["service-spatial", "/services/spatial"],
    ["service-interface", "/services/interface"],
    ["project", "/project"],
    ["privacy", "/privacy"],
    ["terms", "/terms"],
    ["not-found", "/ui-audit-missing-page"],
  ];
  const illustrated = new Set(["work", "case-spatial", "case-oppy", "service-product", "service-ai", "project", "privacy", "terms", "not-found"]);
  const results = [];
  for (const [viewport, label] of [[{width:1440,height:1000},"desktop"],[{width:390,height:844},"mobile"]]) {
    await page.setViewportSize(viewport);
    for (const [name, route] of routes) {
      const response = await page.goto("http://127.0.0.1:3000" + route);
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(700);
      const metrics = await page.evaluate(() => {
        const selectors = ["h1", ".page-heading > p", ".policy-content p", ".case-narrative h2", ".evidence-note p", ".case-sidebar p", ".service-detail-section p", ".work-description", ".work-category", ".form-actions > span", ".estimate-assumptions p", ".footer-bottom"];
        const samples = selectors.flatMap(selector => {
          const e = document.querySelector(selector);
          if (!e) return [];
          const s = getComputedStyle(e);
          const r = e.getBoundingClientRect();
          let ancestor = e;
          let background;
          while (ancestor) {
            const color = getComputedStyle(ancestor).backgroundColor;
            if (!color.startsWith("rgba") || !color.endsWith(", 0)")) { background=color; break; }
            ancestor = ancestor.parentElement;
          }
          return [{selector, text:e.innerText.trim().slice(0,140),font:s.fontFamily,size:s.fontSize,weight:s.fontWeight,lineHeight:s.lineHeight,tracking:s.letterSpacing,color:s.color,background,width:Math.round(r.width)}];
        });
        const joins = [...document.querySelectorAll("br")].filter(e=>getComputedStyle(e).display==="none").map(e=>({previous:e.previousSibling?.textContent?.trim().slice(-55),next:e.nextSibling?.textContent?.trim().slice(0,55),parent:e.parentElement.innerText.trim().slice(0,140)}));
        return {h1Count:document.querySelectorAll("h1").length,overflow:document.documentElement.scrollWidth-innerWidth,pageHeight:document.documentElement.scrollHeight,fonts:document.fonts.status,samples,joins};
      });
      results.push({route,viewport,status:response.status(),...metrics});
      if (illustrated.has(name)) await page.screenshot({path:"output/playwright/ui-audit-2026-10-06/"+name+"-"+label+".png",scale:"css"});
      if (name === "case-spatial") {
        await page.locator(".case-description").scrollIntoViewIfNeeded();
        await page.waitForTimeout(600);
        await page.screenshot({path:"output/playwright/ui-audit-2026-10-06/case-narrative-"+label+".png",scale:"css"});
      }
    }
  }
  return {browser:await page.context().browser().version(),url:"http://127.0.0.1:3000",results};
}
