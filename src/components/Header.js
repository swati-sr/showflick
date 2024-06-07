import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { LOGO, SUPPORTED_LANGUAGE_CODE } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const gptSearchView = useSelector((store) => store.gpt?.showGptSearch);
  const dispatch = useDispatch();

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView(true));
  };

  const handleLanguageChange = (e) => {
    const languageSelected = e.target.value;
    dispatch(changeLanguage(languageSelected));
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(toggleGptSearchView(false));
      })
      .catch((error) => {});
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            displayName: displayName,
            email: email,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe;
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 px-4 pt-5 bg-gradient-to-b from-black h-20 w-full z-20 flex flex-col justify-between md:flex-row md:px-10">
      <img
        className="w-32 pb-2 mx-auto md:mx-0 md:w-40"
        src={LOGO}
        alt="logo"
      />
      {user && (
        <div className="flex justify-between md:gap-4 p-1">
          <button
            className="bg-zinc-900 w-24 py-1 px-2 mb-2 md:mb-0 h-8 rounded-md mt-1 font-bold text-sm text-white"
            onClick={handleGptSearchClick}
          >
            {gptSearchView ? "Home" : "Search"}
          </button>
          {gptSearchView && (
            <select
              className="bg-zinc-900 w-28 py-1 px-2 mb-2 md:mb-0 h-8 rounded-md mt-1 font-bold text-sm text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGE_CODE.map((lang) => (
                <option key={lang.id} value={lang.id} className="bg-zinc-900">
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <img
            className="rounded-md w-8 h-8 mt-1 hidden md:inline-block"
            src={user.photoURL}
            alt="user-icon"
          />
          <button
            className="bg-zinc-900 w-24 py-1 px-2 h-8 rounded-md mt-1 font-bold text-sm text-white"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
