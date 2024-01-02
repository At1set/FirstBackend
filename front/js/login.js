window.onload = () => {
  let config = {
    HOST: "localhost:5500",
    BACKEND_URL: "localhost:8000",
  }
  
  const mainForm = document.querySelector(".registration_from")

  async function sendData(endpoint, body = null, callback) {
    try {
      let data = await fetch(`http://${config.BACKEND_URL}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      })
      data = await data.json()
      return callback.call(this, null, data)
    } catch (error) {
      return callback.call(this, error, null)
    }
  }

  function serializeForm(formNode) {
    const { elements } = formNode

    const data = {}

    Array.from(elements)
      .filter((item) => !!item.name)
      .forEach((element) => {
        const { name, type } = element
        const value = type === "checkbox" ? element.checked : element.value

        data[name] = value
      })

    return data
  }

  async function submitForm(e) {
    e.preventDefault()
    if (!mainForm.checkValidity()) {
      return
    }
    data = serializeForm(e.target)
    console.log(data);
    await sendData("login", JSON.stringify(data), (err, data) => {
      if (err) {
        return console.log(err)
      }
      if (data != null) {
        document.location = "http://127.0.0.1:5500/front/users.html"
      }
    })
  }

  mainForm.addEventListener("submit", submitForm)
}