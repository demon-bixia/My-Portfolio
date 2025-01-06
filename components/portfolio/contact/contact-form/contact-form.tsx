import { useEffect, useState } from "react";

import Button from "@/components/ui/button/button";
import Snackbar from "@/components/ui/snackbar/snackbar";
import TextInput from "@/components/ui/text-input/text-input";
import IonIcon from "@reacticons/ionicons";

import styles from "./contact-form.module.css";


// **** Component **** //

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(event.target.value);
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      fetch("https://api.slapform.com/w4meBnXPQ", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
          name: name,
          email_address: email,
          message: message,
          slap_replyto: "msbizzacc0unt@outlook.com"
        })
      });
      setName(''); setEmail(''); setMessage('');
      setStatus("success");
    } catch {
      setStatus("failure")
    }
  };

  useEffect(() => {
    if (["success", "failure"].includes(status)) {
      setEmail("");
      setName("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 2000);
    }
  }, [status])

  return (
    <>
      <form className={styles.contactForm} onSubmit={handleFormSubmit}>
        <TextInput id="name" label="Name" placeholder="Your name." required value={name} onChange={handleNameChange} />
        <TextInput id="email_address" label="Email Address" placeholder="Your email address." required value={email} onChange={handleEmailChange} />
        <TextInput id="message" label="Message" placeholder="The content of you message." multiline required value={message} onChange={handleMessageChange} />
        <div className={styles.sendButtonWrapper}>
          <Button className={styles.sendButton} type="submit" variant="outlined" endAdornment={<IonIcon name="send-outline" className={styles.icon} />}>
            Send Email
          </Button>
        </div>
      </form>

      {
        status === "success"
          ? (<Snackbar icon="checkmark-outline" color="success">Your message has been sent</Snackbar>)
          : null
      }

      {
        status === "failure"
          ? (<Snackbar icon="close-outline" color="danger">Your message wasn&apos;t sent try again</Snackbar>)
          : null
      }
    </>
  )
};


// **** Default export **** //

export default ContactForm;
