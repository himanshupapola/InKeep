import React, { useEffect, useRef, useState } from "react";
import "../../styles/read.css";
import DashboardHeader from "../../components/DashboardHeader";
import Editor from "../../components/Editor";
import "../../styles/editor.css";
import { FaTimes } from "react-icons/fa";
import MoodSelector from "../../components/MoodSelector";
import "../../styles/rightTopPanel.css";
import { useLocation } from "react-router-dom";
function Write() {
  const location = useLocation();
  const editingEntry = location.state?.entry || null;

  const [draftList, setDraftList] = useState([]);
  const [title, setTitle] = useState("");
  const editorContentRef = useRef(null);
  const [selectedMood, setSelectedMood] = useState(3);

  useEffect(() => {
    if (editingEntry) {
      setTitle(editingEntry.title || "");
      setSelectedMood(editingEntry.mood || 3);
      if (editorContentRef.current) {
        editorContentRef.current.root.innerHTML = editingEntry.text || "";
      }
    } else {
      setTitle("");
      setSelectedMood(3);
      if (editorContentRef.current) {
        editorContentRef.current.root.innerHTML = "";
      }
    }
  }, [editingEntry]);

  //change editor
  const handleDraftClick = (draft) => {
    setTitle(draft.title);
    setSelectedMood(draft.mood);
    if (editorContentRef.current) {
      editorContentRef.current.root.innerHTML = draft.content;
    }
    editingEntry.id = null;
  };

  const handleDraftSaved = (newDraft) => {
    const draftWithMetadata = {
      ...newDraft,
      mood: selectedMood,
      date: newDraft.selectedDateTime
        ? new Date(newDraft.selectedDateTime).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0], // fallback
    };

    const updatedDrafts = [...draftList, draftWithMetadata];
    if (updatedDrafts.length >= 3) {
      updatedDrafts.shift();
    }

    setDraftList(updatedDrafts);
    localStorage.setItem("diaryDrafts", JSON.stringify(updatedDrafts));
  };

  const deleteDraft = (id) => {
    const updatedDrafts = draftList.filter((draft) => draft.id !== id);
    setDraftList(updatedDrafts);
    localStorage.setItem("diaryDrafts", JSON.stringify(updatedDrafts));
  };

  useEffect(() => {
    const savedDrafts = JSON.parse(localStorage.getItem("diaryDrafts")) || [];
    setDraftList(savedDrafts);
  }, []);
  return (
    <div className="read_container">
      <DashboardHeader />

      <div className="main_content">
        <div className="left_panel" style={{ marginTop: "20px" }}>
          <div className="diary_entries">
            <Editor
              title={title}
              setTitle={setTitle}
              editorContentRef={editorContentRef}
              onDraftSaved={handleDraftSaved}
              selectedMood={selectedMood}
              id={editingEntry?.id ?? null}
            />
          </div>
        </div>

        <div
          className="right_panel"
          style={{ paddingTop: "40px", justifyContent: "start" }}
        >
          <div id="toolbar">
            <div
              style={{
                textAlign: "center",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                padding: "5px",
                backgroundColor: "#f0f0f0",
                borderBottom: "1px solid #ccc",
                color: "#7e2b36",
              }}
            >
              Toolbar
            </div>

            <div className="toolbar_wrapper">
              <div className="seperator">
                <span className="ql-formats text_style">
                  <select className="ql-header">
                    <option value="1" />
                    <option value="2" />
                    <option value="3" />
                    <option value="4" />
                    <option value="5" />
                    <option value="6" />
                    <option defaultValue />
                  </select>
                </span>
              </div>

              <div className="seperator">
                <span className="ql-formats text_style">
                  <select className="ql-font">
                    <option value="sans-serif">Sans Serif</option>
                    <option value="playfair-display">Playfair Display</option>
                    <option value="dancing-script">Dancing Script</option>
                    <option value="caveat">Caveat</option>
                    <option value="merriweather">Merriweather</option>
                    <option value="comfortaa">Comfortaa</option>
                    <option value="indie-flower">Indie Flower</option>
                    <option value="raleway">Raleway</option>
                    <option value="courgette">Courgette</option>
                    <option value="quicksand">Quicksand</option>
                  </select>
                </span>
              </div>
            </div>

            <div className="toolbar_wrapper">
              <div className="seperator ">
                <select className="ql-size" defaultValue="18px">
                  <option value="12px">12px</option>
                  <option value="14px">14px</option>
                  <option value="16px">16px</option>
                  <option value="18px">18px</option>
                  <option value="21px">21px</option>
                  <option value="24px">24px</option>
                  <option value="32px">32px</option>
                  <option value="40px">40px</option>
                </select>
                <span className="ql-formats">
                  <button className="ql-bold" />
                  <button className="ql-italic" />
                  <button className="ql-underline" />
                  <button className="ql-strike" />
                </span>
              </div>
            </div>

            <div className="toolbar_wrapper">
              <div className="seperator">
                <span className="ql-formats">
                  <select className="ql-color" />
                  <select className="ql-background" />
                </span>

                <span className="ql-formats">
                  <button className="ql-script" value="sub" />
                  <button className="ql-script" value="super" />
                  <button className="ql-blockquote" />
                  <button className="ql-link" />
                </span>
              </div>
            </div>

            <div className="toolbar_wrapper">
              <div className="seperator">
                <span className="ql-formats">
                  <button className="ql-list" value="ordered" />
                  <button className="ql-list" value="bullet" />
                  <button className="ql-list" value="check" />
                </span>
              </div>
            </div>

            <div className="toolbar_wrapper last_wrapper">
              <div className="seperator">
                <span className="ql-formats">
                  <button className="ql-align" value="" />
                  <button className="ql-align" value="center" />
                  <button className="ql-align" value="right" />
                  <button className="ql-align" value="justify" />
                </span>
              </div>
            </div>

            <div
              className="toolbar_wrapper last_item"
              style={{ display: "none" }}
            >
              <div className="seperator ">
                <span className="ql-formats">
                  <button className="ql-image" />
                </span>
              </div>
            </div>
          </div>

          <div>
            <MoodSelector
              selectedMood={selectedMood}
              setSelectedMood={setSelectedMood}
            />
          </div>

          <div>
            <h3 className="mood_title">Drafts</h3>

            <div className="draft_titles">
              {draftList.length > 0 ? (
                draftList.map((draft, index) => (
                  <div
                    key={draft.id || index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "8px",
                      paddingRight: "8px",
                      borderBottom: "1px solid black",
                      paddingBottom: "3px",
                    }}
                  >
                    <div
                      onClick={() => handleDraftClick(draft)}
                      style={{
                        cursor: "pointer",
                        color: "blue",
                        margin: 0,
                        flex: 1,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontWeight: "bold",
                          color: "#6400ff",
                        }}
                      >
                        {draft.title}
                      </p>
                      <p style={{ margin: 0, fontSize: "12px", color: "#555" }}>
                        Mood: {draft.mood} | Date: {draft.date}
                      </p>
                    </div>

                    <FaTimes
                      style={{
                        color: "red",
                        cursor: "pointer",
                        marginLeft: "10px",
                      }}
                      onClick={() => deleteDraft(draft.id)}
                      title="Delete draft"
                    />
                  </div>
                ))
              ) : (
                <p>No drafts saved yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Write;
