/* eslint-disable react/prop-types */
import React from 'react';

export const ChatMessage = ({ message }) => {



  return (
    <>
    <div>

    <div className="max-w-sm rounded-md overflow-hidden shadow-lg hover:scale-105 transition duration-500 cursor-pointer mr-auto ml-auto mb-4 ">
      
      <div className="py-4 px-4 bg-white">
        <h3 className="text-lg font-semibold text-gray-600">{message.title ?`العنوان / ${message.title}`:''}</h3>
        { message.currency ?<p className="mt-4 text-lg font-thin"><strong>العملة</strong> ${message.currency}</p>:''}
        <span><strong>لمجموعة</strong> {message.planes_id ?`${message.planes_id }`:'مجاناً'}</span><br /><br/>
        <span>{message.entry_price?<><strong>سعر البدء</strong> {message.entry_price}</>:message.text}</span><br />
        {message.stop_price ?<><span> <strong>سعر التوقف</strong> {message.stop_price} </span><br /><br/></>:''}
            {message.target ? message.target.map((target, index) => (
              <React.Fragment key={index+1}>
                <span><strong>الهدف {index + 1}</strong> {target.target}</span><br />
              </React.Fragment>
            )) : ''}
        <p className="mt-4 text-lg font-thin">{message.desc?  message.desc.split("\n").map((item, index) => (
    <div key={index}>
      {item}
      <br />
    </div>
  )):''}</p>
        {/* <span>{timeAgo}</span> */}
        <span>{message.created_at}</span>
      </div>
    </div>
  </div>

      
    </>
  );
};
