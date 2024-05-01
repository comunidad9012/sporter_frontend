function isAdmin(){
  let is_admin = false
  document.cookie.split(";").forEach(e => {
    const curr_cookie = e.split("=")

    curr_cookie[0] = curr_cookie[0].trim()
    curr_cookie[1] = Number(curr_cookie[1])

    if (curr_cookie[0] == "is_admin" && curr_cookie[1]) {
      is_admin = true
    }
  })

  return is_admin
}

function isLogged(){
  let is_admin = false
  document.cookie.split(";").forEach(e => {
    const curr_cookie = e.split("=")

    curr_cookie[0] = curr_cookie[0].trim()
    curr_cookie[1] = Number(curr_cookie[1])

    if (curr_cookie[0] == "logged_in" && curr_cookie[1]) {
      is_admin = true
    }
  })

  return is_admin
}

export function hideModify(){
    if (document.cookie === "" || !isAdmin()){
        document.querySelectorAll(".modify-product-btn").forEach(e => e.style = "visibility: hidden;")
    }
}