window.onload = () => {
    const $ = document.querySelector.bind(document);

    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.type = 'text/css';
    link.href = 'https://thebit.github.io/learning-web/styles.css';
    document.head.appendChild(link);

    document.body.innerHTML +=
        `<div class="entry">
          <button>☰</button>
        </div>
        <div class="overlay hide">
          <div class="content">
            <div class="allTab hide"></div>
            <div class="favoriteTab"></div>
          </div>
          <div class="panel">
            <button class="close">X</button>
            <button class="favorite selected">☆</button>
            <button class="all">All</button>
          </div>
        </div>`;

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
            <tr style="font-size: small"><th>jsHeapSizeLimit</th><th>totalJSHeapSize</th><th>usedJSHeapSize</th>
            <tr><td>${printMemoryMetric('jsHeapSizeLimit')}</td>
                <td>${printMemoryMetric('totalJSHeapSize')}</td>
                <td>${printMemoryMetric('usedJSHeapSize')}</td>
          </table><br>` : '';
    };

    const renderMeasurement = () => {
        return `<table>
            <tr><th>Measurement</th><th>Start (ms)</th><th>Duration (ms)</th>
            ${performance.getEntriesByType('paint')
            .concat(performance.getEntriesByType('measure'))
            .sort((a, b) => a.startTime - b.startTime)
            .map(entry => `<tr><td>${entry.name}</td>
                                  <td>${entry.startTime.toFixed(1)}</td>
                                  <td>${entry.duration.toFixed(1)}</td></tr>`)
            .join('')}
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
        favoriteTab.innerHTML = `${renderMemory()}${renderMeasurement()}`;
    }
};
