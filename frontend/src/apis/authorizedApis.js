import axios from "axios";
import jwt from "jwt-decode"

const baseURL = process.env.NODE_ENV === "production"
    ? "https://billok.co/api/"
    : "http://127.0.0.1:3000/api/"

const axiosInstance = axios.create({
    baseURL: baseURL,
    // timeout: 9000,
    headers: {
        Authorization: sessionStorage.getItem("token")
            ? "Bearer " + sessionStorage.getItem("token")
            : null,
        "Content-Type": "application/json",
        accept: "application/json",
    },
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {

        // console.log(error);
        if (typeof error.response === "undefined") {
            alert(
                "A server/network error occured! " +
                "Looks like CORS might be the problem. " +
                "Sorry about this - we will get it fixed shortly."
            );
            window.location.href = "/login";
            return Promise.reject(error);
        }

        if (
            error.response.data.code === "token_not_valid" &&
            error.response.status === 401 &&
            error.response.statusText === "Unauthorized"
        ) {
            const refreshToken = jwt(sessionStorage.getItem("token"));

            if (refreshToken) {
                const tokenParts = refreshToken;

                // expiry date in token is expressed in seconds, while now() returns milliseconds;
                const now = Math.ceil(Date.now() / 1000);


                if (tokenParts.exp < now) {
                    window.alert("Refresh token is expired", tokenParts.exp, now);
                    window.location.href = "/login";
                }
            } else {
                console.log("Refresh token is not available.");
                window.location.href = "/login";
            }
        }
        // specific error handling done elsewhere
        return Promise.reject(error);
    }
);

export default axiosInstance;
