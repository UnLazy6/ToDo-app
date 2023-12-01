function completarTarefa(id) {
    fetch("http://localhost:3000/complete", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    })

    window.location.reload()
}

function descompletarTarefa(id){
    fetch("http://localhost:3000/uncomplete", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    })

    window.location.reload()
}

function changeTheme() {
    const theme = localStorage.getItem("theme")
    const body = document.querySelector("body")
    const button = document.querySelector(".button-theme")

    if (theme) {
        let newTheme

        if (theme === "light") {
            newTheme = "dark"

            button.innerHTML = `<img src="/imagens/sun-icon.png" alt="sun icon">`

            body.classList.remove("light")
            body.classList.add("dark")

        } else {
            newTheme = "light"

            button.innerHTML = `<img src="/imagens/moon-icon.png" alt="moon icon">`

            body.classList.remove("dark")
            body.classList.add("light")
        }

        localStorage.setItem("theme", newTheme)
        return
    }

    localStorage.setItem("theme", "dark")
    body.classList.add("dark")
}

function checkTheme() {
    const theme = localStorage.getItem("theme")
    const body = document.querySelector("body")
    const button = document.querySelector(".button-theme")

    if (theme) {
        if (theme === "dark") {
            body.classList.add("dark")

            button.innerHTML = `<img src="/imagens/sun-icon.png" alt="sun icon">`

        } else {
            body.classList.add("light")

            utton.innerHTML = `<img src="/imagens/moon-icon.png" alt="moon icon">`

        }
    }
}

checkTheme()
