async function Authorization() {
    const token = await localStorage.getItem("token");

    if (token) {
        return { Authorization: "Bearer " + token };
    } else {
        return null;
    }
}

export default Authorization;