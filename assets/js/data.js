let user = {
    name: '',
    openAI: {
        key: '',
        status: false,
    },
};

function loadStorage() {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
        user = savedUser;
    }
}

loadStorage();
