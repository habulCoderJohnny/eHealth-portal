import React from 'react';
import appointment from '../../assets/images/appointment.png';
const ContactForm = () => {
    return (
        <div className="my-16 p-10" style={{background: `url(${appointment})`, backgroundSize:'cover'}} id="who-we-are">
          <div className='text-center text-primary font-bold mb-7'>
          <h4 className='text-xl'>Contact Us</h4>
            <h1 className='text-5xl text-white'>Stay connected with us</h1>
          </div>
            <form className="sm:max-w-sm lg:max-w-lg mx-auto shadow-2xl textarea-primary">
              <div className="form-control text-xl">
                <input type="email" placeholder="Email Address" className="input input-bordered" required/>
              </div>
              <div className="form-control">
                <input type="text" placeholder="Subject" className="input input-bordered my-5" />
              </div>
              <div className="form-control">
              <textarea className="textarea textarea-primary" placeholder="Your message"></textarea>
              </div>
              <div className="form-control">
                <button className="btn btn-primary my-5">Submit</button>
              </div>
          </form>
      </div>
    );
};

export default ContactForm;

