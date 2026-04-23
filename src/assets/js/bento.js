document.addEventListener("DOMContentLoaded", function() {
    const grids = document.querySelectorAll(".bento");
    grids.forEach(grid => {
      function syncRowHeight() {
        const cs   = getComputedStyle(grid);
        const cols = cs.gridTemplateColumns.trim().split(/\s+/).length;
        const gap  = parseFloat(cs.columnGap) || parseFloat(cs.gap) || 0;
        const aspect = 5/4;
        const cellW = (grid.clientWidth - gap * (cols - 1)) / cols;
        grid.style.gridAutoRows = Math.round(cellW * 1/aspect) + 'px';
      }
      syncRowHeight();
      // Run once on load, then on every resize via ResizeObserver.
      new ResizeObserver(syncRowHeight).observe(grid);
    });
});