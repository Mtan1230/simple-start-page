let user = {
    name: '',
    openAI: {
        key: '',
        status: false,
    },
    location: {
        lat: '',
        lon: '',
    },
};

function loadStorage() {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
        user = savedUser;
    }
}

loadStorage();
