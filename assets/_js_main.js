 function submitContactForm(event) {
      event.preventDefault()
      const form = document.getElementById("contact_form")
      const email = document.getElementById("ContactFormEmail")
      const emailVerify = document.getElementById("ContactFormEmailVerify")
      console.log("eメールテストです");
      if (email.value !== emailverify.value) {
        email.setCustomValidity("テスト")
      } else {
        email.setCustomValidity("")
      }

      if (form.reportValidity()) {
       
      }
    }
