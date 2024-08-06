window.onload = function () {
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    emailjs.sendForm('contact_service', 'contact_form', this).then(
      () => {
        output.innerHTML += 'The form has been sent successfully!🎉🤩🎉';
        console.log('SUCCESS!');
        form.reset();
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
