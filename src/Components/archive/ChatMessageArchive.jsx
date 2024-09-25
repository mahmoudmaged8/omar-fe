/* eslint-disable react/prop-types */
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import React from 'react';

export const ChatMessageArchive = ({ message }) => {

  const createdAt = parseISO(message.created_at);
  const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true, locale: ar });

  return (
    <>
      <div>
        <div className="max-w-sm rounded-md overflow-hidden shadow-lg hover:scale-105 transition duration-500 cursor-pointer mr-auto ml-auto mb-4 ">
          <div className="py-2 px-4 bg-white">
            <h3 className="text-lg font-semibold text-gray-600">{message.title ? `العنوان / ${message.title}` : ''}</h3>
            <span>{message.recommendation ?<><strong>لمجموعة</strong>  {message.recommendation.plan2.name} </>:'' }</span><br />
            <p className="mt-4 text-lg font-thin text-center">{message.text ?message.text:''}</p>
            <span>{timeAgo}</span>
          </div>
          {message.recommendation ? (
            
         
          <div className="py-2 px-4 mx-2 bg-slate-100">
            <h3 className="text-lg font-semibold text-gray-600">{message.recommendation.title ? `العنوان / ${message.recommendation.title}` : ''}</h3>
            <p className="mt-4 text-lg font-thin"><strong>العملة</strong>{message.recommendation.currency}</p>
            <span> {message.recommendation.entry_price?<strong>سعر البدء</strong>+ message.recommendation.entry_price:''}</span><br />
            <span><strong>سعر التوقف</strong> {message.recommendation.stop_price}</span><br />
            {message.recommendation.target ? message.recommendation.target.map((target, index) => (
              <React.Fragment key={index+1}>
                <span><strong>الهدف {index + 1}</strong> {target.target}</span><br />
              </React.Fragment>
            )) : ''}
            <span>{timeAgo}</span>
          </div>
           ): ''}
            <p className="mt-4 text-lg font-thin text-center">{message.desc}</p>
        </div>
       
      </div>
    </>
  );
};
