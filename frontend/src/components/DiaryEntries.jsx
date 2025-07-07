import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "../styles/diaryentries.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

function DiaryEntries({ allEntries, onDelete }) {
  const [visibleEntries, setVisibleEntries] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const navigate = useNavigate();

  const moodEmojis = ["😞", "😕", "😐", "🙂", "😄"];
  useEffect(() => {
    setVisibleEntries(allEntries.slice(0, 10));
    setHasMore(allEntries.length > 10);
  }, [allEntries]);

  const fetchMoreData = () => {
    if (visibleEntries.length >= allEntries.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setVisibleEntries((prev) => [
        ...prev,
        ...allEntries.slice(prev.length, prev.length + 5),
      ]);
    }, 300);
  };

  function handleEdit(entry) {
    navigate("/dashboard/write", { state: { entry } });
  }

  function handleDelete(entryId) {
    onDelete(entryId);
  }

  return (
    <div id="scrollableDiv" className="timeline-container">
      {visibleEntries.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <b>📭 No entries to display</b>
          <p>Try adding some memories!</p>
        </div>
      ) : (
        <InfiniteScroll
          dataLength={visibleEntries.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<Loading text="Loading..." />}
          endMessage={
            <div style={{ textAlign: "center" }}>
              <b>✨ You've reached the end ✨</b>
              <p>All memories have been loaded</p>
            </div>
          }
          scrollableTarget="scrollableDiv"
        >
          {visibleEntries.map((entry) => (
            <div
              key={entry.id}
              className="timeline-entry"
              onClick={() => setSelectedEntry(entry)}
              style={{ cursor: "pointer", position: "relative" }}
            >
              {/* Dot */}
              <div className="dot" />

              {/* Top-right icons */}
              <div
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  display: "flex",
                  gap: "8px",
                  zIndex: 1,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <FaEdit
                  style={{
                    color: "rgb(121 45 55)",
                    cursor: "pointer",
                    marginRight: "8px",
                  }}
                  onClick={() => handleEdit(entry)}
                  title="Edit"
                />
                <FaTrash
                  style={{ color: "rgb(121 45 55)", cursor: "pointer" }}
                  onClick={() => handleDelete(entry.id)}
                  title="Delete"
                />
              </div>

              {/* Content */}
              <div className="entry-content">
                <p className="date">{entry.date}</p>
                <h3 className="title">{entry.title}</h3>
                <div
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: "rgb(158 158 158)",
                    fontSize: "15.5px",
                    fontWeight: "500",
                  }}
                >
                  {entry.text.replace(/<[^>]*>/g, "")}
                </div>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      )}

      {selectedEntry && (
        <>
          <div
            onClick={() => setSelectedEntry(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(8px)",
              zIndex: 998,
              animation: "fadeIn 0.2s ease-out",
            }}
          />

          {/* Modal with slide-in animation */}
          <div
            className="entry-modal"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: "900px",
              maxHeight: "90vh",
              backgroundColor: "#a04551",
              zIndex: 999,
              overflowY: "auto",
              borderRadius: "20px",
              boxShadow:
                "0 25px 50px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)",
              display: "flex",
              flexDirection: "column",
              animation: "slideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              border: "0px solid rgb(183 25 45)",
            }}
          >
            {/* Header section with gradient background */}
            <div
              style={{
                background: "linear-gradient(135deg, #4b181f 0%, #a04551 100%)",
                borderRadius: "20px 20px 0 0",
                padding: "32px 32px 24px 32px",
                position: "relative",
                color: "white",
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedEntry(null)}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "20px",
                  background: "rgba(255, 255, 255, 0.2)",
                  border: "none",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  fontSize: "18px",
                  cursor: "pointer",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                  backdropFilter: "blur(10px)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.3)";
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.2)";
                  e.target.style.transform = "scale(1)";
                }}
                title="Close"
              >
                ✕
              </button>

              {/* Title */}
              <h2
                style={{
                  margin: 0,
                  marginBottom: "8px",
                  fontSize: "28px",
                  fontWeight: "700",
                  color: "white",
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  lineHeight: "1.2",
                  paddingRight: "60px",
                }}
              >
                {selectedEntry.title} {moodEmojis[selectedEntry.mood - 1]}
              </h2>

              {/* Date with icon */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.9)",
                  fontWeight: "500",
                }}
              >
                <span style={{ fontSize: "16px" }}>📅</span>
                {selectedEntry.date}
              </div>
            </div>

            {/* Content section */}
            <div
              style={{
                padding: "32px",
                color: "#2d3748",
                lineHeight: "1.7",
                fontSize: "16px",
                background: "#ffffff",
                borderRadius: "0 0 20px 20px",
              }}
            >
              <div
                style={{
                  color: "#4a5568",
                }}
                dangerouslySetInnerHTML={{ __html: selectedEntry.text }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DiaryEntries;
