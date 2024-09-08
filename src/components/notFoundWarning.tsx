import { BsEmojiNeutral } from 'react-icons/bs';

interface NotFoundWarningProps {
  message: string
}
const NotFoundWarning = (props: NotFoundWarningProps) => {
  return (
    <div className='justify-center flex flex-col'>
      <div className='flex items-center gap-x-4'>
        <BsEmojiNeutral className='text-custom-purple text-6xl' />
        <p className="text-2xl text-custom-purple">{props.message}</p>
      </div>
    </div>

  )
};

export default NotFoundWarning; 


