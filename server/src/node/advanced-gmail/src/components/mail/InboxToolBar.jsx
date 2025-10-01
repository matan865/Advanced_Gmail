import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function InboxToolbar({
  allSelected = false,
  someSelected = false,
  onToggleSelectAll,
  onRefresh,
  rangeLabel = "",
  onPrevPage,
  onNextPage,
  canPrev = true,
  canNext = true,
  selectedCount = 0,
  onBulkArchive,
  onBulkTrash,
  onBulkStar,
  onBulkUnstar,
}) {
  const masterRef = useRef(null);
  useEffect(() => {
    if (masterRef.current) {
      masterRef.current.indeterminate = !allSelected && someSelected;
    }
  }, [allSelected, someSelected]);

  return (
    <div className="mainBlock">
      <div className="toolBar col-9">
        <div className="row">
          <div className="d-flex align-items-center gap-3">
            <input
              ref={masterRef}
              type="checkbox"
              checked={allSelected}
              onChange={(e) => onToggleSelectAll && onToggleSelectAll(e.target.checked)}
              title="Select all on page"
            />
            <i
              className="bi bi-arrow-clockwise"
              role="button"
              title="Refresh"
              onClick={onRefresh}
            ></i>

            {/* Bulk actions appear only if something is selected */}
            {selectedCount > 0 && (
              <div className="btn-group ms-2">
                <button className="btn btn-sm btn-outline-secondary" title="Move to Archive" onClick={onBulkArchive}>
                  <i className="bi bi-inbox-fill"></i>
                </button>
                <button className="btn btn-sm btn-outline-secondary" title="Move to Trash" onClick={onBulkTrash}>
                  <i className="bi bi-trash"></i>
                </button>
                <button className="btn btn-sm btn-outline-secondary" title="Star" onClick={onBulkStar}>
                  <i className="bi bi-star"></i>
                </button>
                <button className="btn btn-sm btn-outline-secondary" title="Unstar" onClick={onBulkUnstar}>
                  <i className="bi bi-star-fill"></i>
                </button>
              </div>
            )}

            <span className="ms-auto">{rangeLabel || "0-0 of 0"}</span>
            <i
              className={`bi bi-chevron-left ${!canPrev ? "text-secondary" : ""}`}
              role="button"
              onClick={canPrev ? onPrevPage : undefined}
              title="Previous"
            ></i>
            <i
              className={`bi bi-chevron-right ${!canNext ? "text-secondary" : ""}`}
              role="button"
              onClick={canNext ? onNextPage : undefined}
              title="Next"
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InboxToolbar;
