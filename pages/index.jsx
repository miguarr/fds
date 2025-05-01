import Head from 'next/head';
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Home() {
  const form = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [fileLabel, setFileLabel] = useState('Choose File');

  const handleFileChange = (e) => {
    setFileLabel(e.target.files[0]?.name || 'Choose File');
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_k647v9n',
      'template_w33iesy',
      form.current,
      'xMBFmbIx0H-mrVH6V'
    ).then(() => {
      setSubmitted(true);
      form.current.reset();
      setFileLabel('Choose File');
    }).catch((error) => {
      console.error('EmailJS error:', error);
      alert('Failed to send RFQ.');
    });
  };

  return (
    <>
      <Head>
        <title>Guarniflon RFQ Platform</title>
        <meta name="description" content="Submit your RFQ and receive our alternative materials at the best price." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" />
      </Head>

      <main className="min-h-screen bg-white text-gray-800 px-6 py-10 font-sans">
        <div className="max-w-4xl mx-auto space-y-12">

          <header className="text-center">
            <h1 className="text-4xl font-bold tracking-tight">GUARNIFLON COMPOSITES DIVISION</h1>
            <p className="mt-4 text-lg text-gray-600">
              This portal allows customers to submit a quotation request (RFQ) for their composite process materials.
              We will propose Guarniflon alternative solutions with the best price and technical match.
              <br /><br />
              <span className="font-semibold">
                Now download the RFQ template and upload it below.
              </span>
            </p>
          </header>

          <form ref={form} onSubmit={sendEmail}>
            <section className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <input name="contact_name" placeholder="Your Name" required />
                <input name="company" placeholder="Company Name" required />
                <input name="email" placeholder="Email" type="email" required />
                <textarea name="message" placeholder="Optional message" rows="4"></textarea>
              </div>

              <div className="flex flex-col justify-end space-y-4">
                <div className="flex gap-4">
                  <label className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg text-center cursor-pointer transition">
                    {fileLabel}
                    <input
                      type="file"
                      name="file_name"
                      required
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition"
                  >
                    Submit RFQ
                  </button>
                </div>
                {submitted && (
                  <p className="text-green-600 text-sm font-medium text-center">RFQ successfully submitted!</p>
                )}
              </div>
            </section>
          </form>

          <div className="text-center mt-12">
            <a
              href="/FORMAT_RFQ_GUARNIFLON_AIVS_v5.xlsx"
              download
              className="text-blue-700 underline text-sm"
            >
              Download RFQ Template
            </a>
          </div>

          <footer className="text-center mt-8 text-sm text-black">
            <a href="https://www.guarniflon.com" target="_blank" rel="noopener noreferrer">
              Go to guarniflon.com
            </a>
          </footer>
        </div>
      </main>
    </>
  );
}
