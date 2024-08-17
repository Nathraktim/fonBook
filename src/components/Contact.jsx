import React, { useEffect, useState } from 'react';

const Contact = ({ contact, emailContact, callContact, deleteContact, openEditForm, setIsUpdatingContact }) => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the token

    if (contact.photoLink && token) {
      fetch(`https://phonbook-i39g.onrender.com/api/images/${contact.photoLink}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch image');
          }
          return response.blob();
        })
        .then((blob) => {
          const imageUrl = URL.createObjectURL(blob);
          setImageSrc(imageUrl);
        })
        .catch(() => {
          setImageSrc('./react.svg'); // Fallback image on error
        });
    } else {
      setImageSrc('./react.svg'); // Fallback image if no photoLink or token
    }
  }, [contact.photoLink]);

  return (
    <li key={contact.id} className="mx-10 xs:mx-0 xxs:mx-0 xxxs:mx-0 sm:mx-4 my-5">
      <div className="flex items-center my-3 justify-between flex-wrap">
        <div className="flex flex-row gap-2">
          <div className="aspect-1 h-16 mr-3 overflow-hidden rounded-full">
            <img
              src={imageSrc}
              alt={contact.name}
              onError={(e) => {
                e.target.src = './react.svg';
              }}
            />
          </div>
          <div>
            <span className="font-medium text-[20px]">{contact.name}</span>
            <br />
            <div>
              <p className="font-light text-[13px] text-zinc-200">
                {contact.email}
              </p>
              <p className="font-light text-[13px] text-zinc-200">
                {contact.phone}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row pl-16">
          <ActionButton
            title="Email"
            ariaLabel="Email"
            onClick={() => emailContact(contact.email)}
            icon="./emailIcon.svg"
            alt="Email Icon"
            bgColor="hover:bg-yellow-500"
          />
          <ActionButton
            title="Call"
            ariaLabel="Call"
            onClick={() => callContact(contact.phone)}
            icon="./phoneIcon.svg"
            alt="Call Icon"
            bgColor="hover:bg-green-700"
          />
          <ActionButton
            title="Edit Contact"
            ariaLabel="Edit Contact"
            onClick={() => {setIsUpdatingContact(true); openEditForm(contact.id)}}
            icon="./editIcon.svg"
            alt="Edit Icon"
            bgColor="hover:bg-zinc-700"
          />
          <ActionButton
            title="Delete Contact"
            ariaLabel="Delete Contact"
            onClick={() => deleteContact(contact.id)}
            icon="./deleteIcon.svg"
            alt="Delete Icon"
            bgColor="hover:bg-red-500"
          />
        </div>
      </div>
    </li>
  );
};

const ActionButton = ({ title, ariaLabel, onClick, icon, alt, bgColor }) => (
  <div
    title={title}
    aria-label={ariaLabel}
    onClick={onClick}
    className={`${bgColor} w-[3.25rem] h-[2.18rem] rounded focus:outline-none focus:shadow-outline hover:cursor-pointer flex justify-center items-center`}
  >
    <img src={icon} alt={alt} className="w-5 h-5" />
  </div>
);

export default Contact;
