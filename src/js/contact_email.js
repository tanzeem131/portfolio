window.onload = function () {
  const form = document.getElementById('contact-form');
  const output = document.getElementById('output');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    emailjs.sendForm('contact_service', 'contact_form', this).then(
      () => {
        output.innerHTML +=
          '<span id="success-message" style="color: #a9ff03;">The form has been sent successfully!🎉🤩🎉</span>';
        console.log('SUCCESS!');
        form.reset();

        setTimeout(() => {
          const successMessage = document.getElementById('success-message');
          if (successMessage) {
            successMessage.remove();
          }
        }, 3000);
      },
      error => {
        console.log('FAILED...', error);
      }
    );
  });
};

(function () {
  emailjs.init({
    publicKey: process.env.EMAILJS_PUBLIC_KEY,
  });
})();
