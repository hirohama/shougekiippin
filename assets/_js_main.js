 function submitContactForm(event) {
      event.preventDefault()
      const form = document.getElementById("ContactForm")
      const email = document.getElementById("ContactFormEmail")
      const emailVerify = document.getElementById("ContactFormEmailVerify")
      console.log("eメールテストです");
      if (email.value !== emailVerify.value) {
        email.setCustomValidity("メールアドレスが同一ではありません")
      } else {
        email.setCustomValidity("")
      }

      if (form.reportValidity()) {
        form.submit()
      }
    }
