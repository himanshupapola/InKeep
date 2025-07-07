import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

import { FaRegSave, FaFileAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import useEncryption from "../hooks/useEncryption";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Swal from "sweetalert2";
import { DIARY_API } from "../config/api";

const Editor = ({
  title,
  setTitle,
  editorContentRef,
  onDraftSaved,
  selectedMood,
  id,
}) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [isContentValid, setIsContentValid] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [isSaving, setIsSaving] = useState(false);

  const { encrypt } = useEncryption();
  const navigate = useNavigate();

  useEffect(() => {
    const checkValidity = () => {
      const plainText = quillRef.current?.getText().trim();
      const hasTitle = title.trim().length > 0;
      const hasContent = plainText && plainText.length > 0;
      setIsContentValid(hasTitle && hasContent);
    };

    const quill = quillRef.current;
    if (quill) {
      quill.on("text-change", checkValidity);
    }

    checkValidity();

    return () => {
      if (quill) {
        quill.off("text-change", checkValidity);
      }
    };
  }, [title]);

  useEffect(() => {
    const Font = Quill.import("formats/font");
    Font.whitelist = [
      "sans-serif",
      "playfair-display",
      "dancing-script",
      "caveat",
      "merriweather",
      "comfortaa",
      "indie-flower",
      "raleway",
      "courgette",
      "quicksand",
    ];
    Quill.register(Font, true);

    const Size = Quill.import("attributors/style/size");
    Size.whitelist = [
      "12px",
      "14px",
      "16px",
      "18px",
      "21px",
      "24px",
      "32px",
      "40px",
    ];
    Quill.register(Size, true);

    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: "#toolbar",
        },
      });

      if (editorContentRef) editorContentRef.current = quillRef.current;
    }

    const handleBeforeUnload = (e) => {
      const content = quillRef.current?.getText().trim();
      if (title.trim() || content) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [title, editorContentRef]);

  const saveDraft = () => {
    const editorContent = quillRef.current?.root.innerHTML || "";
    const newDraft = {
      id: Date.now(),
      title,
      content: editorContent,
      savedAt: format(selectedDateTime, "dd MMMM yyyy"),
      selectedDateTime,
    };

    if (onDraftSaved) {
      onDraftSaved(newDraft);
    }

    Swal.fire({
      title: "📌 Draft Saved",
      text: "Your draft has been saved to the browser.",
      icon: "success",
      confirmButtonColor: "#a04551",
      background: "#fff0f3",
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: "top-end",
    });
  };

  const saveToBackend = async () => {
    setIsSaving(true);
    const encryptedTitle = encrypt(title);
    const encryptedHtml = encrypt(quillRef.current?.root.innerHTML);
    const mood = selectedMood;
    const entryDate = format(selectedDateTime, "yyyy-MM-dd");

    try {
      const res = await fetch(DIARY_API.CREATE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: encryptedTitle,
          diaryEntry: encryptedHtml,
          mood,
          entryDate,
        }),
      });

      if (!res.ok) {
        throw new Error(`❌ Failed with status ${res.status}`);
      }

      const data = await res.json();


      setTimeout(() => {
        navigate("/dashboard/read");
      }, 1000);
    } catch (err) {
      console.error("Error saving diary:", err);
      alert("Failed to save diary.");
      setIsSaving(false);
    }
  };

  const updateToBackend = async () => {
    if (!id) {
      console.error("No ID found for update");
      return;
    }

    setIsSaving(true);
    const encryptedTitle = encrypt(title);
    const encryptedHtml = encrypt(quillRef.current?.root.innerHTML);
    const mood = selectedMood;
    const entryDate = format(selectedDateTime, "yyyy-MM-dd");

    try {
      const res = await fetch(DIARY_API.UPDATE(id), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: encryptedTitle,
          diaryEntry: encryptedHtml,
          mood,
          entryDate,
        }),
      });

      if (!res.ok) {
        throw new Error(`❌ Failed with status ${res.status}`);
      }

      const data = await res.json();

      setTimeout(() => {
        navigate("/dashboard/read");
      }, 1000);
    } catch (err) {
      console.error("Error updating diary:", err);
      alert("Failed to update diary.");
      setIsSaving(false);
    }
  };

  if (isSaving) return <Loading text="Saving..." background="transparent" />;

  return (
    <div>
      <div
        className="outer_btn"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <DatePicker
            selected={selectedDateTime}
            onChange={(date) => setSelectedDateTime(date)}
            dateFormat="dd MMMM yyyy"
            showMonthDropdown
            showYearDropdown={false}
            showTimeSelect={false}
            peekNextMonth
            todayButton="Today"
            maxDate={new Date()}
            minDate={new Date(new Date().setMonth(new Date().getMonth() - 1))}
            className="diary-datepicker"
          />
        </div>

        <div className="btns">
          <button
            className="primary_btn"
            onClick={() => {
              saveDraft();
            }}
            disabled={!isContentValid}
          >
            <FaFileAlt className="primary_btn_icons" /> Save Draft
          </button>

          {!id ? (
            <button
              className="primary_btn"
              onClick={saveToBackend}
              disabled={!isContentValid}
            >
              <FaRegSave className="primary_btn_icons" /> Save
            </button>
          ) : (
            <button
              className="primary_btn"
              onClick={updateToBackend}
              disabled={!isContentValid}
            >
              <FaRegSave className="primary_btn_icons" /> Update
            </button>
          )}
        </div>
      </div>

      <input
        type="text"
        placeholder="Name this diary entry..."
        className="diary_title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div ref={editorRef} style={{ height: "70vh" }} />
    </div>
  );
};

export default Editor;
