import firebase from "nativescript-plugin-firebase";
import config from "./shared/firebase-config";

import Vue from "nativescript-vue";

import RadListView from "nativescript-ui-listview/vue";

Vue.use(RadListView);

Vue.config.silent = (TNS_ENV === 'production');

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import SignUpApplicant from "./components/SignUpApplicant";
import SignUpEmployer from "./components/SignUpEmployer";
import HomeApplicant from "./components/HomeApplicant";
import HomeEmployer from "./components/HomeEmployer";

new Vue({

    template: `
        <Frame>
            <Login/>
        </Frame>`,

    components: {
        Login,
        SignUp,
        SignUpApplicant,
        SignUpEmployer,
        HomeApplicant,
        HomeEmployer
    },

    data: {
        cars: []
    },

    created() {
        firebase.init(config).then(
            instance => {
                console.log("firebase.init done");

                // cars.load().then((data) => {
                //     this.cars = Object.values(data);
                // })
            },
            error => {
                console.log(`firebase.init error: ${error}`);
            }
        );
    }
}).$start();
