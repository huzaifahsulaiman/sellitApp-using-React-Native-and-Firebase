import {
    Dimensions,
    Platform,
    AsyncStorage
} from 'react-native';

export const APIKEY = `AIzaSyAXKOeqm1bXjSYxxvlNSjYukrE2MJHubSA`;
export const SIGNUP = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${APIKEY}`
export const SIGNIN = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${APIKEY}`

export const getOrientation = (value) => {
    return Dimensions.get("window").height > value ? "portrait" : "landscape"
}

export const setOrientationListener = (cb) => {
    return Dimensions.addEventListener("change", cb)
}

export const removeOrientationListener = () => {
    return Dimensions.removeEventListener("change")
}

export const getPlatform = () => {
    if(Platform.OS === 'ios'){
        return "ios"
    } else {
        return "android"
    }
}

export const getToken = (cb) => {
    AsyncStorage.multiGet([
      "@sellitapp@token",
      "@sellitapp@refreshToken",
      "@sellitapp@expireToken",
      "@sellitapp@uid"
    ]).then(value => {
      cb(value);
    });
}

export const setTokens = (values,cb) => {
    const dateNow = new Date();
    const expiration = dateNow.getTime() + (3600 * 1000);

    AsyncStorage.multiSet([
      ["@sellitapp@token", values.token],
      ["@sellitapp@refreshToken", values.refToken],
      ["@sellitapp@expireToken", expiration.toString()],
      ["@sellitapp@uid", values.uid]
    ]).then(response => {
        cb();
    })
}