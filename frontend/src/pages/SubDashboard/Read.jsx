import React, { useEffect, useState } from "react";
import "../../styles/read.css";
import Weather from "../../components/Weather";
import DiaryEntries from "../../components/DiaryEntries";
import Calendars from "../../components/Calendars";
import MoodTracker from "../../components/MoodTracker";
import DashboardHeader from "../../components/DashboardHeader";
import PassphraseModal from "../../components/PassphraseModal";
import useEncryption from "../../hooks/useEncryption";
import { DIARY_API, AUTH_API } from "../../config/api";
import Swal from "sweetalert2";

function Read() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [entries, setEntries] = useState([]);
  const [decryptedEntries, setDecryptedEntries] = useState([]);
  const { passphrase, setKey, decrypt, isLoaded } = useEncryption();
  const [filteredEntries, setFilteredEntries] = useState([]);

  useEffect(() => {
    if (isLoaded && !passphrase) {
      setShowModal(true);
    }
  }, [passphrase, isLoaded]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await fetch(DIARY_API.GET, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        const formatted = data.map((entry) => ({
          id: entry.id,
          date: entry.entryDate,
          title: entry.title,
          text: entry.diaryEntry,
          mood: entry.mood,
        }));

        setEntries(formatted);
      } catch (err) {
        console.error("Failed to fetch diary entries:", err);
      }
    };

    if (passphrase) fetchEntries();
  }, [passphrase]);

  useEffect(() => {
    const decryptAllEntries = () => {
      try {
        const decrypted = entries.map((entry) => ({
          ...entry,
          title: decrypt(entry.title),
          text: decrypt(entry.text),
        }));

        setDecryptedEntries(decrypted);
        setFilteredEntries(decrypted.reverse());
      } catch (e) {
        console.error("Decryption failed:", e);
        localStorage.removeItem("diary_simple_key");
        setShowModal(true);
      }
    };

    if (passphrase) decryptAllEntries();
  }, [entries, passphrase]);

  const diaryDates = [...new Set(entries.map((entry) => entry.date))];

  const handleDelete = async (entryId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This diary entry will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      background: "#fff0f3",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(DIARY_API.DELETE(entryId), {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete");

      // Remove from state
      const updated = entries.filter((entry) => entry.id !== entryId);
      setEntries(updated);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="read_container">
      {isLoaded && showModal && (
        <PassphraseModal
          onKeySubmit={(pass) => {
            try {
              setKey(pass);
              setShowModal(false);
            } catch (e) {
              alert("Invalid key. Try again.");
            }
          }}
        />
      )}

      <DashboardHeader />

      <div className="main_content">
        <div className="left_panel">
          <div
            style={{
              textAlign: "center",
              fontFamily: "monospace",
              fontSize: "22px",
              fontWeight: 600,
              marginTop: "10px",
            }}
          >
            Diary Entries
          </div>
          <div className="diary_entries">
            <DiaryEntries
              allEntries={filteredEntries}
              onDelete={handleDelete}
            />
          </div>
          <div className="diary_entries_border"></div>
          <div className="left_weather">
            <Weather />
          </div>
        </div>

        <div className="right_panel">
          <div className="calendar">
            <Calendars
              diaryDates={diaryDates}
              selectedDate={selectedDate}
              onDateSelect={(date) => {
                const formatted = date.toLocaleDateString("en-CA");
                setSelectedDate(new Date(formatted));

                const filtered = decryptedEntries.filter(
                  (entry) => entry.date === formatted
                );
                setFilteredEntries(filtered);
              }}
            />
          </div>

          <div className="moods">
            <MoodTracker />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Read;
