import React from 'react'

const Msg = ({ message, toUser, user, isFirstMessage, isLastMessage }) => {
  if (message.sender === user._id) {
    return (
      <div className='self-end flex gap-x-2 items-end'>
        <div className={`px-4 py-1 bg-primary/70 text-white ${isFirstMessage ? "rounded-tr-xl rounded-bl-xl rounded-tl-xl" : isLastMessage ? "rounded-br-xl rounded-bl-xl rounded-tl-xl" : " rounded-s-xl"}   ${!isLastMessage && "me-9"}`}>
          {message.message}
        </div>
        {isLastMessage && (
          <p className='uppercase h-7 w-7 flex justify-center items-center bg-primary/70 text-white  rounded-full'>{user.username.charAt(0)}</p>
        )}
      </div>
    )
  }

  return (
    <div className="self-start flex gap-x-2 items-end">
      {
        isLastMessage && <p className='uppercase h-7 w-7 flex justify-center items-center bg-slate-200 rounded-full'>{toUser.username.charAt(0)}</p>
      }
      <div className={`px-4 py-1 bg-slate-300/70 text-black ${isFirstMessage ? "rounded-tr-xl rounded-br-xl rounded-tl-xl" : isLastMessage ? "rounded-bl-xl rounded-tr-xl rounded-br-xl" : " rounded-e-xl"}  ${!isLastMessage && "ms-9"}`}>
        {message.message}
      </div>
    </div>
  )
}

const Messages = ({ messages, toUser, user }) => {
  return (
    <div className='h-[calc(100%-114.8px)] flex flex-col-reverse px-4 py-2'>

      {
        messages.length ?
          <div className='flex flex-col gap-y-[2px]'>
            {
              messages.map((msg, index) => {
                const isFirstMessage = index === 0 || messages[index - 1]?.sender !== msg.sender;
                const isLastMessage = index === messages.length - 1 || messages[index + 1]?.sender !== msg.sender;
                return <Msg message={msg} key={index} toUser={toUser} user={user} isFirstMessage={isFirstMessage} isLastMessage={isLastMessage} />
              })
            }
          </div>
          : <div className='flex justify-center items-center h-full'>You started chat with {toUser.username} </div>
      }

    </div>
  )
}

export default Messages