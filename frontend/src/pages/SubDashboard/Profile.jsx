import React, { useState, useRef, useEffect } from "react";
import DashboardHeader from "../../components/DashboardHeader";
import defaultImage from "../../assets/logo/dashboardProfile.jpg";
import "../../styles/profilepage.css";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { AUTH_API, USER_API } from "../../config/api";
import Loading from "../../components/Loading";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(defaultImage);
  const [profile, setProfile] = useState(null);
  const [editProfile, setEditProfile] = useState(null);
  const fileInputRef = useRef(null);

  const { isLoggedIn, checkLoginStatus, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(AUTH_API.LOGOUT, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout failed", err);
    }
    localStorage.clear();
    sessionStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(USER_API.GET_PROFILE, {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setProfile(data);
          setEditProfile(data);
          setProfileImage(data.profileImage || defaultImage);
        } else {
          console.error("Failed to fetch profile");
        }
      } catch (err) {
        console.error("Server error:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setEditProfile({ ...profile });
    setProfileImage(profile.profileImage || defaultImage);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const updatedProfile = { ...editProfile };
      updatedProfile.profileImage = profileImage;

      const res = await fetch(USER_API.UPDATE_PROFILE, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedProfile),
      });

      if (res.ok) {
        setProfile(updatedProfile);
        setIsEditing(false);

        if (updatedProfile.profileImage) {
          localStorage.setItem("profileImageUrl", updatedProfile.profileImage);
        }
      } else {
        console.error("Failed to update profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const handleChange = (field, value) => {
    setEditProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const cloudName = "ddu1cyhxh";
    const uploadPreset = "diary_profile_upload";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (data.secure_url) {
        setProfileImage(data.secure_url);
        setEditProfile((prev) => ({
          ...prev,
          profileImage: data.secure_url,
        }));
        localStorage.setItem("profileImageUrl", data.secure_url);
      } else {
        console.error("Upload failed:", data);
      }
    } catch (err) {
      console.error("Image upload error:", err);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (!profile || !editProfile) {
    return <Loading text="Loading profile..." />;
  }

  return (
    <div className="profile">
      <DashboardHeader />
      <div className="profile_edit">
        <div className="cover_section">
          <div className="profile_image_container">
            <div className="profile_image_wrapper">
              <img src={profileImage} alt="Profile" className="profile_image" />
              {isEditing && (
                <div className="image_overlay" onClick={triggerFileInput}></div>
              )}
            </div>
          </div>
          <div className="edit_button_container">
            {!isEditing ? (
              <button onClick={handleEdit} className="edit_button">
                Edit Profile
              </button>
            ) : (
              <div className="button_group">
                <button onClick={handleSave} className="save_button">
                  Save
                </button>
                <button onClick={handleCancel} className="cancel_button">
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div style={{ textAlign: "center" }}>
            <button className="logout__btn" onClick={handleLogout}>
              Sign Out
            </button>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden_input"
        />

        <div className="profile_content">
          <div className="fields_container">
            <div className="bios">Bio & other details</div>
            {["name", "email", "gender", "dob", "city"].map((field) => (
              <div key={field} className="field_group">
                <label className="label">
                  {field === "dob" ? "Date of Birth" : capitalize(field)}
                </label>
                {isEditing && field !== "email" ? (
                  field === "gender" ? (
                    <select
                      value={editProfile.gender}
                      onChange={(e) => handleChange("gender", e.target.value)}
                      className="select"
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  ) : (
                    <input
                      type={field === "dob" ? "date" : "text"}
                      value={editProfile[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className="input"
                    />
                  )
                ) : (
                  <div className="field_display">
                    <span className="field_value">{profile[field]}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default Profile;
