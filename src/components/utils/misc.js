import {
    Dimensions,
    Platform,
    AsyncStorage
} from 'react-native';

export const FIREBASEURL = "https://sellitapp-c0388.firebaseio.com";
export const APIKEY = `AIzaSyAXKOeqm1bXjSYxxvlNSjYukrE2MJHubSA`;
export const SIGNUP = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${APIKEY}`;
export const SIGNIN = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${APIKEY}`;
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}`;

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

export const navigatorDrawer = (event, $this) => {
    if(event.type === "NavBarButtonPress" && event.id === "DrawerButton"){
        $this.props.navigator.toggleDrawer({
            side:'left',
            animated: true
        })
    }
}

export const navigatorDeepLink = (event, $this) => {
    if(event.type === 'DeepLink'){
        $this.props.navigator.toggleDrawer({
            side: 'left',
            animatedL: true
        });

        if(event.payload.typeLink === 'tab'){
            $this.props.navigator.switchToTab({
                tabIndex:event.payload.indexLink
            })
        }else{
            $this.props.navigator.showModal({
                screen: event.link,
                animationType: 'slide-horizontal',
                navigatorStyle:{
                    navBarBackgroundColor: '#00ADA9',
                    screenBackgroundColor: '#ffffff'
                },
                backButtonHidden:false
            })
        }
    }
}

export const getTokens = (cb) => {
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

export const gridTwoColumns = (list) => {
    let newArticles = [];
    let articles = list;

    let count = 1;
    let vessel = {};

    if(articles){
        articles.forEach( element => {
            if(count == 1){
                vessel["blockOne"] = element;
                count++;
            } else {
                vessel["blockTwo"] = element;
                newArticles.push(vessel);

                count = 1;
                vessel= {};
            }
        })
    }

    return newArticles;
}
