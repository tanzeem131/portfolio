window.onload = function () {
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    output.innerHTML += 'The form has been sent successfully!🎉🤩🎉';
    emailjs.sendForm('contact_service', 'contact_form', this).then(
      () => {
        console.log('SUCCESS!');
      },
      error => {
        console.log('FAILED...', error);
      }
    );
    form.reset();
  });
};
