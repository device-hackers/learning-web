function init() {
    const $ = document.querySelector.bind(document);

    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.type = 'text/css';
    link.href = 'https://thebit.github.io/learning-web/styles.css';
    document.head.appendChild(link);

    const div1 = document.createElement('div');
    div1.className = "entry";
    div1.innerHTML = "<button>☰</button>";

    document.body.append(div1);

    const div2 = document.createElement('div');
    div2.className = "overlay hide";
    div2.innerHTML = "<div class=\"content\">\n            <div class=\"allTab hide\"></div>\n            <div class=\"favoriteTab\"></div>\n          </div>\n          <div class=\"panel\">\n            <button class=\"close\">X</button>\n            <button class=\"favorite selected\">☆</button>\n            <button class=\"all\">All</button>\n          </div>";

    document.body.append(div2);

    const entry = $('.entry button');
    const overlay = $('.overlay');
    const favorite = $('.favorite');
    const all = $('.all');
    const favoriteTab = $('.favoriteTab');
    const allTab = $('.allTab');
    const tabs = [all, favorite];
    const tabsContent = [allTab, favoriteTab];

    const chunkSeparator = ':';
    const beginChunk = 'begin';
    const endChunk = 'end';
    const doneChunk = 'done';

    let lcp = '';
    const initLCP = () => {
        try {
            // let lcp;

            const po = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const lastEntry = entries[entries.length - 1];

                // Update `lcp` to the latest value, using `renderTime` if it's available,
                // otherwise using `loadTime`. (Note: `renderTime` may not be available on
                // image elements loaded cross-origin without the `Timing-Allow-Origin` header.)
                lcp = lastEntry.renderTime || lastEntry.loadTime;
            });

            po.observe({type: 'largest-contentful-paint', buffered: true});
        } catch (e) {
            // Do nothing if the browser doesn't support this API.
            lcp = `error: ${e.message}`;
        }
    }

    initLCP();

    entry.onclick = () => {
        entry.classList.toggle('hide');
        overlay.classList.toggle('hide');
        favorite.click();
    }

    $('.close').onclick = () => {
        entry.classList.toggle('hide');
        overlay.classList.toggle('hide');
    }

    const clearTabsState = () => {
        tabs.forEach(tab => tab.classList.remove('selected'));
        tabsContent.forEach(tabContent => tabContent.classList.add('hide'));
    }

    const renderTabAll = () =>
        performance.getEntries()
            .map(entry => `<b>    ${entry.entryType}</b><hr>${JSON.stringify(entry.toJSON())}`)
            .join('<hr>').replace(/(\d+)\.\d+/g, `$1`)
            .split('":').join('":&nbsp;')
            .split(',').join(',&#9;')
            .replace(/[{"}]/g, '');

    all.onclick = () => {
        clearTabsState();
        all.classList.add('selected');
        allTab.classList.remove('hide');
        allTab.innerHTML = renderTabAll();
    }

    const printMemoryMetric = (metric) => `${(performance.memory[metric] / 1024 / 1024).toFixed(1)} (Mb)`;

    const renderMemory = () => {
        return performance.memory ? `<table>
            <tr style="font-size: small"><th>jsHeapSizeLimit</th><th>totalJSHeapSize</th><th>usedJSHeapSize</th></tr>
            <tr><td>${printMemoryMetric('jsHeapSizeLimit')}</td>
                <td>${printMemoryMetric('totalJSHeapSize')}</td>
                <td>${printMemoryMetric('usedJSHeapSize')}</td></tr>
          </table><br>` : '';
    };

    const renderMeasurement = () => {
        return `<table>
            <tr><th>Measurement</th><th>Start (ms)</th><th>Duration (ms)</th></tr>
            ${performance.getEntriesByType('paint')
            .concat(performance.getEntriesByType('measure'))
            .sort((a, b) => a.startTime - b.startTime)
            .map(entry => `<tr><td>${entry.name}</td>
                                  <td>${entry.startTime.toFixed(1)}</td>
                                  <td>${entry.duration.toFixed(1)}</td></tr>`)
            .join('')}
          </table>`;
    };

    const renderLCP = () => {
        return `<hr><div>PerformanceObserver.supportedEntryTypes: ${PerformanceObserver.supportedEntryTypes}</div>
            <table><tr><th>Web Vitals</th><th>Value</th></tr>
            <tr><td>LCP (Largest Contentful Paint)</td>
            <td>${lcp && typeof lcp === 'number' && lcp.toFixed(1) || lcp}</td></tr>
          </table>`;
    };

    const measureFavoritePerformance = () => {
        performance.clearMeasures();
        performance.measure('navigation:done', 'navigationStart', 'loadEventEnd');
        performance.measure('html:done', 'navigationStart', 'responseEnd');
        // WARNING! Bundle measurement below may be project specific! It assumes that bundle scripts
        // loaded inside body synchronously (without async/defer), thus blocking domComplete/loadEvent.
        performance.measure('bundle:done', 'responseEnd', 'loadEventEnd');

        // [{ name: 'foo:begin', ...}, { name: 'foo:end', ...}, { name: 'bar:begin', ...}, { name: 'foo:end', ...},
        // { name: 'markWithoutColon', ...}, { name: 'markWith:Colon', ...}] => ['foo', 'foo', 'bar', 'bar']
        const filteredMarkNameChunks = performance.getEntriesByType('mark')
            .filter(mark => mark.name.endsWith(`${chunkSeparator}${beginChunk}`) ||
                mark.name.endsWith(`${chunkSeparator}${endChunk}`))
            .map(mark => mark.name.split(chunkSeparator)[0]);

        // ['foo', 'foo', 'bar', 'bar'] => ['foo', 'bar']
        const uniqueMarkNameChunks = [...new Set(filteredMarkNameChunks)];

        uniqueMarkNameChunks.forEach(markNameChunk => {
            const markNameBegin = `${markNameChunk}${chunkSeparator}${beginChunk}`; // foo:begin
            const markNameEnd = `${markNameChunk}${chunkSeparator}${endChunk}`; // foo:end
            const markNameDone = `${markNameChunk}${chunkSeparator}${doneChunk}`; // foo:done

            if (performance.getEntriesByName(markNameBegin).length &&
                performance.getEntriesByName(markNameEnd).length) {
                performance.measure(markNameDone, markNameBegin, markNameEnd);
                // Below "else if" assumes you will call "performance.mark('framework:end')" as the first line in your code
            } else if (markNameChunk === 'framework' &&
                performance.getEntriesByName(markNameEnd).length) {
                performance.measure(markNameDone, `loadEventEnd`, markNameEnd);
            }
        });
    }

    favorite.onclick = () => {
        clearTabsState();
        favorite.classList.add('selected');
        favoriteTab.classList.remove('hide');
        measureFavoritePerformance();
        favoriteTab.innerHTML = `${renderMemory()}${renderMeasurement()}${renderLCP()}`;
    }
}

if (document.readyState === 'complete') {
    init();
} else {
    window.onload = () => { init() };
}
