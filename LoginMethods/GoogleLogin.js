const ANDROID_CLIENT_ID =
  "997788956598-p9p0phpr1b8n1us1fo68841v5lpdl7db.apps.googleusercontent.com";
const signInWithGoogleAsync = async () => {
  try {
    const result = await Google.logInAsync({
      androidClientId: ANDROID_CLIENT_ID,

      // iosClientId: YOUR_CLIENT_ID_HERE,
      scopes: ["profile", "email"]
    });

    if (result.type === "success") {
      alert(result.user.getId);
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
};
export default signInWithGoogleAsync;