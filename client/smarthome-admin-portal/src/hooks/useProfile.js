import { useState, useEffect } from "react";
import { fetchProfile } from "../services/profileService";

export const useProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile()
      .then((data) => setProfile(data))
      .catch((err) => console.error(err));
  }, []);

  return { profile, setProfile };
};
