
import Head from 'next/head';
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Home() {
  const form = useRef();
  const [submitted, setSubmitted] = useState(false);

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

              <div className="space-y-4">
                <label htmlFor="file-upload" className="block text-center bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg cursor-pointer transition duration-200">
                  Upload RFQ File
                </label>
                <input id="file-upload" type="file" name="file_name" required className="hidden" />
                
                <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition">
                  Submit RFQ
                </button>
              </div>
            </section>
          </form>

          <footer className="text-center mt-12 border-t pt-6 text-sm text-gray-500">
            <a href="https://www.guarniflon.com" target="_blank" rel="noopener noreferrer" className="underline">
              Go to guarniflon.com
            </a>
            <span className="mx-2">|</span>
            <a href="/FORMAT_RFQ_GUARNIFLON_AIVS_v5.xlsx" download className="underline text-blue-700">
              Download RFQ Template
            </a>
            {submitted && (
              <p className="text-green-600 font-semibold mt-4">RFQ successfully submitted!</p>
            )}
          </footer>
        </div>
      </main>
    </>
  );
}
