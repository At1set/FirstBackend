let config = {
  HOST: "localhost:5500",
  BACKEND_URL: "192.168.0.191:8000",
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

window.onload = () => {
  async function load_users() {
    response = await sendData("api/users", null, (err, res) => {
      if (err) return false
      return res
    })
    let entries = response ? Object.entries(response): false

    let HTML_markup = ""
    const table_body = document.querySelector(".users_table tbody")
    table_body.innerHTML = ""

    if (entries) {
      entries.forEach(([key, user]) => {
        HTML_markup += `\
<tr>
  <td>${user?.id}</td>  
  <td>${user?.name}</td>
  <td>${user?.email}</td>
  <td>${user?.password}</td>
</tr>
`
      })
      table_body.innerHTML += HTML_markup 
    } else {
      table_body.innerHTML = `\
<tr>
  <td>Не удалось получить данные о пользователях</td>
  <td>Не удалось получить данные о пользователях</td>
  <td>Не удалось получить данные о пользователях</td>
  <td>Не удалось получить данные о пользователях</td>
</tr>
`
    }
    
  }
  load_users()
}
