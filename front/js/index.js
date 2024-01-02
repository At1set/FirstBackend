window.onload = async () => {
  let config = {
    HOST: "localhost:5500",
    BACKEND_URL: "192.168.0.191:8000",
  }

  const mainForm = document.querySelector(".main_from")
  
  // Проверяем валидность формы. Если она не валидна, отключаем кнопку submit
  function checkValidity() {
    const submitButton = mainForm.querySelector("button[type=submit]")
    const password_input = mainForm.querySelectorAll("input[type=password]")
    const isPasswordValid = password_input[0].value === password_input[1].value

    const isValid = mainForm.checkValidity() && isPasswordValid
    submitButton.disabled = !isValid
    return isValid
  }
  checkValidity()

  const mainForm__fields = Array.from(mainForm.elements).filter(
    (item) => item.tagName == "INPUT"
  )
  mainForm__fields.forEach((element) => {
    element.addEventListener("input", checkValidity)
  })

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
  
  async function submitForm(e) {
    e.preventDefault()
    if (!checkValidity()) {
      return
    }
    data = serializeForm(e.target)
    await sendData("registration", JSON.stringify(data), (err, data) => {
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